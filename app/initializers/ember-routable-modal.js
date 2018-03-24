import { inject as service } from '@ember/service';
import EmberRouter from '@ember/routing/router';
import ENV from '../config/environment';
import Configuration from 'ember-routable-modal/configuration';

export default {
    name: 'ember-routable-modal',
    initialize: function() {
        const config = ENV['ember-routable-modal'] || {};
        Configuration.load(config);

        EmberRouter.reopen({
            currentRoutedModalService: service('current-routed-modal'),
            willTransition() {
                this._super();
                this.get('currentRoutedModalService').clear();
            }
        });
    }
};
