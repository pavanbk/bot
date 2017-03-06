'use strict';

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

const PORT = process.env.PORT || 8446;//ENGLISH

const WIT_TOKEN ='X4EP7HE6O2LW4DQC6OCE72AUQMKHT3W7';
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

const fbMessage = (id, data) => {
  const body = JSON.stringify({
    recipient: { id },
    message: data , 
  });
  const qs = 'access_token=' + encodeURIComponent(FB_PAGE_TOKEN);
    return fetch('https://graph.facebook.com/me/messages?' + qs, {
  //return fetch('http://192.168.0.47/ChatApp/Chat.aspx' + qs, {
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

const sessions = {};

const findOrCreateSession = (fbid) => {
  let sessionId;
  Object.keys(sessions).forEach(k => {
    if (sessions[k].fbid === fbid) {
        sessionId = k;
    }
  });
  if (!sessionId) {
     sessionId = new Date().toISOString();
    sessions[sessionId] = {fbid: fbid, context: {}};
  }
  return sessionId;
};

const actions = {
  send({sessionId}, response) {
    const recipientId = sessions[sessionId].fbid;
    if (recipientId) {
if (response.quickreplies) {  // Wit.ai wants us to include quickreplies, alright! 

  response.quick_replies = []; // The quick reply object from Wit.ai needs to be renamed.

  for (var i = 0, len = response.quickreplies.length; i < len; i++) { // Loop through quickreplies
    response.quick_replies.push({ title: response.quickreplies[i], content_type: 'text', payload: 'CUSTOM_WIT_AI_QUICKREPLY_ID' + i });
  }
  delete response.quickreplies;
}
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
    return context;
  },

  cancelappointment({context,entities}){
return new Promise(function(resolve, reject) {
var http=require('http');
var url='http://192.168.0.10:8088/api/Appointment/CancelAppointment/'+global.id;
http.get(url, (res) => {
res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => rawData += chunk);
  res.on('end', () => {
    try {
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

getappointment({context, entities}) {
    return new Promise(function(resolve, reject) {
      var http = require('http'); 
 var scheduleDateTime=formatDate(date,starttime);
    var url='http://192.168.0.10:8088/api/Appointment?doctorName=Alexander&sDate='+scheduleDateTime;
http.get(url, (res) => {
res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => rawData += chunk);
  res.on('end', () => {
    try {
    var parsedData = JSON.parse(rawData);
context.appointment =parsedData;        
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


const wit = new Wit({
  accessToken: WIT_TOKEN,
  actions,
  logger: new log.Logger(log.INFO)
});

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


app.post('/webhook', (req, res) => {

  const data = req.body;

  if (data.object === 'page') {
    data.entry.forEach(entry => {
      entry.messaging.forEach(event => {
        if (event.message && !event.message.is_echo) {
  
          const sender = event.sender.id;

          const sessionId = findOrCreateSession(sender);

         
          const {text, attachments} = event.message;

          if (attachments) {
  
            fbMessage(sender,{ text: 'Sorry I can only process text messages for now.' })
            .catch(console.error);
          } else if (text) {
       
            wit.runActions(
              sessionId, // the user's current session
              text, // the user's message
              sessions[sessionId].context // the user's current session state
            ).then((context) => {
             
              console.log('Waiting for next user messages');

            
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
 

function verifyRequestSignature(req, res, buf) {
  var signature = req.headers["x-hub-signature"];

  if (!signature) {
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


  