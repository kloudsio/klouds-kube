// the app for testing infrastructure deployment

import http from'http'
import koa from 'koa'
import json from 'koa-json'
import os from 'os'
import net from 'net'


console.log("\n\nHeartbeat\n")
console.log("... bmmbmmpm. \n")


let fieldreport = {
	hertz: "bmmbmmpm bmmbmmpm... bmmbmmpm bmmbmmpm...",
	hostname: os.hostname(),
	memory: {
		free: os.freemem() / 1024 / 1024 + " i.e. (" + os.freemem() + ")",
		total: os.totalmem() / 1024 / 1024 + " i.e. (" + os.totalmem() + ")",
	},
	network: os.networkInterfaces(),	
}

let app = koa()
app.use(json({pretty: true}))

app.use(function*(next) {
	yield next
	this.body = fieldreport
	this.body.koa = this
	this.body.env = process.env
})




http.createServer(app.callback()).listen(8080, () => console.log("WEB	curl -i localhost:8080/heartbeat\n"))

const server = net.createServer(c => {
    console.log('client connected')
    c.on('end', () => console.log('client disconnected'))
    c.write('... bmmbmmpm. <3 \n')
    c.pipe(c)
});
server.listen(8124, () => {
    console.log('TCP	telnet localhost 8124\n')
});