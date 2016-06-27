# Mounting An Engine

Now that we have our Engine created, let's actually mount it so that we can see it in action.

The first thing is that we'll need to enable our host application to discover the Engine by using the `Resolver` base-class provided by `ember-engines. To do that simply update your app's `resolver.js` file like so:

```js
// BEFORE - tests/dummy/app/resolver.js
import Resolver from 'ember-resolver';

// AFTER - tests/dummy/app/resolver.js
import Resolver from 'ember-engines/resolver';
```

This change will allow the application to actually find the Engine classes so that they can be instantiated during runtime.

## Creating Engine Templates

The next step is to set up a simple template for the Engine so that we can be sure it mounted properly by rendering something to the screen.

The root template for an Engine is just like that for an Application, meaning it is called `application.hbs`:

```bash
mkdir addon/templates
touch addon/templates/application.hbs
```

Now that we have the template in place, let's add something super simple to it:

```hbs
<h3>Hello World!</h3>
```

Great, now let's actually mount! How that is done will vary depending on which type of Engine you have, routable or route-less, but we will cover both below.

## Routable Engines

Mounting a Routable Engine is done in the consuming application's `Router` map. This is done by using the `mount` keyword like so:

```js
// tests/dummy/app/router.js
Router.map(function() {
  this.mount('super-blog');
});
```

`mount` can also accept `path` and `resetNamespace` options like the `route` keyword. In addition, however, is a special option, `as`, that allows you to refer to your engine by a different name to avoid collision if needing to mount the same Engine more than once. For example:

```js
// tests/dummy/app/router.js
Router.map(function() {
  this.mount('super-blog', { as: 'sales-blog' });
  this.mount('super-blog', { as: 'dev-blog' });
});
```

Within a Routable Engine the scoping of links and route's is relative to the Engine's "mount point". That is, the route at which it is mounted (taking into account any potential `as` properties).

In other words, if I were to do:

```hbs
{{#link-to 'posts'}}Posts{{/link-to}}
```

from within the `super-blog` mounted as `sales-blog`, the generated link will actually point to `sales-blog.posts`.

However, if you are trying to go the same route from outside the engine, you'll need to construct the link like so:

```hbs
{{#link-to 'sales-blog.posts'}}Sales Blog Posts{{/link-to}}
```

It's all pretty straightforward.

One edge case to note, however, is that if you wanted to go to `super-blog` (or the root route of the Engine) from within the Engine itself you'll need to use either `index` or `application` as the route name like is done for a normal Application. This should make sense due to the fact that Engine's have an `application.hbs` template.

In practice, it would look something like this:

```hbs
{{#link-to "index"}}Sales Blog Home{{/link-to}}
```

## Route-less Engines

Mounting a route-less Engine is much more straightforward than routable Engines since the `{{mount}}` keyword can only accept a single argument: the Engine name.

```hbs
{{mount "super-blog"}}
```

You can use this inside any template, and even multiple times in the same template.
