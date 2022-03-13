import { IUser } from "../interfaces/IUser";
import { UserRepository } from "../repositories/UserRepository";
import { UserValidator } from "../validators/UserValidator";

export class UserService {
  private readonly repository;
  private readonly validator;

  public constructor() {
    this.repository = new UserRepository();
    this.validator = new UserValidator(this);
  }

  public async getAll(): Promise<IUser[]> {
    let users = await this.repository.getAll();

    return users;
  }

  public async getByCode(code: number): Promise<IUser | null> {
    let user = await this.repository.getByCode(code);

    return user;
  }

  public async create(user: IUser, passwordConfirmation: string): Promise<string[] | void> {
    let errors = await this.validator.validateCreate(user, passwordConfirmation);

    if (errors.length > 0) {
      return errors;
    }

    await this.repository.create(user);
  }

  public async update(user: IUser, passwordConfirmation: string): Promise<string[] | void> {
    let errors = await this.validator.validateUpdate(user, passwordConfirmation);

    if (errors.length > 0) {
      return errors;
    }

    await this.repository.update(user);
  }

  public async delete(code: number): Promise<void> {
    await this.repository.delete(code);
  }
}
