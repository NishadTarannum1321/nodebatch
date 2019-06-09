/*
*
*primary file for API
*
*/
//Dependencies for creating server
 
var http=require('http');
var https=require('https');
var fs=require ('fs');
var url=require('url');
var StringDecoder=require('string_decoder').StringDecoder;
var config=require('./config');


//configure the server to respond to all requests with a string
var httpserver=http.createServer(function(req,res){
    unifiedServer(req,res)
});
//start the server
httpserver.listen(config.httpPort,function(){
    console.log("The httpserver is running now and up",config.envName);
});
 
//Instantiates https server

https.ServerOptions={
    'key':fs.readFileSync('./https/key.pem'),
    'cert':fs.readFileSync('./http/cert.pem')
}
var httpsServer=https.createServer(ServerOptions,function(req,res){
    unifiedServer(req,res);
})
httpsServer.listen(config.httpsPort,function(){
    console.log("The httpserver is running now and up",config.envName);  
})
    //server logins for both http and https server
    var unifiedServer=function(req,res){
   //console.log("request url from req object",req.url);
var parsedUrl=url.parse(req.url,true);
//console.log("parsedurl:",parsedUrl);


//get the path
var path=parsedUrl.pathname;
var trimmedpath=path.replace(/^\/+|\/+$/g,'');
console.log("trimmedpath : ",trimmedpath);

//grt the  http methods:GET,POST,UPDATE,DELETE,PATCH
var method=req.method.toLowerCase();
console.log("method is:",method);

//handling query strings
var queryStringObject=parsedUrl.query;
console.log(queryStringObject);

//GET THE HEADERS
var headers=req.headers;
console.log(headers);

//GET THE PAYLOAD
var decoder=new StringDecoder('utf-8');
var buffer='';
req.on('data',function(data){
    buffer+=decoder.write(data);
})
req.on('end',function(){
    buffer+=decoder.end();
   // console.log("buffer: ",buffer);

   var chooseHandler=typeof(router[trimmedpath])!=='undefined'?router[trimmedpath]:handlers.notFound;
    
   //construct the data object to send to the handler
   var data={
       'trimmedpath:':trimmedpath,
       'queryStringObject':queryStringObject,
       'method:':method,
       'headers':headers,
       'payload:':buffer
   }
   chooseHandler(data,function(statuscode,payload){
       statuscode=typeof(statuscode)=='number'?statuscode:200;
       payload=typeof(payload)=='object'?payload:{}
       var payloadString=JSON.stringify(payload);
       //return the response
      // res.setHeaders('ContentType','application/json');
       res.writeHead(statuscode);
       res.end(payloadString);
   })
  // res.end("Hello World Node");
})
//res.end("Hello World Node");--if we write end stmnt here then before req.on event completed the server ends the connection
}
//start the server

/*server.listen(3000,function(){
console.log("The server is up and running now");
})*/
// Dependencies 

var http = require('http');
var https =require('https');
var fs = require('fs')
var url = require('url');
var StringDecoder = require('string_decoder').StringDecoder;
var config = require('./config')


// configure the server to respond to all requests with a string
var httpServer = http.createServer(function(req,res){
        unifiedServer(req,res)
    });
// start the server

httpServer.listen(config.httpPort, function () {
    console.log('The http server is up and running now', config.envName);
});

//instantiate  https server 
var httpsServerOptions = {
    'key': fs.readFileSync('./https/key.pem'),
    'cert': fs.readFileSync('./https/cert.pem')
}
var httpsServer = https.createServer(httpsServerOptions,function(req,res){
    unifiedServer(req,res);
})

httpsServer.listen(config.httpsPort, function(){
    console.log('The https server is up and running now', config.envName);
})

// server login for both https and http server 
var unifiedServer = function(req,res){
    // console.log('request url from req object',req.url);
    var parsedUrl = url.parse(req.url, true);

    // get path 

    var path = parsedUrl.pathname;

    var trimmedPath = path.replace(/^\/+|\/+$/g, '');
    console.log('trimmedpath', trimmedPath)

    // query strings 
    var queryStringObject = parsedUrl.query;
    // get the headers as an object 
    var headers = req.headers;
    console.log(headers);
    // get the http method-  get,post,delete,update,patch
    var method = req.method.toLowerCase();
    console.log(method);
    //get the payload 
    var decoder = new StringDecoder('utf-8');
    var buffer = '';
    req.on('data', function (data) {
        buffer += decoder.write(data);
    })
    req.on('end', function () {
        buffer += decoder.end();

        var chooseHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;
        // construct the data object to send to the handler

        var data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        }

        chooseHandler(data, function (statusCode, payload) {
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;
            payload = typeof (payload) == 'object' ? payload : {};

            var payloadString = JSON.stringify(payload);
            // Return the response 
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
        })
    });






}

//define the handlers

var handlers={};

//sample handler
handlers.sample=function(data,callback){
    callback(200,{'name':'sample handler'});
}
// not found handler 
handlers.notFound = function(data,callback){
    callback(400);
}

//Define the request router
var router={
'sample':handlers.sample
}










