import ParkingTicket from "./ParkingTicket"
import ParkingTicketRepository from "./ParkingTicketRepository"

export default class Checkout {

	constructor (readonly parkingTicketRepository: ParkingTicketRepository) {
	}

	async execute (input: Input): Promise<Output> {
		const parkingTicket = await this.parkingTicketRepository.getByPlate(input.plate);
		if (!parkingTicket) throw new Error("Parking ticket not found");
		parkingTicket.checkout(input.checkoutDate);
		await this.parkingTicketRepository.update(parkingTicket);
		return {
			plate: parkingTicket.plate,
			fare: parkingTicket.fare
		}
	}
}

type Input = {
	plate: string,
	checkoutDate: Date
}

type Output = {
	plate: string,
	fare: number
}
