import Ticket from "./Ticket";

export default interface TicketStatus {
	value: string;

	assign (): void;
	start (): void;
	close (): void;
}

export class RequestedStatus implements TicketStatus {
	value: string;

	constructor (readonly ticket: Ticket) {
		this.value = "requested";
	}

	assign(): void {
		this.ticket.status = new AssignedStatus(this.ticket);
	}

	start(): void {
		throw new Error("Could not start ticket");
	}

	close(): void {
		throw new Error("Could not close ticket");
	}

}

export class AssignedStatus implements TicketStatus {
	value: string;

	constructor (readonly ticket: Ticket) {
		this.value = "assigned";
	}

	assign(): void {
		throw new Error("Could not assign ticket");
	}

	start(): void {
		this.ticket.status = new InProgressStatus(this.ticket);
	}

	close(): void {
		throw new Error("Could not close ticket");
	}

}

export class InProgressStatus implements TicketStatus {
	value: string;

	constructor (readonly ticket: Ticket) {
		this.value = "in_progress";
	}

	assign(): void {
		throw new Error("Could not assign ticket");
	}

	start(): void {
		throw new Error("Could not start ticket");
	}

	close(): void {
		this.ticket.status = new ClosedStatus(this.ticket);
	}

}

export class ClosedStatus implements TicketStatus {
	value: string;

	constructor (readonly ticket: Ticket) {
		this.value = "closed";
	}

	assign(): void {
		throw new Error("Could not assign ticket");
	}

	start(): void {
		throw new Error("Could not start ticket");
	}

	close(): void {
		throw new Error("Could not closed ticket");
	}

}
