import Ticket from "../../../../src/gof/behavioral/state/Ticket";

test("Deve realizar transições de estado em um chamado", function () {
	const customerId = 1;
	const ticket = new Ticket(customerId, new Date("2021-03-01T08:00:00"));
	expect(ticket.getStatus()).toBe("requested");
	expect(ticket.getStatistics(new Date("2021-03-01T09:00:00")).requestDuration).toBe(1);
	const employeeId = 2;
	ticket.assign(employeeId, new Date("2021-03-01T10:00:00"));
	expect(ticket.getStatistics(new Date("2021-03-01T11:00:00")).assignDuration).toBe(1);
	expect(ticket.getStatus()).toBe("assigned");
	ticket.start(new Date("2021-03-01T16:00:00"));
	expect(ticket.getStatus()).toBe("in_progress");
	ticket.close(new Date("2021-03-01T18:00:00"));
	expect(ticket.getStatus()).toBe("closed");
});
