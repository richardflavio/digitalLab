angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $http) {
    
    $http.get('http://192.168.1.67:3000/users/userlist').then(function(resp) {
        
        //var myTestArray= [];
        
        //myTestArray= resp;
                
        //myTestArray.map(function(arrayItem) { return arrayItem.username; });
        
        //$scope.nodeJsRestResponse= myTestArray[0];
         
         $scope.nodeJsRestResponse= JSON.stringify(resp);
         
        }, function(err) {
            // err.status will contain the status code
            console.error('ERR', err.message);
        });
        
           
   // TEST WEB SOCKET
   
    var socket = new WebSocket('ws://192.168.1.67:1337');
    socket.onopen = function () {
        socket.send('hello from the client');
    };

    socket.onmessage = function (message) {
        $scope.nodeJsWebSocketResponse= message.data;
    };

    socket.onerror = function (error) {
        console.log('WebSocket error: ' + error);
    };
  
})


.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
