Loader = (function() {

  window.Templates = {};
  var manifestLoaded = false;
  var head = document.getElementsByTagName("head")[0];

  function include(assets, manifestFile) {
    if (!manifestFile) { manifestFile = "manifest.js"; }
    if (!manifestLoaded) { loadManifest(assets, manifestFile); }
  }

  function loadManifest(assets, manifestFile) {
    writeTag("javascripts", manifestFile, function() {
      manifestLoaded = true;
      loadAssets(assets);
    });
  }

  function loadAssets(assets) {
    if (assets["javascripts"]) { loadJavascripts(assets["javascripts"].split(", ")); }
    if (assets["stylesheets"]) { loadStylesheets(assets["stylesheets"].split(", ")); }
    if (assets["templates"]) { loadTemplates(assets["templates"].split(", ")); }
  }

  function loadJavascripts(groups) {
    var paths = [];
    for (var i = 0; i < groups.length; i++) {
      var groupPaths = _manifest["javascripts"][groups[i]];
      for (var j = 0; j < groupPaths.length; j++) {
        paths.push(groupPaths[j]);
      }
    }
    var asyncLoad = function() {
      writeTag("javascripts", paths.shift(), function() {
        if (paths.length > 0) { asyncLoad(); }
      });
    };
    asyncLoad();
  }

  function loadStylesheets(groups) {
    for (var i = 0; i < groups.length; i++) {
      var paths = _manifest["stylesheets"][groups[i]];
      for (var j = 0; j < paths.length; j++) {
        writeTag("stylesheets", paths[j]);
      }
    }
  }

  function loadTemplates(groups) {
    for (var i = 0; i < groups.length; i++) {
      var items = _manifest["templates"][groups[i]];
      for (var j = 0; j < items.length; j++) {
        var item = items[j];
        var xhr = new XMLHttpRequest();
        xhr.overrideMimeType("text/json");
        xhr.onreadystatechange = function() {
          if (xhr.readyState == 4) {
            window.Templates[item.name] = xhr.responseText;
          }
        }
        xhr.open("GET", item.path, true);
        xhr.send(null);
      }
    }
  }

  function writeTag(type, src, callback) {
    var tag = document.createElement(type == "javascripts" ? "script" : "link");
    switch (type) {
      case "javascripts": {
        tag.setAttribute("type", "text/javascript");
        tag.setAttribute("src", "/" + src);
        break;
      }
      case "stylesheets": {
        tag.setAttribute("type", "text/css");
        tag.setAttribute("rel", "stylesheet");
        tag.setAttribute("href", "/" + src);
        break;
      }
    }
    if (callback) { tag.onload = function() { callback(tag); }; }
    head.appendChild(tag);
  }

  return {
    include: include
  };

}());
