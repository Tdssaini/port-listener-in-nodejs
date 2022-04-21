const express = require('express')
const path = require('path')
const cors  = require('cors')
const PORT = process.env.PORT || 5000
const bodyParser = require('body-parser');
const Utils = require('./utils.js');
const cron = require('node-cron');

var app = express();
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('pages/index'))
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
app.use(express.static(__dirname + 'public'));

cron.schedule('*/1 * * * *', () => {
  if(process.env.EXECUTE_SCHEDULED_JOB == "TRUE"){
    Utils.validateAndSendDataToSalesforce();
  }
});

var corsOptions = {
  origins: [
    "https://iot-middleware-tarandeep.herokuapp.com",
  ],
  credentials: true,
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.set('json spaces',2);
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));

app.use(require('./apis_router'));