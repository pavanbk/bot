// var express= require('express');
// var app= express();
// var bodyParser = require('body-parser');



// var http = require('http'),
//       fs = require('fs'),
//      url = require('url'),
//  choices = ["hello ", "hii"];

// http.createServer(function(request, response){
//     var path = url.parse(request.url).pathname;
//     if(path=="/getstring()"){        
//         console.log("request recieved");
//         var string = choices[Math.floor(Math.random()*choices.length)];
//         console.log("string '" + string + "' chosen");
//         response.writeHead(200, {"Content-Type": "text/plain"});
//         response.end(string);
//         console.log("string sent");
           
//     }
    
//     // if(path=="/hii"){        
//     //     console.log("request recieved");
//     //    // var string = choices[Math.floor(Math.random()*choices.length)];
//     //     console.log("pavan");
//     //     response.writeHead(200, {"Content-Type": "text/plain"});
//     //     response.end(string);
//     //     console.log("string sent");
//     // }
//     else{
//         fs.readFile('./index.html', function(err, file) {  
//             if(err) {  
//                 // write an error response or nothing here  
//                 return;  
//             }  
//             response.writeHead(200, { 'Content-Type': 'text/html' });  
//             response.end(file, "utf-8");  
//         });
//     }
  



// }).listen(8001);
// console.log("server initialized");
/*
var wit = require('botkit-witai')({
    accessToken: 'X4EP7HE6O2LW4DQC6OCE72AUQMKHT3W7',
    minConfidence: 0.6,
    logLevel: 'debug'
});
controller.middleware.receive.use(wit.receive);*/





// // // var express = require('express');
// // // var app = express();



// // // const random = array => { return array[Math.floor(Math.random() * array.length)] }

// // // const getGreetings = () => {
// // //   const answers = [
// // //     'Hello!',
// // //     'Yo ;)',
// // //     'Hey, nice to see you.',
// // //     'Welcome back!',
// // //     'Hi, how can I help you?',
// // //     'Hey, what do you need?',
// // //   ]
// // //   return random(answers)
// // // }

// // // module.exports = getGreetings




// // // //var controller= express();
// // // app.get(["/Hello","/Hi","/hey"],function(req,res) {
// // // res.send(getGreetings());
// // // })

// // // app.post('/', function (req, res) {
// // //    console.log("Got a POST request for the homepage");
// // //    res.send('Hello POST');
// // // })

// // // app.post('/helo/*', function (req, res) {
// // //    console.log("Got a POST request for the homepage");
// // //    res.send('Hello POST');
// // // })

// // // app.get('/Book', function (req, res) {
// // //    console.log("Got a GET request for /list_user");
// // //    res.send('Please enter Date');
// // // })

// // // app.use(express.static('public'));
// // // app.get('/index.html', function (req, res) {
// // //    res.sendFile( __dirname + "/" + "index.html" );
// // // })

// // // app.get('/process_get', function (req, res) {
// // //    // Prepare output in JSON format
// // //    response = {
// // //       first_name:req.query.first_name,
// // //       last_name:req.query.last_name
// // // };
// // // res.send('hi'+' '+response.first_name+' '+response.last_name);
// // //    console.log(response);
// // //    res.end(JSON.stringify(response));
// // // })



// // // app.get('/date_get', function (req, res) {
// // //    // Prepare output in JSON format
// // //    response = {
       
// // //       Book_Date:req.query.book_date
// // //          };
// // // var Book_Date=res.send(response);
// // //    global.Book_Date=book_date;
// // //    console.log(response);
// // //    res.end(JSON.stringify(response));
// // // })

// // // app.get('/time_get', function (req, res) {
// // //    // Prepare output in JSON format
// // //    response = {
       
// // //       Book_Time:req.query.book_time
// // //     };
// // // var Book_Time=res.send(response);
// // //    global.Book_Date=Book_Time;
// // //    console.log(response);
// // //    res.end(JSON.stringify(response));





