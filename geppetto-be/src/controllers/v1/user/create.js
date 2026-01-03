import { z } from 'zod';
import * as createUserService from '#services/user/create';
import asyncHandler from '#utils/async-handler';

const createUserRequestDTO = z.object({
  username: z.string().min(1, 'Username is required'),
  fullName: z.string().min(1, 'Full name is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const createUser = asyncHandler(async (req, res, next) => {
  const requestDTO = createUserRequestDTO.parse(req.body);

  const newUser = await createUserService.createUser(requestDTO);

  return res.status(201).json({
    success: true,
    data: newUser
  });
});
