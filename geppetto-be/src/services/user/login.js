import { findByUsername } from '#queries/user';
import { comparePassword } from '#utils/password';
import { generateToken } from '#utils/jwt';
import { UnauthorizedError } from '#errors/unauthorized';

/**
 * Validates user credentials and returns a JWT
 * @param {Object} requestDTO - Contains username and password
 */
export const login = async (requestDTO) => {
  const user = await findByUsername(requestDTO.username);

  if (!user) {
    throw new UnauthorizedError('Invalid username or password');
  }

  const isMatch = await comparePassword(requestDTO.password, user.hashedPassword);

  if (!isMatch) {
    throw new UnauthorizedError('Invalid username or password');
  }

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user.id,
      username: user.username,
      fullName: user.fullName,
      role: user.role
    }
  };
};