var Models = {};

Backbone.Model.prototype.updateFromForm = function(fields, callback) {
  var attrs = {};
  _.each(fields, function(el) {
    var field = $(el);
    var name = field.attr("name");
    if (field.is("[type='checkbox']")) {
      if (!attrs[name]) { attrs[name] = []; }
      if (field.is(":checked")) { attrs[name].push(field.val()); }
    } else {
      attrs[name] = field.val();
    }
  });
  this.set(attrs);
  this.save(null, { success: function(model) { callback(model); } });
};

Models.Event = Backbone.Model.extend({
  defaults: {
    title: " ",
    start: new Date(),
    end: new Date(),
    volunteerIds: []
  },
  initialize: function() {
    var me = this;
    this.bind("change:volunteerIds", function() { me.updateVolunteerCount(); });
  },
  updateVolunteerCount: function() {
    var me = this;
    App.volunteersCollection.each(function(volunteer) {
      var count = 0;
      if (_.include(me.get("volunteerIds"), volunteer.id.toString())) { count++; }
      volunteer.set({ eventCount: count });
      volunteer.save();
    });
  }
});

Models.Volunteer = Backbone.Model.extend({
  defaults: {
    "lastName": " ",
    "firstName": " ",
    "email": " ",
    "eventCount": 0
  },
  fullName: function() {
    return this.get("lastName") + ", " + this.get("firstName");
  }
});
