(function() {
  'use strict';

  angular
    .module('app.auth')
    .directive('gzAuthForm', gzAuthForm);

  function gzAuthForm() {
    return {
      templateUrl: 'auth/authForm.html',
      restrict: 'E',
      controller: AuthFormController,
      controllerAs: 'vm',
      bindToController: true,
      scope: {
        error: '=',
        formTitle: '@',
        submitAction: '&'
      }
    };
  }

  function AuthFormController() {
    var vm = this;

    vm.googleLogin = googleLogin;

    vm.user = {
      email: '',
      password: ''
    };

    function googleLogin(){
      firebase.auth().signInWithPopup(googleProvider).then(function(result) {
        console.log("Google Login Success");
        var token = result.credential.accessToken;
        var user = result.user;
        console.log("Google Login Success", user);
      }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log("Google Login Error", error);
      });

    }
  }

})();