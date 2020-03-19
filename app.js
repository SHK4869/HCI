const express=require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

// const isAuth = require('./middleware/is-auth');

const userRoutes=require('./routes/userRoutes');
const licenseRatingRoutes=require('./routes/licenseRatingRoutes');
const curPositionRoutes=require('./routes/curPositionRoutes');
const contactRoutes=require('./routes/contactRoutes');
const reportRoutes=require('./routes/reportRoutes');
const unsafeRoutes=require('./routes/unsafeRoutes');
const markRoutes=require('./routes/markRoutes');
const policeRoutes=require('./routes/policeRoutes');
const hospitalRoutes=require('./routes/hospitalRoutes');
const liveTrackingRoutes=require('./routes/liveTrackingRoutes');

const app=express();
const port = process.env.PORT || 8000;
app.use(bodyParser.json());

app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if(req.method === 'OPTIONS'){
        return res.sendStatus(200);
    }
    next();
});

app.use(morgan('dev'));
// app.use(isAuth);

mongoose.connect(
    `mongodb+srv://Admin:${password}@sih2020-nqtm6.mongodb.net/test?retryWrites=true&w=majority`
    

   , { 
    useNewUrlParser: true
}, function(err, db) {

}
    )
.then(function(){
    app.listen(port);
    console.log('backend-server started on port ', port);
}).catch(function(err){
    console.log("error :" + err);
    throw err;
});

// app.use('/products', productRoutes);
// app.use('/orders', orderRoutes);
// app.use('/user', userRoutes);

// app.use('/', function(req, res, next){
//     return res.status(200).json({
//         "message": "working"
//     });
// });

// app.use('/curPosition', function(req, res, next){
//     return res.status(200).json({
//         "message": "curposition"
//     });
// });

app.use('/user', userRoutes);
app.use('/curPosition', curPositionRoutes);
app.use('/licenseRating', licenseRatingRoutes);
app.use('/contacts', contactRoutes);
app.use('/report', reportRoutes);
app.use('/unsafe', unsafeRoutes);
app.use('/mark', markRoutes);
app.use('/police', policeRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/liveTracking', liveTrackingRoutes);


app.use(function(req, res, next){
    const error=new Error('not found');
    error.status=404;
    next(error);
});

app.use(function(error, req, res, next){
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports=app;