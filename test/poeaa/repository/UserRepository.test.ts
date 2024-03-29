import User from "../../../src/poeaa/repository/User";
import { UserRepositoryDatabase } from "../../../src/poeaa/repository/UserRepository";

test("Deve salvar um novo usuário", async function () {
	const email = `john.doe${Math.random()}@gmail.com`;
	const user = new User("John Doe", email, "abc123456");
	const userRepository = new UserRepositoryDatabase();
	await userRepository.save(user);
	const savedUser = await userRepository.getByEmail(email);
	expect(savedUser.getName()).toBe("John Doe");
	expect(savedUser.getEmail()).toBe(email);
	expect(savedUser.getPassword()).toBe("abc123456");
	expect(savedUser.getStatus()).toBe("active");
	await userRepository.delete(email);
});

test("Deve atualizar um usuário", async function () {
	const email = `john.doe${Math.random()}@gmail.com`;
	const user = new User("John Doe", email, "abc123456");
	const userRepository = new UserRepositoryDatabase();
	await userRepository.save(user);
	const savedUser = await userRepository.getByEmail(email);
	savedUser.updatePassword("asd456789");
	await userRepository.update(savedUser);
	const updatedUser = await userRepository.getByEmail(email);
	expect(updatedUser.getPassword()).toBe("asd456789");
	await userRepository.delete(email);
});

test("Deve listar três usuários", async function () {
	const userRepository = new UserRepositoryDatabase();
	await userRepository.save(new User("John Doe", `john.doe1@gmail.com`, "abc123456"));
	await userRepository.save(new User("John Doe", `john.doe2@gmail.com`, "abc123456"));
	await userRepository.save(new User("John Doe", `john.doe3@gmail.com`, "abc123456"));
	const users = await userRepository.list();
	expect(users).toHaveLength(3);
	await userRepository.delete(`john.doe1@gmail.com`);
	await userRepository.delete(`john.doe2@gmail.com`);
	await userRepository.delete(`john.doe3@gmail.com`);
});
