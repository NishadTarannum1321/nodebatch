/*
*kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk
*primary file for API
*
*/
//Dependencies for creating server

var http=require('http');
var url=require('url');
var StringDecoder=require('string_decoder').StringDecoder;
//configure the server to respond to all requests with a string
var server=http.createServer(function(req,res){
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
    console.log("buffer: ",buffer);
    res.end("Hello World Node");
})
//res.end("Hello World Node");--if we write end stmnt here then before req.on event completed the server ends the connection
})
//start the server
server.listen(3000,function(){
console.log("The server is up and running now");
})