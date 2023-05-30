import { BaseModel } from '../base.model';

type BaseModelConstructor = typeof BaseModel;
type BaseModelConstructorParams = ConstructorParameters<BaseModelConstructor>;

export type ExtendedModel<T> = (new (
  ...params: BaseModelConstructorParams
) => T) &
  BaseModelConstructor;
