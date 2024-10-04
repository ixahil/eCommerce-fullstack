import crypto from "crypto";

export const generateTemporaryToken = function () {
  const unHashedToken = crypto.randomBytes(20).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedToken)
    .digest("hex");

  const expiry = 1;
  const tokenExpiry = Date.now() + expiry * 60 * 60 * 1000;

  return { unHashedToken, hashedToken, tokenExpiry };
};
