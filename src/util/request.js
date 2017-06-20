


export default function request()


var fs = require('fs');

function PostCode(codestring) {
  // Build the post string from an object
  var post_data = querystring.stringify({
      'compilation_level' : 'ADVANCED_OPTIMIZATIONS',
      'output_format': 'json',
      'output_info': 'compiled_code',
        'warning_level' : 'QUIET',
        'js_code' : codestring
  });

  // An object of options to indicate where to post to
  var post_options = {
      host: 'closure-compiler.appspot.com',
      port: '80',
      path: '/compile',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
      }
  };

  // Set up the request
  var post_req = http.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
      });
  });

  // post the data
  post_req.write(post_data);
  post_req.end();

}

import http from 'http'
import https from 'https'
import querystring from 'querystring'


const get(url)

const request = function(url)

module.exports = function(/**/) {
   var url = arguments[0]
   var toSend = false;
   if (arguments[2]) { // POST
      toSend = querystring.stringify(arguments[1])
         var callback = arguments[2];
   } else var callback = arguments[1];
  var secure = false,
      host,
      method,
      path = "/",
      content = "",
      port = "",
      a,
      b;
a = url.split("://"); // split url string
if (a[0] == "https") secure = true; else secure = false; // check if using https
  b = (a[1]) ? a[1] : a[0]; // b = hostname + ":" + port + path
  a = b.split("/"); // split b

  b = a[0].split(":")
   host = b[0]; // host
  if (b[1]) { // there is a port
    port = parseInt(b[1])
  }

  if (a[1]) path += a.slice(1).join("/");
  if (secure) {
    method = https;
  } else {
    method = http;
  }
 try {
var request = method.request((toSend) ? {host:host,path:path,port:port,method:"POST",headers: {'Content-Type': 'application/x-www-form-urlencoded','Content-Length': Buffer.byteLength(toSend)}} : {host:host,path:path,port:port}, function(res) {
    res.setEncoding("utf8");
    res.on("data", function (chunk) {
        content += chunk;
    });

    res.on("end", function () {
        callback(false,res,content)
    });
});
    request.on('error',function(e) {
       callback(e,null,null);
    })
if (toSend) request.write(toSend)
request.end();
 } catch (e) {
   callback(e,null,null);
 }
}


function paramsHaveRequestBody(params) {
  return (
    params.body ||
    params.requestBodyStream ||
    (params.json && typeof params.json !== 'boolean') ||
    params.multipart
  )
}

function initParams (uri, options) {
  let params
  if (typeof options === 'object') {
    params = {
      ...options,
      uri
    }
  } else if (typeof uri === 'string') {
    params = {
      uri
    }
  } else {
    params = uri
  }

  return params
}

function request (uri, options) {
  if (typeof uri === 'undefined') {
    throw new Error('undefined is not a valid uri or options object.')
  }

  const params = initParams(uri, options)

  if (params.method === 'HEAD' && paramsHaveRequestBody(params)) {
    throw new Error('HTTP HEAD requests MUST NOT include a request body.')
  }

  return new request.Request(params)
}

function verbFunc(verb) {
  var method = verb.toUpperCase()
  return function (uri, options, callback) {
    let params = {
      ...initParams(uri, options, callback),
      method
    }
    return request(params)
  }
}

request.get       = verbFunc('get')
request.head      = verbFunc('head')
request.options   = verbFunc('options')
request.post      = verbFunc('post')
request.put       = verbFunc('put')
request.patch     = verbFunc('patch')
request.del       = verbFunc('delete')
request.delete    = verbFunc('delete')
