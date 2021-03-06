var Views = {};

Views.CalendarEditView = Backbone.View.extend({
  events: {
    "click a[data-action='save']": "_save",
    "click a[data-action='cancel']": "_cancel",
    "click a[data-action='delete']": "_delete"
  },
  el: $("#event_detail"),
  show: function(id) {
    this.model = this.collection.get(id);
    this._render();
    this.el.fadeIn(300);
  },
  hide: function() {
    this.el.fadeOut(300);
  },
  _render: function() {
    var html = _.template(Templates.event, {
      event: this.model.attributes,
      volunteers: App.volunteersCollection
    });
    this.el.html(html);
  },
  _save: function() {
    var me = this;
    this.model.updateFromForm($("input", this.el), function(model) {
      model.updateVolunteerCount();
      me.hide();
    });
  },
  _cancel: function() {
    this.hide();
  },
  _delete: function() {
    if (confirm("Really, you want to delete this event?")) {
      me.hide();
      me.model.destroy();
    }
  }
});
