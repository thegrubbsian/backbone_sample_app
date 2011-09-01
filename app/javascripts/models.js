var Models = {};

Models.Event = Backbone.Model.extend({
  updateFromForm: function(data) {
    var volunteer = this;
    for (var i = 0; i < data.length; i++) {
      eval("(" + data.name + "='" + data.value + "';)");
    }
    volunteer.save();
  }
});

Models.Volunteer = Backbone.Model.extend({
});
