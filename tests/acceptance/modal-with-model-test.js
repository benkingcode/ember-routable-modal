import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import config from 'ember-routable-modal/configuration';

moduleForAcceptance('Acceptance | nested modals');

function joinClasses(classes) {
    return `.${classes.join('.')}`;
}

test('transitioning to /model-one', function(assert) {
    visit('/');

    andThen(function() {
        assert.equal(currentURL(), '/');
        visit('/model-one');
    });

    andThen(function() {
        assert.equal(currentURL(), '/model-one');
        findWithAssert(joinClasses(config.modalClassNames));
        findWithAssert('#application-title');
        findWithAssert('#index-title');
        assert.equal(find('#modal-model').text(), 'instant');

        click('.routable-modal--close');
    });

    andThen(function() {
        assert.equal(currentURL(), '/');
        findWithAssert('#application-title');
        findWithAssert('#index-title');
    });
});

test('booting up from /model-one', function(assert) {
    visit('/model-one');

    andThen(function() {
        assert.equal(currentURL(), '/model-one');
        findWithAssert(joinClasses(config.modalClassNames));
        findWithAssert('#application-title');
        findWithAssert('#index-title');
        assert.equal(find('#modal-model').text(), 'instant');

        click('.routable-modal--close');
    });

    andThen(function() {
        assert.equal(currentURL(), '/');
        findWithAssert('#application-title');
        findWithAssert('#index-title');
    });
});
