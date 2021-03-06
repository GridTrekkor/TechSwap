/**
 * Created by disco on 10/15/15.
 */
var express = require('express');
var app = express();
var router = express.Router();
var api = require('../models/apiModel');

/* receive one task from client and write to db */
router.post('/todos', function(request, response){
    console.log('POST request');
    console.log("here is the body = " + request.body);
    var toDo = new api(request.body);
    toDo.save(function(err, saveresp){
        if(err)  console.log('error on db write: ',err);
        console.log('adding api item');
        console.log(saveresp);
        console.log(saveresp._id);
    });
    response.sendStatus(200);
    //response.send('server/finished adding.');
});

/* get tasks from db */
router.get('/todos', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    console.log('hit toDo/getData endpoint');
    api.find(function(err,someTasks){
        if(err) console.log('error: ',err);
        //console.log('server/some tasks: ')
        //console.log(someTasks);
        res.send(someTasks);
    })
});

//delete a document from the db
router.post('/delete', function(request, response){
    var id=request.body.id;
    console.log('hit /toDo/remove endpoint');
    console.log('id to remove: ',request.body);
    api.findById(id, function(err, toDo) {
        if (err) throw err;
        toDo.remove(function (err) {
            if (err) throw err;
            response.sendStatus(200);
        })
    })
});

//update the task in an existing document in the db
router.post('/update', function(request, response){
    var id=request.body.id;
    var updatedTask = request.body.task;
    console.log('hit /toDo/update endpoint');
    console.log('id to update: ',id);
    console.log('updated task: ', updatedTask);
    api.findByIdAndUpdate(id, {$set:{task:updatedTask}},function(err,toDo){
        if(err) console.log(err);
        //res.send(toDo);
    })
});


module.exports = router;
