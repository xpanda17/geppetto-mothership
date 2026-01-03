import { ROLES } from '#constants/role';
import * as userQueries from '#queries/user';
import { hashPassword } from '#utils/password';

/**
 * Creates a new user with STAFF role.
 * If username unique constraint fails, it does nothing and returns null.
 */
export const createUser = async (requestDTO) => {
  try {
    const hashedPassword = await hashPassword(requestDTO.password);

    const newUser = await userQueries.create({
      username: requestDTO.username,
      fullName: requestDTO.fullName,
      hashedPassword: hashedPassword,
      role: ROLES.STAFF
    });

    return newUser;
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return await userQueries.findByUsername(requestDTO.username);
    }


    throw error;
  }
};