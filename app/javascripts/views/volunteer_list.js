Views.VolunteerList = Backbone.View.extend({
  el: $("#volunteers"),
  volunteerViews: [],
  initialize: function() {
    this._render();
    this._bindCollectionEvents();
  },
  showEditVolunteer: function(id) {
    var volunteerView = _.detect(this.volunteerViews, function(view) {
      return view.model.id == id;
    });
    volunteerView.edit();
  },
  _render: function() {
    var me = this;
    this.collection.each(function(volunteer) { me._add(volunteer); });
  },
  _add: function(volunteer) {
    var view = new Views.Volunteer({ model: volunteer });
    view.render(this.el);
    this.volunteerViews.push(view);
  },
  _bindCollectionEvents: function() {
    var me = this;
    this.collection.bind("add", function(volunteer) { me._add(volunteer); });
  }
});
