import Ember from 'ember';
import ModalRouteMixin from 'ember-routable-modal/mixins/route';

export default Ember.Route.extend(ModalRouteMixin, {
    model() {
        return new Ember.RSVP.Promise((resolve) => {
            setTimeout(() => {
                resolve('done');
            }, 500);
        });
    }
});
