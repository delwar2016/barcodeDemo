/*global define*/

define([
    'jquery',
    'backbone',
    'views/user',
    'vendor/common'
], function ($, Backbone, UserView,Common) {
    'use strict';
    var AllRouter = Backbone.Router.extend({
        routes: {
            '':'main',
            'user':'user'
        },
        initialize:function(){
            this.back=$("#backBtn");
        },
        execute: function(callback, args, name) {
            if(Common.currentView) {
                Common.currentView.remove();
            }
            if (callback) callback.apply(this, args);
        },
        main: function () {
            this.back.hide();
            Common.currentView=new UserView();
        },
        doctor: function () {
            this.back.hide();
            Common.currentView=new UserView();
        }
    });

    return AllRouter;
});
