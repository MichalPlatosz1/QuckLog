const log = console.log;
const fs = require("fs");

Quicklog = {
  options: {
    addTimestamp: true,
    writeToFile: {
      enabled: true,
      logPaths: ["TestLog.log"],
      writeObjects: true,
    },
  },
};

console.log = function () {
  const args = Array.from(arguments);

  if (Quicklog.options.addTimestamp) {
    const event_date = new Date();
    args.unshift(`${event_date.toISOString()}   ||  `);
  }

  if (Quicklog.options.writeToFile.enabled) {
    // Writing to all given paths
    for (let i = 0; i < Quicklog.options.writeToFile.logPaths.length; i++) {
      const path = Quicklog.options.writeToFile.logPaths[i];

      for (let j = 0; j <= args.length; j++) {
        //Check for end of the line
        if (j == args.length) {
          fs.appendFileSync(path, "\n");
          break;
        }

        let element = args[j];

        //Checking type of arg in order to only write proper data type to file
        if (typeof element !== "string") {
          if (Quicklog.options.writeToFile.writeObjects && typeof element === "object") {
            element = JSON.stringify(element);
          } else {
            continue;
          }
        }

        fs.appendFileSync(path, `${element} `);
      }
    }
  }

  log.apply(console, args);
};

module.exports = console.log;
