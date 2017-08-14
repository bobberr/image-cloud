const express = require('express');
const app = express();
const port = process.env.PORT;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./dbase/model');
const address = require('./dbase/connect').address;
const jwt = require('jsonwebtoken');
const secret = require('./dbase/connect').key;

app.use('/', express.static(__dirname + '/dist'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
mongoose.connect(address);



//start of registration
app.post('/registration', (req, res) => {
    const user = new User ({
        email: req.body.email,
        password: req.body.password
    });
    User.findOne({email: req.body.email}, (err, users) => {
        if(users) {
            res.json({
                success: false
            });
        } else {
            user.save((err) => {
                if (err) {
                    console.log('error while saving');
                }
            });
            res.json({
                success: true
            });
        }
    });
});
//end of registration

//start of logging in
app.post('/logging', (req, res) => {
    User.findOne({email: req.body.email}, (err, returnedUser) => {
        if (err) console.log('Error with searhing of user');
        if (!returnedUser) {
            res.json({userNotFound: true});
        } else if (returnedUser) {
            if(returnedUser.password != req.body.password) {
                res.json({wrongPassword: true});
            } else {
                var token = jwt.sign(returnedUser, secret, {
                    expiresIn: 3000
                });
                res.json({
                    success: true,
                    token,
                    returnedData: returnedUser
                });
            }
        }
    });
});
app.use((req, res, next) => {
    var token = req.body.token;
    if (token) {
        jwt.verify(token, secret, (err, decoded) => {
            if (err) {
                console.log('Error with token');
            } else {
                next();
            }
        });
    } else {
        return res.status(403).json({
            tokenNotFound: true
        });
    }
});

app.post('/postimage', (req, res) => {
    User.findOne({email: req.body.email}, (err, returnedData) => {
        let id = returnedData.images.length + 1;
        returnedData.images.push({url: req.body.imageUrl, title: req.body.title, description: req.body.description, id: id});
        returnedData.save((err) => {
            if (err) {
                console.log('error while saving');
            } else {
                res.json({
                    data: returnedData
                });
            }
        });
        console.log(returnedData);
    });
    
    
})


app.listen(port, () => {
    console.log('server is up to run');
});