import { module, test, skip } from 'qunit';
import { setupTest } from 'ember-qunit';
import sinon from 'sinon';
import { datadogRum } from '@datadog/browser-rum';

module('Unit | Service | datadog', function (hooks) {
  setupTest(hooks);

  test('it requires applicationId in config/environment', function (assert) {
    let config = this.owner.factoryFor('config:environment').class;
    config.datadog = {};
    assert.throws(
      () => this.owner.lookup('service:datadog'),
      `[ember-datadog-rum] You must pass a valid \`applicationId\` in your \`datadog\` ENV configuration`
    );
  });

  test('it requires clientToken in config/environment', function (assert) {
    let config = this.owner.factoryFor('config:environment').class;
    config.datadog = {
      applicationId: '1234',
    };
    assert.throws(
      () => this.owner.lookup('service:datadog'),
      `[ember-datadog-rum] You must pass a valid \`clientToken\` in your \`datadog\` ENV configuration`
    );
  });

  test('it initializes with a valid applicationId and clientToken', function (assert) {
    let config = this.owner.factoryFor('config:environment').class;
    config.datadog = {
      applicationId: '1234',
      clientToken: '1234',
    };
    assert.ok(() => this.owner.lookup('service:datadog'));
  });

  skip('it delegates #setView to datadogRum', function (assert) {
    let spy = sinon.spy(datadogRum, 'setView');
    let service = this.owner.lookup('service:datadog');
    service.setView('test');
    assert.ok(spy.calledOnceWith('test'));
  });

  test('it delegates #setUser to datadogRum', function (assert) {
    let spy = sinon.spy(datadogRum, 'setUser');
    let service = this.owner.lookup('service:datadog');
    service.setUser({
      id: 1,
      email: 'test@test.com',
      name: 'Mr Test',
    });
    assert.ok(
      spy.calledOnceWith({
        id: 1,
        email: 'test@test.com',
        name: 'Mr Test',
      })
    );
  });

  test('it delegates #removeUser to datadogRum', function (assert) {
    let spy = sinon.spy(datadogRum, 'removeUser');
    let service = this.owner.lookup('service:datadog');
    service.removeUser();
    assert.ok(spy.calledOnce);
  });

  test('it delegates #addRumGlobalContext to datadogRum', function (assert) {
    let spy = sinon.spy(datadogRum, 'addRumGlobalContext');
    let service = this.owner.lookup('service:datadog');
    service.addRumGlobalContext('a', { b: 'c' });
    assert.ok(spy.calledOnceWith('a', { b: 'c' }));
  });

  test('it delegates #setRumGlobalContext to datadogRum', function (assert) {
    let spy = sinon.spy(datadogRum, 'setRumGlobalContext');
    let service = this.owner.lookup('service:datadog');
    service.setRumGlobalContext({ a: 'b' });
    assert.ok(spy.calledOnceWith({ a: 'b' }));
  });

  test('it delegates #addError to datadogRum', function (assert) {
    let spy = sinon.spy(datadogRum, 'addError');
    let service = this.owner.lookup('service:datadog');
    let error = new Error('test');
    service.addError(error);
    assert.ok(spy.calledOnceWith(error));
  });

  test('it delegates #addAction to datadogRum', function (assert) {
    let spy = sinon.spy(datadogRum, 'addAction');
    let service = this.owner.lookup('service:datadog');
    service.addAction('test', { a: 'b' });
    assert.ok(spy.calledOnceWith('test', { a: 'b' }));
  });
});
