import { Promise as EmberPromise } from 'rsvp';
import Route from '@ember/routing/route';
import ModalRouteMixin from 'ember-routable-modal/mixins/route';

export default Route.extend(ModalRouteMixin, {
    model() {
        return new EmberPromise((resolve) => {
            setTimeout(() => {
                resolve('done');
            }, 500);
        });
    }
});
