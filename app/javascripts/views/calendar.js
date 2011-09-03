Views.Calendar = Backbone.View.extend({
  el: $("#calendar"),
  initialize: function() {
    this.render();
    this._bindCollectionEvents();
    this.editView = new Views.CalendarEditView();
  },
  render: function() {
    var me = this;
		this.el.fullCalendar({
			header: {
				left: "prev,next today",
				center: "title",
				right: "month,agendaWeek,agendaDay"
			},
			editable: true,
      events: function(start, end, callback) {
        var events = me.collection.map(function(event) {
          return event.attributes;
        });
        callback(events);
      },
      eventClick: function(evt, e, view) {
        var event = me.collection.get(evt.id);
        me.editView.show(event);
      }
    });
  },
  _bindCollectionEvents: function() {
    var me = this;
    this.collection.bind("add", function() {
      me.el.fullCalendar("refetchEvents");
    });
  }
});
