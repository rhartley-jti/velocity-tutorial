"use strict";
describe("Tutorial", function() {
    it("should be created by admins", function(done) {
        Meteor.loginWithPassword("admin@tutorials.com", "admin3210", function(err) {
            expect(err).toBeUndefined();

            var tut = new Tutorial();
            var id = tut.save(function(error, result) {
                expect(error).toBeUndefined();
                Tutorials.remove(id);
                Meteor.logout(function() {
                    done();
                });
            });
        });
    });
});