define(['jquery', 'knockout', '../bindings/prop.js', 'text!./scroll-list.html', 'dragscroll'], function($, ko, prop, htmlString) {

  function SlideListFactory(params, componentInfo)
  {
    var list = $('.dragscroll', componentInfo.element);

    var model =  new (function(p) {
      this.scrollPosition = ko.observable(0),

      this.visibleWidth = ko.observable(0),

      this.fullWidth = ko.observable(0),

      this.showScrollControls = ko.computed(function(){
        return this.visibleWidth() < this.fullWidth();
      }, this),

      this.scrollBarInnerWidth = ko.computed(function() {
        return ((this.visibleWidth() / this.fullWidth()) * this.visibleWidth()) + 'px';
      }, this),

      this.scrollBarInnerLeft = ko.computed(function() {
        return ((this.scrollPosition() /  this.fullWidth())*100) + "%";
      }, this),

      this.scrollButtonContainerTop = ko.observable(0);

      this.scrollTimeout = null;

      this.startScrolling = function(c) {
        if(this.scrollTimeout === null)
        {
          var that = this;
          this.scrollTimeout = setInterval(function() { that.scroll(c);}, 10);
        }
      }.bind(this),

      this.stopScrolling = function() {
        clearTimeout(this.scrollTimeout);
        this.scrollTimeout = null;
      }.bind(this),

      this.dragScroll = function(model, e)
      {
        this.scroll(e.originalEvent.detail.leftDelta);
      },
      this.scroll = function(c)
      {
        var pos = this.scrollPosition() + c;

        if(pos< 0)
        {
          pos = 0;
        }
        else if(pos > (this.fullWidth() - this.visibleWidth()))
        {
          pos = this.fullWidth()- this.visibleWidth();
        }

        this.scrollPosition(pos);
      }.bind(this)
    })(params);

    function resizeScrollList()
    {
      console.log('resizinglist');
      model.visibleWidth(list.prop("clientWidth"));
      model.fullWidth(list.prop("scrollWidth"));
      model.scrollButtonContainerTop(list.height());
      model.scroll(0);
    }

    $(window).on("resize", function() {
        resizeScrollList();
    });

    $(window).on("load", function() {
        resizeScrollList();
    });

    return model;
  }

  return {viewModel: {createViewModel: SlideListFactory}, template: htmlString};
});
