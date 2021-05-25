var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET all categories */
router.get('/all', function(req, res, next) {
    db.query('SELECT * FROM categories', 
    (error, result)=>{
        if(error){
            console.log(error);
            res.json({message: 'MySQL error'});
        }
        else{
            console.log(result[0]);
            res.json(result);
        }
    })
});

/* GET category by id */
router.get('/single/:id', function(req, res, next) {
    console.log('recieved id = ' + req.params.id);
    db.query('SELECT * FROM categories WHERE id = ?', 
    [req.params.id], 
    (error, result)=>{
        if(error){
            console.log(error);
            res.json({message: 'MySQL error'});
        }
        else if(result.length > 0){
            console.log(result[0]);
            res.json(result);
        }
        else{
            res.json({message: 'category not found'});
        }
    })
});

/* GET all category items by category id */
router.get('/items/id/:id', function(req, res, next) {
    db.query('SELECT ci.id, ci.category_id, ci.author, ci.title, ci.genre, ci.year, ci.description, ci.length, ci.image_path, c.name category_name FROM category_items ci INNER JOIN categories c ON c.id = ci.category_id WHERE category_id = ?', 
    [req.params.id],
    (error, result)=>{
        if(error){
            console.log(error);
            res.json({message: 'MySQL error'});
        }
        else{
            console.log(result[0]);
            res.json(result);
        }
    })
});

/* GET all category items by category name */
router.get('/items/name/:name', function(req, res, next) {
    db.query('SELECT ci.id, ci.category_id, ci.author, ci.title, ci.genre, ci.year, ci.description, ci.length, ci.image_path, c.name category_name FROM category_items ci INNER JOIN categories c ON c.id = ci.category_id WHERE LOWER(c.name) = LOWER(?)', 
    [req.params.name],
    (error, result)=>{
        if(error){
            console.log(error);
            res.json({message: 'MySQL error'});
        }
        else{
            console.log(result[0]);
            res.json(result);
        }
    })
});

/* GET category item by id */
router.get('/items/single/:id', function(req, res, next) {
    console.log('recieved id = ' + req.params.id);
    db.query('SELECT ci.id, ci.category_id, ci.author, ci.title, ci.genre, ci.year, ci.description, ci.length, ci.image_path, c.name category_name FROM category_items ci INNER JOIN categories c ON c.id = ci.category_id WHERE ci.id = ?', 
    [req.params.id], 
    (error, result)=>{
        if(error){
            console.log(error);
            res.json({message: 'MySQL error'});
        }
        else if(result.length > 0){
            console.log(result[0]);
            res.json(result);
        }
        else{
            res.json({message: 'item not found'});
        }
    })
});

module.exports = router;