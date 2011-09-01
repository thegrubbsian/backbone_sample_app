var Views = {};

Views.Calendar = Backbone.View.extend({
  el: $("#calendar"),
  initialize: function() {
    this.render();
    this._bindCollectionEvents();
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
  },
  _bindCollectionEvents: function() {
    
  }
});

Views.VolunteerList = Backbone.View.extend({
  el: $("#volunteers"),
  volunteerViews: [],
  initialize: function() {
    this._render();
    this._bindCollectionEvents();
  },
  showNewVolunteer: function() {
    this.collection.add(new Models.Volunteer());
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

Views.Volunteer = Backbone.View.extend({
  events: function() {
    return {
      "click .actions a[data-action='delete']": "_delete",
      "click .actions a[data-action='save']": "_save",
      "click .actions a[data-action='cancel']": "_cancel"
    };
  },
  initialize: function() {
    this._bindModelEvents();
  },
  render: function(container) {
    if (this.model.isNew()) {
      this._renderTemplate(Templates.volunteerEdit);
      container.prepend(this.el);
    } else {
      this._renderTemplate(Templates.volunteer);
      container.append(this.el);
    }
  },
  edit: function() {
    this._renderTemplate(Templates.volunteerEdit);
  },
  _delete: function() {
    var me = this;
    if (confirm("Really, you want to delete this volunteer?")) {
      me.model.destroy();
      me.el.fadeOut(400, function() { me.remove(); });
    }
  },
  _save: function() {
    var me = this;
    this.model.updateFromForm($("input", this.el), function(model) {
      this.model = model;
      me._renderTemplate(Templates.volunteer);
    });
  },
  _cancel: function() {
    if (this.model.isNew()) {
      this.model.destroy();
      this.remove();
    }
    this._renderTemplate(Templates.volunteer);
  },
  _bindModelEvents: function() {
    var me = this;
    this.model.bind("change", function() {
      if (me.model.isNew()) { return; }
      me._renderTemplate(Templates.volunteer);
    });
  },
  _renderTemplate: function(template) {
    var newEl = $(_.template(template, this.model.attributes));
    if (this.el.replaceWith) { this.el.replaceWith(newEl); }
    this.el = newEl;
    this.delegateEvents();
  }
});
