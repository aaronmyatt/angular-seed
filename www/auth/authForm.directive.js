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
        submitAction: '&',
        oauthAction: '&'
      }
    };
  }

  function AuthFormController() {
    var vm = this;
    vm.ctrl = "AuthFormDirectiveController";
    vm.user = {
      email: '',
      password: ''
    };
  }

})();