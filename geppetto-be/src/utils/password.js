import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

/**
 * Generates a secure hash from a plain-text password
 */
export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return await bcrypt.hash(password, salt);
};

/**
 * Compares a plain-text password with a stored hash
 */
export const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};