// // //       getappointment= () => {
// // //              var http = require('http'); 
// // //  var scheduleDateTime=global.date+'T'+global.time;
// // //     var url='http://192.168.0.10:8088/api/Appointment?doctorName=Alexander&sDate='+'2017-02-16'+'T'+'21:00'+':00';
// // //     //http://192.168.0.10:8088/api/Appointment?doctorName=Alexander&sDate=2017-01-31T10:30:00
// // //     http.get(url, function(res) {
// // //   var body = '';
// // //   global.body=body;
// // //   res.on('data', function(chunk) {
// // //     body += chunk;
// // //   });
// // //   res.on('end', function() {
// // //     console.log(body);
// // //    // res.send(body);
// // //    // convo.say(body);
// // //     return (body);
// // //   });
// // // }).on('error', function(e) {
// // //   console.log("Got error: " + e.message);
// // // });

// // //     }

// // //    res.send(getappointment());
// // // })



// // // var server = app.listen(8081, function () {

// // //    var host = server.address().address
// // //    var port = server.address().port

// // //    console.log("Example app listening at http://%s:%s", host, port)
// // // })







// app.param(['id', 'page'], function (req, res, next, value) {
//   console.log('CALLED ONLY ONCE with', value);
//   next();
// });

// app.get('/user/:id/:page', function (req, res, next) {
//   console.log('although this matches');
//   next();
// });

// app.get('/user/:id/:page', function (req, res) {
//   console.log('and this matches too');
//   res.end();
// });




// var express = require('express');
// var app = express();

// app.use(express.static('public'));
// app.get('/index.htm', function (req, res) {
//    res.sendFile( __dirname + "/" + "index.htm" );
// })

// app.get('/process_get', function (req, res) {
//    // Prepare output in JSON format
//    response = {
//       first_name:req.query.first_name,
//       last_name:req.query.last_name
//    };
//    console.log(response);
//    res.end(JSON.stringify(response));
// })

// var server = app.listen(8081, function () {
//    var host = server.address().address
//    var port = server.address().port
//    console.log("Example app listening at http://%s:%s", host, port)

// })


// 'use strict';

// const bodyParser = require('body-parser');
// const crypto = require('crypto');
// const express = require('express');
// const fetch = require('node-fetch');
// const request = require('request');
// const dateTime = require('date-and-time');

// const DEFAULT_MAX_STEPS = 5;
// let Wit = null;
// let log = null;
// try {
//   // if running from repo
//   Wit = require('../').Wit;
//   log = require('../').log;
// } catch (e) {
//   Wit = require('node-wit').Wit;
//   log = require('node-wit').log;
// }

// const PORT = process.env.PORT || 8445;//ENGLISH

// // Wit.ai parameters
// const WIT_TOKEN = 'X4EP7HE6O2LW4DQC6OCE72AUQMKHT3W7';

// const sessions = {};

// const findOrCreateSession = (fbid) => {
//   let sessionId;
//   // Let's see if we already have a session for the user fbid
//   Object.keys(sessions).forEach(k => {
//     if (sessions[k].fbid === fbid) {
//       // Yep, got it!
//       sessionId = k;
//     }
//   });
//   if (!sessionId) {
//     // No session found for user fbid, let's create a new one
//     sessionId = new Date().toISOString();
//     sessions[sessionId] = {fbid: fbid, context: {}};
//   }
//   return sessionId;
// };

// const actions = {
//   send({sessionId}, response) {
//     // Our bot has something to say!
//     // Let's retrieve the Facebook user whose session belongs to
//     const recipientId = sessions[sessionId].fbid;
//     if (recipientId) {
//       // Yay, we found our recipient!
// if (response.quickreplies) {  // Wit.ai wants us to include quickreplies, alright! 

//   response.quick_replies = []; // The quick reply object from Wit.ai needs to be renamed.

