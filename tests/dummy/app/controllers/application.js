import Em from 'ember';

export default Em.Controller.extend({
  name: 'Gavin',
  greeting: computedString`hi ${name}` //this will be rewritten by the `BabelPluginSpike` in `/index.js`
});
