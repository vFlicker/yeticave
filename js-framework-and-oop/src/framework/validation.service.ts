import { ObjectSchema } from 'joi';

import { ValidationErrors } from './types';

export class ValidationService {
  private schema;
  private data;
  private errors: ValidationErrors = {};

  constructor(schema: ObjectSchema<any>, data: any) {
    this.schema = schema;
    this.data = data;
  }

  public validate(): this {
    const { error } = this.schema.validate(this.data, { abortEarly: false });

    if (error) {
      for (const { context, message } of error.details) {
        const { label } = context!;
        this.errors[label!] = message;
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

  public hasError(name: string): boolean {
    return Boolean(this.errors[name]);
  }

  public getErrors(): ValidationErrors {
    return this.errors;
  }

  public getError(name: string): string {
    return this.errors[name];
  }

  public setError(label: string, message: string): void {
    this.errors[label] = message;
  }
}
