import Ember from 'ember';

export default Ember.Component.extend({
    current: Ember.inject.service('current-routed-modal'),
    tagName: 'button',
    click() {
        this.get('current').close();
    }
});
