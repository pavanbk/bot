'use strict';

// Messenger API integration example
// We assume you have:
// * a Wit.ai bot setup (https://wit.ai/docs/quickstart)
// * a Messenger Platform setup (https://developers.facebook.com/docs/messenger-platform/quickstart)
// You need to `npm install` the following dependencies: body-parser, express, request.
//
// 1. npm install body-parser express request
// 2. Download and install ngrok from https://ngrok.com/download
// 3. ./ngrok http 8445
// 4. WIT_TOKEN=your_access_token FB_APP_SECRET=your_app_secret FB_PAGE_TOKEN=your_page_token node examples/messenger.js
// 5. Subscribe your page to the Webhooks using verify_token and `https://<your_ngrok_io>/webhook` as callback URL.
// 6. Talk to your bot on Messenger!

const bodyParser = require('body-parser');
const crypto = require('crypto');
const express = require('express');
const fetch = require('node-fetch');
const request = require('request');
const dateTime = require('date-and-time');

const DEFAULT_MAX_STEPS = 50000000;
let Wit = null;
let log = null;
try {
  // if running from repo
  Wit = require('../').Wit;
  log = require('../').log;
} catch (e) {
  Wit = require('node-wit').Wit;
  log = require('node-wit').log;
}

// Webserver parameter
const PORT = process.env.PORT || 8446;//ENGLISH

// Wit.ai parameters
//const WIT_TOKEN = 'AH7C7S5KBMI44L4KATB6LFSLEQ4XRUZF';//process.env.WIT_TOKEN;
//const WIT_TOKEN = 'VLWELLT62YDURZO5B7EP3I6CCHQ67OXN';//process.env.WIT_TOKEN;
const WIT_TOKEN ='X4EP7HE6O2LW4DQC6OCE72AUQMKHT3W7';
// Messenger API parameters
const FB_PAGE_TOKEN ='EAALQNbaHxvYBAGPPkKcjk3m9ITrfcEel1pS4IsaTSGPtH0PiwoeMhJxIfXG5q0be82EIXWxZAR5u3ecPWqo1ZCU2Wi1214OETPZBMLkCn7E6MC7JOhZBUYESDpqceXK3QQtT50mluA9z4O3amjiwu4WzIvGqVkEk8AWe0UHZBZBRiTLD33gZCPl';//process.env.FB_PAGE_TOKEN;
if (!FB_PAGE_TOKEN) { throw new Error('missing FB_PAGE_TOKEN') }
const FB_APP_SECRET = 'dc04eae0be04355d6313d6fd68a1f1be';//process.env.FB_APP_SECRET;
if (!FB_APP_SECRET) { throw new Error('missing FB_APP_SECRET') }

let FB_VERIFY_TOKEN = null;
crypto.randomBytes(8, (err, buff) => {
  if (err) throw err;
  FB_VERIFY_TOKEN = buff.toString('hex');
  console.log(`/webhook will accept the Verify Token "${FB_VERIFY_TOKEN}"`);
});

// ----------------------------------------------------------------------------
// Messenger API specific code

// See the Send API reference
// https://developers.facebook.com/docs/messenger-platform/send-api-reference

const fbMessage = (id, data) => {
  const body = JSON.stringify({
    recipient: { id },
    message: data , 
  });
  const qs = 'access_token=' + encodeURIComponent(FB_PAGE_TOKEN);
  return fetch('https://graph.facebook.com/me/messages?' + qs, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body,
  })
  .then(rsp => rsp.json())
  .then(json => {
    if (json.error && json.error.message) {
      throw new Error(json.error.message);
    }
    return json;
  });
};

// ----------------------------------------------------------------------------
// Wit.ai bot specific code

// This will contain all user sessions.
// Each session has an entry:
// sessionId -> {fbid: facebookUserId, context: sessionState}
const sessions = {};

const findOrCreateSession = (fbid) => {
  let sessionId;
  // Let's see if we already have a session for the user fbid
  Object.keys(sessions).forEach(k => {
    if (sessions[k].fbid === fbid) {
      // Yep, got it!
      sessionId = k;
    }
  });
  if (!sessionId) {
    // No session found for user fbid, let's create a new one
    sessionId = new Date().toISOString();
    sessions[sessionId] = {fbid: fbid, context: {}};
  }
  return sessionId;
};

