import User from '#models/User';
import { Op } from 'sequelize';

export const findByUsername = (username) => {
  return User.findOne({
    where: { username }
  });
};

export const save = (user) => {
  if (user.id) {
    return User.update(user, {
      where: { id: user.id },
      returning: true
    });
  }
  
  return User.create(user);
};
