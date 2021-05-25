var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET review by id */
router.get('/:id', function(req, res, next) {
    console.log('recieved id = ' + req.params.id);
    db.query('SELECT reviews.id, users.username, categories.name category_name, title, reviews.text, reviews.rating FROM reviews INNER JOIN users ON users.id = reviews.user_id INNER JOIN category_items ON category_items.id = reviews.category_item_id INNER JOIN categories ON categories.id = category_items.category_id WHERE category_item_id = ?', 
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
            res.json({message: 'no reviews found'});
        }
    })
});

/* POST review by id */
router.post('/:id', function(req, res, next) {
    console.log('recieved id = ' + req.params.id);
    console.log(req.body);
    const user = {...req.body.user};
    const {rating, text} = req.body;
    console.log(user, rating, text);
    
    db.query('INSERT INTO reviews (user_id, category_item_id, text, rating) VALUES (?,?,?,?)', 
    [user.id, req.params.id, text, rating], 
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

/* DELETE review by id */
router.delete('/delete/:id', function(req, res, next) {
    console.log('recieved id = ' + req.params.id);
    console.log(req.body);
    const review = {...req.body.review};
    console.log(review);
    
    db.query('DELETE FROM reviews WHERE id=?', 
    [review.id], 
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