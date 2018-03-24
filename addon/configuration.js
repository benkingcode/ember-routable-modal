import { getWithDefault } from '@ember/object';
import { typeOf } from '@ember/utils';

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
            if (this.hasOwnProperty(property) && typeOf(this[property]) !== 'function') {
                this[property] = getWithDefault(config, property, DEFAULTS[property]);
            }
        }
    }
};
