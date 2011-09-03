Views.Volunteer = Backbone.View.extend({
  events: function() {
    return {
      "click .actions a[data-action='delete']": "_delete",
      "click .actions a[data-action='save']": "_save",
      "click .actions a[data-action='cancel']": "cancel"
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
  cancel: function() {
    if (this.model.isNew()) {
      this.model.destroy();
      this.remove();
    }
    this._renderTemplate(Templates.volunteer);
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
      App.router.navigate("/", true);
    });
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
