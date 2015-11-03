describe('Entry Controller', function() {
  var entry_controller, $controller, $scope, $location;

  beforeEach(module('entry_controller'));

  beforeEach(inject(function(_$controller_, _$location_) {
    $controller = _$controller_;
    $scope = {};
    $location = _$location_;

    $controller(
      'EntryCtrl',
      { $scope: $scope, $location: $location }
    );

    spyOn($location, 'path');
  }));

  describe('EntryCtrl.showLogin', function() {
    it('works', function() {
      $scope.showLogin();
      expect($location.path).toHaveBeenCalledWith('/login');
    });
  });

  describe('EntryCtrl.showLogin', function() {
    it('works', function() {
      $scope.showSignup();
      expect($location.path).toHaveBeenCalledWith('/signup');
    });
  });
});
