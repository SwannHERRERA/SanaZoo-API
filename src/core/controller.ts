import { Response } from "express";
import { StatusCode } from "../utils/statusCode";

export class Controller {
  schema: any = null;
  protected async validate(entry: unknown, res: Response): Promise<boolean> {
    return this.schema
      .validate(entry)
      .then(() => true)
      .catch((err: Error) => {
        console.log(err);
        res.status(StatusCode.BAD_REQUEST).json(err.message).end();
        return false;
      });
  }
}
