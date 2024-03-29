import express, { Request, Response } from "express";
import Hapi from "@hapi/hapi";

export default interface HttpServer {
	register (method: string, url: string, callback: Function): void;
	listen (port: number): void;
}

export class ExpressAdapter implements HttpServer {
	app: any;

	constructor () {
		this.app = express();
	}

	register(method: string, url: string, callback: Function): void {
		this.app[method](url.replace(/\{|\}/g, ""), async function (req: Request, res: Response) {
			const output = await callback(req.params, req.body);
			res.json(output);
		});
	}

	listen(port: number): void {
		this.app.listen(port);
	}
	
}

export class HapiAdapter implements HttpServer {
	server: Hapi.Server;

	constructor () {
		this.server = Hapi.server({});
	}

	register(method: string, url: string, callback: Function): void {
		this.server.route({
			method,
			path: url.replace(/\:/g, ""),
			handler: async function (request: any, reply: any) {
				const output = await callback(request.params, request.body);
				return output;
			}
		});
	}

	listen(port: number): void {
		this.server.settings.port = port;
		this.server.start();
	}

}
