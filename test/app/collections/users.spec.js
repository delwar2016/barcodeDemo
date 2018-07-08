
define(['chai','collections/users'], function(chai,UsersCollection) {
    var expect = chai.expect;
    describe("UsersCollection", function () {
        before(function () {
            this.Users = new UsersCollection();
        });
        after(function () {
            this.Users = null;
        });
        describe("creation", function () {
            it("has default values", function () {
                var Users = this.Users;
                expect(Users.length).to.equal(0);
            });
        });
    });
});
