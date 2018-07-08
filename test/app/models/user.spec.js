
define(['chai','models/user'], function(chai,UserModel) {
    var expect = chai.expect;
    describe("UserModel", function() {
        before(function () {
            this.User = new UserModel();
        });
        after(function () {
            this.User = null;
        });
        it('should have the correct defaults', function() {
            var User=this.User;
            expect(User.get('_id')).to.equal('');
        });

        it('should honor passed in attributes', function() {
            var newUser = new UserModel({
                '_id': 1
            });
            expect(newUser.get('_id')).to.equal(1);
        })
    });
});
