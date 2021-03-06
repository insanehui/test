/*
 * hash是针对整个build。即整个build都共享这一个hash
 */
const path = require('path')
const Html = require('html-webpack-plugin')
const d = path.resolve.bind(null, __dirname)

module.exports = {
  entry : d('../a.js'),
  output : { 
    filename : '[name].[hash].js', 
    path : d('../dist'),
  },
  plugins : [ new Html() ],
}

