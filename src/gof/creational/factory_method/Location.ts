import Coord from "./Coord";

export default class Location {
	coord: Coord;

	constructor (lat: number, long: number, readonly date: Date) {
		this.coord = new Coord(lat, long);
	}
}