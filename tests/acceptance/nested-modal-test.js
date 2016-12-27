import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import config from 'ember-routable-modal/configuration';

moduleForAcceptance('Acceptance | nested modals');

function joinClasses(classes) {
    return `.${classes.join('.')}`;
}

test('transitioning to /nested-one', function(assert) {
    visit('/');

    andThen(function() {
        assert.equal(currentURL(), '/');
        visit('/nested-one');
    });

    andThen(function() {
        assert.equal(currentURL(), '/nested-one');
        findWithAssert(joinClasses(config.modalClassNames));
        findWithAssert('#application-title');
        findWithAssert('#index-title');

        click('.routable-modal--close');
    });

    andThen(function() {
        assert.equal(currentURL(), '/');
        findWithAssert('#application-title');
        findWithAssert('#index-title');
    });
});

test('booting up from /nested-one', function(assert) {
    visit('/nested-one');

    andThen(function() {
        assert.equal(currentURL(), '/nested-one');
        findWithAssert(joinClasses(config.modalClassNames));
        findWithAssert('#application-title');
        findWithAssert('#index-title');

        click('.routable-modal--close');
    });

    andThen(function() {
        assert.equal(currentURL(), '/');
        findWithAssert('#application-title');
        findWithAssert('#index-title');
    });
});
