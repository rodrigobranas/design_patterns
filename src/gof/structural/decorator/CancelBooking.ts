import BookingRepository from "./BookingRepository";
import RoomRepository from "./RoomRepository";

export default class CancelBooking {

	constructor (readonly bookingRepository: BookingRepository) {
	}

	async execute (input: Input): Promise<void> {
		const booking = await this.bookingRepository.getBookingByCode(input.code);
		booking.cancel();
		await this.bookingRepository.update(booking);
	}
}

type Input = {
	code: string
}