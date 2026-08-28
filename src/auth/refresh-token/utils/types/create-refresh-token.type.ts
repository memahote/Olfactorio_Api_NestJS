export type CreateRefreshToken = {
  userId: string;
  hashedToken: string;
  expiresAt: Date;
};
