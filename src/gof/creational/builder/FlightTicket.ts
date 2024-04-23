export class FlightTicket {

	constructor (
		readonly pnr: string,
		readonly airline: string,
		readonly fromAirport: string, 
		readonly toAirport: string,
		readonly flightCode: string,
		readonly passengerName: string,
		readonly passengerDocument: string,
		readonly passengerGender: string,
		readonly passengerBirthdate: string,
		readonly emergencyContactName: string,
		readonly emergencyContactTelephone: string,
		readonly seat: string,
		readonly checkedBaggage: number,
		readonly hasCheckin: boolean,
		readonly terminal: string,
		readonly gate: string,
		readonly priority: number,
		private status: string
	) {
	}

	cancel () {
		this.status = "cancelled";
	}

	getStatus () {
		return this.status;
	}
	
}
