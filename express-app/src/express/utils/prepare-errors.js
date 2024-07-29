/**
 * From: { errors: [ { passwordConfirm: '"passwordConfirm" is required' }, {}, {} ] }
 * or form { data: { message: 'Email or password is incorrect' } }
 *
 * To: ['"passwordConfirm" is required', '...', '...']
 */
export const prepareErrors = (errors) => {
  const { data } = errors.response;

  if (Array.isArray(data)) {
    return data.map((error) => Object.values(error)[0]);
  } else if (data && data.message) {
    return [data.message];
  }

  return [];
};
