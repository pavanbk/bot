'use strict';

let Wit = null;
let interactive = null;
try {
  // if running from repo
  Wit = require('../').Wit;
  interactive = require('../').interactive;
} catch (e) {
  Wit = require('node-wit').Wit;
  interactive = require('node-wit').interactive;
}

const accessToken = (() => {
  if (process.argv.length !== 3) {
    console.log('usage: node examples/quickstart.js <wit-access-token>');
    process.exit(1);
  }
  return process.argv[2];
})();

// Quickstart example
// See https://wit.ai/ar7hur/quickstart

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

const actions = {
  send(request, response) {
    const {sessionId, context, entities} = request;
    const {text, quickreplies} = response;
    console.log('sending...', JSON.stringify(response));
  },
  //for replacing the varibles
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

getdate({context, entities}) {
  //var st = "date";
//var pattern = /(\d{2})\.(\d{2})\.(\d{4})/;
 //var date = new Date(st.replace(pattern,'$3-$2-$1'));
  //var date = new Date().toISOString()
 // var datetime = require('node-datetime');
  //  var dt = datetime.create();
//var fomratted = dt.format('m/d/Y H:M AM');
   // var date = new Date();
    //var fomratted = date.format('Y/M/D H:M AM');
  var date = firstEntityValue(entities, 'intent');
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
  
  /*getdate({context, entities}) {
    var date = firstEntityValue(entities, 'intent');
    if (date) {
      context.date = date; // we should call a weather API here
      delete context.missingintent;
    } else {
      context.missingintent = true;
      delete context.date;
    }
    return context;
},*/
 
  getstarttime({context, entities}) {

//var st = "time";
//var pattern = /(\d{2})\:(\d{2})\.(\d{4})/;
//var date = new Date(st.replace(pattern,'$3-$2-$1'));
  var starttime = firstEntityValue(entities, 'intent');
  global.starttime=starttime;
    if (global.starttime) {
      context.starttime = starttime;
      delete context.missingintent;
    } else {
      context.missingintent = true;
      delete context.starttime;
    }

 
//  var str=date+' '+ global.starttime;
 //   console.log(global.date+' '+ global.starttime+':00 AM');
  
    return context;
  },


 /* getendtime({context, entities}) {
    //var pattern = /(\d{2})\:(\d{2})\)/;
        var endtime = firstEntityValue(entities, 'intent');
        global.endtime=endtime;
    if (global.endtime) {
      context.endtime = endtime; // we should call a weather API here
      delete context.missingintent;
    } else {
      context.missingintent = true;
      delete context.endtime;
    }
   // console.log(date+' ' + global.endtime+':00 AM');
    return context;
  },*/

//for getting response from dynamic table
 getShedularSettings(date){
var soap = require('soap');
var url = "http://192.168.0.10/DBConnect/WebService.asmx?wsdl";


  var d = (global.date+' '+ global.starttime +':00 AM');
  //var d = (global.date+' '+ global.starttime );
//  var st=(d.toString());
//console.log(st);
 //var e = (global.date+' '+ global.endtime );
  var e = (global.date+' '+ global.endtime +':00 AM' );
 // var st1=(e.toString());
//console.log(str1+ +str2);
//var args = {"tns:request":"alexander"};
//var args={dname:'Alexander',stime:'2017/01/25 9:00 AM', etime:'2017/01/25 9:30 AM'};
//var args={dname:'Alexander',stime:d, etime:e};
var args={dname:'Alexander',stime:d};
soap.createClient(url, function(err, client){

    client.WebService.WebServiceSoap.GetShedularSettings(args, function(err, result){
    //var DoctorName='alexander';
   
            if (err) throw err;
             console.log(result);
    });
});

      },
      };

const client = new Wit({accessToken, actions});
    interactive(client);