import Ember from 'ember';
import Config from 'ember-routable-modal/configuration';

export default Ember.Service.extend({
    routing: Ember.inject.service('-routing'),
    routeName: null,
    activeListener: function() {
        if (typeof Ember.$ !== 'undefined') {
            Ember.$('body')[this.get('routeName') ? 'addClass' : 'removeClass'](Config.modalOpenBodyClassName);
        }
    }.observes('routeName'),
    init() {
        this._super(...arguments);

        if (typeof Ember.$ !== 'undefined' && typeof window !== 'undefined') {
            Ember.$(window).on('popstate.ember-routable-modal', () => {
                if (this.get('routeName') !== this.get('routing.router.currentRouteName')) {
                    this.set('routeName', null);
                }
            });
        }
    },
    clear() {
        if (this.get('routeName')) {
            this.set('routeName', null);
        }
    },
    close() {
        const routerMain = this.get('routing.router');
        const routerLib = routerMain._routerMicrolib || routerMain.router;
        const handlerInfos = routerLib.state.handlerInfos;
        const currentHandlerInfos = handlerInfos[handlerInfos.length - 1];
        const currentHandler = currentHandlerInfos._handler;
        const currentController = currentHandler.controller;
        const currentModel = currentHandler.currentModel;
        const hasDynamicSegments = currentHandlerInfos.params.length > 0;
        
        this.set('routeName', null);

        if (currentController._isModalRoute) {
            const parentRoute = handlerInfos[handlerInfos.length - 2].name;

            routerLib.transitionTo(parentRoute);
        } else {
            let url;

            if (hasDynamicSegments) {
              url = this.get('routing').generateURL(this.get('routing.currentRouteName'), currentModel);
            } else {
              url = this.get('routing').generateURL(this.get('routing.currentRouteName'), []);
            }

            routerLib.updateURL(url);
        }
    }
});
