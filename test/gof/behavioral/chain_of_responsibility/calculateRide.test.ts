import { calculateFare } from "../../../../src/gof/behavioral/chain_of_responsibility/calculateRide";

test("Deve calcular o valor da corrida no horário normal", function () {
	const segments = [
		{ distance: 10, date: new Date("2021-03-01T10:00:00") }
	];
	const fare = calculateFare(segments);
	expect(fare).toBe(21);
});

test("Deve calcular o valor da corrida no horário noturno", function () {
	const segments = [
		{ distance: 10, date: new Date("2021-03-01T23:00:00") }
	];
	const fare = calculateFare(segments);
	expect(fare).toBe(39);
});

test("Deve calcular o valor da corrida no horário de domingo", function () {
	const segments = [
		{ distance: 10, date: new Date("2021-03-07T10:00:00") }
	];
	const fare = calculateFare(segments);
	expect(fare).toBe(29);
});

test("Deve calcular o valor da corrida no horário de domingo a noite", function () {
	const segments = [
		{ distance: 10, date: new Date("2021-03-07T23:00:00") }
	];
	const fare = calculateFare(segments);
	expect(fare).toBe(50);
});

test("Deve calcular o valor da corrida com tarifa mínima", function () {
	const segments = [
		{ distance: 2, date: new Date("2021-03-01T10:00:00") }
	];
	const fare = calculateFare(segments);
	expect(fare).toBe(10);
});

test("Não deve calcular o valor da corrida se a distância for inválida", function () {
	const segments = [
		{ distance: null, date: new Date("2021-03-01T10:00:00") }
	];
	expect(() => calculateFare(segments)).toThrow(new Error("Invalid distance"));
});

test("Não deve calcular o valor da corrida se a data for inválida", function () {
	const segments = [
		{ distance: 10, date: new Date("javascript") }
	];
	expect(() => calculateFare(segments)).toThrow(new Error("Invalid date"));
});
