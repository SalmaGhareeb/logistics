require('babel-register')({
  presets: [ 'env' ]
});
require('babel-polyfill');
const http = require('http');
const express = require('express');
const debug = require('debug')('logisitcs:server');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const shipmentRouter = require('../src/routes/shipment');


const app = express();

let port = process.env.PORT || '3000';
app.set('port', port);


// parse application/json
app.use(bodyParser.json({
  limit: '4000kb',
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(cors());
app.use('/', shipmentRouter);

// error handler
app.on('error', (appErr, appCtx) => {
  console.error('app error', appErr.stack);
  console.error('on url', appCtx.req.url);
  console.error('with headers', appCtx.req.headers);
});

/**
 * Listen on provided port, on all network interfaces.
 */
app.server = http.createServer(app);

app.server.listen(port, () => {
  console.log('server working on port '+ port);
});

app.server.on('listening', onListening);

function onListening() {
  var addr = app.server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

module.exports = app;