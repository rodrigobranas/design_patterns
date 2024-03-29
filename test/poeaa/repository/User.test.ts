import User from "../../../src/poeaa/repository/User";

test("Deve criar um novo usuário", async function () {
	const user = new User("John Doe", "john.doe@gmail.com", "abc123456");
	expect(user.getName()).toBe("John Doe");
	expect(user.getEmail()).toBe("john.doe@gmail.com");
	expect(user.getPassword()).toBe("abc123456");
	expect(user.getStatus()).toBe("active");
});

test("Deve modificar a senha de usuário", async function () {
	const user = new User("John Doe", "john.doe@gmail.com", "abc123456");
	user.updatePassword("asd456789");
	expect(user.getPassword()).toBe("asd456789");
});

test("Não deve modificar a senha do usuário se ela não tiver no mínimo 8 caracteres", async function () {
	const user = new User("John Doe", "john.doe@gmail.com", "abc123456");
	expect(() => user.updatePassword("asd456")).toThrow(new Error("Minimum length is 8"));
});

test("Não deve modificar o email do usuário se ele for inválido", async function () {
	const user = new User("John Doe", "john.doe@gmail.com", "abc123456");
	expect(() => user.updateEmail("john.doe")).toThrow(new Error("Invalid email"));
});

test("Deve bloquear o usuário", async function () {
	const user = new User("John Doe", "john.doe@gmail.com", "abc123456");
	user.block();
	expect(user.getStatus()).toBe("blocked");
});