// Our bot actions
const actions = {
  send({sessionId}, response) {
    // Our bot has something to say!
    // Let's retrieve the Facebook user whose session belongs to
    const recipientId = sessions[sessionId].fbid;
    if (recipientId) {
      // Yay, we found our recipient!
if (response.quickreplies) {  // Wit.ai wants us to include quickreplies, alright! 

  response.quick_replies = []; // The quick reply object from Wit.ai needs to be renamed.

  for (var i = 0, len = response.quickreplies.length; i < len; i++) { // Loop through quickreplies
    response.quick_replies.push({ title: response.quickreplies[i], content_type: 'text', payload: 'CUSTOM_WIT_AI_QUICKREPLY_ID' + i });
  }
  delete response.quickreplies;
}

      // Let's forward our bot response to her.
      // We return a promise to let our bot know when we're done sending
      return fbMessage(recipientId, response)
      .then(() => null)
      .catch((err) => {
        console.error( 
          'Oops! An error occurred while forwarding the response to',
          recipientId,
          ':',
          err.stack || err
        );
      });
    } else {
      console.error('Oops! Couldn\'t find user for session:', sessionId);
      // Giving the wheel back to our bot
      return Promise.resolve()
    }
  },
 getname({context, entities}) {
    var name = firstEntityValue(entities, 'intent');
    if (name) {
      context.name = name; // we should call a weather API here
      delete context.missingintent;
         } else {
      context.missingintent = true;
      delete context.name;
    }
    return context;
  },

getid({context, entities}) {
 var id= firstEntityValue(entities, 'intent'); 
    global.id=id;
    if (global.id) {
      context.id = id; 
      delete context.missingintent;    
    } else {
      context.missingintent = true;
      delete context.id;
    }
   // console.log(global.id);
    return context;
  },

getid1({context, entities}) {
 var id1= firstEntityValue(entities, 'intent'); 
    global.id1=id1;
    if (global.id1) {
      context.id1 = id1; 
      delete context.missingintent;    
    } else {
      context.missingintent = true;
      delete context.id1;
    }
    console.log(global.id1);
    return context;
  },

getresid({context, entities}) {
 var resid= firstEntityValue(entities, 'intent'); 
    global.resid=resid;
    if (global.resid) {
      context.resid = resid; 
      delete context.missingintent;    
    } else {
      context.missingintent = true;
      delete context.resid;
    }
    console.log(global.resid);
    return context;
  },





 
cancelappointment1({context,entities}){
return new Promise(function(resolve, reject) {
var http=require('http');
var url='http://192.168.0.10:8088/api/Appointment/CancelAppointment/'+global.id1;
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
     
         context.cancelapp1=parsedData;
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
var url='http://192.168.0.10:8088/api/Appointment/CancelAppointment/'+global.id;
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
     if(parsedData="Please enter valid appointment ID"){
       context.reenter=parsedData;
     }
     else{
       
       
    context.cancelapp=parsedData;
     }
       
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

/*getdate({context, entities}) {
 var date= firstEntityValue(entities, 'intent'); 
    global.date=date;
    if (global.date) {
      context.date = date; 
      delete context.missingintent;    
    } else {
      context.missingintent = true;
      delete context.date;
    }
   // console.log(global.date);
    return context;
  },*/

getdate({context, entities}) {
 var date= firstEntityValue(entities, 'intent'); 
    global.date=date;
    if (global.date) {
      context.date = date; 
      delete context.missingintent;    
    } else {
      context.missingintent = true;
      delete context.date;
    }
   // console.log(global.date);
    return context;
  },


getdate1({context, entities}) {
 var date1= firstEntityValue(entities, 'intent'); 
    global.date1=date1;
    if (global.date1) {
      context.date1 = date1; 
      delete context.missingintent;    
    } else {
      context.missingintent = true;
      delete context.date1;
    }
   // console.log(global.date);
    return context;
  },

 
getresdate({context, entities}) {
 var resdate= firstEntityValue(entities, 'intent'); 
    global.resdate=resdate;
    if (global.resdate) {
      context.resdate = resdate; 
      delete context.missingintent;    
    } else {
      context.missingintent = true;
      delete context.resdate;
    }
   // console.log(global.date);
    return context;
  },


getstarttime({context, entities}) {

  var starttime = firstEntityValue(entities, 'intent');
  global.starttime=starttime;
    if (global.starttime) {
      context.starttime = starttime;
      delete context.missingintent;
    } else {
      context.missingintent = true;
      delete context.starttime;
    }

    return context;
  },
 

getrestime({context, entities}) {

  var restime = firstEntityValue(entities, 'intent');
  global.restime=restime;
    if (global.starttime) {
      context.restime = restime;
      delete context.missingintent;
    } else {
      context.missingintent = true;
      delete context.restime;
    }

    return context;
  },


getstarttime1({context, entities}) {

  var starttime1 = firstEntityValue(entities, 'intent');
  global.starttime1=starttime1;
    if (global.starttime1) {
      context.starttime1 = starttime1;
      delete context.missingintent;
    } else {
      context.missingintent = true;
      delete context.starttime1;
    }

    return context;
  },

  // You should implement your custom actions here
  // See https://wit.ai/docs/quickstart
getappointment({context, entities}) {
    return new Promise(function(resolve, reject) {
      var http = require('http'); 
 var scheduleDateTime=formatDate(date,starttime);
// var d = ('2017-'+global.month+'-'+ global.date +'T'+global.starttime+':00:00 ');
    var url='http://192.168.0.10:8088/api/Appointment?doctorName=Alexander&sDate='+scheduleDateTime;
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

if(parsedData="Slot not available"){
context.redatetime =parsedData;

}
else{
context.appointment =parsedData;
}
           
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


getappointment1({context, entities}) {
    return new Promise(function(resolve, reject) {
      var http = require('http'); 
 var scheduleDateTime1=formatDate1(date1,starttime1);
// var d = ('2017-'+global.month+'-'+ global.date +'T'+global.starttime+':00:00 ');
    var url='http://192.168.0.10:8088/api/Appointment?doctorName=Alexander&sDate='+scheduleDateTime1;
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

context.appointment1 =parsedData;

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





getresappointment({context, entities}) {
    return new Promise(function(resolve, reject) {
      var http = require('http'); 
 var resscheduleDateTime=resformatDate(resdate,restime);
// var d = ('2017-'+global.month+'-'+ global.date +'T'+global.starttime+':00:00 ');
   // var url='http://192.168.0.10:8088/api/Appointment/ReSheduleAppointment?id=115&sTime=2017-02-13T12:00:00';
    var url='http://192.168.0.10:8088/api/Appointment/ReSheduleAppointment?id='+global.resid+'&sTime='+resscheduleDateTime;        
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
    

 

};

// Setting up our bot


const wit = new Wit({
  accessToken: WIT_TOKEN,
  actions,
  logger: new log.Logger(log.INFO)
});

// Starting our webserver and putting it all together
const app = express();
app.use(({method, url}, rsp, next) => {
  rsp.on('finish', () => {
    console.log(`${rsp.statusCode} ${method} ${url}`);
  });
  next();
});
app.use(bodyParser.json({ verify: verifyRequestSignature }));

// Webhook setup
app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === FB_VERIFY_TOKEN) {
    res.send(req.query['hub.challenge']);
  } else {
    res.sendStatus(400);
  }
});

// Message handler
app.post('/webhook', (req, res) => {
  // Parse the Messenger payload
  // See the Webhook reference
  // https://developers.facebook.com/docs/messenger-platform/webhook-reference
  const data = req.body;

  if (data.object === 'page') {
    data.entry.forEach(entry => {
      entry.messaging.forEach(event => {
        if (event.message && !event.message.is_echo) {
          // Yay! We got a new message!
          // We retrieve the Facebook user ID of the sender
          const sender = event.sender.id;

          // We retrieve the user's current session, or create one if it doesn't exist
          // This is needed for our bot to figure out the conversation history
          const sessionId = findOrCreateSession(sender);

          // We retrieve the message content
          const {text, attachments} = event.message;

          if (attachments) {
            // We received an attachment
            // Let's reply with an automatic message
            fbMessage(sender,{ text: 'Sorry I can only process text messages for now.' })
            .catch(console.error);
          } else if (text) {
            // We received a text message

            // Let's forward the message to the Wit.ai Bot Engine
            // This will run all actions until our bot has nothing left to do
            wit.runActions(
              sessionId, // the user's current session
              text, // the user's message
              sessions[sessionId].context // the user's current session state
            ).then((context) => {
              // Our bot did everything it has to do.
              // Now it's waiting for further messages to proceed.
              console.log('Waiting for next user messages');

              // Based on the session state, you might want to reset the session.
              // This depends heavily on the business logic of your bot.
              // Example:
              // if (context['done']) {
              //   delete sessions[sessionId];
              // }

              // Updating the user's current session state
              sessions[sessionId].context = context;
            })
            .catch((err) => {
              console.error('Oops! Got an error from Wit: ', err.stack || err);
            })
          }
        } else {
          console.log('received event', JSON.stringify(event));
        }
      });
    });
  }
  res.sendStatus(200);
});
 
/*
 * Verify that the callback came from Facebook. Using the App Secret from
 * the App Dashboard, we can verify the signature that is sent with each
 * callback in the x-hub-signature field, located in the header.
 *
 * https://developers.facebook.com/docs/graph-api/webhooks#setup
 *
 */
function verifyRequestSignature(req, res, buf) {
  var signature = req.headers["x-hub-signature"];

  if (!signature) {
    // For testing, let's log an error. In production, you should throw an
    // error.
    console.error("Couldn't validate the signature.");
  } else {
    var elements = signature.split('=');
    var method = elements[0];
    var signatureHash = elements[1];

    var expectedHash = crypto.createHmac('sha1', FB_APP_SECRET)
                        .update(buf)
                        .digest('hex');

    if (signatureHash != expectedHash) {
      throw new Error("Couldn't validate the request signature.");
    }
  }
}
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
// index. Let's say something fun
//for getting response from dynamic table
 /*getShedularSettings({context}){  
   return new Promise(function(resolve, reject) {
      });
   // return new Promise(function(resolve, reject) {var soap = require('soap');
var url = "http://192.168.0.10/DBConnect/WebService.asmx?wsdl";
 
  var d = (global.date+' '+ global.starttime +':00 AM'); 
var args={dname:'Alexander',stime:d};

soap.createClient(url, function(err, client){
  
 client.WebService.WebServiceSoap.GetShedularSettings(args, function(err, result){
  
   if (err) throw err;
//context.ShedularSettings=ShedularSettings;
//global.result=result;
        console.log(result);
        
        context.ShedularSettings=result;
      global.result=result;
return context;
            }); 
});
//return resolve(global.ShedularSettings); 
//});

return resolve(result);
 }
  */

  function formatDate(date,time) {
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
function formatDate1(date1,time1) {
var arryDate=date1.split('/');
var arryTime=time1.split(':');
if(arryTime.length!=3)
{
  arryTime[1]=0;
  arryTime[2]=0;
}
    var scheduleDateTime1 = new Date(arryDate[0], arryDate[1]-1, arryDate[2], arryTime[0],arryTime[1],arryTime[2]);
    return dateTime.format(scheduleDateTime1,'YYYY-MM-DDTHH:mm:ss');
     
}

  function resformatDate(resdate,restime) {
var arryDate=resdate.split('/');
var arryTime=restime.split(':');
if(arryTime.length!=3)
{
  arryTime[1]=0;
  arryTime[2]=0;
}
    var resscheduleDateTime = new Date(arryDate[0], arryDate[1]-1, arryDate[2], arryTime[0],arryTime[1],arryTime[2]);
    return dateTime.format(resscheduleDateTime,'YYYY-MM-DDTHH:mm:ss');
     
}

  