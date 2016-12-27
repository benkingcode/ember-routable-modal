import Ember from 'ember';

const DEFAULTS = {
    modalClassNames: ['routable-modal'],
    backdropClassNames: ['routable-modal--backdrop'],
    modalOpenBodyClassName: 'routable-modal--open'
};

export default {
    modalClassNames: DEFAULTS.modalClassNames,
    backdropClassNames: DEFAULTS.backdropClassNames,
    modalOpenBodyClassName: DEFAULTS.modalOpenBodyClassName,

    load(config) {
        for (let property in this) {
            if (this.hasOwnProperty(property) && Ember.typeOf(this[property]) !== 'function') {
                this[property] = Ember.getWithDefault(config, property, DEFAULTS[property]);
            }
        }
    }
};
