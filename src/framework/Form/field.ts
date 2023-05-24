import { BaseModel } from '../base.model';
import { ValidationService } from '../validation.service';
import { BaseField } from './baseField';

export class Field extends BaseField {
  static TYPE_TEXT = 'text';
  static TYPE_PASSWORD = 'password';
  static TYPE_FILE = 'file';

  private model: BaseModel;
  private placeholder: string;

  constructor(
    model: BaseModel,
    validation: ValidationService,
    attribute: string,
    placeholder: string,
    label: string,
  ) {
    super(validation, attribute, label);
    this.type = Field.TYPE_TEXT;
    this.placeholder = placeholder;
    this.model = model;
  }

  public renderInput(): string {
    return `<input
      id="${this.attribute}"
      type="${this.type}"
      name="${this.attribute}"
      placeholder="${this.placeholder}"
      value="${this.model[this.attribute]}"
    >`;
  }

  public passwordField(): Field {
    this.type = Field.TYPE_PASSWORD;
    return this;
  }

  public fileField(): Field {
    this.type = Field.TYPE_FILE;
    return this;
  }
}
