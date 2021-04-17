import { Response } from "express";

export class Controller {
  schema: any = null;
  protected async validate(entry: unknown, res: Response): Promise<boolean> {
    return this.schema
      .validate(entry)
      .then(() => true)
      .catch((err: Error) => {
        res.status(400).json(err.message).end();
        return false;
      });
  }
}
