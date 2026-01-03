import User from '#models/User';

export const findByUsername = (username) => {
  return User.findOne({
    where: { username }
  });
};

export const create = (user) => {
  return User.create(user);
};
