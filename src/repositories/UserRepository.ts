import AsyncStorage from '@react-native-async-storage/async-storage';
import { IUser } from "../interfaces/IUser";

export class UserRepository {
  private readonly STORAGE_KEY = '@user_registration:users';

  public async getAll(): Promise<IUser[]> {
    let users = await AsyncStorage.getItem(this.STORAGE_KEY) || '[]';

    return JSON.parse(users);
  }

  public async getByCode(code: number): Promise<IUser | null> {
    let users = await this.getAll();
    let user = users.find(saved_user => saved_user.code === code);

    return user || null;
  }

  public async create(user: IUser): Promise<void> {
    let users = await this.getAll();
    users.push(user);

    await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  public async update(user: IUser): Promise<void> {
    let users = await this.getAll();
    users = users.map(saved_user => {
      if (saved_user.code === user.code) {
        saved_user = user;
      }

      return saved_user;
    });

    await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }

  public async delete(code: number): Promise<void> {
    let users = await this.getAll();
    users = users.filter(saved_user => saved_user.code !== code);

    await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(users));
  }
}
