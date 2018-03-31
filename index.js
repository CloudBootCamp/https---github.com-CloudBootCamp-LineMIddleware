'use strict';

const line = require('@line/bot-sdk');
const express = require('express');
var mysql      = require('mysql');
var con = mysql.createConnection({
  host     : 'db4free.net',
  user     : 'linesa',
  password : '654321',
  database : 'linedb'
});

var sql = require("mssql");

    // config for your database
    var config = {
        user: 'rizboxco_sa',
        password: 'line123456',
        server: '69.162.125.10', 
        database: 'rizboxco_DB' 
    };
    

// create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// create LINE SDK client
const client = new line.Client(config);

// create Express app
// about Express itself: https://expressjs.com/
const app = express();

// register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/callback', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent2))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// event handler
function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // use reply API
  return client.replyMessage(event.replyToken, echo);


  
}


// event handler
function handleEvent3(event) {
  console.log('***handleEvent2***');
 // make to connection to the database.
con.connect(function(err) {
 if (err) throw err;
 // if connection is successful
 con.query("SELECT * FROM SKU", function (err, result, fields) {
   // if any error while executing above query, throw error
   if (err) throw err;
   // if there is no error, you have the result

   console.log('***handleEvent After Result***');
   console.log(result);

 });
});
}



// event handler
function handleEvent2(event) {
  console.log('***handleEvent2***');
 // make to connection to the database.
con.connect(function(err) {
 if (err) throw err;
 // if connection is successful
 con.query("SELECT * FROM SKU", function (err, result, fields) {
   // if any error while executing above query, throw error
   if (err) throw err;
   // if there is no error, you have the result

   console.log('***handleEvent After Result***');
   console.log(result);

   
   // if there is no error, you have the fields object
   // iterate for all the rows in fields object
  //  Object.keys(fields).forEach(function(key) {
  //    var field = fields[key];
  //    console.log(field)
  //  });
   
  /* for(var row in result){
            console.log(row);
           for(var column in result[row]){
               str+=result[row][column] + ";";       
           }
           str+="-";
         
       }
       */
   //
   
   /*console.log('***handleEvent2***ForLooop');
   var str='';
   for(var row in result){
           
           for(var column in result[row]){
               str+=result[row][column] + ";";       
           }
           str+="-";         
       }
   
   console.log(str);
   */
  // create a echoing text message
 //const echo = { type: 'text', text: result };

 // use reply API
 //return client.replyMessage(event.replyToken, echo);
   
   
   //
 });
});
}





// listen on port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
