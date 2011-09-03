var App = {
  initialize: function() {
    this.configureFramework();
    this.createCollections();
    this.loadAndRenderData(function() {
      var router = new Router();
      Backbone.history.start();
    });
  },
  configureFramework: function() {
    Backbone.emulateJSON = true;
  },
  createCollections: function() {
    App.eventsCollection = new Collections.Events();
    App.volunteersCollection = new Collections.Volunteers();
  },
  loadAndRenderData: function(callback) {
    App.eventsCollection.fetch({
      success: function(collection) {
        App.calendarView = new Views.Calendar({ collection: collection });
        App.volunteersCollection.fetch({
          success: function(collection) {
            App.volunteerListView = new Views.VolunteerList({ collection: collection });
            callback();
          }
        });
      }
    });
  }
};

$(function() { App.initialize(); });
