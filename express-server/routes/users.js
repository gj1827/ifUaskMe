var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET all users. */
router.get('/', function (req, res, next) {
  db.query("SELECT id, first_name, last_name, username, email, role FROM users",
    (error, result) => {
      if (error) {
        res.json({ message: 'A MySql error occurred.' });
      }
      else {
        res.json(result);
      }
    }
  )
});

/* POST login. */
router.post('/login', function (req, res, next) {
  console.log(req.body);
  const { username, password } = req.body;
  db.query("SELECT * FROM users WHERE LOWER(username) = LOWER(?) AND password = ? LIMIT 1",
    [username, password],
    (error, result) => {
      if (error) {
        res.json({ message: 'A MySql error occurred.' });
      }
      else {
        if(result.length > 0) delete result[0].password;
        res.json(result);
      }
    }
  );
});

/* POST check username. */
router.post('/check', function (req, res, next) {
  console.log(req.body);
  const { username } = req.body;
  db.query("SELECT * FROM users WHERE LOWER(username) = LOWER(?) LIMIT 1",
    [username],
    (error, result) => {
      if (error) {
        res.json({ message: 'A MySql error occurred.' });
      }
      else if (result.length > 0) {
        res.json({ username: result[0].username });
      }
      else {
        res.json({ username: '' });
      }
    }
  );
});

/* POST register. */
router.post('/register', function (req, res, next) {
  console.log(req.body);
  const user = { ...req.body };

  db.query("INSERT INTO users (first_name, last_name, username, email, password) VALUES (?,?,?,?,?)",
    [user.firstName, user.lastName, user.username, user.email, user.password],
    (error, result) => {
      if (error) {
        console.log(error);
        res.json({ message: 'A MySql error occurred.' });
      }
      else {
        res.json({ message: 'User registered', user });
      }
    });
});

/* UPDATE user to admin by id */
router.put('/admin/:id', function(req, res, next) {
  console.log('recieved id = ' + req.params.id);
  console.log(req.body);
  const user = {...req.body.user};
  console.log(user);
  
  db.query("UPDATE users SET role = 'admin' WHERE id=?", 
  [user.id], 
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

/* DELETE user by id */
router.delete('/delete/:id', function(req, res, next) {
  console.log('recieved id = ' + req.params.id);
  console.log(req.body);
  const user = {...req.body.user};
  console.log(user);
  
  db.query('DELETE FROM users WHERE id=?', 
  [user.id], 
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
