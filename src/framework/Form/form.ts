import { BaseModel } from '../base.model';
import { ValidationService } from '../validation.service';
import { Field } from './field';

export class Form {
  constructor(
    private model: BaseModel,
    private validation: ValidationService,
  ) {}

  public begin(
    action: string,
    method: string,
    options: Record<string, string> = {},
  ): string {
    const errorClass = this.validation?.hasErrors() ? 'form--invalid' : '';

    const attributes = Object.entries(options)
      .map(([key, value]) => `${key}=${value}`)
      .join(' ');

    return `<form
      action="${action}"
      method="${method}"
      class="form container ${errorClass}"
      ${attributes}>
    `;
  }

  public field(label = '', attribute = '', placeholder = ''): Field {
    return new Field(
      this.model,
      this.validation,
      attribute,
      placeholder,
      label,
    );
  }

  public errorBlock(): string {
    const message = this.validation?.getError('blockMessage');
    return message ? `<div class='form__error-message'>${message}</div>` : '';
  }

  public end(): string {
    return `</form>`;
  }
}
