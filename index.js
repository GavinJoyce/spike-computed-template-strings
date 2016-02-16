/* jshint node: true */
'use strict';

var BabelPluginSpike = function() {
 return function(babel) {
   var types = babel.types;

   return new babel.Transformer('ember-computed-template-strings', {
     TaggedTemplateExpression: function(node) {
       if (types.isIdentifier(node.tag, { name: 'computedString' })) {
          //TODO: GJ: use `t` to build the computed property dynamically
          return this.replaceWithSourceString(
            'Em.computed("name", function() { return "hi " + this.get("name"); })'
          );
       }
     },
   });
 }
};

module.exports = {
  name: 'spike-computed-template-strings',
  included: function(app) {
    this._super.included(app);

    app.options = app.options || {};
    app.options.babel = app.options.babel || {};
    app.options.babel.plugins = app.options.babel.plugins || [];

    if (!this._registeredWithBabel) {
      app.options.babel.plugins.unshift(BabelPluginSpike());
      this._registeredWithBabel = true;
    }
  },
};
