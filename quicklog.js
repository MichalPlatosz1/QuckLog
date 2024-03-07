const log = console.log;
const fs = require("fs");

Quicklog = {
  config: {
    format: `ql_timestamp_ISO   ||   ql_params`,
    writeToFile: {
      enabled: true,
      logPaths: ["TestLog.log"],
    },
  },
};

console.log = function () {
  const args = Array.from(arguments);

  //Applying proper format and type conversion
  let Format = Quicklog.config.format;

  //ql_params
  let message = "";
  args.map((param) => {
    message += typeof param === "object" ? JSON.stringify(`${param} `) : `${param} `;
  });
  Format = Format.replace("ql_params", message);

  //ql_timestamp
  const event_date = new Date();
  Format = Format.replace("ql_timestamp_ISO", event_date.toISOString());
  Format = Format.replace("ql_timestamp", event_date);

  //ql_param[0-9]
  for (let i = 0; i < args.length; i++) {
    Format = Format.replace(
      `ql_param${i}`,
      args[i] ? (typeof args[i] === "object" ? JSON.stringify(args[i]) : args[i]) : ""
    );
  }

  //Checking for exclusion:
  for (let i = 0; i < 10; i++) {
    const element = args[i];

    if (typeof element === "object" && element.exclude === true) {
      args.splice(i, 1);
      log.apply(console, [Format]);
      return;
    }
  }

  //Writing to a file
  if (Quicklog.config.writeToFile.enabled) {
    Quicklog.config.writeToFile.logPaths.map((path) => {
      fs.appendFileSync(path, `${Format}\n`);
    });
  }

  log.apply(console, [Format]);
};

module.exports = console.log;
