import {config} from "./config";
import {Event} from 'hype-server/dist/src';
import {RefreshGamesFunction} from "./src/functions/RefreshGamesFunction";

export class Service {

	public handle(event: Event, context: any, callback: any): void {

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

