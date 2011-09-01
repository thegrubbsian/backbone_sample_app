var Views = {};

Views.Calendar = Backbone.View.extend({
  el: $("#calendar"),
  initialize: function() {
    this.render();
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
      }
    });
  }
});

Views.VolunteerList = Backbone.View.extend({
  el: $("#volunteers"),
  initialize: function() {
    this._render();
    this._bindCollectionEvents();
  },
  add: function(volunteer) {
    var view = new Views.Volunteer({ model: volunteer });
    view.render(this.el);
  },
  _render: function() {
    var me = this;
    this.collection.each(function(volunteer) { me.add(volunteer); });
  },
  _bindCollectionEvents: function() {
    var me = this;
    this.collection.bind("add", function(volunteer) { me.add(volunteer); });
  }
});

Views.Volunteer = Backbone.View.extend({
  events: function() {
    return {
      "click .actions a[data-action='edit']": "edit",
      "click .actions a[data-action='delete']": "delete"
    };
  },
  render: function(container) {
    var html = _.template(Templates.volunteer, this.model.attributes);
    this.el = $(html);
    this.delegateEvents();
    container.append(this.el);
  },
  edit: function() {
    alert("clicked edit");
  },
  delete: function() {
    alert("clicked delete");
  }
});
