var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET issue by id */
router.get('/', function(req, res, next) {
    console.log('recieved id = ' + req.params.id);
    db.query('SELECT issues.id, users.username, issues.text FROM issues INNER JOIN users ON users.id = issues.user_id', 
    [req.params.id], 
    (error, result)=>{
        if(error){
            console.log(error);
            res.json({message: 'MySQL error'});
        }
        else if(result.length > 0){
            console.log(result);
            res.json(result);
        }
        else{
            res.json({message: 'no issues found'});
        }
    })
});

/* POST issue */
router.post('/', function(req, res, next) {
    console.log(req.body);
    const user = {...req.body.user};
    const {text} = req.body;
    console.log(user, text);
    
    db.query('INSERT INTO issues (user_id, text) VALUES (?,?)', 
    [user.id, text], 
    (error, result)=>{
        if(error){
            console.log(error);
            res.json({message: 'MySQL error'});
        }
        else{
            res.json({message: 'success'});
        }
    })
});

/* DELETE issue by id */
router.delete('/delete/:id', function(req, res, next) {
    console.log('recieved id = ' + req.params.id);
    console.log(req.body);
    const issue = {...req.body.issue};
    console.log(issue);
    
    db.query('DELETE FROM issues WHERE id=?', 
    [issue.id], 
    (error, result)=>{
        if(error){
            console.log(error);
            res.json({message: 'MySQL error'});
        }
        else{
            res.json({message: 'success'});
        }
    })
});

module.exports = router;