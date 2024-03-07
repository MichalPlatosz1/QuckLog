# Quicklog
 ### Github: [https://github.com/MichalPlatosz1/Quicklog](https://github.com/MichalPlatosz1/Quicklog) </a>
 ### NPM:    [https://www.npmjs.com/package/quick-console-log](https://www.npmjs.com/package/quick-console-log) </a>


Quicklog is a package which extends basic console log functions to create more sophisticated logs. It makes it easy to convert your already made console.log's to deployment logs.


## Initialization:
```
require("quick-console-log")
```


There is no need to assign it to variable as it only updates existing console.log() function


## Initial Settings File:
```
  options: {
    addTimestamp: true,
    writeToFile: {
      enabled: true,
      logPaths: ["TestLog.log"],
      writeObjects: true,
    },
  },
```

Config files could be accessed by Quicklog object eg:
``` Quicklog.options.writeToFile.enabled = false ```

## Aviable settings actions:
**addTimestamp**: adds timestamp to your logs (both to files and default output)

**writeToFile** :
+ **enabled**: enables writing console.logs to a file
+ **logPaths**: array of paths to write logs to if setting is enabled. Paths must include both path to a file and a file name
+ **writeObjects**: automatically converts javascript objects (includes arrays) to string type and includes it in log files and default output



