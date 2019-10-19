import resolve from 'rollup-plugin-node-resolve';

module.exports = {
    input: ['src/todo-list.js', 'src/todo-app.js'],
    output: {
      dir: 'dist',
      format: 'cjs'
    },
    plugins: [resolve({
        // pass custom options to the resolve plugin
        customResolveOptions: {
          moduleDirectory: 'node_modules'
        }
      })]
  };