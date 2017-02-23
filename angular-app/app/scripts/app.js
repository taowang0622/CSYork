'use strict';

/**
 * @ngdoc overview
 * @name angularAppApp
 * @description
 * # angularAppApp
 *
 * Main module of the application.
 */
angular.module('csyorkApp', ['ui.router', 'ngDialog', 'ngResource', 'ui.bootstrap', 'infinite-scroll'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
    // route for the home page
      .state('app', {
        url: '/',
        views: {
          'header': {
            templateUrl: 'views/header.html',
            controller: 'HeaderController'
          },
          'content': {
            templateUrl: 'views/home.html',
            controller: 'HomeController'
          }
        }
      })
      .state('app.favorites', {
        url: 'favorites',
        views: {
          'content@': {
            templateUrl : 'views/favorites.html',
            controller  : 'FavoriteController'
          }
        }
      });

    $urlRouterProvider.otherwise('/')
  });
