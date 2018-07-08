/*global define*/

define([
  'underscore',
  'backbone',
  'models/user'
], function (_, Backbone, UserModel) {
    'use strict';

    var UsersCollection = Backbone.Collection.extend({
        url: '/users',
        model: UserModel
    });
    return UsersCollection;
});
