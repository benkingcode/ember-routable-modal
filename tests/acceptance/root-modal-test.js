import { click, currentURL, visit, find, findAll } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import config from 'ember-routable-modal/configuration';

module('Acceptance | root modals', function(hooks) {
  setupApplicationTest(hooks);

  function joinClasses(classes) {
    return `.${classes.join('.')}`;
  }

  test('transitioning to /root-one', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
    try {
      await visit('/root-one');
    } catch (e) {
      // Caught TransitionAborted
    }
    assert.equal(currentURL(), '/root-one');
    assert.ok(findAll(joinClasses(config.modalClassNames)));
    assert.ok(find('#application-title'));

    await click('.routable-modal--close');
    assert.equal(currentURL(), '/');
    assert.ok(find('#application-title'));
  });

  test('booting up from /root-one', async function(assert) {
    await visit('/root-one');

    assert.equal(currentURL(), '/root-one');
    assert.ok(findAll(joinClasses(config.modalClassNames)));
    assert.ok(find('#application-title'));

    await click('.routable-modal--close');
    assert.equal(currentURL(), '/');
    assert.ok(find('#application-title'));
  });
});
