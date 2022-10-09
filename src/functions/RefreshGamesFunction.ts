import {Event, Jwt, Response, Function} from 'twitch-ext-services/src';
import {Game, Steam} from "../steam";
import {TwitchAuth} from 'twitch-ext-services/src/twitch-auth';

interface RefreshGamesResponse extends Response {
	status: string;
	games: Game[];
}

export class RefreshGamesFunction extends Function {

	constructor(public config: any) {
		super(config);
	}

	public async handle(event: Event): Promise<RefreshGamesResponse> {

		const token: TwitchAuth = this.getToken(event);

		const steam = new Steam(this.config.steam.key);
		const body = JSON.parse(event.body);
		const id = body.id;

		const games: Game[] = await steam.getOwnedGames(id);

		if (games == null || games.length === 0) {
			// this is a private/friends-only account
			return {status: 'ok', games: []};
		}

		console.log("Found these games: " + JSON.stringify(games));

		return {
			status: 'ok',
			games,
		};
	}
}
