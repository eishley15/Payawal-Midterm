import http from 'http';
import EventEmitter from 'events';
// const EventEmitter = require('node:events');
const eventEmitter = new EventEmitter();

const requestHandler = (req, res) => {
    if (req.url === '/') {
        eventEmitter.emit('HomePageEvent', res);
    }   else {
        res.writeHead(404, {'content-type' : 'text/plain'})
        res.write('page not found')
        res.end();
    }
}

// Load the Homepage
eventEmitter.on('HomePageEvent', (res) => {
    res.writeHead(200, {'content-type' : 'text/html'})
    res.write('<html><body><p>Homepage</p></body></html>')
    res.end();
});

eventEmitter.on('HomePageEvent', (res) => {
    // Asynchronousluy Log That Homepage is loaded
    console.log("Homepage loaded");
});

eventEmitter.on('HomePageEvent', (req, res) => {
    // Asynchronousluy Log IP Address
    console.log("Visited Homepage from IP", req.socket.remoteAddress)
});

var server = http.createServer( requestHandler);

server.listen(5000, () => {
    console.log('Server running at http://localhost:5000');
});

