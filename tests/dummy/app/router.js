import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
    this.route('index', { path: '/' }, function() {
        this.route('nested-one');
        this.route('model-one');
        this.route('async-model-one');
        this.route('async-model-with-loading-substate-one');
    });
    this.route('root-one');
});

export default Router;
