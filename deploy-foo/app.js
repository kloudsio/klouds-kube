// the app for testing infrastructure deployment

import http from'http'
import koa from 'koa'
import json from 'koa-json'
import os from 'os'
import net from 'net'


let fieldreport = {
	hertz: "bmmbmmpm bmmbmmpm... bmmbmmpm bmmbmmpm...",
	hostname: os.hostname(),
	memory: {
		free: os.freemem() / 1024 / 1024 + " i.e. (" + os.freemem() + ")",
		total: os.totalmem() / 1024 / 1024 + " i.e. (" + os.totalmem() + ")",
	},
	network: os.networkInterfaces(),
	env: process.env
}

let app = koa()
app.use(json({pretty: true}))

app.use(function*(next) {
	yield next
	this.body = fieldreport
	this.body.koa = this
	this.body.env = process.env
})

console.log("Heart goes bmmbmmpm bmmbmmpm??\n")
console.log("\ncurl -i localhost:8080/heartbeat\n\n")


http.createServer(app.callback()).listen(8000, () => console.log(` bmmbmpppm?  -> curl -i localhost:8000/heartbeat`))
http.createServer(app.callback()).listen(8080, () => console.log(` bmmbmpppm?  -> curl -i localhost:8080/heartbeat`))

const server = net.createServer(c => {
    console.log('client connected');
    c.on('end', () => {
        console.log('client disconnected');
    });
    c.write('Hello. \r\n');
    c.write(JSON.stringify(c.socket));
    c.pipe(c);
});
server.listen(8124, () => {
    console.log('TCP Server bound 8124  -> telnet localhost 8124');
});