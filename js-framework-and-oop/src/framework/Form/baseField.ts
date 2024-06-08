import { ValidationService } from '../validation.service';

export abstract class BaseField {
  protected validation: ValidationService;
  protected attribute: string;
  protected label: string;
  protected type = '';

  constructor(validation: ValidationService, attribute: string, label: string) {
    this.validation = validation;
    this.attribute = attribute;
    this.label = label;
  }

  public toString(): string {
    const errorClass = this.validation?.hasError(this.attribute)
      ? 'form__item--invalid'
      : '';

    return `<div class="form__item ${errorClass}">
      <label for="${this.attribute}">${this.label}</label>
      ${this.renderInput()}
      <span class="form__error">${this.validation?.getError(
        this.attribute,
      )}</span>
    </div>`;
  }

  abstract renderInput(): string;
}
