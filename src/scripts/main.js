(function() {
  "use strict";

  requirejs.config({
      baseUrl: 'src/',
      paths: {
          jquery: '../../bower_components/jquery/dist/jquery.min',
          knockout: '../../bower_components/knockout/dist/knockout',
          dragscroll: '../scripts/dragscroll-custom',
          propBinding: '../scripts/bindings/prop',
          scrollList: '../scripts/components/scroll-list',
          scrollListTemplate: '../scripts/components/scroll-list.html',
          text: '../scripts/text'
      }
  });

  require(['knockout', 'scrollList', 'jquery'], function(ko, list, $) {
    $(document).ready(function() {
      ko.components.register('scroll-list', list);

      ko.applyBindings();

      $(window).on('load', function() {
        document.body.className = document.body.className.replace("no-js", "");
      });

      window.onunload = function(){};

      setTimeout(function() { $(window).trigger("resize");}, 1000);

      /* for back button on chrome */
      if(document.readyState === 'complete')
      {
        document.body.className = document.body.className.replace("no-js", "");
      }
    });
  });
})();
