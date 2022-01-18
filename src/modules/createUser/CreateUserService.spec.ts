import { User } from "../../entities/User";
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "../../repositories/IUsersRepositories";
import { CreateUserService } from "./CreateUserService";

describe("Create user",()=>{
  let usersReporsitory :IUsersRepository;
  let createUserService:CreateUserService;

  beforeAll(()=>{
    usersReporsitory = new  UsersRepositoryInMemory();
    createUserService = new CreateUserService(usersReporsitory );

  })

  it("should be able to a create new user",async ()=>{
    const userData:User={
      name: "teste",
      username: "novo",
      email: "tes2t@gmail.com"
    }
    const user = await createUserService.execute(userData);
    expect(user).toHaveProperty("id");
    expect(user.username).toBe("novo");
  })

  it("should not be able to an existing user",async ()=>{

    const userData:User={
      name: "Test exists teste",
      username: "Teste novo",
      email: "test@gmail.com",
    }

    await createUserService.execute(userData);

    // const user = await createUserService.execute(userData);

    await expect(createUserService.execute(userData))
    .rejects
    .toEqual(new Error("User already exists!"));
  });
})