import FlightTicketBuilder from "./FlightTicketBuilder";

export default class FlightTicket {
	airline: string;
	flightCode: string;
	fromAirport: string;
	toAirport: string;
	passengerName: string;
	passengerEmail: string;
	passengerDocument: string;
	passengerGender: string;
	emergencyContactName: string;
	emergencyContactTelephone: string;
	seat: string;
	checkedBags: number;
	hasCheckin: boolean;
	terminal: string;
	gate: string;
	priority: number;

	constructor (builder: FlightTicketBuilder) {
		this.airline = builder.airline;
		this.fromAirport = builder.fromAirport;
		this.toAirport = builder.toAirport;
		this.flightCode = builder.flightCode;
		this.passengerName = builder.passengerName;
		this.passengerEmail = builder.passengerEmail;
		this.passengerDocument = builder.passengerDocument;
		this.passengerGender = builder.passengerGender;
		this.emergencyContactName = builder.emergencyContactName;
		this.emergencyContactTelephone = builder.emergencyContactTelephone;
		this.seat = builder.seat;
		this.checkedBags = builder.checkedBags;
		this.hasCheckin = builder.hasCheckin;
		this.terminal = builder.terminal;
		this.gate = builder.gate;
		this.priority = builder.priority;
	}
}