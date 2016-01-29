Tutorials = new Meteor.Collection("tutorials");

Tutorials.allow({
    insert: function(userId, doc) {
        return (userId && doc.owner === Meteor.userId() && Roles.userIsInRole(userId, "admin"));
    }
});

Tutorial = function(id, name, capacity, owner) {
    this._id = id;
    this._name = name;
    this._capacity = capacity;
    this._owner = owner;
};

Tutorial.prototype = {
    get id() {
        return this._id;
    },
    get owner() {
        return this._owner;
    },
    get name() {
        return this._name;
    },
    set name(value) {
        this._name = value;
    },
    get capacity() {
        return this._capacity;
    },
    set capacity(value) {
        this._capacity = value;
    },
    save: function(callback) {
        var that = this;
        var doc = {name: this.name, capacity: this.capacity, owner: this._owner};
        Tutorials.insert(doc, function(error, result) {
            that._id = result;
            callback(error, result);
        });
    }
};