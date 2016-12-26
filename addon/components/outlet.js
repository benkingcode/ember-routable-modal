import Ember from 'ember';

export default Ember.Component.extend({
    current: Ember.inject.service('current-routed-modal'),
    actions: {
        closeModal() {
            this.get('current').close();
        }
    }
});
