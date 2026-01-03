import { z } from 'zod';
import * as loginService from '#services/user/login';
import asyncHandler from '#utils/async-handler';

const loginRequestDTO = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export const login = asyncHandler(async (req, res, next) => {
  const requestDTO = loginRequestDTO.parse(req.body);

  const responseDTO = await loginService.login(requestDTO);

  return res.status(200).json({
    success: true,
    data: responseDTO
  });
});
