var Router = Backbone.Router.extend({
  routes: {
    "/": "resetViews",
    "/volunteer/new": "newVolunteer",
    "/volunteer/edit/:id": "editVolunteer",
    "/event/new": "newEvent",
    "/event/edit/:id": "editEvent"
  },
  resetViews: function() {
    App.volunteerListView.resetVolunteerViews();
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
