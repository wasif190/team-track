# User Registration Flow Documentation

## Overview

The `registerUser` controller handles the complete user registration process, including account creation and email verification.

---

## Registration Flow

### 1. Receive User Data

The server receives the following data from the client:

* `username`
* `email`
* `password`
* `role` (currently not used)

---

### 2. Check for Existing User

The database is queried to determine whether a user already exists with the same username or email.

```text
Find user by:
- username
OR
- email
```

If a matching user is found, the API returns:

* **Status Code:** `409 Conflict`
* **Message:** `"User with email or username already exists"`

---

### 3. Create User

If no existing user is found:

* A new user document is created.
* The password is automatically hashed using the Mongoose pre-save middleware.
* `isEmailVerified` is initialized as `false`.

---

### 4. Generate Email Verification Token

A temporary verification token is generated using `generateTemporaryToken()`.

The method returns:

* `unHashedToken` → Sent to the user's email.
* `hashedToken` → Stored securely in the database.
* `tokenExpiry` → Expiration time for the verification token.

The database stores only the hashed version of the token for better security.

---

### 5. Save Verification Details

The following fields are updated:

* `emailVerificationToken`
* `emailVerificationExpiry`

The user document is saved using:

```javascript
user.save({ validateBeforeSave: false });
```

Validation is skipped because only internal fields are being updated.

---

### 6. Send Verification Email

A verification email is sent using the mail utility.

The email contains:

* Welcome message
* Verification button
* Secure verification URL containing the unhashed token

Example URL:

```text
http://localhost:8000/api/v1/users/verify-email/<verification-token>
```

---

### 7. Remove Sensitive Data

Before sending the response, sensitive fields are excluded:

* password
* refreshToken
* emailVerificationToken
* emailVerificationExpiry

This ensures confidential information is never exposed to the client.

---

### 8. Send Success Response

If registration succeeds, the API returns:

* **Status Code:** `201 Created`

Response body:

* User information (without sensitive fields)
* Success message indicating that the verification email has been sent

---

## Authentication

No access token or refresh token is generated during registration.

Tokens will only be created **after the user successfully logs in**.

---

## Security Measures

* Prevents duplicate email and username registration.
* Passwords are hashed before being stored.
* Email verification is required before activating the account.
* Only a hashed verification token is stored in the database.
* Sensitive fields are excluded from API responses.
* Verification tokens have an expiration time.

---

## Registration Flow Diagram

```text
Client
   │
   ▼
Send username, email, password
   │
   ▼
Check if user already exists
   │
   ├── Exists
   │      ▼
   │   Return 409 Conflict
   │
   └── Doesn't exist
          │
          ▼
      Create User
          │
          ▼
     Hash Password
          │
          ▼
Generate Verification Token
          │
          ▼
Store Hashed Token + Expiry
          │
          ▼
Send Verification Email
          │
          ▼
Remove Sensitive Fields
          │
          ▼
Return 201 Created
```
