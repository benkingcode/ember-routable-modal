# Ember Routable Modal [![Build Status](https://travis-ci.org/dbbk/ember-routable-modal.svg?branch=master)](https://travis-ci.org/dbbk/ember-routable-modal)
The `ember-routable-modal` addon allows you to quickly and easily implement URL-first modals, similar to those found on sites such as Facebook, Twitter, and Dribbble. You can navigate to modals elsewhere in the route tree without losing your place on the current page, making it ideal for lightboxes and photo viewers.

## Usage
### Installation
```no-highlight
ember install ember-routable-modal
```
Ember.js 2.12+ is required.

You must add `{{routable-modal-outlet}}` to the bottom of your application template in order for modals to render.

### Stylesheets
The addon comes with a lightweight default Sass stylesheet. To use it, you must first install [ember-cli-sass](https://emberobserver.com/addons/ember-cli-sass), then import the files at the top of your `styles/app.scss` file as so;

```css
@import "ember-routable-modal/core";
@import "ember-routable-modal/dialog";
```

### Generating Modal Routes
You can use the `modal-route` generator to quickly scaffold modal routes, sharing the syntax of the built-in `route` generator. Try running the following command;
```no-highlight
ember generate modal-route example
```

If you are using the pod structure, make sure you pass the `-p` parameter.

You will now see that a route has been generated with the provided mixin, as well as a template with a sample dialog element.

```js
// app/routes/example.js
import Ember from 'ember';
import ModalRouteMixin from 'ember-routable-modal/mixins/route';

export default Ember.Route.extend(ModalRouteMixin, {
});
```

```hbs
// app/templates/example.hbs
<div class="routable-modal--dialog">
    <div class="routable-modal--content">
        <div class="routable-modal--header">
            {{routable-modal-close-button class="routable-modal--close"}}
            <h4 class="routable-modal--title">Modal title</h4>
        </div>
        <div class="routable-modal--body">
            Content
        </div>
    </div>
</div>
```

Now whenever you navigate to `/example`, through the usual `{{link-to}}` helper or by calling `this.transitionTo()` within a route, the `example` modal will render on top of your currently active route. If you load the page from the `/example` URL directly, the closest parent route will be rendered underneath the modal.

You are free to delete the provided template and build your own dialog component if you wish, the addon is flexible.

### Loading Substates
Modal routes also work with the [loading substate](https://guides.emberjs.com/v2.10.0/routing/loading-and-error-substates/) when an asynchronous object is passed to the route's `model` hook. Just create a template with the filename in the format `{route}-loading`, and it will be rendered on top of the modal backdrop while your `model` hook waits to resolve.

### Closing Modals
You can close modals in one of two ways;

#### Programmatically
The addon comes with a service called `current-routed-modal`. Simply inject it wherever you would like to be able to control the modal, for instance in a component;

```js
import Ember from 'ember';

export default Ember.Component.extend({
    modal: Ember.inject.service('current-routed-modal'),
    tagName: 'button',
    click() {
        this.get('modal').close();
    }
});
```

#### Helper Component
You can also use the `{{routable-modal-close-button}}` component, which has the same implementation as the code sample above. You can see an example of it used in the auto-generated modal route template. It can also be used in block form, such as `{{#routable-modal-close-button}}Close{{/routable-modal-close-button}}`

## Configuration
### Customize Element Classes
You can override the default modal element classes by setting the `ENV['ember-routable-modal']` option in `config/environment.js` like so;

```js
ENV['ember-routable-modal'] = {
    modalClassNames: ['modal'],
    backdropClassNames: ['modal-backdrop'],
    modalOpenBodyClassName: 'modal-open'
};
```
Property|Default
--------|-------
`modalClassNames`|`['routable-modal']`
`backdropClassNames`|`['routable-modal--backdrop']`
`modalOpenBodyClassName`|`routable-modal--open`

## Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `npm test` – Runs `ember try:each` to test your addon against multiple Ember versions
