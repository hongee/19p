angular
  .module('nineteen', [
    'ngRoute',
  ])
  .config(function($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push(function($q, $location) {
      return {
        response: function(response) {
          return response;
        },
        responseError: function(response) {
          if(response.status === 401)
            $location.url('/');
          return $q.reject(response);
        }
      }
    });

    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function ($rootScope, $location, Auth) {

    //watching the value of the currentUser variable.
    $rootScope.$watch('currentUser', function(currentUser) {
      // if no currentUser and on a page that requires authorization then try to update it
      // will trigger 401s if user does not have a valid session
      if (!currentUser && (['/', '/login', '/logout', '/signup'].indexOf($location.path()) == -1 )) {
        Auth.currentUser();
      }
    });

    // On catching 401 errors, redirect to the login page.
    $rootScope.$on('event:auth-loginRequired', function() {
      $location.path('/login');
      return false;
    });
  })
  .controller('MainCtrl',function($scope){

  });
