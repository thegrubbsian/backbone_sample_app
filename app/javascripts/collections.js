var Collections = {};

Collections.Events = Backbone.Collection.extend({
  url: "/event",
  model: Models.Event
});

Collections.Volunteers = Backbone.Collection.extend({
  url: "/volunteer",
  model: Models.Volunteer,
  comparator: function(volunteer) {
    return volunteer.get("lastName") + volunteer.get("firstName");
  }
});
