const Message = require('../message.js'); 
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class name", function() {

    it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
      expect( function() { new Message();}).toThrow(new Error('Name required as the first parameter.'));
    });

});

describe("Constructor sets name", function(){

    test("constructor sets name", function (){
      let name = 'something';
      let message = new Message(name);
      expect(message.name).toBe(name);
    });
  
  });

  describe("The constructor commands Array", function(){

    test("should contain a commands array passed into the constructor as the 2nd argument", function() {
      let name = 'something';
      let commands = ['something'];
      let message = new Message(name, commands);
      expect(message.commands).toBe(commands);
    });
  
  });  