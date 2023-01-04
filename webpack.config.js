const path = require('path');

module.exports = {
  // The entry point file described above
  entry:{
    addBlog: './src/addBlob.js',
    fetchBlogh:'./src/fetchBlog.js',
    home:'./src/index.js'
    },
    
  // The location of the build folder described above
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  // Optional and for development only. This provides the ability to
  // map the built code back to the original source format when debugging.
  watch: true
};