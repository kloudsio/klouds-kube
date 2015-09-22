// the app for testing infrastructure deployment

import http from'http'
import koa from 'koa'
import json from 'koa-json'
import os from 'os'
import net from 'net'


let app = koa()
app.use(json({pretty: true}))

app.use(function*(next) {
	yield next;
	this.body = {
		hertz: "bmmbmmpm bmmbmmpm... bmmbmmpm bmmbmmpm...",
		hostname: os.hostname(),
		memory: {
			free: os.freemem() / 1024 / 1024 + " i.e. (" + os.freemem() + ")",
			total: os.totalmem() / 1024 / 1024 + " i.e. (" + os.totalmem() + ")",
		},
		network: os.networkInterfaces(),
		ctx: this
	}
})

console.log("Heart goes bmmbmmpm bmmbmmpm??\n")
console.log("\ncurl -i localhost:8080/heartbeat\n\n")

http.createServer(app.callback()).listen(1337, () => console.log(` bmmbmpppm?  -> curl -i :1337/heartbeat`))
http.createServer(app.callback()).listen(8000, () => console.log(` bmmbmpppm?  -> curl -i :8000/heartbeat`))
http.createServer(app.callback()).listen(8080, () => console.log(` bmmbmpppm?  -> curl -i :8080/heartbeat`))
http.createServer(app.callback()).listen(8081, () => console.log(` bmmbmpppm?  -> curl -i :8081/heartbeat`))


try	{
	// .listen(80, () => console.log("success: 80"))
} catch (e) {
	// console.error("port 80 died...")
	// console.error(e)
}
