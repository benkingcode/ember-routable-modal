import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
    current: service('current-routed-modal'),
    actions: {
        closeModal() {
            this.get('current').close();
        }
    }
});
