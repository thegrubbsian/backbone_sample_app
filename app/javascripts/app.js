var App = {
  initialize: function() {
    this.configureFramework();
    var router = new Router();
    this.createCollections();
    this.loadAndRenderData();
  },
  configureFramework: function() {
    _.templateSettings = { interpolate : /\{\{(.+?)\}\}/g };
    Backbone.emulateJSON = true;
  },
  createCollections: function() {
    App.EventsCollection = new Collections.Events();
    App.VolunteersCollection = new Collections.Volunteers();
  },
  loadAndRenderData: function() {
    App.EventsCollection.fetch({
      success: function(collection) {
        App.CalendarView = new Views.Calendar({ collection: collection });
      }
    });
    App.VolunteersCollection.fetch({
      success: function(collection) {
        App.VolunteerListView = new Views.VolunteerList({ collection: collection });
      }
    });
  }
};

$(function() { App.initialize(); });
