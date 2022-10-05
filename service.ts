import {config} from "./config";
import {Event} from 'hype-server/dist/src';
import {RefreshGamesFunction} from "./src/functions/RefreshGamesFunction";

export class Service {

	private static logEvent(event: Event): void {

		const short: any = {};

		const ip = event.requestContext.identity.sourceIp;

		if (event.queryStringParameters) {
			short.queryStringParameters = event.queryStringParameters;
		}

		if (event.body) {
			short.body = event.body;
		}

		if (event.headers && event.headers.Authorization) {
			short.authorization = event.headers.Authorization;
		}

		console.log("Handling request: " + ip + " " + event.httpMethod + " " + event.path + " " + JSON.stringify(short));
	}

	public handle(event: Event, context: any, callback: any): void {

		Service.logEvent(event);

		switch (event.pathParameters.method) {

			case 'mysteam.games.refresh':
				const refresh = new RefreshGamesFunction(config);
				refresh.run(event, context, callback);
				break;

			default:
				callback("Don't know how to handle method " + event.pathParameters.method, null);
				break;
		}
	}
}


declare var module: any;

(module).exports = new Service();

