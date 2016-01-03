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

  $scope.initialize = function() {
    var latitude = localStorage['latitude'];
    var longitude = localStorage['longitude'];
    var myLatlng = new google.maps.LatLng(latitude, longitude);

    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("map"),mapOptions);

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
    });

    $scope.map = map;
  }
})
