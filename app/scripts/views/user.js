/*global define*/

define([
    'jquery',
    'underscore',
    'backbone',
    'collections/users',
    'templates',
    'JsBarcode'
], function ($, _, Backbone, Users, JST) {
    'use strict';
    var UserView = Backbone.View.extend({
        template: JST['app/scripts/templates/user.ejs'],
        collectionFun:Users,
        tagName: 'div',
        className: '',
        events: {},
        initialize: function (collection) {
            if(collection instanceof this.collectionFun){
                this.collection=collection;
            }else{
                this.collection=new this.collectionFun();
                this.collection.fetch({beforeSend:function(xhr){},reset:true,data:{}});
            }
            this.listenTo(this.collection, 'reset', this.render);
        },
        render: function () {
            this.$el.html(this.template({users:this.collection.toJSON()}));
            $('#body').html(this.$el.html());
            this.trigger("render", "render done!");
            for(var i =1; i<= 200; i++) {
              JsBarcode("#barcode" + i, "ACISt1K" + i, {
                displayValue:false,
                fontSize:24
              });
            }
            return this;
        },
        remove: function(){
            this.undelegateEvents();
        }
    });
    return UserView;
});
