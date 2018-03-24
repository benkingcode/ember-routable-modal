import { click, currentURL, find, findAll, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import config from 'ember-routable-modal/configuration';

module('Acceptance | modals with async models', function(hooks) {
  setupApplicationTest(hooks);

  function joinClasses(classes) {
    return `.${classes.join('.')}`;
  }

  test('transitioning to /async-model-one', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
    try {
      await visit('/async-model-one');
    } catch (e) {
      // Caught TransitionAborted
    }
    assert.equal(currentURL(), '/async-model-one');
    assert.ok(findAll(joinClasses(config.modalClassNames)));
    assert.ok(find('#application-title'));
    assert.ok(find('#index-title'));
    assert.equal(find('#modal-model').textContent, 'done');

    await click('.routable-modal--close');
    assert.equal(currentURL(), '/');
    assert.ok(find('#application-title'));
    assert.ok(find('#index-title'));
  });

  test('booting up from /async-model-one', async function(assert) {
    await visit('/async-model-one');

    assert.equal(currentURL(), '/async-model-one');
    assert.ok(findAll(joinClasses(config.modalClassNames)));
    assert.ok(find('#application-title'));
    assert.ok(find('#index-title'));
    assert.equal(find('#modal-model').textContent, 'done');

    await click('.routable-modal--close');
    assert.equal(currentURL(), '/');
    assert.ok(find('#application-title'));
    assert.ok(find('#index-title'));
  });
});
