// AngularJS 1.4.9 Application
(function() {
    'use strict';
    
    // Create the main module
    angular.module('myApp', [])
        .controller('MainController', MainController);
    
    // Main Controller
    function MainController($scope) {
        // Initialize scope variables
        $scope.title = 'Welcome to AngularJS 1.4.9!';
        $scope.message = 'This is a simple AngularJS 1.4.9 application demonstrating basic features.';
        $scope.name = '';
        $scope.newTodo = '';
        $scope.todos = [
            { text: 'Learn AngularJS', completed: false },
            { text: 'Build awesome apps', completed: false }
        ];
        $scope.receivedFromHost = 0; // Counter for todos received from host
        
        // Add todo function for Enter key press
        $scope.addTodo = function(event) {
            if (event.keyCode === 13) { // Enter key
                $scope.addTodoButton();
            }
        };
        
        // Add todo function for button click
        $scope.addTodoButton = function() {
            if ($scope.newTodo.trim()) {
                $scope.todos.push({
                    text: $scope.newTodo.trim(),
                    completed: false
                });
                $scope.newTodo = '';
            }
        };
        
        // Toggle todo completion
        $scope.toggleTodo = function(todo) {
            todo.completed = !todo.completed;
        };
        
        // Remove todo
        $scope.removeTodo = function(index) {
            $scope.todos.splice(index, 1);
        };
        
        // Listen for messages from parent window (Angular 20)
        window.addEventListener('message', function(event) {
            console.log('🔒 Received message from origin:', event.origin, 'Data:', event.data);
            
            // Security check: ensure message is from expected origin
            if (event.origin !== 'http://localhost:4200') {
                console.warn('🚫 Ignoring message from unexpected origin:', event.origin);
                return;
            }

            console.log('✅ Processing message from Angular 20:', event.data);

            if (event.data && event.data.type === 'ADD_TODO') {
                $scope.$apply(function() {
                    const newTodo = {
                        text: event.data.payload.text + ' (from Angular 20)',
                        completed: false,
                        fromHost: true
                    };
                    
                    $scope.todos.unshift(newTodo); // Add to beginning of list
                    $scope.receivedFromHost++;
                    
                    console.log('✅ Added todo from host:', newTodo);
                });

                // Send confirmation back to parent
                event.source.postMessage({
                    type: 'TODO_RECEIVED',
                    payload: {
                        success: true,
                        todoText: event.data.payload.text,
                        timestamp: new Date().toISOString()
                    }
                }, event.origin);
            }
        });

        // Notify parent that AngularJS app is ready
        if (window.parent !== window) {
            window.parent.postMessage({
                type: 'ANGULARJS_READY',
                payload: { message: 'AngularJS 1.4.9 app is ready to receive todos!' }
            }, 'http://localhost:4200');
        }

        // Log initialization
        console.log('✅ AngularJS 1.4.9 Application initialized');
        console.log('📡 Listening for messages from Angular 20 host...');
        console.log('🌐 Current page URL:', window.location.href);
        console.log('🔗 Parent window exists:', window.parent !== window);
    }
})();