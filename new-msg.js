'use strict';

const bodyParser = require('body-parser');
const crypto = require('crypto');
const express = require('express');
const fetch = require('node-fetch');
const request = require('request');
const dateTime = require('date-and-time');

const DEFAULT_MAX_STEPS = 5;
let Wit = null;
let log = null;
try {
   Wit = require('../').Wit;
  log = require('../').log;
} catch (e) {
  Wit = require('node-wit').Wit;
  log = require('node-wit').log;
}


const PORT = process.env.PORT || 8445;

const WIT_TOKEN ='IPIVCFIDOSVVURP3JSAWH4QXPU4PWCJZ';//'GFYEOYV2SMOGBEVBIZHQQXUNNYT3AO34';//'VGLHUNHXZPIVFJE5NBAN2EAMO5SVJ7WV';
//'IPIVCFIDOSVVURP3JSAWH4QXPU4PWCJZ';//'VLWELLT62YDURZO5B7EP3I6CCHQ67OXN';//'VGLHUNHXZPIVFJE5NBAN2EAMO5SVJ7WV';//'GFYEOYV2SMOGBEVBIZHQQXUNNYT3AO34';//'X4EP7HE6O2LW4DQC6OCE72AUQMKHT3W7';//'XD4UZZK5CESJ4ZTBCI37DVVPHSXGSUPI';'AH7C7S5KBMI44L4KATB6LFSLEQ4XRUZF';//

const sendmsg = (data) => {
 // return new Promise(function(resolve, reject) {
  const body = JSON.stringify({
    message: data ,
  });
  //return body;
  };

