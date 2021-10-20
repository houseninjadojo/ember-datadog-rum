import Service from '@ember/service';
import { datadogRum } from '@datadog/browser-rum';
import { assert } from '@ember/debug';
import { getOwner } from '@ember/application';

export default class DatadogService extends Service {
  datadogRum = null;

  config = {};

  constructor() {
    super(...arguments);

    const owner = getOwner(this);

    const config = owner.factoryFor('config:environment').class;
    const { datadog, environment = 'development' } = config;

    assert(
      `[ember-datadog-rum] You must pass a valid \`applicationId\` in your \`datadog\` ENV configuration`,
      datadog.applicationId
    );
    assert(
      `[ember-datadog-rum] You must pass a valid \`clientToken\` in your \`datadog\` ENV configuration`,
      datadog.clientToken
    );

    this.config = { ...datadog };
    this.config.site ||= 'datadoghq.com';
    this.config.env = environment;
    datadogRum.init(this.config);
    this.datadogRum = datadogRum;
  }

  /**
   * Delegate to datadogRum
   */

  startView(viewName) {
    this.datadogRum.startView(viewName);
  }

  setUser(userInfo) {
    this.datadogRum.setUser(userInfo);
  }

  removeUser() {
    this.datadogRum.removeUser();
  }

  addRumGlobalContext(key, value = {}) {
    this.datadogRum.addRumGlobalContext(key, value);
  }

  setRumGlobalContext(context = {}) {
    this.datadogRum.setRumGlobalContext(context);
  }

  addError(error) {
    this.datadogRum.addError(error);
  }

  addAction(name, obj = {}) {
    this.datadogRum.addAction(name, obj);
  }
}
