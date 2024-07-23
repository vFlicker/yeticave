import { HttpCode } from '../../constants.js';

export const lotExist = (lotService) => async (req, res, next) => {
  const { lotId } = req.params;
  const lot = await lotService.findOne(+lotId);

  if (!lot) {
    return res
      .status(HttpCode.NOT_FOUND)
      .json({ message: `Lot with id ${lotId} not found` });
  }

  next();
};
