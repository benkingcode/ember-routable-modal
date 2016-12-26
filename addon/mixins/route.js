import Ember from 'ember';

function getURL(routing, transition) {
    const params = Object.values(transition.params).filter(param => {
      return Object.values(param).length;
    });

    return routing.generateURL(transition.targetName, params, transition.queryParams);
}

export default Ember.Mixin.create({
    router: Ember.inject.service(),
    routing: Ember.inject.service('-routing'),
    current: Ember.inject.service('current-routed-modal'),
    setupController(controller, model) {
        this._super(controller, model);
        controller.set('_isModalRoute', true);
    },
    renderTemplate() {
        this.render({
            into: 'application',
            outlet: 'routable-modal-outlet'
        });
    },
    beforeModel(transition) {
        this.set('current._paramsCache', transition.params);
    },
    afterModel(model, transition) {
        this._super(...arguments);

        const initial = transition.isCausedByInitialTransition || typeof(transition.isCausedByInitialTransition) === "undefined";
        const routeName = this.routeName;

        if (!initial) {
            const url = getURL(this.get('routing'), transition);

            if (this.get('router.currentRouteName') === transition.targetName) {
                // Started on modal route
            } else {
                // this.connections must be merged with application connections
                this.enter();
                this.setup(model, transition);
                Ember.getOwner(this).lookup('route:application').connections = Ember.getOwner(this).lookup('route:application').connections.concat(this.connections);

                transition.abort();
            }

            transition.router.updateURL(url);
        }

        this.get('current').set('routeName', routeName);
    },
    actions: {
        closeModal() {
            return true;
        }
    }
});
