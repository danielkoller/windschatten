import Tokens from 'csrf';

const tokens = new Tokens();

// Create a new secret/seed to store in the sessions table
export function createCsrfSecret() {
  return tokens.secretSync();
}

// Use a secret/seed from a session to generate a csrf token
export function createTokenFromSecret(secret: string) {
  return tokens.create(secret);
}

// Validate a csrf token against a secret/seed in the sessions table
export function validateTokenWithSecret(secret: string, token: string) {
  return tokens.verify(secret, token);
}
