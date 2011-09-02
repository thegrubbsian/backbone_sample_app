var Models = {};

Models.Event = Backbone.Model.extend({
});

Models.Volunteer = Backbone.Model.extend({
  defaults: {
    "lastName": " ",
    "firstName": " ",
    "email": " ",
    "volunteerCount": 0
  },
  updateFromForm: function(fields, callback) {
    var attrs = {};
    _.each(fields, function(el) {
      var field = $(el);
      attrs[field.attr("name")] = field.val();
    });
    this.set(attrs);
    this.save(null, { success: function(model) { callback(model); } });
  }
});
