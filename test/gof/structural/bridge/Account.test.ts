import Driver from "../../../../src/gof/structural/bridge/Driver";
import Passenger from "../../../../src/gof/structural/bridge/Passenger";


test("Deve criar uma conta de usuário do tipo passageiro", function () {
	const account = new Passenger("John Doe", "john.doe@gmail.com", "11111111111", "JOHN DOE", "1111 1111 1111 1111", "08/28", "123", "123456");
	expect(account.name).toBe("John Doe");
	expect(account.email).toBe("john.doe@gmail.com");
});

test("Não deve criar uma conta de usuário do tipo passageiro com o nome inválido", function () {
	expect(() => new Passenger("John", "john.doe@gmail.com", "11111111111", "JOHN DOE", "1111 1111 1111 1111", "08/28", "123", "123456")).toThrow(new Error("Invalid name"));
});

test("Não deve criar uma conta de usuário do tipo passageiro com o email inválido", function () {
	expect(() => new Passenger("John Doe", "john.doe@gmail", "11111111111", "JOHN DOE", "1111 1111 1111 1111", "08/28", "123", "123456")).toThrow(new Error("Invalid email"));
});

test("Não deve criar uma conta de usuário do tipo passageiro com o documento inválido", function () {
	expect(() => new Passenger("John Doe", "john.doe@gmail.com", "1111111111", "JOHN DOE", "1111 1111 1111 1111", "08/28", "123", "123456")).toThrow(new Error("Invalid document"));
});

test("Não deve criar uma conta de usuário do tipo passageiro com o cvv inválido", function () {
	expect(() => new Passenger("John Doe", "john.doe@gmail.com", "11111111111", "JOHN DOE", "1111 1111 1111 1111", "08/28", "12", "123456")).toThrow(new Error("Invalid cvv"));
});

test("Deve criar uma conta de usuário do tipo motorista", function () {
	const account = new Driver("John Doe", "john.doe@gmail.com", "11111111111", "AAA9999", "123456");
	expect(account.name).toBe("John Doe");
	expect(account.email).toBe("john.doe@gmail.com");
});

test("Não deve criar uma conta de usuário do tipo motorista com a placa do carro inválida", function () {
	expect(() => new Driver("John Doe", "john.doe@gmail.com", "11111111111", "AAA999", "123546")).toThrow(new Error("Invalid car plate"));
});

test("Deve validar a senha armazenada em texto plano de uma conta de usuário do tipo passageiro", function () {
	const account = new Passenger("John Doe", "john.doe@gmail.com", "11111111111", "JOHN DOE", "1111 1111 1111 1111", "08/28", "123", "123456", "plaintext");
	console.log(account.password);
	expect(account.passwordMatches("123456")).toBe(true);
});

test("Deve validar a senha armazenada em SHA1 de uma conta de usuário do tipo passageiro", function () {
	const account = new Passenger("John Doe", "john.doe@gmail.com", "11111111111", "JOHN DOE", "1111 1111 1111 1111", "08/28", "123", "123456", "sha1");
	console.log(account.password);
	expect(account.passwordMatches("123456")).toBe(true);
});