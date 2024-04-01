import BookRoom from "../../../../src/gof/structural/decorator/BookRoom";
import { BookingRepositoryDatabase } from "../../../../src/gof/structural/decorator/BookingRepository";
import CancelBooking from "../../../../src/gof/structural/decorator/CancelBooking";
import GetBookingByCode from "../../../../src/gof/structural/decorator/GetBookingByCode";
import { RoomRepositoryDatabase } from "../../../../src/gof/structural/decorator/RoomRepository";

test("Deve reservar um quarto", async function () {
	const roomRepository = new RoomRepositoryDatabase();
	const bookingRepository = new BookingRepositoryDatabase();
	const bookRoom = new BookRoom(roomRepository, bookingRepository);
	const input = {
		email: "john.doe@gmail.com",
		checkinDate: new Date("2021-03-01T10:00:00"),
		checkoutDate: new Date("2021-03-05T10:00:00"),
		category: "suite"
	}
	const outputBookRoom = await bookRoom.execute(input);
	const getBookingByCode = new GetBookingByCode(roomRepository, bookingRepository);
	const outputGetBookingByCode = await getBookingByCode.execute({ code: outputBookRoom.code });
	expect(outputGetBookingByCode.duration).toBe(4);
	expect(outputGetBookingByCode.price).toBe(2000);
	const cancelBooking = new CancelBooking(bookingRepository);
	await cancelBooking.execute({ code: outputBookRoom.code });
});
