# ember-datadog-rum

Adds [Datadog Real User Monitoring SDK](https://docs.datadoghq.com/real_user_monitoring/browser/) to your Ember App.

## Installation

```sh
ember install @houseninja/ember-datadog-rum
```

### Configuration

Add your RUM config options to `config/environment.js`:

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

### Content Security Policy

If you're using [ember-cli-content-security-policy](https://github.com/rwjblue/ember-cli-content-security-policy), you'll need to modify the content security policy. In `config/environment.js`, add this to the `ENV` hash (modify as necessary):

```javascript
contentSecurityPolicy: {
  // Intake URLs
  'connect-src': "'self' https://*.logs.datadoghq.com https://*.browser-intake-datadoghq.com",

  // Session Replay worker
  'worker-src': "blob:;"
}
```

More information at https://docs.datadoghq.com/real_user_monitoring/faq/content_security_policy/

## Usage

See https://docs.datadoghq.com/real_user_monitoring/browser/ for all options.



## Compatibility

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v12 or above

## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.

## License

This project is licensed under the [MIT License](LICENSE.md).
