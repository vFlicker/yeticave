import { BaseModel } from '../base.model';
import { ValidationService } from '../validation.service';
import { BaseField } from './baseField';

export class Field extends BaseField {
  static TYPE_TEXT = 'text';
  static TYPE_NUMBER = 'number';
  static TYPE_PASSWORD = 'password';
  static TYPE_FILE = 'file';

  private model: BaseModel;
  private placeholder: string;
  private html = '';

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
    if (!this.html) {
      return `<input
        id="${this.attribute}"
        type="${this.type}"
        name="${this.attribute}"
        placeholder="${this.placeholder}"
        value="${this.model[this.attribute]}"
      >`;
    }

    return this.html;
  }

  public passwordField(): Field {
    this.type = Field.TYPE_PASSWORD;
    return this;
  }

  public numberField(): Field {
    this.type = Field.TYPE_NUMBER;
    return this;
  }

  public fileField(): Field {
    this.type = Field.TYPE_FILE;

    const fileChooser = `<div class="uploader">
      <input
        class="uploader__input"
        id="${this.attribute}"
        type="${this.type}"
        name="${this.attribute}"
        tabindex="-1" />
      <button type="button" class="uploader__button">+</button>
      <img class="uploader__image" src="${this.model.imageUrl}" width="113" height="113" />
    </div>`;

    this.html = fileChooser;
    return this;
  }

  public selectField(options: any[]): Field {
    const optionsHtml = options
      .map((option) => `<option>${option.name}</option>`)
      .join('');

    const select = `<select
      id="category"
      name="category"
    >${optionsHtml}</select>`;

    this.html = select;
    return this;
  }

  public textareaField() {
    const textarea = `<textarea
      id="${this.attribute}"
      name="${this.attribute}"
      placeholder="${this.placeholder}"
    >${this.model[this.attribute]}</textarea>`;

    this.html = textarea;
    return this;
  }
}
