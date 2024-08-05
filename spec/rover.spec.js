const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("The Rover class", function() {

    //test 7
  test("constructor sets position and default values for mode and generatorWatts", function() {
      let position = 0;
      let mode = "NORMAL";
      let generatorWatts = 110;
      let rover = new Rover(position)

      expect(rover.position).toBe(position);
      expect(rover.mode).toBe(mode);
      expect(rover.generatorWatts).toBe(generatorWatts);
     });


//TEST 8
  test("response returned by receiveMessage contains the name of the message", function() {
    let name = 'test message';
    let commands = [];
    let message = new Message(name, commands);
    let rover = new Rover(0);
    let response = rover.receiveMessage(message);
    expect(response.message).toEqual(name);  
  });


//TEST 9
  test("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let name = 'test message';
    let commands = [new Command('commandOne'), new Command('commandTwo')];
    let message = new Message(name, commands);
    let rover = new Rover(0);

    let response = rover.receiveMessage(message);

    expect(response.results.length).toEqual(2);
    expect(response.results[0].completed).toBe(true);
    expect(response.results[1].completed).toBe(true);
  });


//TEST 10
test("should respond correctly to the status check command", function (){
  let commands = [new Command('STATUS_CHECK')];
  let message = new Message('Test message, status check', commands);
  let rover = new Rover(0); 
  let response = rover.receiveMessage(message);
  let expectedStatus = {
    mode: 'NORMAL',
    generatorWatts: 110,
    position: 0
  }

  expect(response.results[0].completed).toBe(true);
  expect(response.results[0].roverStatus).toEqual(expectedStatus);

});


//TEST 11
test("should respond correctly to the mode change command", function() {
  let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
  let message = new Message('Test message, mode change to LOW_POWER', commands);
  let rover = new Rover(0);
  let response = rover.receiveMessage(message);
  expect(response.results[0].completed).toBe(true);
  expect(response.results[0].roverStatus.mode).toBe('LOW_POWER');

  commands = [new Command('MODE_CHANGE', 'NORMAL')];
  message = new Message('Test message, mode change back to NORMAL', commands);
  response = rover.receiveMessage(message);
  expect(response.results[0].completed).toBe(true);
  expect(response.results[0].roverStatus.mode).toBe('NORMAL');

});


  // TEST 12
test("should respond with a false completed value when attempting to move in LOW_POWER mode", function () {
  let modeChangeCommands = [new Command('MODE_CHANGE', 'LOW_POWER')];
  let modeChangeMessage = new Message('Change mode to LOW_POWER', modeChangeCommands);
  let rover = new Rover(0);
  rover.receiveMessage(modeChangeMessage);

  let moveCommands = [new Command('MOVE', 1)];
  let moveMessage = new Message('Test message: Cannot move when STATUS === LOW_POWER', moveCommands);
  let response = rover.receiveMessage(moveMessage);

  expect(response.results[0].completed).toBe(false);
  expect(response.results[0].roverStatus.mode).toBe('LOW_POWER');
  expect(response.results[0].roverStatus.position).toBe(0); 
});

//TEST 13
test("should respond with the position for the move command", function() {
  let commands = [new Command('MOVE', 5)];
  let message = new Message('Test message, move 5', commands);
  let rover = new Rover(0);
  let response = rover.receiveMessage(message);
  expect(response.results[0].completed).toBe(true);
  expect(response.results[0].roverStatus.position).toBe(5);

});

});