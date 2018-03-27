var express = require("express");
var path = require("path");
var app = express();

var bodyParser=require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restaurantsDB');

let RestaurantSchema = new mongoose.Schema({
    restaurant: {type: String, required: true, minlength: [3, "Restaurant should be at least 3 characters."]},
    cuisine: {type: String, required: true, minlength: [3, "Cuisine should be at least 3 characters."]},
    reviews: [{
        customer: {type: String, required: true, minlength: [3, "Customer should be at least 3 characters."]},
        stars: {type: Number, required: true, default: 0},
        description: {type: String, required: true, minlength: [3, "Description should be at least 3 characters."]}
    }],
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now}
   })
mongoose.model('Restaurant', RestaurantSchema); 
var Restaurant = mongoose.model('Restaurant') 



app.use(express.static( __dirname + '/beltproject/dist' ));

app.use(express.static(__dirname + "/static"));

app.set('views', __dirname + "/views");

app.set("view engine", "ejs");

app.set('views', path.join(__dirname, './beltproject/views'));

var session = require("express-session");

//get all restaurants
app.get("/restaurants", (req,res) => {
    Restaurant.find({}, (err, restaurants_db) => {
        if(err){
            console.log(err.message);
            res.json({error: err});
        } else {
            console.log('result fetch successful');
            res.json({restaurants: restaurants_db});
        }
    })
})

//add new restaurant
app.post("/newRestaurant", (req,res) => {
    var restaurant = new Restaurant({restaurant: req.body.restaurant, cuisine: req.body.cuisine});
    restaurant.save(function(err, data){
        if(err){
            console.log('error: unable to add new restaurant');
            res.json({error: err});
        } else {
            console.log('successfully added new restaurant');
            res.json(data);
        }
    })
});

//grab one restaurant by id
app.get("/restaurants/:id", function(req, res){
    Restaurant.findOne({_id: req.params.id}, function(err, results){
        if(err){
            res.json({error: err});
        } else {
            console.log(results)
            res.json(results);
        };
    });
});

//add a new review to existing restaurant
app.put("/newReview/:_id", (req,res) => {
    console.log(req.body);
    var newReview = {customer: req.body.customer, stars: req.body.stars, description: req.body.description}
    Restaurant.findOneAndUpdate({_id: req.params._id}, {$push: {reviews: newReview}}, (err, review) => {
        if(err){
            console.log(err);
        } else {
            console.log('successfully added new restaurant');
            res.json(review);
        }
    })
})


//update restaurant
app.put("/restaurants/:_id", (req,res) => {
    console.log(req.body);
    Restaurant.update({_id: req.params._id}, {restaurant: req.body.restaurant, cuisine: req.body.cuisine}, {runValidators: true }, (err, restaurant) => {
        console.log("hello")
        if(err){
            console.log(err);
            res.json({error: err});
        } else {
            res.json({success: restaurant});
        }
    })
})

//delete restaurant
app.delete('/restaurants/delete/:_id',(req,res)=>{
    Restaurant.remove({_id: req.params._id}, function(err, restaurant) {
        if(err){
            res.json({error: err});
        }     
        else{
            res.json({message: restaurant});
        }        
    })
})

app.all("*", (req,res,next) => {
    res.sendFile(path.resolve("./beltproject/dist/index.html"))
});

var server = app.listen(8000, function() {
    console.log("listening on port 8000");
   });
var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);
})
