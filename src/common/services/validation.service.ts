import { ObjectSchema } from 'joi';

type Errors = Record<string, string>;

export class ValidationService {
  private schema;
  private data;
  private errors: Errors = {};

  constructor(schema: ObjectSchema<any>, data: any) {
    this.schema = schema;
    this.data = data;
  }

  public validate(): this {
    const { error } = this.schema.validate(this.data, { abortEarly: false });

    if (error) {
      for (const { context, message } of error.details) {
        this.errors[context!.label!] = message;
      }
    }

    return this;
  }

  public isValid(): boolean {
    return Object.keys(this.errors).length === 0;
  }

  public hasErrors(): boolean {
    return !this.isValid();
  }

  public getErrors(): Errors {
    return this.errors;
  }
}
