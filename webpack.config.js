/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const dotenv = require('dotenv').config({ path: `${__dirname}/.env` });

/* fix for https://medium.com/@danbruder/typeerror-require-is-not-a-function-webpack-faunadb-6e785858d23b */
module.exports = {
  plugins: [
    new webpack.DefinePlugin({ 'global.GENTLY': false }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
  ],
  node: {
    __dirname: true,
  },
};
