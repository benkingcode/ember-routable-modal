import Ember from 'ember';
import Config from '../configuration';

export default Ember.Component.extend({
    current: Ember.inject.service('current-routed-modal'),
    classNames: Config.modalClassNames,
    style: 'display: block; padding-left: 0px;',
    tabindex: '-1',
    role: 'dialog',
    attributeBindings: ['style', 'tabindex', 'role'],
    click(event) {
        if (typeof this.$ !== 'undefined') {
            const target = event.target;
            const thisEl = this.$()[0];

            if (target === thisEl || this.$(target).parent()[0] === thisEl) {
                this.get('current').close();
            }
        }
    }
});
