Authentication is the part of an app where a small mistake has the biggest consequences. A bug in a settings page annoys users; a bug in login exposes their data. The good news is that secure authentication is mostly a matter of following well-established practice and not inventing your own.

This guide explains how to handle passwords, sessions, JWTs and refresh tokens for apps that have both a web client and a mobile client, which is where most of the confusion comes from.

## Don't build it if you don't have to

Before writing any auth code, consider whether a managed provider (Auth0, Clerk, Firebase Authentication, Supabase Auth, AWS Cognito) or a mature library for your framework fits your needs. They handle password storage, email verification, password resets, social login and multi-factor authentication, and they are tested by far more attackers than your code will be.

If you do build it yourself, which is reasonable for many products, the rest of this post is the minimum to get right.

## Store passwords with a slow, salted hash

Never store passwords in plain text or with a fast hash like MD5 or SHA-256. Fast hashes are designed to be computed billions of times per second, which is exactly what an attacker with a leaked database wants.

Use a password-hashing function that is deliberately slow and includes a unique salt per password:

- **Argon2id** is the current first choice. OWASP's guidance suggests a starting configuration of 19 MiB of memory, 2 iterations and 1 degree of parallelism, then tuning for your servers.
- **bcrypt** is still acceptable, with a work factor of at least 10. Note that bcrypt only uses the first 72 bytes of a password.

```js
import argon2 from "argon2";

const hash = await argon2.hash(password, { type: argon2.argon2id });
// later, at login
const valid = await argon2.verify(user.passwordHash, password);
```

Also: allow long passwords and passphrases, check new passwords against lists of known breached passwords, and don't force arbitrary complexity rules or regular password changes. Both are current NIST guidance.

## Sessions or JWTs?

There are two common ways to remember that a user is logged in.

**Server-side sessions:** after login, the server creates a session record (in the database or Redis) and gives the client a random session ID in a cookie. Each request looks up the session. Logging someone out, or out of every device, is as simple as deleting the record.

**JWTs (JSON Web Tokens):** after login, the server gives the client a signed token that contains the user's ID and an expiry time. The server can verify it without a database lookup. That makes JWTs convenient across services, but it also means a token stays valid until it expires, even if you want to revoke it.

For a single web app talking to its own backend, sessions are simpler and easier to secure. JWTs make sense when several services or third parties need to verify the same identity, or for mobile clients, as long as you pair them with the refresh token pattern below.

## Short-lived access tokens, rotating refresh tokens

If you use JWTs, keep the **access token** short-lived: 5 to 15 minutes. If one leaks, the damage window is small. To avoid logging users out every 15 minutes, also issue a long-lived **refresh token**, which the client uses only to get a new access token.

Store refresh tokens server-side (hashed, like passwords) so you can revoke them, and **rotate** them: every time a refresh token is used, issue a new one and invalidate the old one. If an old refresh token is ever used again, someone has stolen it. Revoke the whole token family and force that user to log in again. This is called reuse detection, and it turns a silent compromise into a detectable one.

## Where to store tokens on the web

Don't keep tokens in `localStorage` or `sessionStorage`. Any JavaScript running on the page can read them, so a single cross-site scripting (XSS) bug, or a compromised third-party script, can steal every user's session.

Use a cookie instead, with the right flags:

```http
Set-Cookie: session=...; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=1209600
```

- `HttpOnly`: JavaScript can't read it.
- `Secure`: only sent over HTTPS.
- `SameSite=Lax`: not sent on most cross-site requests, which blocks most cross-site request forgery (CSRF). For extra protection on state-changing requests, add a CSRF token or check the `Origin` header.

## Where to store tokens on mobile

Mobile apps don't have cookies in the same way, so they usually hold tokens directly. Store them in the operating system's secure storage, the iOS Keychain and the Android Keystore, never in plain `AsyncStorage` or shared preferences. In React Native, `expo-secure-store` and `react-native-keychain` wrap these for you.

Keep the refresh token in secure storage and the access token in memory, and refresh it when it expires or when the API returns `401`. Make sure only one refresh request runs at a time, or rotating tokens will invalidate each other.

## Authorization is a separate problem

Authentication answers "who are you?". Authorization answers "are you allowed to do this?", and it is where many real breaches happen. The most common bug is an endpoint like `GET /invoices/:id` that checks the user is logged in but not that the invoice belongs to them. Change the ID in the URL and you can read someone else's invoice. OWASP lists this, broken object-level authorization, as the number one API security risk.

- Check ownership or permissions on every request that reads or changes a record, on the server.
- Use role-based access control (RBAC) for broad permissions such as admin, staff and customer, and ownership checks for individual records.
- Deny by default: new endpoints should require auth unless they are explicitly public.
- Never trust a role or user ID sent in the request body. Take it from the verified session or token.

## Protect the login flow itself

- **Rate-limit** login, sign-up, password reset and OTP endpoints per account and per IP, to slow down password guessing and credential stuffing.
- **Use generic error messages** like "Incorrect email or password", so attackers can't discover which emails have accounts.
- **Make reset links single-use and short-lived** (around an hour), and invalidate existing sessions when a password changes.
- **Offer multi-factor authentication**, at least for admin accounts. An authenticator app or a passkey is much stronger than SMS codes.
- **Log security events**: logins, failed logins, password changes and new devices. You can't investigate what you didn't record.

## Consider passkeys

Passkeys (built on WebAuthn) let users sign in with Face ID, a fingerprint or a device PIN instead of a password. They can't be phished or reused across sites, and they are supported on current iOS, Android, macOS and Windows devices. Offering them alongside passwords is increasingly straightforward with libraries such as SimpleWebAuthn.

## An authentication checklist

- Passwords are hashed with Argon2id or bcrypt.
- Web sessions use `HttpOnly`, `Secure`, `SameSite` cookies, not `localStorage`.
- Mobile apps keep tokens in the Keychain or Keystore.
- Access tokens are short-lived; refresh tokens are stored hashed, rotated and checked for reuse.
- Every endpoint checks authorization, not just authentication.
- Login and reset flows are rate-limited and give nothing away.
- MFA is available, at least for admins.
- Security events are logged.

Good authentication is invisible when it works. If you are building an app and want this part done properly from the start, [get in touch](/#contact).
