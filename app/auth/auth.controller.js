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
    vm.createProfile = createProfile;

    function createProfile(displayname){
      var obj = profileService.obj;
      obj.display_name = displayname;
      obj.$save();
    }

    function register(user) {
      return authService.register(user)
        .then(function() {
          return vm.login(user);
        })
        .then(function() {
          console.log("Signup Success::", auth.currentUser);
          // TODO: save display name to users profile.
          var emailBeforeAtSign = user.email.slice(0, user.email.lastIndexOf('@'));
          vm.createProfile(emailBeforeAtSign);
          // return authService.sendWelcomeEmail(user.email);
        })
        .catch(function(error) {
          vm.error = error;
        });
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