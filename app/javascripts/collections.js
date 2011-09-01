var Collections = {};

Collections.Events = Backbone.Collection.extend({
  url: "/event",
  model: Models.Event
});

Collections.Volunteers = Backbone.Collection.extend({
  url: "/volunteer",
  model: Models.Volunteer
});
