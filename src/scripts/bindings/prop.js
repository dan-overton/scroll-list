define(['knockout'], function(ko) {
  ko.bindingHandlers.prop = {
    init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {

    },
    update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
      var value = ko.unwrap(valueAccessor());

      for(var key in value)
      {
        if(value.hasOwnProperty(key))
        {
          element[key] = ko.unwrap(value[key]);
        }
      }
    }
  }
});
