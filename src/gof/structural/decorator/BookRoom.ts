import Booking from "./Booking";
import BookingRepository from "./BookingRepository";
import RoomRepository from "./RoomRepository";
import Usecase from "./Usecase";

export default class BookRoom implements Usecase {

	constructor (readonly roomRepository: RoomRepository, readonly bookingRepository: BookingRepository) {
	}

	async execute (input: Input): Promise<Output> {
		const [availableRoom] = await this.roomRepository.getAvailableRoomsByPeriodAndCategory(input.checkinDate, input.checkoutDate, input.category);
		if (!availableRoom) throw new Error("Room is not available");
		const booking = Booking.create(availableRoom, input.email, input.checkinDate, input.checkoutDate);
		await this.bookingRepository.save(booking);
		return {
			code: booking.code
		}
	}
}

type Input = {
	email: string,
	checkinDate: Date,
	checkoutDate: Date,
	category: string
}

type Output = {
	code: string
}
