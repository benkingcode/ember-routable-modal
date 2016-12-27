import { test } from 'qunit';
import moduleForAcceptance from '../../tests/helpers/module-for-acceptance';
import config from 'ember-routable-modal/configuration';

moduleForAcceptance('Acceptance | root modals');

function joinClasses(classes) {
    return `.${classes.join('.')}`;
}

test('transitioning to /root-one', function(assert) {
    visit('/');

    andThen(function() {
        assert.equal(currentURL(), '/');
        visit('/root-one');
    });

    andThen(function() {
        assert.equal(currentURL(), '/root-one');
        findWithAssert(joinClasses(config.modalClassNames));
        findWithAssert('#application-title');

        click('.routable-modal--close');
    });

    andThen(function() {
        assert.equal(currentURL(), '/');
        findWithAssert('#application-title');
    });
});

test('booting up from /root-one', function(assert) {
    visit('/root-one');

    andThen(function() {
        assert.equal(currentURL(), '/root-one');
        findWithAssert(joinClasses(config.modalClassNames));
        findWithAssert('#application-title');

        click('.routable-modal--close');
    });

    andThen(function() {
        assert.equal(currentURL(), '/');
        findWithAssert('#application-title');
    });
});
