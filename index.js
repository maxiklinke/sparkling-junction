const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');

const app = express();
//const port = 3000




var serviceAccount = require('./sparklingjunction-firebase-adminsdk-71vp6-018d04b86b.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sparklingjunction.firebaseio.com"
});
// Get the database
const db = admin.firestore();

//var ref = admin.app().database().ref();
var refPlaces = db.collection('Places'); //ref.child('AssistantResponses');


//const PAGE_ACCESS_TOKEN = "EAACbuXAAkx4BAIzEvAbPIbOT6pBrPcXcDFZBIJzcoeqf5eN9WIGFwUQG0E5BzivKNnx2BNkhGotmhsFVJrt4jpkzdooVvzV7g51rEghSzMZAHZCyehG5pSqt8TXiB7QcTSgP7aEazf8kp8G4kI7Pw3IufDPmXrXMLSkkAdNPAZDZD"

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())


app.get('/', (req, res) => {
  //Facebook verify_token

    res.status(403).end();

})


const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
  //init()
});




/* Handling all messenges */
app.post('/', async function(req, res){
  console.log(req.body);
  /*if (req.body.object === 'page') {
    req.body.entry.forEach((entry) => {
      entry.messaging.forEach((event) => {
        if (event.message && event.message.text) {
          sendMessage(event);
        }
      });
    });*/

    try {
      var snapshot = await refPlaces.get();
      var placesArray = [];

      snapshot.forEach(place => {
        console.log('Place: ', place.data());
        placesArray.push(place.data());//.data());//.task_wit);
      });

      res.status(200).send(placesArray);
    }catch (err) {
      console.log('Error getting places array', err);
      res.status(200).end();
    }

});
