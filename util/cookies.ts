import cookie from 'cookie';

export function createSerializedRegisterSessionTokenCookie(token: string) {
  // in the deployed version we want our cookie to be sent only under HTTPS
  // in the development version we want out cookie to be sent under HTTP
  const isProduction = process.env.NODE_ENV === 'production';

  const maxAge = 60 * 60 * 24; // 24 hours in seconds

  return cookie.serialize('sessionToken', token, {
    // new browser
    maxAge: maxAge,
    // for internet explorer and old browsers
    expires: new Date(
      Date.now() + maxAge * 1000, // 24 hours in milliseconds
    ),

    httpOnly: true,
    secure: isProduction,
    path: '/',
    // Be explicit about new default behavior
    // in browsers
    // https://web.dev/samesite-cookies-explained/
    sameSite: 'lax',
  });
}

export function deleteSerializedRegisterSessionTokenCookie() {
  // in the deployed version we want our cookie to be sent only under HTTPS
  // in the development version we want out cookie to be sent under HTTP
  const isProduction = process.env.NODE_ENV === 'production';

  return cookie.serialize('sessionToken', '', {
    maxAge: 0,
    httpOnly: true,
    secure: isProduction,
    path: '/',
    sameSite: 'lax',
  });
}
