import Ember from 'ember';
import layout from '../templates/components/hello-world';

export default Ember.Component.extend({
  layout: layout,
  init() {
    this._super(...arguments);
    Ember.run.later(() => this.set('name', 'derp'), 500);
  }
});
