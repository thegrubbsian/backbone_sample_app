Firestarter
===========
Firestarter is a simple set of libraries and patterns for prototyping rich web applications.  The general philosophy of this collection is to provide some basic structure, common patterns, and libraries for rapid prototyping which also supports a smooth transition to a production version.  Not all of the Firestarter components are meant to be used, but rather each project will select the necessary bits from the /lib directory and the rest can be simply left behind.  The included manifest helper makes this very easy and keeps the library code (which can change independently of Firestarter) separate from the application code.  The best way to start a new prototyping effort with Firestarter is to fork the repository on Github.  This approach has the distinct advantage that changes to the core libraries can be updated more easily since there is a hook back to the original repo.

Directory Structure
-------------------
Below is a diagram of the Firestarter directory structure:

    lib
      javascripts
        ...
      stylesheets
        ...
        themse
      widgets
        ...
      templates
        ...
      images
        ...
    app


Loader
------
