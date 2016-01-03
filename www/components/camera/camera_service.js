angular.module('camera_service', [])

.factory('Camera', ['$q', function($q) {
  return {
    getPicture: function() {
      options = {
        quality: 80,
        allowEdit: true,
        targetWidth: 250,
        targetHeight: 250,
        saveToPhotoAlbum: false,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY
      }
      var q = $q.defer();
      navigator.camera.getPicture(function(result) {
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);
      return q.promise;
    }
  }
}])
