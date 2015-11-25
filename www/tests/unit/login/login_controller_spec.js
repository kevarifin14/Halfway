describe('Login Controller', function() {
  var entry_controller,
      $controller,
      $scope,
      $location,
      user_session,
      $ionicLoading;

  beforeEach(module('login_controller'));
  beforeEach(module('login_service'));

  beforeEach(inject(function(_$controller_, _$location_, _$ionicLoading_) {
    $controller = _$controller_;
    // $scope = { 'user', 'password' };
    $location = _$location_;
    $ionicLoading = _$ionicLoading_;

    $controller(
      'LoginCtrl',
      {
        $scope: $scope,
        $location: $location,
      }
    );

    spyOn($location, 'path');
    spyOn($ionicLoading, 'show');
    spyOn(user_session, '$save').and.returnValue('works');
  }));

  describe('LoginCtrl.login', function() {
    it('displays loading button', function() {
      expect($ionicLoading).toHaveBeenCalled();
    });
    it('works', function() {
      $scope.login();
      expect($location.path).toHaveBeenCalledWith('/tab/halfway');
    });
  });
});
