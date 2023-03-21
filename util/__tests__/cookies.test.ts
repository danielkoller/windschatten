import cookie, { CookieSerializeOptions } from 'cookie';
import {
  createSerializedRegisterSessionTokenCookie,
  deleteSerializedRegisterSessionTokenCookie,
} from '../cookies';

describe('cookies', () => {
  let serializeSpy: jest.SpyInstance;

  beforeEach(() => {
    serializeSpy = jest.spyOn(cookie, 'serialize');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createSerializedRegisterSessionTokenCookie', () => {
    it('should serialize a session token cookie with correct options', () => {
      const token = 'test_token';
      const maxAge = 60 * 60 * 24;

      createSerializedRegisterSessionTokenCookie(token);

      expect(serializeSpy).toHaveBeenCalledWith(
        'sessionToken',
        token,
        expect.objectContaining<CookieSerializeOptions>({
          maxAge: maxAge,
          expires: expect.any(Date),
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          sameSite: 'lax',
        }),
      );

      const expires = (serializeSpy.mock.calls[0][2] as CookieSerializeOptions)
        .expires;
      const currentTime = Date.now();
      const expiresInMs = maxAge * 1000;

      expect(expires!.getTime()).toBeGreaterThanOrEqual(
        currentTime + expiresInMs - 1000,
      );
      expect(expires!.getTime()).toBeLessThanOrEqual(
        currentTime + expiresInMs + 1000,
      );
    });
  });

  describe('deleteSerializedRegisterSessionTokenCookie', () => {
    it('should serialize a session token cookie with correct options for deletion', () => {
      deleteSerializedRegisterSessionTokenCookie();

      expect(serializeSpy).toHaveBeenCalledWith(
        'sessionToken',
        '',
        expect.objectContaining<CookieSerializeOptions>({
          maxAge: 0,
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          sameSite: 'lax',
        }),
      );
    });
  });
});
