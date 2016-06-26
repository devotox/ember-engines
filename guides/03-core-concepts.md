# Core Concepts

In addition to understanding what Engines are and how they differ from Applications, there are a few core concepts worth understanding before attempting to create and use them.

## Addons & In-Repo-Addons

As mentioned above, Engines are created as a specific type of Ember Addon. This makes sense given that Addons are Ember's way to easily share common or reusable code. Since Engines are intended to package logical applications that can be composed, they fit nicely into the paradigm of shareable addons.

Addons come in two distinct flavors: _Standard_ and _In-Repo_. Standard Addons (normally just referred to as Addons) are full-fledged NPM packages that can be distributed and installed in other Ember applications. In-repo-addons, on the other hand, live within the repository of an Ember Application and are only used by that specific application.

This distinction is important for Engines, as it is fairly likely to want a logical application represented by an Engine but to only use it with a specific Ember Application. In those cases, using an in-repo-engine is a good alternative to consider instead of maintaining two separate repositories.

It is recommended to read through the "[Developing Addons & Blueprints](http://ember-cli.com/extending/#developing-addons-and-blueprints)" portion of the Ember-CLI user guide before moving onto the "[Creating An Engine](./04-creating-an-engine.md)" portion of the guide.

## Isolation & Dependencies

The next concept is a bit abstract but talked about frequently when discussing Engines: _isolation_. When discussing Engines, isolation refers to the idea of _logical run-time separation_, that is separating the code which an Engine can reference from the code which an Application can reference.

In practice this means that Engines cannot access or communicate with their host (often referred to as a parent), except through a few well-defined interfaces. Attempting to access code from the parent without explicitly importing it will result in a run-time error. So, things that you might have gotten "for free" in an application, now must have ceremony in order to be used by your Engine.

At first, and even after working with it for a while, this isolation may seem a bit cumbersome as it requires you to write more code and do more work to use something that you previously got with little-to-no effort. This "ceremony" of importing, however, is very important as it enables build and run time optimizations that are not possible without those constraints.

In particular, one huge benefit of Engines is the ability to lazy-load them. This is only made possible by having explicit interfaces with the consuming application and dependencies so that a dependency graph can be constructed at build time to allow for proper bundling of assets.

## Routable Vs. Route-less

Finally, there are two types of Engines that you could potentially encounter: _routable_ and _route-less_. In the simplest sense, the difference between the types is that routable Engines have a route map and route-less Engines do not have a route map.

This means that for complex functionality that spans multiple routes/URLs you will want to use a routeable Engine. Routeable Engines have their route maps merged into the consuming Application's route map eagerly (even when lazy-loading becomes possible), this enables deep-linking regardless of whether the Engine is loaded or not.

For complex functionality that is not associated with routing/a url, you will want to use a route-less Engine. An example of this would be for a chat/shoutbox widget that is a logical application but not necessarily a route within the application. This means that route-less Engines get mounted from within a route's template, as opposed to in the router.
