import crypto from "crypto";
import Room from "./Room";

export default class Booking {

	constructor (readonly code: string, readonly roomId: number, readonly email: string, readonly checkinDate: Date, readonly checkoutDate: Date, readonly duration: number, readonly price: number, private status: string) {
	}

	static create (room: Room, email: string, checkinDate: Date, checkoutDate: Date) {
		const code = crypto.randomUUID();
		const duration = (checkoutDate.getTime() - checkinDate.getTime())/(1000*60*60*24);
		const price = duration * room.price;
		const status = "confirmed";
		return new Booking(code, room.roomId, email, checkinDate, checkoutDate, duration, price, status);
	}

	cancel () {
		this.status = "cancelled";
	}

	getStatus () {
		return this.status;
	}
}
