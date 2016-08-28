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

    function register(user) {
      return authService.register(user)
        .then(function() {
          return vm.login(user);
        })
        .then(function() {
          console.log("Signup Success::", user);
          // TODO: save display name to users profile.
          var emailBeforeAtSign = user.email.slice(0, user.email.lastIndexOf('@'));
          vm.createProfile(emailBeforeAtSign);
        })
        .catch(function(error) {
          vm.error = error;
        });

      function createProfile(display_name){
        var obj = profileService.obj;
        obj.display_name = display_name;
        obj.$save();
      }
    }

    function login(user) {
      return authService.login(user)
        .then(function(s) {
          $location.path('/');
        })
        .catch(function(error) {
          vm.error = error;
        });
    }
  }

})();