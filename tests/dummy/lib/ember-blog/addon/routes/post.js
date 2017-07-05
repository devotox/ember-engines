import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    console.log('ember-blog.post route model hook', params);
    return {
      user: this.modelFor('application'),
      id: params.id,
      title: `Post ${params.id}`
    };
  },

  actions: {
    goToChineseVersion() {
      this.transitionTo({ queryParams: { lang: 'Chinese' } });
    },
    transitionToHome() {
      this.transitionToExternal('home')
        .then(() => {
          var postController = this.controllerFor(this.routeName);
          postController.set('transitionedToExternal', true);
        });
    },
    replaceWithHome() {
      this.replaceWithExternal('home')
        .then(() => {
          var postController = this.controllerFor(this.routeName);
          postController.set('replacedWithExternal', true);
        });
    }
  }
});
