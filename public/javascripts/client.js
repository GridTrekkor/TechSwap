var taskData;

// function makeAjaxCall()
// take in data, url
// make call

var app=angular.module('toDoApp',[]);

app.controller("MainController", ['$scope','$http', function($scope, $http){
    $scope.blah = [];
    $scope.listArray = [];
    var arrayItem = [];


    function makeHttpCall (method, url, data, id) {
        if (!id) id = "";
        console.log("data = " + data);

        var submitData = {};
        submitData.text = data;
        submitData.completed = false;
        console.log(submitData);
        $http({
            method : method,
            url : url + id,
            data : submitData
        }).then($scope.getData());
    }

    $scope.getData = function(){
        $scope.listArray = [];
        $http({method: "GET", url: "/api/todos"}).then(function(response) {

            console.log(response);
            for (var i = 0; i < response.data.length; i++) {
                arrayItem = [response.data[i].text, response.data[i].completed, response.data[i]._id];
                $scope.listArray.push(arrayItem);
            }
            $scope.$apply();
        });
    };


    $scope.getData();   //display stuff right away

    $scope.submit = function(){
        //event.preventDefault();
        var Whatever = $scope.text;
        console.log($scope.text, "     test 123");
        makeHttpCall("POST", "/api/todos", Whatever);
    };

    $("#someContainer").on('click', '.task p', function(){
        var complete;
        complete = !$(this).parent().data("complete");
        var text = $(this).text().replace(" ", "+");
        var putData = "text=" + text + "&complete=" + complete;

        $.ajax({
            type: "PUT",
            data: putData,
            url: "/api/todos/" + $(this).parent().data("id"),
            success: function(data){
                taskData = data;
                appendTasks();
            }
        });
    });

    //set the task to done
    $scope.toggleDone=function(){
        console.log('saw toggleDone click');
        console.log (this);
        this.item[1]=!this.item[1];
        console.log('done: ', this.item[1]);
    };



    $scope.delete = function() {
        console.log('saw delete click');
        id = this.item[2];
        console.log('deleting: ',id);
        //makeHttpCall("DELETE", "/api/delete", id, "");

        var deleteData = {};
        deleteData.id = id;
        console.log("deleteData = " + deleteData.id);
        $http({
            method : "POST",
            url : "/api/delete",
            data : deleteData
        }).then($scope.getData());

    };



    //$scope.delete = function(){
    //    /**********/
    //    $http({method:"DELETE", url: "/api/delete" +"/" + id, })
    //}
    //
    //

}]);

    /*****************************************************************/
////$(document).ready(function(){
//    $("#taskForm").submit(function(event){
//        event.preventDefault();
//        var formData = $("#taskForm").serialize();
//        formData += "&complete=false";
//        $.ajax({
//            type: "POST",
//            data: formData,
//            url: "/api/todos",
//            success: function(data){
//                taskData = data;
//                appendTasks();
//            }
//        });
//    });
//
//    $("#someContainer").on('click', '.task p', function(){
//        var complete;
//        complete = !$(this).parent().data("complete");
//        var text = $(this).text().replace(" ", "+");
//        var putData = "text=" + text + "&complete=" + complete;
//
//        $.ajax({
//            type: "PUT",
//            data: putData,
//            url: "/api/todos/" + $(this).parent().data("id"),
//            success: function(data){
//                taskData = data;
//                appendTasks();
//            }
//        });
//    });
//
//    $("#someContainer").on('click', '.delete', function(){
//        var id = $(this).parent().data("id");
//        $.ajax({
//            type: "DELETE",
//            url: "/api/todos/" + id,
//            success: function(data){
//                taskData = data;
//                appendTasks();
//            }
//        });
//    });
//

//function getData(){
//    $.ajax({
//        type: "GET",
//        url: "/api/todos",
//        success: function(data){
//            taskData = data;
//            appendTasks();
//        }
//    });
//}
//
//function appendTasks(){
//    $("#someContainer").empty();
//
//
//
//
//
//    for(var i = 0 ; i < taskData.length ; i ++){
//        $("#someContainer").append("<div class='task well col-md-3'></div>");
//        var $el = $("#someContainer").children().last();
//        $el.data("id", taskData[i].id);
//        $el.data("complete", taskData[i].complete);
//        if(taskData[i].complete){
//            $el.css("text-decoration", "line-through");
//        }
//
//        $el.append("<p class='lead'>" + taskData[i].text + "</p>");
//        $el.append("<button class='btn btn-danger delete'>X</button>");
//        $el.append("<button class='btn btn-danger delete'>X</button>");
//    }
//}
