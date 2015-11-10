$(document).ready(function() {
  $('.overlay').hide();
  $('.window').hide();

  $('.overlay').click(function() {
    $('.overlay').hide();
    $('.window').hide();
  });
});

var data;
var data2;
var baseUrl = 'https://api.spotify.com/v1/search?type=track&query=';
var baseUrl2 = 'https://api.spotify.com/v1/artists/';
var myApp = angular.module('myApp', []);

var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {}
  $scope.getSongs = function() {
    $http.get(baseUrl + $scope.track).success(function(response){
      data = $scope.tracks = response.tracks.items
      
    })
  }
  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause()
      $scope.currentSong = false
      return
    }
    else {
      if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play()  
      $scope.currentSong = song
    }
  }

  $scope.windowOn = function(track) {
    getArtist(track.artists[0].id);
    $('.overlay, .window').show();
  }

  var getArtist = function(artistId) {
    $http.get(baseUrl2 + artistId).success(function(response){
      $scope.artist = response;
      var imageURL = response.images[2].url;
      $('#img').html('');
      $('#img').append("<img src='" + imageURL + "'>");
    });
    $http.get(baseUrl2 + artistId + '/top-tracks?country=SE').success(function(response){
       $scope.topTrack = response.tracks[0];
     });
  };

});

// Add tool tips to anything with a title property
$('body').tooltip({
    selector: '[title]'
});
