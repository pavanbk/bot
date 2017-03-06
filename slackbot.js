var Botkit = require('botkit');
const dateTime = require('date-and-time');
/*var SlackBot = require('slackbots');
 
// create a bot 
var bot = new SlackBot({
    token: 'xoxb-012345678-ABC1DFG2HIJ3', // Add a bot https://my.slack.com/services/new/bot and put the token  
    name: 'My Bot'
});
*/

/*var http = require('http'),
    fs = require('fs');


fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(8000);
});
*/
//const PORT = process.env.PORT || 8448;
var controller = Botkit.slackbot();

var bot = controller.spawn({
//xoxb-139609341443-kB4RfXAyJx2WKF9rpOaoEmZQ
  token: "xoxb-139766953781-Lbw8Kt3T5vdT5LthufDxiqvx",
debug: false,
})

bot.startRTM(function(err,bot,payload) {

  if (err) {

    throw new Error('Could not connect to Slack');

  }

});

//'direct_message,direct_mention'
controller.hears(["Hello","Hi","hey"],["direct_message","direct_mention","mention","ambient"],function(bot,message) {
bot.reply(message,getGreetings());
  //bot.reply(message,'Hello, how are you today?');
/*bot.startConversation(message, function(err, convo) {
            //convo.say('This is an example of using convo.ask with a single callback.');

            convo.ask('What is your favorite color?', function(response, convo) {

                convo.say('Cool, I like ' + response.text + ' too!');
                convo.next();

});
});*/ 
});


const random = array => { return array[Math.floor(Math.random() * array.length)] }

const getGreetings = () => {
  const answers = [
    'Hello!',
    'Yo ;)',
    'Hey, nice to see you.',
    'Welcome back!',
    'Hi, how can I help you?',
    'Hey, what do you need?',
  ]
  return random(answers)
}

module.exports = getGreetings



controller.hears(["book"],["direct_message","direct_mention","mention","ambient"],function(bot,message) {
 bot.startConversation(message, function(err, convo) {
 convo.ask('please enter the date?', function(response, convo) {
var date=response.text;
  global.date=date;              
                convo.next();

bot.startConversation(message, function(err, convo) {
            //convo.say('This is an example of using convo.ask with a single callback.');

            convo.ask('enter time?', function(response, convo) {
var time=response.text;
global.time=time;


convo.ask('Shall we proceed Say YES, NO or DONE to quit.',[
            {
                pattern: 'done',
                callback: function(response,convo) {
                    convo.say('OK you are done!');
                    convo.next();
                }
            },
            {
                pattern: bot.utterances.yes,
                callback: function(response,convo) {
                    convo.say('Great! I will continue...');
                    // do something else...
                    convo.next();

                }
            },
            {
                pattern: bot.utterances.no,
                callback: function(response,convo) {
                    convo.say('Perhaps later.');
                    // do something else...
                    convo.next();
                }
            },
            {
                default: true,
                callback: function(response,convo) {
                    // just repeat the question
                    convo.say("Sorry i didn't unserstand");
                    convo.repeat();
                    convo.next();
                }
            }
        ]);


/*
bot.startConversation(message, function(err, convo) {

    convo.ask({
        attachments:[
            {
                title: 'Do you want to proceed?',
                callback_id: '123',
                attachment_type: 'default',
                actions: [
                    {
                        "name":"yes",
                        "text": "Yes",
                        "value": "yes",
                        "type": "button",
                    },
                    {
                        "name":"no",
                        "text": "No",
                        "value": "no",
                        "type": "button",
                    }
                ]
            }
        ]
    },[
        {
            pattern: "yes",
            callback: function(reply, convo) {
              
              
              
              
              
              
              //  convo.say(message,getappointment());
                convo.say('FABULOUS!');
                convo.next();
                // do something awesome here.
            }
        },
        {
            pattern: "no",
            callback: function(reply, convo) {
                convo.say('Too bad');
                convo.next();
            }
        },
        {
            default: true,
            callback: function(reply, convo) {
                // do nothing
            }
        }
    ]);
            });*/

bot.reply(message, {
  attachments:[
    {
      title: "Do you want to proceed?",
      callback_id: "123",
      attachment_type: "default",
      actions: [
         {
            name:"yes",
            text: "Yes",
            value:"yes",
            type: "button",
         },
         {
             name:"no",
             text: "No",
             value: "no",
             type: "button",
         }
      ]
    }
  ]
});
if (message)actions="yes"
                //convo.say(date+'@' +time)
           getappointment= () => {
             var http = require('http'); 
 var scheduleDateTime=formatDate(date,time);
    var url='http://192.168.0.10:8088/api/Appointment?doctorName=Alexander&sDate='+scheduleDateTime;
    //http://192.168.0.10:8088/api/Appointment?doctorName=Alexander&sDate=2017-01-31T10:30:00
    http.get(url, function(res) {
  var body = '';
  global.body=body;
  res.on('data', function(chunk) {
    body += chunk;
  });
  res.on('end', function() {
    console.log(body);
    convo.say(body);
    return (body);
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});

    }
                convo.say(message,getappointment());
                convo.next();
});
});
});
});
});

controller.hears(["cancel"],["direct_message","direct_mention","mention","ambient"],function(bot,message) {
 bot.startConversation(message, function(err, convo) {
 convo.ask('please enter the appointment ID?', function(response, convo) {
   var ID=response.text;
  global.ID=ID;              

cancelappointment= () => {
             var http = require('http'); 
     var url='http://192.168.0.10:8088/api/Appointment/CancelAppointment/'+ID;
    //http://192.168.0.10:8088/api/Appointment?doctorName=Alexander&sDate=2017-01-31T10:30:00
    http.get(url, function(res) {
  var body = '';
  global.body=body;
  res.on('data', function(chunk) {
    body += chunk;
  });
  res.on('end', function() {
    console.log(body);
    convo.say(body);
    return (body);
  });
}).on('error', function(e) {
  console.log("Got error: " + e.message);
});

    }
   convo.say(message,cancelappointment());
   convo.next();
 });  
}); 
});    
   
    
   
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