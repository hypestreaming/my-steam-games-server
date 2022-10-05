import {config} from "../config";

const request = require('request');

export interface Game {
	id: number;
	name: string;
}

interface OwnedGame {
	appid: number;
	img_logo_url: string;
	name: string;
}

interface GetOwnedGamesResponse {
	response: {
		game_count: number;
		games: OwnedGame[];
	};
}

export class Steam
{
	constructor(private key: string) {
	}

	public getOwnedGames(id: string): Promise<any> {

		return new Promise((resolve, reject) => {

			const url = 'https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?steamid=' + id + '&format=json&key=' + this.key + '&include_appinfo=1';
			request({url}, (err: any, response: any) => {

				const body = response.body;
				console.log("Response for steam api: " + body);

				const json = JSON.parse(body);
				const data: GetOwnedGamesResponse = json;

				if (!data.response.games) {
					// empty response
					resolve([]);
					return;
				}

				// games are returned in ASC and we want to show DESC
				const games = data.response.games.reverse();

				const out: Game[] = [];
				for (const game of games) {
					out.push({
						id: game.appid,
						name: game.name,
					});
				}

				resolve(out);
			});
		});
	}
}
