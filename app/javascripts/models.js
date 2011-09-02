var Models = {};

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
      if (_.include(me.get("volunteerIds"), volunteer.id)) { count++; }
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
  updateFromForm: function(fields, callback) {
    var attrs = {};
    _.each(fields, function(el) {
      var field = $(el);
      attrs[field.attr("name")] = field.val();
    });
    this.set(attrs);
    this.save(null, { success: function(model) { callback(model); } });
  },
  fullName: function() {
    return this.get("lastName") + ", " + this.get("firstName");
  }
});
