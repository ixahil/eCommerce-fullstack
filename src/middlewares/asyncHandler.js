export const asyncHandler = (fnc) => {
  return (req, res, next) => {
    fnc(req, res, next).catch((err) => next(err));
  };
};
