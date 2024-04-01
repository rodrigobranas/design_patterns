import BookingRepository from "./BookingRepository";
import RoomRepository from "./RoomRepository";

export default class GetBookingByCode {

	constructor (readonly roomRepository: RoomRepository, readonly bookingRepository: BookingRepository) {
	}

	async execute (input: Input): Promise<Output> {
		const booking = await this.bookingRepository.getBookingByCode(input.code);
		const room = await this.roomRepository.getById(booking.roomId);
		return {
			code: booking.code,
			category: room.category,
			duration: booking.duration,
			price: booking.price
		}
	}
}

type Input = {
	code: string
}

type Output = {
	code: string,
	category: string,
	duration: number,
	price: number
}
