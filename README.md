# ember-datadog-rum

Adds [Datadog Real User Monitoring SDK](https://docs.datadoghq.com/real_user_monitoring/browser/) to your Ember App.

## Installation

```sh
ember install ember-datadog-rum
```

### Configuration

Add your RUM config options to `config/environment`:

[RUM Config Options](https://docs.datadoghq.com/real_user_monitoring/browser/)

```javascript
module.exports = function (environment) {
  var ENV = {
    ...
    datadog: {
      applicationId: '<DATADOG_APPLICATION_ID>', // required
      clientToken: '<DATADOG_CLIENT_TOKEN>',     // required
      
      // Configure the Service name in traces and metrics
      service: 'my-ember-app',

      // Automatically track interactions
      trackInteractions: true,

      // Connect RUM metrics and Traces
      // https://docs.datadoghq.com/real_user_monitoring/connect_rum_and_traces/?tab=browserrum
      // allowedTracingOrigins: [
      //   "https://api.example.com",
      //   /https:\/\/.*\.my-api-domain\.com/
      // ],
    }
    ...
  }
}
```

## Usage



## Compatibility

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v12 or above

## Usage

[Longer description of how to use the addon in apps.]

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