const sessions = {};
const findOrCreateSession = (fbid) => {
   let sessionId;
  Object.keys(sessions).forEach(k => {
    if (sessions[k].fbid=fbid) {
      sessionId = k;
    }
  });
  if (!sessionId) {
    sessionId = new Date().toISOString();
    sessions[sessionId] = {fbid: fbid, context: {_fbid_: fbid}};
  }
  return sessionId;
};

 const actions = {
  send({sessionId},response) {

var context = request.context,
              entities = request.entities,
              text = response.text;
const recipientId = sessions[sessionId].fbid;
    if (recipientId) {
   //---- console.log(response);
    if (response.quickreplies) {

  response.quick_replies = [];

  for (var i = 0, len = response.quickreplies.length; i < len; i++) {
    response.quick_replies.push({ title: response.quickreplies[i], content_type: 'text', payload: 'CUSTOM_WIT_AI_QUICKREPLY_ID' + i });
  }
  delete response.quickreplies;
}
    //return sendmsg(response);
   var rspns=response;
   global.rspns=rspns;
  return response;
    }
},
 name({sessionId, context, text, entities}) {
   //name({context, entities}) {
    var name = firstEntityValue(entities, 'intent'); 
    name=JSON.parse(text);   
    name=name.q.replace(/['"]+/g, '')
    if (name) {
      context.name =name.q;
      delete context.missingintent;
    } else {
      context.missingintent = true;
      delete context.name;
    }
    //console.log(name.q);
    return (context);
     
  },

//getdate({context, entities}) {
 date({sessionId, context, text, entities}) {
  var date = firstEntityValue(entities, 'intent'); 
    global.date=JSON.parse(text);
    //global.date=global.date.q
    global.date.q=global.date.q.replace(/['"]+/g, '')
if(global.date.q==="today"){
  var nd=new Date().toISOString();
  context.date=nd.substring(0,10);
  //console.log(context.date)
   global.date.q=context.date;
  return context;
}

if(global.date.q==="tomorrow"){
 var myDate = new Date();
myDate.setDate(myDate.getDate() + 1);
var tom=myDate.toISOString();
//console.log(myDate);
  context.date=tom.substring(0,10);
  //console.log(context.date)
   global.date.q=context.date;
  return context;
}




    if (global.date) {
      context.date = global.date.q; 
      delete context.missingintent;    
    } else {
      context.missingintent = true;
      delete context.global.date;
    }
    //console.log(global.date.q.replace(/['"]+/g, ''));
    //console.log(global.date.q);
    return context;
  },
 
starttime({sessionId, context, text, entities}) {

  var starttime = firstEntityValue(entities, 'intent');
  global.starttime=JSON.parse(text);
if(text.length>14){
  global.starttime.q=global.starttime.q.replace(/['"]+/g, '')
  //console.log( global.starttime.q);
}

if(text.length<14){
  global.starttime.q='0'+global.starttime.q+':00';
  global.starttime.q=global.starttime.q.replace(/['"]+/g, '')
  //console.log( global.starttime.q);
}


if(text.length===14){
 global.starttime.q=global.starttime.q+':00';
  global.starttime.q=global.starttime.q.replace(/['"]+/g, '')
 // console.log( global.starttime.q);
}
    if (global.starttime) {
      context.starttime = global.starttime.q;
      delete context.missingintent;
    } else {
      context.missingintent = true;
      delete context.starttime;
    }
//console.log(global.starttime.q);
    return context;
  },
 
getid({sessionId, context, text, entities}) {
 var id= firstEntityValue(entities, 'intent'); 
    global.id=JSON.parse(text);
  global.id.q=global.id.q.replace(/['"]+/g, '')
    if (global.id) {
      context.id = id; 
      delete context.missingintent;    
    } else {
      context.missingintent = true;
      delete context.id;
    }
  //  console.log(global.id.q);
    return context;
  },

  resid({sessionId, context, text, entities}) {
 var resid= firstEntityValue(entities, 'intent'); 
    global.resid=JSON.parse(text);
     global.resid.q=global.resid.q.replace(/['"]+/g, '')
    if (global.resid) {
      context.resid = global.resid.q; 
      delete context.missingintent;    
    } else {
      context.missingintent = true;
      delete context.resid;
    }
   // console.log(global.resid.q);
    return context;
  },

  resdate({sessionId, context, text, entities}) {
 var resdate= firstEntityValue(entities, 'intent'); 
  global.resdate=JSON.parse(text);
    global.resdate.q=global.resdate.q.replace(/['"]+/g, '')

if(global.resdate.q==="today"){
  var nd=new Date().toISOString();
  context.resdate=nd.substring(0,10);
  //console.log(context.date)
   global.resdate.q=context.resdate;
  return context;
}


if(global.resdate.q==="tomorrow"){
 var myDate = new Date();
myDate.setDate(myDate.getDate() + 1);
var tom=myDate.toISOString();
//console.log(myDate);
  context.resdate=tom.substring(0,10);
  //console.log(context.date)
   global.resdate.q=context.resdate;
  return context;
}


    if (global.resdate) {
      context.resdate = global.resdate.q; 
      delete context.missingintent;    
    } else {
      context.missingintent = true;
      delete context.resdate;
    }
   // console.log(global.date);
    return context;
  },

restime({sessionId, context, text, entities}) {
  var restime = firstEntityValue(entities, 'intent');
  global.restime=JSON.parse(text);

if(text.length>14){
  global.restime.q=global.restime.q.replace(/['"]+/g, '')
  //console.log( global.starttime.q);
}
if(text.length<14){
  global.restime.q='0'+global.restime.q+':00';
  global.restime.q=global.restime.q.replace(/['"]+/g, '')
  //console.log( global.starttime.q);
}
if(text.length===14){
 global.restime.q=global.restime.q+':00';
  global.restime.q=global.restime.q.replace(/['"]+/g, '')
 // console.log( global.starttime.q);
}

 // global.restime.q=global.restime.q.replace(/['"]+/g, '')
    if (global.starttime) {
      context.restime = global.restime.q;
      delete context.missingintent;
    } else {
      context.missingintent = true;
      delete context.restime;
    }

    return context;
  },

exit({sessionId, context, text, entities}) {
  var exit = firstEntityValue(entities, 'intent');
  exit=JSON.parse(text);
     if (exit) {
      //  sessionId=null;
      // context=null;
      // text=null;
      // entities=null;
      // sessions[sessionId] = {context: {}};
      // delete context.missingintent;
 sessionId = new Date().toISOString();
    sessions[sessionId] = { context: {}};
    } else {
      context.missingintent = true;
      delete context.restime;
    }

    return context;
  },




resappointment({context, entities}) {
    return new Promise(function(resolve, reject) {
      var http = require('http'); 
 //var resscheduleDateTime=resformatDate(resdate,restime);
// var d = ('2017-'+global.month+'-'+ global.date +'T'+global.starttime+':00:00 ');
   // var url='http://192.168.0.10:8088/api/Appointment/ReSheduleAppointment?id=115&sTime=2017-02-13T12:00:00';
    var url='http://192.168.0.10:8088/api/Appointment/ReSheduleAppointment?id='+global.resid.q+'&sTime='+global.resdate.q+'T'+global.restime.q+':00';        
http.get(url, (res) => {
//console.log(d);
res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => rawData += chunk);
  res.on('end', () => {
    try {
    var parsedData = JSON.parse(rawData);
      // p= (parsedData.list[0].weather[0].description);
     //var datetime=null;


context.resappointment =parsedData;
         
     }    
         //  console.log(p);
         catch (e) {
            console.log(e.message);
            }   

    return resolve(context);
 });

 }).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});
//var p = null;
    });
  },

 cancelappointment({context,entities}){
return new Promise(function(resolve, reject) {
var http=require('http');
var url='http://192.168.0.10:8088/api/Appointment/CancelAppointment/'+global.id.q;
http.get(url, (res) => {
res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => rawData += chunk);
  res.on('end', () => {
    try {

      delete global.id.q;
    var parsedData = JSON.parse(rawData);  
    context.cancelapp=parsedData; 
     }    
         catch (e) {
            console.log(e.message);
            }   

    return resolve(context);
 });

}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});
    });

},

  // You should implement your custom actions here
  // See https://wit.ai/docs/quickstart
appointment({context, entities}) {
    return new Promise(function(resolve, reject) {
      var http = require('http'); 
 //var scheduleDateTime=formatDate(date,starttime);
    var url='http://192.168.0.10:8088/api/Appointment?doctorName=Alexander&sDate='+global.date.q+'T'+global.starttime.q+':00';  //scheduleDateTime;  //2017-01-31T15:30:00
http.get(url, (res) => {

res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => rawData += chunk);
  res.on('end', () => {
    try {
    var parsedData = JSON.parse(rawData);
      // p= (parsedData.list[0].weather[0].description);
     //var datetime=null;
delete global.date.q;
delete global.starttime.q;
           context.appointment =parsedData;
          
     }    
    //  console.log(p);
         catch (e) {
            console.log(e.message);
            }   

    return resolve(context);
      context.name=null;
           context.date=null;
            context.starttime=null;
 });

}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});
//var p = null;
    });
  },
 };

const wit = new Wit({
  accessToken: WIT_TOKEN,
  actions,
  logger: new log.Logger(log.INFO)
});

 const app = express();
 //used for cross domain communication
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);

app.use('/',function (req, res, next) 
{
 // console.log('Time:', Date.now())
next();
})
// app.use(({method, url}, rsp, next) => {
//   rsp.on('finish', () => {
//     console.log(`${rsp.statusCode} ${method} ${url}`);
//   });
//   next();
// });
// var session = require('express-session');
// app.use(session({
//   secret: 'sooper_secret',
//   resave: false,
//   saveUninitialized: false
// }));


app.use(bodyParser.text());
 app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/', function(req, res) {
  req.headers['user-agent']
  console.log('User-Agent: ' + req.headers['user-agent']);
  //  res.setHeader('Content-Type', 'application/xml');
  //  res.setHeader('Accept','application/xml');
   var text=JSON.stringify(req.body);
 //--------- console.log(text);
 var sender=req.headers['user-agent'];
        const sessionId = findOrCreateSession(sender);
        //const context={};
        wit.runActions(
              sessionId,
            //'symptom checker',
             text,
          sessions[sessionId].context
     // context
            ).then((context) => {
            //    if (context['done']) {
            // delete sessions[sessionId].context;
              // }
        // ------------        console.log('Wit.ai response: ' + JSON.stringify(global.rspns)); 
        //------------         console.log('Waiting for next user messages');
                 //ReturnResponse = context;
                sessions[sessionId].context = context;
               //return context; //context={};
                res.json(global.rspns);
              })
  //res.status(200).send(req.body);
 // res.json(res.body);
});

const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value
  ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

app.listen(PORT);
console.log('Listening on :' + PORT + '...');


function formatDate(date,time) 
{
    var arryDate=date.split('/');
    var arryTime=time.split(':');
        if(arryTime.length!=3)
        {
            arryTime[1]=0;
            arryTime[2]=0;
        }    
    var scheduleDateTime = new Date(arryDate[0], arryDate[1]-1, arryDate[2], arryTime[0],arryTime[1],arryTime[2]);
    return dateTime.format(scheduleDateTime,'YYYY-MM-DDTHH:mm:ss');
     
}
