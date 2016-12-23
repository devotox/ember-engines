import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import getEngineResolver from 'ember-engines/test-support/get-engine-resolver';

moduleForComponent('hello-name', 'Integration | Component | get-engine-resolver', {
  integration: true,
  resolver: getEngineResolver('ember-blog')
});

test('component renders properly after lookup with engine-resolver', function(assert) {
  assert.expect(1);

  this.render(hbs`{{#hello-name name="Tom"}}{{/hello-name}}`);

  assert.equal(this.$().text().trim(), 'Hello, Tom!');
});
