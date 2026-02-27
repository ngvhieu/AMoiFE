import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { RootState } from '../store';
import type {
  LoginRequest, LoginResponse,
  RegisterRequest, RegisterResponse,
  VerifyEmailRequest, MessageResponse,
  ResendOtpRequest,
  ForgotPasswordRequest,
  VerifyResetOtpRequest, VerifyResetOtpResponse,
  ResetPasswordRequest,
  RefreshRequest,
} from '@/common/types/auth';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/auth`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.accessToken;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({ url: '/login', method: 'POST', body }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({ url: '/register', method: 'POST', body }),
    }),
    verifyEmail: builder.mutation<MessageResponse, VerifyEmailRequest>({
      query: (body) => ({ url: '/verify-email', method: 'POST', body }),
    }),
    resendOtp: builder.mutation<MessageResponse, ResendOtpRequest>({
      query: (body) => ({ url: '/resend-otp', method: 'POST', body }),
    }),
    forgotPassword: builder.mutation<MessageResponse, ForgotPasswordRequest>({
      query: (body) => ({ url: '/forgot-password', method: 'POST', body }),
    }),
    verifyResetOtp: builder.mutation<VerifyResetOtpResponse, VerifyResetOtpRequest>({
      query: (body) => ({ url: '/verify-reset-otp', method: 'POST', body }),
    }),
    resetPassword: builder.mutation<MessageResponse, ResetPasswordRequest>({
      query: (body) => ({ url: '/reset-password', method: 'POST', body }),
    }),
    refresh: builder.mutation<{ accessToken: string }, RefreshRequest>({
      query: (body) => ({ url: '/refresh', method: 'POST', body }),
    }),
    logout: builder.mutation<{ success: boolean }, { refreshToken: string }>({
      query: (body) => ({ url: '/logout', method: 'DELETE', body }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useVerifyEmailMutation,
  useResendOtpMutation,
  useForgotPasswordMutation,
  useVerifyResetOtpMutation,
  useResetPasswordMutation,
  useRefreshMutation,
  useLogoutMutation,
} = authApi;
