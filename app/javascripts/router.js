var Router = Backbone.Router.extend({
  routes: {
    "/volunteer/new": "newVolunteer",
    "/volunteer/edit/:id": "editVolunteer"
  },
  newVolunteer: function() {
    App.volunteerListView.showNewVolunteer();
  },
  editVolunteer: function(id) {
    App.volunteerListView.showEditVolunteer(id);
  }
});
