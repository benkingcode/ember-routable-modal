import ENV from '../config/environment';
import Configuration from 'ember-routable-modal/configuration';
import Ember from 'ember';

export default {
    name: 'ember-routable-modal',
    initialize: function() {
        const config = ENV['ember-routable-modal'] || {};
        Configuration.load(config);

        Ember.Router.reopen({
            currentRoutedModalService: Ember.inject.service('current-routed-modal'),
            currentRoutedModalWillTransition: function() {
                this.get('currentRoutedModalService').clear();
            }.on('willTransition')
        });
    }
};
