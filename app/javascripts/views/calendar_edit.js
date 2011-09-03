var Views = {};

Views.CalendarEditView = Backbone.View.extend({
  events: {
    "click a[data-action='save']": "save",
    "click a[data-action='cancel']": "cancel"
  },
  el: $("#event_detail"),
  show: function(model) {
    this.model = model;
    this.render();
    this.el.fadeIn(300);
  },
  hide: function() {
    this.el.fadeOut(300);
  },
  render: function() {
    var html = _.template(Templates.event, this.model.attributes);
    this.el.html(html);
  }
});
