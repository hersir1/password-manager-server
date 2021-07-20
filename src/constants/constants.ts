export class Constants {
	private static _DB_PATH: string;
	
	
	static get DB_PATH(): string {
		return this._DB_PATH;
	}
	
	static set DB_PATH(value: string) {
		this._DB_PATH = value;
	}
}