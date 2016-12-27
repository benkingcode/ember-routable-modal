import ENV from '../config/environment';
import Configuration from 'ember-routable-modal/configuration';

export default {
    name: 'ember-routable-modal',
    initialize: function() {
        const config = ENV['ember-routable-modal'] || {};
        Configuration.load(config);
    }
};
