app.controller('TasksCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.tasks = [];
  $scope.value = 0;
  $scope.percentageStyle = {};

  function updateProgressBar(tasks) {
    var tasksLength = tasks.length;
    var completedTaskCount = 0;
    tasks.forEach(function(task) {
      if (task.completed) {
        completedTaskCount++;
      }
    });

    $scope.value = Math.ceil((completedTaskCount / tasksLength) * 100);
    $scope.percentageStyle = {
      width : ((completedTaskCount / tasksLength) * 100) + '%'
    };
  };

  $http.get('/api/tasks.json').success(function(data) {
    $scope.tasks = data;
    updateProgressBar(data);
  });

  $scope.addTodo = function() {
    var task = {
      text: $scope.newTodo.text
    };
    $http.post('/api/tasks.json', task).success(function(data) {
      $scope.tasks.push(data);
      updateProgressBar($scope.tasks);
      $scope.newTodo = {};
    });
  };

  $scope.editTodo = function(task) {
    var updatedTask = {
      text: task.text,
      completed: task.completed
    };

    $http.put('/api/tasks/' + task.id + '.json', updatedTask).success(function(data) {
      updateProgressBar($scope.tasks);
    });
  };

  $scope.updateTodo = function(task, completed) {
    $http.put('/api/tasks/' + task.id + '.json', {
      completed: completed
    }).success(function(data) {
      $scope.tasks[data.id - 1].completed = data.completed;
      updateProgressBar($scope.tasks);
    });
  };

  $scope.deleteTodo = function(id) {
    $http.delete('/api/tasks/' + id + '.json').success(function(data) {
      $scope.tasks = data;
      updateProgressBar(data);
    });
  };
}]);
