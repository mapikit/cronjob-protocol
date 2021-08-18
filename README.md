# Cronjob Protocol
Run your BOps in [meta-system](https://github.com/mapikit/meta-system) in a timely fashion.

## How to use it
This protocol is meant to be downloaded as a plugin for meta-system. A simple mention of the name on your system configuration would be enough for downloading it!

```JSON
{
  "protocols": [
    {
      "configuration": {...},
      "protocolType": "cronjob-protocol",
      "protocolVersion": "latest"
    }
  ]
}
```

## Configuration
The configuration for this protocol is an object with three properties: `bopsName`, `periodMillis`, `arguments`.

- **bopsName**: The name of the BOp you want to execute.
- **periodMillis**: The time interval in which you want to run the function, in milliseconds.
- **arguments**: The arguments for your BOp when it is run. These arguments are hardcoded.
