(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['$location', 'authService', 'profileService'];

  function AuthController($location, authService, profileService) {
    var vm = this;
    vm.ctrl = 'AuthController';
    vm.error = null;

    vm.register = register;
    vm.login = login;
    vm.submitOAuth = submitOAuth;
    vm.createProfile = createProfile;

    function register(user) {
      return authService.register(user)
        .then(function() {
          return vm.login(user);
        })
        .then(function(success) {
          console.log("Signup Success::", user);
          vm.createProfile(user);
          $location.path('/');
        })
        .catch(function(error) {
          vm.error = error;
        });
    }

    function login(user) {
      return authService.login(user)
        .then(function(success) {
          $location.path('/');
        })
        .catch(function(error) {
          vm.error = error;
        });
    }

    function submitOAuth(provider) {
      console.log("submitOAuth w/ provider:", provider);
      if(provider == 'google'){
        return googleLogin();
      }else{
        return facebookLogin();
      }

      function googleLogin(){
        firebase.auth().signInWithRedirect(googleProvider).then(function(result) {
          var user = result.user;
          vm.createProfile(user);
          $location.path('/');
          console.log("Google Login Success", user);
        }).catch(function(error) {
          console.log("Google Login Error", error);
          vm.error = error;
        });
      }

      function facebookLogin(){
        firebase.auth().signInWithPopup(facebookProvider).then(function(result) {
          var user = result.user;
          vm.createProfile(user);
          $location.path('/');
          console.log("Facebook Login Success", user);
        }).catch(function(error) {
          console.log("Facebook Login Error", error);
          vm.error = error;
        });
      }
    }

    function createProfile(user){
      var emailBeforeAtSign = user.email.slice(0, user.email.lastIndexOf('@'));
      var obj = profileService.updateDisplayName(emailBeforeAtSign);
    }

  }

})();