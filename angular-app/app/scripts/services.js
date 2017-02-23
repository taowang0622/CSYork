angular.module('csyorkApp')
  .constant('baseUrl', 'http://localhost:3000/')
  .factory('coursesFactory', ['$resource', 'baseUrl', function ($resource, baseUrl) {
    return $resource(baseUrl + 'courses', null);
  }])
  .factory('usersFactory', ['$resource', 'baseUrl', function ($resource, baseUrl) {
    return $resource(baseUrl + 'users/facebook', null);
  }])
  .factory('threadsFactory', ['$resource', 'baseUrl', function ($resource, baseUrl) {
    return $resource(baseUrl + 'courses/:courseId/threads', null);
  }])
  .factory('commentsFactory', ['$resource', 'baseUrl', function ($resource, baseUrl) {
    return $resource(baseUrl + 'courses/:courseId/threads/:threadId/comments', null);
  }])
  .factory('usersFactory', ['$resource', 'baseUrl', function ($resource, baseUrl) {
    return $resource(baseUrl + 'users/info', null);
  }])
  .factory('favoritesFactory', ['$resource', 'baseUrl', function ($resource, baseUrl) {
    return $resource(baseUrl + 'favorites', null);
  }]);

