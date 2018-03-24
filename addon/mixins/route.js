import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import Mixin from '@ember/object/mixin';

function objectValues(obj) {
    const vals = [];

	for (var key in obj) {
        vals.push(obj[key]);
    }

    return vals;
}

function getURL(routing, transition) {
    let params = [];

    if (transition.params) {
        params = objectValues(transition.params).filter(param => {
          return objectValues(param).length;
        });
    }

    return routing.generateURL(transition.targetName, params, transition.queryParams);
}

export default Mixin.create({
    routing: service('-routing'),
    current: service('current-routed-modal'),
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
        const initial = transition.isCausedByInitialTransition || typeof(transition.isCausedByInitialTransition) === "undefined";

        if (initial) {
            const handlerInfos = transition.handlerInfos;
            const parentRoute = handlerInfos[handlerInfos.length - 2].name;

            this.intermediateTransitionTo(parentRoute);
        }

        this.set('current._paramsCache', transition.params);
        this.get('current').set('routeName', this.routeName);
    },
    afterModel(model, transition) {
        this._super(...arguments);

        const initial = transition.isCausedByInitialTransition || typeof(transition.isCausedByInitialTransition) === "undefined";

        if (!initial) {
            const url = getURL(this.get('routing'), transition);

            const routerMain = getOwner(this).lookup('router:main');
            const routerLib = routerMain._routerMicrolib || routerMain.router;

            if (routerLib.currentRouteName === transition.targetName) {
                // Started on modal route
            } else {
                // this.connections must be merged with application connections
                this.enter();
                this.setup(model, transition);
                getOwner(this).lookup('route:application').connections = getOwner(this).lookup('route:application').connections.concat(this.connections);

                transition.abort();
            }

            transition.router.updateURL(url);
        }
    },
    actions: {
        closeModal() {
            this.get('current').close();
        },
        loading(transition, originRoute) {
            const templateName = `${originRoute.routeName}-loading`;
            const lookupTemplate = getOwner(this).lookup(`template:${templateName}`);

            if (!lookupTemplate) {
                return false;
            }

            const oldTemplateName = this.templateName;
            const oldControllerName = this.controllerName;

            this.templateName = templateName;
            this.controllerName = 'routableModalLoading';

            this.enter();
            this.setup();

            if (!this.connections) {
                this.connections = [];
            }

            if (!getOwner(this).lookup('route:application').connections) {
                getOwner(this).lookup('route:application').connections = [];
            }

            getOwner(this).lookup('route:application').connections = getOwner(this).lookup('route:application').connections.concat(this.connections);

            this.templateName = oldTemplateName;
            this.controllerName = oldControllerName;

            return false;
        }
    }
});
