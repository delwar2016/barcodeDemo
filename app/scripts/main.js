/*global require*/
'use strict';

require.config({
    baseUrl: "scripts/",
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        backboneLocalStorage: {
            deps: ['backbone'],
            exports: 'Store'
        },
        "bootstrap" : {
            deps :['jquery'],
            exports: 'bootstrap'
        }
    },
    paths: {
        bootstrap:'../bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.min',
        jquery: '../bower_components/jquery/dist/jquery.min',
        backbone: '../bower_components/backbone/backbone',
        fastclick: '../bower_components/fastclick/lib/fastclick',
        underscore: '../bower_components/lodash/dist/lodash.min',
        JsBarcode: '../scripts/lib/JsBarcode.all.min'
    }
});

require([
    'backbone',
    'routes/all',
    'vendor/common'
], function (Backbone, AllRouter, Common) {
    Common.app=new AllRouter();
    Backbone.history.start();
});