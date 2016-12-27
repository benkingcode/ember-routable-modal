import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import config from 'ember-routable-modal/configuration';

moduleForAcceptance('Acceptance | modals with async models');

function joinClasses(classes) {
    return `.${classes.join('.')}`;
}

test('transitioning to /async-model-one', function(assert) {
    visit('/');

    andThen(function() {
        assert.equal(currentURL(), '/');
        visit('/async-model-one');
    });

    andThen(function() {
        assert.equal(currentURL(), '/async-model-one');
        findWithAssert(joinClasses(config.modalClassNames));
        findWithAssert('#application-title');
        findWithAssert('#index-title');
        assert.equal(find('#modal-model').text(), 'done');

        click('.routable-modal--close');
    });

    andThen(function() {
        assert.equal(currentURL(), '/');
        findWithAssert('#application-title');
        findWithAssert('#index-title');
    });
});

test('booting up from /async-model-one', function(assert) {
    visit('/async-model-one');

    andThen(function() {
        assert.equal(currentURL(), '/async-model-one');
        findWithAssert(joinClasses(config.modalClassNames));
        findWithAssert('#application-title');
        findWithAssert('#index-title');
        assert.equal(find('#modal-model').text(), 'done');

        click('.routable-modal--close');
    });

    andThen(function() {
        assert.equal(currentURL(), '/');
        findWithAssert('#application-title');
        findWithAssert('#index-title');
    });
});
