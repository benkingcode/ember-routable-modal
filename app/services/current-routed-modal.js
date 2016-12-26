import Ember from 'ember';

export default Ember.Service.extend({
    routing: Ember.inject.service('-routing'),
    routeName: null,
    activeListener: function() {
        if (this.get('routeName')) {
            document.body.classList.add('modal-open');
        } else {
            document.body.classList.remove('modal-open');
        }
    }.observes('routeName'),
    init() {
        this._super(...arguments);

        Ember.$(window).on('popstate.ember-routable-modal', () => {
            if (this.get('routeName')) {
                this.set('routeName', null);
            }
        });
    },
    close() {
        console.log('Close modal from service');

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
