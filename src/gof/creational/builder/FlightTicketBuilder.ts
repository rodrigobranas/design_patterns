export class FlightTicket {
	readonly pnr?: string;
	readonly airline: string;
	readonly fromAirport: string; 
	readonly toAirport: string;
	readonly flightCode: string;
	readonly passengerName: string;
	readonly passengerDocument: string;
	readonly passengerGender: string;
	readonly passengerBirthdate: string;
	readonly emergencyContactName: string;
	readonly emergencyContactTelephone: string;
	readonly seat: string;
	readonly checkedBaggage: number;
	readonly hasCheckin: boolean;
	readonly terminal: string;
	readonly gate: string;
	readonly priority: number;
	private status?: string;

	constructor (builder: FlightTicketBuilder) {
		this.airline = builder.airline;
		this.fromAirport = builder.fromAirport;
		this.toAirport = builder.toAirport;
		this.flightCode = builder.flightCode;
		this.passengerName = builder.passengerName;
		this.passengerDocument = builder.passengerDocument;
		this.passengerGender = builder.passengerGender;
		this.passengerBirthdate = builder.passengerBirthdate;
		this.emergencyContactName = builder.emergencyContactName;
		this.emergencyContactTelephone = builder.emergencyContactTelephone;
		this.seat = builder.seat;
		this.checkedBaggage = builder.checkedBaggage;
		this.hasCheckin = builder.hasCheckin;
		this.terminal = builder.terminal;
		this.gate = builder.gate;
		this.priority = builder.priority;
	}

	cancel () {
		this.status = "cancelled";
	}

	getStatus () {
		return this.status;
	}
	
}

export class FlightTicketBuilder {
	airline!: string;
	fromAirport!: string;
	toAirport!: string;
	flightCode!: string;
	passengerName!: string;
	passengerDocument!: string;
	passengerGender!: string;
	passengerBirthdate!: string;
	emergencyContactName!: string;
	emergencyContactTelephone!: string;
	seat!: string;
	checkedBaggage!: number;
	hasCheckin!: boolean;
	terminal!: string;
	gate!: string;
	priority!: number;

	constructor () {}
	
	setAirline (airline: string) {
		this.airline = airline;
		return this;
	}

	setTrip (fromAirport: string, toAirport: string) {
		this.fromAirport = fromAirport;
		this.toAirport = toAirport;
		return this;
	}

	setPassenger (name: string, document: string, gender: string, birthdate: string) {
		this.passengerName = name;
		this.passengerDocument = document;
		this.passengerGender = gender;
		this.passengerBirthdate = birthdate;
		return this;
	}

	setEmergencyContact (name: string, telephone: string) {
		this.emergencyContactName = name;
		this.emergencyContactTelephone = telephone;
		return this;
	}

	setSeat (seat: string) {
		this.seat = seat;
		return this;
	}

	setCheckin (terminal: string, gate: string) {
		this.hasCheckin = true;
		this.terminal = terminal;
		this.gate = gate;
		return this;
	}

	build () {
		const flightTicket = new FlightTicket(this);
		return flightTicket;
	}
}
