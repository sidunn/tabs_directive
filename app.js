;(function(window) {

angular.module('app', [])

// Define directives here
.directive('tab', function() {
  return {
  restrict: 'E',
  transclude: true,
  template: '<div role="tabpanel" ng-show="active" ng-transclude></div>',
  require: '^tabset',
  scope: {
    heading: '@'
  },
  link: function(scope, elem, attr, tabsetCtrl) {
    scope.active = false
	scope.disabled = false
	if(attr.disable) {
	  attr.$observe('disable', function(value) {
	   scope.disabled = (value !== 'false')
	  })
	}
    tabsetCtrl.addTab(scope)
  }
 }
})

.directive('tabset', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: { },
    templateUrl: 'tabset.html',
    bindToController: true,
    controllerAs: 'tabset',
    controller: function() {
      var self = this
      self.tabs = []
	  self.select = function(selectedTab) {
	    if(selectedTab.disabled) { return }
      angular.forEach(self.tabs, function(tab) {
      if(tab.active && tab !== selectedTab) {
      tab.active = false;
  }
})
selectedTab.active = true;
}
	
	self.addTab = function addTab(tab) {
    self.tabs.push(tab)
    if(self.tabs.length === 1) {
    tab.active = true
   }
  }
 }
}
})
})(window);