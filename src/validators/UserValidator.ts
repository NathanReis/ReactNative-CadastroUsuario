import { IUser } from '../interfaces/IUser';

export class UserValidator {
  public static validate(user: IUser, passwordConfirmation: string): string[] {
    let errors: string[] = [];

    this.getCodeErrors(user.code).forEach(error => errors.push(error));
    this.getNameErrors(user.name).forEach(error => errors.push(error));
    this.getEmailErrors(user.email).forEach(error => errors.push(error));

    let passwordIsInvalid = false;

    this.getPasswordErrors(user.password).forEach(error => {
      passwordIsInvalid = true;
      errors.push(error)
    });

    if (!passwordIsInvalid) {
      this.getPasswordConfirmationErrors(user.password, passwordConfirmation).forEach(error => errors.push(error));
    }

    return errors;
  }

  private static getCodeErrors(code: number): string[] {
    let errors: string[] = [];

    if (code <= 0) {
      errors.push('Código deve ser maior que 0.');
    }

    return errors;
  }

  private static getNameErrors(name: string): string[] {
    let errors: string[] = [];

    if (name.length === 0) {
      errors.push('Nome é obrigatório.');
    }

    return errors;
  }

  private static getEmailErrors(email: string): string[] {
    let errors: string[] = [];

    if (email.length === 0) {
      errors.push('E-mail é obrigatório.');
    } else if (!/\w+(\.\w+)*@\w+(\.\w+)+/.test(email)) {
      errors.push('E-mail no formato incorreto.');
    }

    return errors;
  }

  private static getPasswordErrors(password: string): string[] {
    let errors: string[] = [];

    if (password.length < 5) {
      errors.push('Senha deve ter no mínimo 5 caracteres.');
    }

    if (!/[A-Z]+/.test(password)) {
      errors.push('Senha deve ter no mínimo 1 (uma) letra maiúscula.');
    }

    if (!/\d+/.test(password)) {
      errors.push('Senha deve ter no mínimo 1 (um) número.');
    }

    return errors;
  }

  private static getPasswordConfirmationErrors(password: string, passwordConfirmation: string): string[] {
    let errors: string[] = [];

    if (password !== passwordConfirmation) {
      errors.push('Confirmação de senha é diferente da original.');
    }

    return errors;
  }
}
