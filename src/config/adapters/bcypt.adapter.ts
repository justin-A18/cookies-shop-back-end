import { hashSync, compareSync, genSaltSync } from 'bcrypt';

export class BcryptAdapter {
  public async hash(password: string): Promise<string> {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  }

  public async compare(password: string, hash: string): Promise<boolean> {
    return compareSync(password, hash);
  }
}
