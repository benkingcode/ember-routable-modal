import Ember from 'ember';
import Config from 'ember-routable-modal/configuration';

export default Ember.Service.extend({
    routing: Ember.inject.service('-routing'),
    routeName: null,
    activeListener: function() {
        document.body.classList[this.get('routeName') ? 'add' : 'remove'](Config.modalOpenBodyClassName);
    }.observes('routeName'),
    init() {
        this._super(...arguments);

        Ember.$(window).on('popstate.ember-routable-modal', () => {
            if (this.get('routeName')) {
                this.set('routeName', null);
            }
        });
    },
    clear() {
        this.set('routeName', null);
    },
    close() {
        const rout = this.get('routing.router.router');
        const handlerInfos = this.get('routing.router.router.state.handlerInfos');
        const currentController = handlerInfos[handlerInfos.length - 1]._handler.controller;

        this.set('routeName', null);

        if (currentController._isModalRoute) {
            const parentRoute = handlerInfos[handlerInfos.length - 2].name;

            rout.transitionTo(parentRoute);
        } else {
            const url = this.get('routing').generateURL(this.get('routing.currentPath'));

            rout.updateURL(url);
        }
    }
});
