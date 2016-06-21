/**
 * Created by mars on 6/14/16.
 */
'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    entry:'./entry',
    output: {
        filename: 'build.js'
    },
    watch: NODE_ENV == 'development',
    devtool: NODE_ENV == 'development' ? 'eval' : null
};
