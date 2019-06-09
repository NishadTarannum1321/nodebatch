var express=require('express');
var app=express();

var defaultCtrl=require('./controllers/default.ctrl');
var productCtrl=require('./controllers/product.ctrl');

app.get('/',defaultCtrl.get);
app.get('/products',productCtrl.get);
app.listen(3000,function(){
    console.log("we are listening to port 3000");
})