angular.module(
  'profile_controller',
  [
    'current_user_service',
    'friends_service'
  ]
)

.controller('ProfileCtrl', function(
  $scope,
  CurrentUser,
  Friends,
  $ionicLoading,
  $ionicHistory,
  $location
) {
  $scope.current_user = CurrentUser.user()
  $scope.friends = Friends.query({ user_id: CurrentUser.id() })

  $scope.logout = function() {
    $ionicLoading.show();
    window.localStorage.clear();
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    $ionicLoading.hide();
    $location.path('/entry');
  }
  $scope.initialize = function() {
    var myLatlng = new google.maps.LatLng(43.07493,-89.381388);

    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"),
        mapOptions);


    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Uluru (Ayers Rock)'
    });

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });

    $scope.map = map;
  }
})
