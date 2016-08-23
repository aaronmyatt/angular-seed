(function() {
  'use strict';

  angular
    .module('app.auth')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['$location', 'authService'];

  function AuthController($location, authService) {
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
          console.log("AuthController::Signup Success");
          // return authService.sendWelcomeEmail(user.email);
        })
        .catch(function(error) {
          vm.error = error;
        });
    }

    function login(user) {
      return authService.login(user)
        .then(function() {
          $location.path('/');
        })
        .catch(function(error) {
          vm.error = error;
        });
    }
  }

})();