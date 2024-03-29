import ParkingTicket from "../../../../src/gof/behavioral/strategy/ParkingTicket";

test("Deve calcular a tarifa do veículo estacionado no aeroporto", async function () {
	const parkingTicket = new ParkingTicket("AAA9999", new Date("2023-03-01T10:00:00"), "airport");
	parkingTicket.checkout(new Date("2023-03-01T12:00:00"));
	expect(parkingTicket.fare).toBe(20);
});
