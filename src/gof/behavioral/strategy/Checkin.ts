import ParkingTicket from "./ParkingTicket"
import ParkingTicketRepository from "./ParkingTicketRepository"

export default class Checkin {

	constructor (readonly parkingTicketRepository: ParkingTicketRepository) {
	}

	async execute (input: Input): Promise<void> {
		const existingTicket = await this.parkingTicketRepository.getByPlate(input.plate);
		if (existingTicket) throw new Error("Duplicated plate");
		const parkingTicket = new ParkingTicket(input.plate, input.checkinDate, input.location);
		await this.parkingTicketRepository.save(parkingTicket);	
	}
}

type Input = {
	plate: string,
	checkinDate: Date,
	location: string
}
