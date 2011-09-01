var _manifest = {
  javascripts: {
    common: [
      "lib/javascripts/jquery-1.6.2.js",
      "lib/javascripts/jquery-ui-1.8.16.js",
      "lib/javascripts/underscore-1.1.7.js",
      "lib/javascripts/backbone-0.5.3.js"
    ],
    scheduler: [
      "javascripts/fullcalendar.js",
      "javascripts/models.js",
      "javascripts/collections.js",
      "javascripts/views.js",
      "javascripts/router.js",
      "javascripts/app.js"
    ]
  },
  stylesheets: {
    common: [
      "lib/stylesheets/reset.css",
      "lib/stylesheets/grid-960-12.css",
      "lib/stylesheets/typeography.css",
      "lib/stylesheets/forms.css",
      "lib/stylesheets/jquery-ui-1.8.16.css"
    ],
    scheduler: [
      "stylesheets/fullcalendar.css",
      "stylesheets/app.css"
    ]
  },
  templates: {
    scheduler: [
      { name: "volunteer", path: "/templates/volunteer.jst" },
      { name: "volunteerEdit", path: "/templates/volunteer_edit.jst" }
    ]
  }
};
