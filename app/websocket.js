'use strict';
var WebSocket = require('ws');
var host = 'ws://yunbi.com:8080/';
var ws = new WebSocket(host,{
   rejectUnauthorized:false
});



ws.on('open',()=>{
  console.log("opened");
});


ws.on('message',(e)=>{
  console.log(e);
});


ws.on('close',()=>{
  console.log("closed");
});

//ws.on("error",(e)=>{
//  console.log(e);
//});

//socket.onopen = function() {
//  console.log("opened");
//}
//
//socket.onmessage = function(msg) {
//  console.log(msg);
//}
//
//socket.onclose = function() {
//  console.log("closed");
//}
