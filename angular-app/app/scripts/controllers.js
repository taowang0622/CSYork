angular.module('csyorkApp')
  .controller('HeaderController', ['$scope', 'usersFactory', function ($scope, usersFactory) {
    usersFactory.get({},
      function (response) {
        $scope.userName = response.userName;
      },
      function (response) {
        //TODO
      })
  }])
  .controller('HomeController', ['$scope', 'coursesFactory', 'ngDialog', 'threadsFactory', 'commentsFactory', 'favoritesFactory', function ($scope, coursesFactory, ngDialog, threadsFactory, commentsFactory, favoritesFactory) {
    $scope.selectedCourseId = null;
    $scope.selectedThreadId = null;
    $scope.showThreads = false;
    $scope.noThreads = false;
    $scope.showComments = false;
    $scope.noComments = false;

    //for accordion
    $scope.oneAtATime = true;
    $scope.isOpen = false;
    $scope.updateOpenStatus = function () {
      $scope.isOpen = $scope.threads.some(function (item) { //TODO get it straight
        return item.isOpen;
      });
    };

    $scope.selectedCourse = function (id) {
      //reset!!!
      $scope.showThreads = false;
      $scope.showComments = false;
      $scope.noThreads = false;
      $scope.noComments = false;
      $scope.selectedCourseId = id;
      threadsFactory.query({courseId: id},
        function (response) {
          $scope.threads = response.reverse(); //reverse the order of the array!
          (response.length === 0) ? $scope.noThreads = true : $scope.showThreads = true;
        },
        function () {
        });
    };

    $scope.selectedThread = function (id) {
      //reset!!!!
      $scope.showComments = false;
      $scope.noComments = false;
      $scope.selectedThreadId = id;
      commentsFactory.query({courseId: $scope.selectedCourseId, threadId: id},
        function (response) {
          $scope.comments = response.reverse();
          (response.length === 0) ? $scope.noComments = true : $scope.showComments = true;
        },
        function (response) {
        });
    };

    coursesFactory.query(null,
      function (response) {
        $scope.courses = response;
        //By default showing the threads of the first course
        $scope.selectedCourse($scope.courses[0]._id);
      },
      function (response) {
        //Create a pop-up!
        ngDialog.open({
          name: 'loginDialog',
          template: 'views/login.html',
          scope: $scope,
          //Above pair would pass a scope object into this controller as parent controller
          className: 'ngdialog-theme-default',
          closeByDocument: false,
          closeByEscape: false
        });
      });

    //Post a new thread
    $scope.askQuestion = function () {
      //Create a pop-up!
      ngDialog.open({
        name: 'postDialog',
        template: 'views/post.html',
        controller: 'PostController',
        scope: $scope, //in order to use $scope.selectedThreadId and $scope.selectedCourseId
        //Above pair would pass a scope object into this controller as parent controller
        className: 'ngdialog-theme-default'
      });
    };

    //Post a new comment
    $scope.postComment = function () {
      //Create a pop-up!
      ngDialog.open({
        name: 'commentDialog',
        template: 'views/comment.html',
        controller: 'CommentController',
        scope: $scope, //in order to use $scope.selectedThreadId and $scope.selectedCourseId
        //Above pair would pass a scope object into this controller as parent controller
        className: 'ngdialog-theme-default'
      });
    };

    $scope.addToFavorites = function (threadId) {
      favoritesFactory.save({}, {_id: threadId},
        function (response) {
        },
        function (response) {
        })
    }

  }])
  .controller('PostController', ['$scope', 'threadsFactory', 'ngDialog', function ($scope, threadsFactory, ngDialog) {
    $scope.post = function () {
      threadsFactory.save({courseId: $scope.selectedCourseId},
        {header: $scope.header, contents: $scope.contents},
        function (response) {
          ngDialog.close();
          $scope.selectedCourse($scope.selectedCourseId);//reload the threads
        },
        function (response) {
          console.log('fail');//TODO
        })
    }
  }])
  .controller('CommentController', ['$scope', 'commentsFactory', 'ngDialog', function ($scope, commentsFactory, ngDialog) {
    $scope.post = function () {
      commentsFactory.save({courseId: $scope.selectedCourseId, threadId: $scope.selectedThreadId},
        {comment: $scope.comment},
        function (response) {
          ngDialog.close();
          $scope.selectedThread($scope.selectedThreadId);//reload the comments
        },
        function (response) {
          console.log('fail');//TODO
        })
    }
  }])
  .controller('FavoriteController', ['$scope', 'commentsFactory', 'favoritesFactory', function ($scope, commentsFactory, favoritesFactory) {
    //for accordion
    $scope.oneAtATime = true;
    $scope.isOpen = false;
    $scope.updateOpenStatus = function () {
      $scope.isOpen = $scope.threads.some(function (item) { //TODO get it straight
        return item.isOpen;
      });
    };

    $scope.triggerComments = function (threadId) {
      //reset!!!!
      $scope.showComments = false;
      $scope.noComments = false;
      commentsFactory.query({courseId: 111, threadId: threadId},
        function (response) {
          $scope.comments = response;
          (response.length === 0) ? $scope.noComments = true : $scope.showComments = true;
        },
        function (response) {
        });
    };

    $scope.selectedThread = function (id) {
      //reset!!!!
      $scope.showComments = false;
      $scope.noComments = false;
      $scope.selectedThreadId = id;
      commentsFactory.query({courseId: 111, threadId: id},
        function (response) {
          $scope.comments = response;
          (response.length === 0) ? $scope.noComments = true : $scope.showComments = true;
        },
        function (response) {
        });
    };

    favoritesFactory.query({},
      function (response) {
        $scope.threads = response;
      },
      function (response) {
      //TODO
      });

  }]);