//   for (var i = 0, len = response.quickreplies.length; i < len; i++) { // Loop through quickreplies
//     response.quick_replies.push({ title: response.quickreplies[i], content_type: 'text', payload: 'CUSTOM_WIT_AI_QUICKREPLY_ID' + i });
//   }
//   delete response.quickreplies;
// }
//     }
// console.log(response);
//       return response; 
//  },
//  getdate({context, entities}) {
 
//   var date = firstEntityValue(entities, 'intent'); 
//     global.date=date;
//     if (global.date) {
//       context.date = date; 
//       delete context.missingintent;    
//     } else {
//       context.missingintent = true;
//       delete context.date;
//     }
//    // console.log(global.date);
//     return context;
//   },
// }

// const wit = new Wit({
//   accessToken: WIT_TOKEN,
//   actions,
//   logger: new log.Logger(log.INFO)
// });

// const app = express();
// app.use(({method}, rsp, next) => {
//   rsp.on('finish', () => {
//     console.log(`${rsp.statusCode} ${method}`);
//   });
//   next();
// });
// //app.use(bodyParser.json({ verify: verifyRequestSignature }));


// app.post('/', (req, res) => {
// const sessionId = findOrCreateSession();
//   wit.runActions(
//               sessionId, // the user's current session
//               'symptom checker', // the user's message
//               sessions[sessionId].context // the user's current session state
//             ).then((context) => {
//               console.log('Wit.ai response: ' + JSON.stringify(context));
//                console.log('Waiting for next user messages');
// sessions[sessionId].context = context;
// //context={};
//             }),
//            res.sendStatus(200);
// });

// const firstEntityValue = (entities, entity) => {
//   const val = entities && entities[entity] &&
//     Array.isArray(entities[entity]) &&
//     entities[entity].length > 0 &&
//     entities[entity][0].value
//   ;
//   if (!val) {
//     return null;
//   }
//   return typeof val === 'object' ? val.value : val;
// };



// app.listen(PORT);
// console.log('Listening on :' + PORT + '...');


// let Wit = require('wit-js');
 
// client = new Wit.Client({apiToken: 'IPIVCFIDOSVVURP3JSAWH4QXPU4PWCJZ'});
 
//  client.message('symptom checker', {})

// .then((data) => {
//   console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));


// //     .then((response) => {
// //         console.log(response.entities);
//     })
//     .catch((err) => {
//         console.error(err);
//     });

// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
//    app.use(express.bodyParser());
// app.use(bodyParser.urlencoded());

// app.post('/', function(request, response){
//     console.log(request.body.user.name);
//     console.log(request.body.user.email);
// });

// app.use(bodyParser.urlencoded({
//     extended: true
// }));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
// app.use(bodyParser.json());

// app.post("/", function (req, res) {
//     console.log(req.body.user.name)
// });

// var apiai = require('apiai');

// var app = apiai("5813b001f13f4e238615c340b206188e");

// var request = app.textRequest('feeling headache since few days', {
//     sessionId: '123'
// });

// request.on('response', function(response) {
//     console.log(response);
// });

// request.on('error', function(error) {
//     console.log(error);
// });

// request.end();






/******************************************new_msg****************************************************/

// app.get('/', function(req, res) {
//  var text=req.body;
//    console.log(text);
//      var student = {
//                 name : "David Rayy", 
//                 sclass : "VI", 
//                 rollno : 12 
//                } 
//     res.setHeader('Content-Type', 'application/json');
//     res.jsonp(student);
//   //   res.status(200).send(req.query);
//});

// app.post('/', function(req, res) {
//   var text=req.body;
//    console.log(text);
//      var student = {
//                 name : "David Rayy", 
//                 sclass : "VI", 
//                 rollno : 12 
//                } 
//     res.setHeader('Content-Type', 'application/json');
//     res.json(student);
// });



// wit.message(text, {})
// .then((data) => {
//   console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));

// })



