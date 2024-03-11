# Quicklog

**Github**: [https://github.com/MichalPlatosz1/Quicklog](https://github.com/MichalPlatosz1/Quicklog)

**npm**: [https://www.npmjs.com/package/quick-console-log](https://www.npmjs.com/package/quick-console-log)

Quicklog is a package which extends basic console log functions to create more sophisticated logs. It makes it easy to convert your already made console.log's to logs ready for deployment.

## Initialization:

```
require("quick-console-log")
```

There is no need to assign it to variable as it only updates existing console.log() function

## Initial Settings File:

```
  config: {
    format: `ql_timestamp_ISO  ||  ql_params`,
    timestampFormat: {
      locales: "en-GB",
      options: {
        weekday: "short",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      },
    },
    constParams: [`New Entry: `],
    writeToFile: {
      enabled: true,
      logPaths: ["TestLog.log"],
    },
  },
```

Config files could be accessed by Quicklog object eg: `Quicklog.config.writeToFile.enabled = false`

## Available settings:

**format**: Specifies logging format, more information can be found below

**constParams**: You can define list const values to be used in format

**timestampFormat**: Specifies date format to be used by ql_custom_timestamp more information can be found below

**writeToFile**:

- **enabled**: enables writing console.logs to a file
- **logPaths**: array of paths to write logs to if setting is enabled. Paths must include both path to a file and a file name
- **writeObjects**: automatically converts javascript objects (includes arrays) to string type and includes it in log files and default output

## Format options:

#### Format can be configured almost without any restrictions. It is represented as a string and you're required to use special tags for dynamic data. All dynamic data specifiers start with "ql\_" so it's not recommended to use them as it can cause issues in the future.

- `"console.log has been called"` - would result in standard output always displaying the same message despite parameters given to the function.

- `"--> ql_params <--"` - would display e.g. "--> Message passed to console.log() <--"

- `"/-\ ql_timestamp_ISO || ql_param1 /-\"` - would display e.g. "/-\ 2024-03-07T17:48:29.123Z || sample_message /-\" for: console.log("sample_message", "2nd message")

<br />
<br />

Here are listed all the available dynamic format specifiers:

- **ql_timestamp** - displays current date in default Javascript format
- **ql_timestamp_ISO** - displays current date in ISO format
- **ql_custom_timestamp** - displays date in date format specified inside config.timestampFormat
- **ql_params** - displays all props / parameters given to console.log() function e.g. `console.log("foo", "bar", {foo: "bar"})` would show up as: "foo", "bar", {foo: "bar"}
- **ql_param[0-9]** - displays only given prop, counting up from 0 to 9 e.g. for ql_param2 in Format and while calling function `console.log("foo", "bar", {foo: "bar"})` would show up as: {foo: "bar"}
- **ql_const[0-9]** - works similary to ql_param[0-9] but instead uses values from config.constParams list

## Custom timestamp

you can define format to be used by ql_custom_timestamp string. It uses standard DateTimeFormat settings. You should pass:

```
{
  locales: string
  options: {}
}

```

In DateTimeFormat standard which you can [read more about](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat)

## Additional options:

You can prevent console.log() from writing to file only in given situation by passing {exclude: true} in console.log() parameters e.g. `console.log("foo", "bar", {exclude: true})`
