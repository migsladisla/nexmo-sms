const express = require('express');
const ejs = require('ejs');
const Nexmo = require('nexmo');
const socketio = require('socket.io');
const bodyParser = require('body-parser');

// Init Nexmo
const nexmo = new Nexmo({
  apiKey: 'bde4a19f',
  apiSecret: 'O2eaaEdgrugZ3hXO'
}, { debug: true })

// Init app
const app = express();

// Template engine setup
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

// Public folder setup
app.use(express.static(__dirname + '/public'));

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Index route
app.get('/', (req, res) => {
  res.render('index');
});

// Catch form submit
app.post('/', (req, res) => {
  const number = req.body.number;
  const text = req.body.text;

  nexmo.message.sendSms(
    'Zaito', number, text, { type: 'unicode' },
    (err, responseData) => {
      if (err) {
        copnsole.error(err);
      } else {
        console.dir(responseData);
      }
    }
  );
});

// Define port
const port = 5000;

// Start server
const server = app.listen(port, () => console.log(`Server started on port ${port}`));