// wit.converse(sessionId, text, {})
// .then((data) => {
//   console.log('Yay, got Wit.ai response: ' + JSON.stringify(data));
// })
// .catch(console.error);
// const wit = new Wit({
//   accessToken: WIT_TOKEN,
//   actions: {
//     send(request, response) {
//       return new Promise(function(resolve, reject) {
//       //  console.log(JSON.stringify(response));
//         return resolve(response);
//  delete response.quickreplies;
//       });
//     },
//     myAction({sessionId, context, text, entities}) {
//   console.log(`Session ${sessionId} received ${text}`);
//      console.log(`The current context is ${JSON.stringify(context)}`);
//      console.log(`Wit extracted ${JSON.stringify(entities)}`);
//       return Promise.resolve(context);
//     }
//   }
// });

// resid({sessionId, context, text, entities}) {
//  var resid= firstEntityValue(entities, 'intent'); 
//     global.resid=JSON.parse(text);
//      global.resid.q=global.resid.q.replace(/['"]+/g, '')
//     if (global.resid) {
//       context.resid = resid; 
//       delete context.missingintent;    
//     } else {
//       context.missingintent = true;
//       delete context.resid;
//     }
//     console.log(global.resid.q);
//     return context;
//   },

   


// resdate({sessionId, context, text, entities}) {
//  var resdate= firstEntityValue(entities, 'intent'); 
//   global.resdate=JSON.parse(text);
//     global.resdate.q=global.resdate.q.replace(/['"]+/g, '')
//     if (global.resdate) {
//       context.resdate = global.resdate.q; 
//       delete context.missingintent;    
//     } else {
//       context.missingintent = true;
//       delete context.resdate;
//     }
//    // console.log(global.date);
//     return context;
//   },

// restime({sessionId, context, text, entities}) {
//   var restime = firstEntityValue(entities, 'intent');
//   global.restime=JSON.parse(text);
//   global.restime.q=global.resdate.q.replace(/['"]+/g, '')
//     if (global.starttime) {
//       context.restime = global.restime.q;
//       delete context.missingintent;
//     } else {
//       context.missingintent = true;
//       delete context.restime;
//     }

//     return context;
//   },
// getresappointment({context, entities}) {
//     return new Promise(function(resolve, reject) {
//       var http = require('http'); 
//  //var resscheduleDateTime=resformatDate(resdate,restime);
// // var d = ('2017-'+global.month+'-'+ global.date +'T'+global.starttime+':00:00 ');
//    // var url='http://192.168.0.10:8088/api/Appointment/ReSheduleAppointment?id=115&sTime=2017-02-13T12:00:00';
//     var url='http://192.168.0.10:8088/api/Appointment/ReSheduleAppointment?id='+global.resid.q+'&sTime='+global.resdate.q+'T'+global.restime.q+':00:00';        
// http.get(url, (res) => {
// //console.log(d);
// res.setEncoding('utf8');
//   let rawData = '';
//   res.on('data', (chunk) => rawData += chunk);
//   res.on('end', () => {
//     try {
//     var parsedData = JSON.parse(rawData);
//       // p= (parsedData.list[0].weather[0].description);
//      //var datetime=null;


// context.resappointment =parsedData;
         
//      }    
//          //  console.log(p);
//          catch (e) {
//             console.log(e.message);
//             }   

//     return resolve(context);
//  });

//  }).on('error', (e) => {
//   console.log(`Got error: ${e.message}`);
// });
// //var p = null;
//     });
//   },
    

 
// var nd=new Date().toISOString();
// var n=Date.tomorrow()
// console.log(n);


// var today = new Date(); // Or Date.today()
// var tomorrow = today.add(1).day();
// console.log(today);
// console.log(tomorrow);
 const express = require('express');
const app = express();
const bodyParser = require('body-parser');
   //app.use(express.bodyParser());
app.use(bodyParser.urlencoded());
app.get('/', function(req, res) {
    console.log('User-Agent: ' + req.headers['user-agent']);
});

// var myDate = new Date();

// //add a day to the date
// myDate.setDate(myDate.getDate() + 1);
// console.log(myDate);
