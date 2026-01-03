export const createUser = async (req, res, next) => {
  return res.status(201).json({
    success: true,
    data: {
      id: 'dummy-id'
    }
  });
};
