angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicPopup, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    
      firebase.auth().signInWithEmailAndPassword($scope.loginData.username, $scope.loginData.password).catch(function (error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;

          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
              errorMessage  = 'Senha Incorreta.';
          } 

          
          $ionicPopup.alert({
              title: 'Falha no Login',
              template: errorMessage
          });


      });

      firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
             $scope.closeLogin();
          }
      });

  };

  $scope.$on('$destroy', function () {
      $scope.modal.remove();
  });
    
  

  if (!localStorage.getItem("popupWasShown")) {

      $timeout(function () {
          $scope.login();
      });

      //$scope.login();
      localStorage.setItem("popupWasShown", true);
  }



})

.controller('MsgCtrl', function ($scope, $stateParams, Chats) {

    Chats.get($stateParams.chatId, function (ret_chat) { $scope.chat = ret_chat });

    $scope.sendMessage = function () {
        Chats.sendMessage($stateParams.chatId, firebase.auth().currentUser.uid, firebase.auth().currentUser.email, $scope.data.message);
        $scope.data.message = '';
    };

    var commentsRef = firebase.database().ref('chats/' + $stateParams.chatId);
    commentsRef.on('child_changed', function (data) {
        var result = data.val();


        result.forEach(function (e) {
            var exist = false;
            $scope.chat.messages.forEach(function (valor) {
                if (valor.itemid == e.itemid)
                    exist = true;

            });
            if (!exist) {
                $scope.chat.messages.push(e);
            }
        });

        //$scope.chat.messages = result;
        $scope.$apply();

    });



    

})


.controller('ChatsCtrl', function ($scope, Chats) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});
    
    firebase.auth().onAuthStateChanged(function (user) {
        if (user){
            Chats.all(function (ret) {
                $scope.chats = ret;
            });

            

        }



    });


    
    })


    


.controller('ChatDetailCtrl', function ($scope, $stateParams,Chats) {
    
    firebase.auth().onAuthStateChanged(function (user) {

        if (user) {
            Chats.get($stateParams.chatId, function (ret_chat) { $scope.chat = ret_chat;  });
        }

        var commentsRef = firebase.database().ref('chats/' + $stateParams.chatId);
      
        commentsRef.on('child_changed', function (data) {
            var result = data.val();
            

            result.forEach(function (e) {
                var exist = false;
                $scope.chat.messages.forEach(function (valor) {
                    if (valor.itemid == e.itemid)
                        exist = true;

                });
                if (!exist) {
                    $scope.chat.messages.push(e);
                }
            });

            //$scope.chat.messages = result;
            $scope.$apply();
            
        });

        commentsRef.on('child_removed', function (data) {
            var result = data.val();
            $scope.chat.messages = result;
            $scope.$apply();

        });


    });
        
    
})

