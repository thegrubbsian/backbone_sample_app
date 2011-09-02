var Router = Backbone.Router.extend({
  routes: {
    "/volunteer/new": "newVolunteer",
    "/volunteer/edit/:id": "editVolunteer",
    "/event/new": "newEvent",
    "/event/edit/:id": "editEvent"
  },
  newVolunteer: function() {
    App.volunteersCollection.add(new Models.Volunteer());
  },
  editVolunteer: function(id) {
    App.volunteerListView.showEditVolunteer(id);
  },
  newEvent: function() {
    App.eventsCollection.add(new Models.Event());
  },
  editEvent: function(id) {
    App.calendarView.showEditEvent(id);
  }
});
