class Rover {
  constructor(position) {
    this.position = position;
    this.mode = "NORMAL";
    this.generatorWatts = 110;
  }

  receiveMessage(message) {
    let results = [];
    let commands = message.commands;

    for (let command of commands) {
      if (command.commandType === 'STATUS_CHECK') {
        results.push({
          completed: true,
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position
          }
        });
      } else if (command.commandType === 'MODE_CHANGE') {
        this.mode = command.value;
        results.push({
          completed: true,
          roverStatus: {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position
          }
        });
      } else if (command.commandType === 'MOVE') {
        if (this.mode === 'LOW_POWER') {
          results.push({
            completed: false,
            roverStatus: {
              mode: this.mode,
              generatorWatts: this.generatorWatts,
              position: this.position
            }
          });
        } else {
          this.position = command.value;
          results.push({
            completed: true,
            roverStatus: {
              mode: this.mode,
              generatorWatts: this.generatorWatts,
              position: this.position
            }
          });
        }
      } else {
        results.push({ completed: true });
      }
    }

    return {
      message: message.name,
      results: results
    };
  }
}

module.exports = Rover;