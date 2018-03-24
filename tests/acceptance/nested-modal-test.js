import { click, currentURL, visit, find, findAll } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import config from 'ember-routable-modal/configuration';

module('Acceptance | nested modals', function(hooks) {
  setupApplicationTest(hooks);

  function joinClasses(classes) {
    return `.${classes.join('.')}`;
  }

  test('transitioning to /nested-one', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
    try {
      await visit('/test/nested-one');
    } catch (e) {
      // Caught TransitionAborted
    }
    assert.equal(currentURL(), '/test/nested-one');
    assert.ok(findAll(joinClasses(config.modalClassNames)));
    assert.ok(find('#application-title'));
    assert.ok(find('#index-title'));

    await click('.routable-modal--close');
    assert.equal(currentURL(), '/');
    assert.ok(find('#application-title'));
    assert.ok(find('#index-title'));
  });

  test('booting up from /test/nested-one', async function(assert) {
    await visit('/test/nested-one');

    assert.equal(currentURL(), '/test/nested-one');
    assert.ok(findAll(joinClasses(config.modalClassNames)));
    assert.ok(find('#application-title'));
    assert.ok(find('#index-title'));

    await click('.routable-modal--close');
    assert.equal(currentURL(), '/');
    assert.ok(find('#application-title'));
    assert.ok(find('#index-title'));
  });
});
