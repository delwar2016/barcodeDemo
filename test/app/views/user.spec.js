
define(['chai','collections/users','views/user'], function(chai,UsersCollection,UserView) {
    var expect = chai.expect;
    describe("UserView template rendering", function () {
        it('render by remote data', function (done) {
            var Users = new UsersCollection();
            Users.create({
                '_id': 1
            });
            var view = new UserView(Users);
            view.once('render', function () {
                expect(view.$el.html()).to.have.string('Your content here.');
                done();
            });
            view.render();
        });
    });
});
