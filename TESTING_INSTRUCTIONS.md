# Comprehensive Testing Instructions for Admin Access Control

This document provides step-by-step instructions to test all aspects of the admin access control system based on the comprehensive testing plan.

## Prerequisites

1. **Database Setup**: Ensure your database is running and accessible
2. **Environment Variables**: Set up `.env` with:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `GMAIL_USER` (for OTP emails)
   - `GMAIL_APP_PASSWORD`
   - `ADMIN_EMAIL` (optional, defaults to admin email from DB)

3. **Install Dependencies**: 
   ```bash
   npm install
   ```

4. **Run Database Migrations**:
   ```bash
   npx prisma migrate dev
   ```

## Step 1: Create Test Admin Accounts

Run the script to create all test admins with different configurations:

```bash
node scripts/create-test-admins.js
```

This creates:
- **admin** (username: `admin`, password: `admin@1234`) - Superuser ✅
- **testadmin** (username: `testadmin`, password: `testpass123`) - Regular admin
- **superuser** (username: `superuser`, password: `superpass123`) - Superuser ✅
- **inactiveadmin** - Inactive admin (should not login)
- **regularadmin** - Another regular admin

Verify admins were created:
```bash
node scripts/get-all-admins.js
```

## Step 2: Test Authentication Flow

### 2.1 Test Main Admin Login

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open browser and navigate to: `http://localhost:3000/admin/login`

3. **Test Case 1.1.1: Successful Login**
   - Username: `admin`
   - Password: `admin@1234`
   - Expected: After entering password, check email for OTP
   - Enter OTP from email
   - Expected: Redirected to `/admin/dashboard`
   - Verify: Cookie `core_token` is set (check DevTools → Application → Cookies)

4. **Test Case 1.1.2: Invalid Username**
   - Username: `wronguser`
   - Password: `anypassword`
   - Expected: Error "Invalid credentials" (401)

5. **Test Case 1.1.3: Invalid Password**
   - Username: `admin`
   - Password: `wrongpassword`
   - Expected: Error "Invalid credentials" (401)

6. **Test Case 1.1.4: Invalid OTP**
   - Complete password step successfully
   - Enter wrong OTP (e.g., `000000`)
   - Expected: Error "Invalid or expired OTP" (401)

7. **Test Case 1.1.5: Already Authenticated**
   - After successful login, navigate to `/admin/login`
   - Expected: Automatically redirected to `/admin/dashboard`

### 2.2 Test Regular Admin Login

1. Clear cookies or use incognito window
2. Navigate to `/admin/login`
3. Username: `testadmin`, Password: `testpass123`
4. Complete OTP flow
5. Verify: Can access dashboard, but NOT `/admin/user` routes

### 2.3 Test Superuser Login

1. Clear cookies or use incognito window
2. Navigate to `/admin/login`
3. Username: `superuser`, Password: `superpass123`
4. Complete OTP flow
5. Verify: Can access dashboard AND `/admin/user` routes

## Step 3: Test Route Protection

### 3.1 Test Unauthenticated Access

1. Clear all cookies or use incognito window
2. Try accessing these routes directly:
   - `http://localhost:3000/admin/dashboard`
   - `http://localhost:3000/admin/project`
   - `http://localhost:3000/admin/service`
   - `http://localhost:3000/admin/blog`
   - `http://localhost:3000/admin/user`
   
   **Expected**: All redirect to `/admin/login`

### 3.2 Test Authenticated Access (Regular Admin)

1. Login as `testadmin` (regular admin)
2. Navigate to:
   - `/admin/dashboard` ✅ Should work
   - `/admin/project` ✅ Should work
   - `/admin/service` ✅ Should work
   - `/admin/blog` ✅ Should work
   - `/admin/user` ❌ Should redirect to `/admin/dashboard`

### 3.3 Test Superuser Access

1. Login as `admin` or `superuser` (superuser)
2. Navigate to:
   - `/admin/dashboard` ✅ Should work
   - `/admin/project` ✅ Should work
   - `/admin/service` ✅ Should work
   - `/admin/blog` ✅ Should work
   - `/admin/user` ✅ Should work
   - `/admin/user/create` ✅ Should work

## Step 4: Test User CRUD Operations (Superuser Only)

### 4.1 Test Create User

**As Superuser:**
1. Login as `admin` (superuser)
2. Navigate to `/admin/user/create`
3. Fill form:
   - Username: `newadmin`
   - Email: `newadmin@example.com`
   - Password: `newpass123`
   - Is Superuser: ☐ (unchecked)
   - Is Active: ☑ (checked)
4. Submit
5. **Expected**: User created, redirected to user list

**As Regular Admin:**
1. Login as `testadmin` (regular admin)
2. Try to navigate to `/admin/user/create`
3. **Expected**: Redirected to dashboard
4. Or try direct API call:
   ```bash
   curl -X POST http://localhost:3000/api/admin/user/create \
     -H "Content-Type: application/json" \
     -H "Cookie: core_token=YOUR_REGULAR_ADMIN_TOKEN" \
     -d '{"username":"test","password":"test123"}'
   ```
5. **Expected**: 403 "Access denied"

### 4.2 Test List Users

**As Superuser:**
1. Login as `admin`
2. Navigate to `/admin/user`
3. **Expected**: List of all admins displayed

**As Regular Admin:**
1. Login as `testadmin`
2. Try to navigate to `/admin/user`
3. **Expected**: Redirected to dashboard

### 4.3 Test Update User

**As Superuser:**
1. Login as `admin`
2. Navigate to `/admin/user/[id]` (click on any username)
3. Update fields (e.g., change email, toggle isActive, toggle isSuperUser)
4. Submit
5. **Expected**: User updated successfully

**As Regular Admin:**
1. Login as `testadmin`
2. Try direct API call:
   ```bash
   curl -X PATCH http://localhost:3000/api/admin/user/1 \
     -H "Content-Type: application/json" \
     -H "Cookie: core_token=YOUR_REGULAR_ADMIN_TOKEN" \
     -d '{"email":"new@example.com"}'
   ```
3. **Expected**: 403 "Access denied"

### 4.4 Test Delete User

**As Superuser:**
1. Login as `admin`
2. Navigate to `/admin/user`
3. Click delete button on a test user
4. Confirm deletion
5. **Expected**: User deleted successfully

**As Regular Admin:**
1. Login as `testadmin`
2. Try direct API call:
   ```bash
   curl -X DELETE http://localhost:3000/api/admin/user/1 \
     -H "Cookie: core_token=YOUR_REGULAR_ADMIN_TOKEN"
   ```
3. **Expected**: 403 "Access denied"

## Step 5: Test API Route Protection

### 5.1 Test Unauthenticated API Access

Run the test script:
```bash
node scripts/test-api-protection.js
```

Or manually test with curl:
```bash
# Should be blocked (401/403)
curl http://localhost:3000/api/admin/me
curl http://localhost:3000/api/admin/overview
curl http://localhost:3000/api/admin/user
curl http://localhost:3000/api/admin/project
```

### 5.2 Test Authenticated API Access

1. Get a token by completing login (check cookies in DevTools)
2. Use token in API requests:

```bash
# Replace YOUR_TOKEN with actual token from cookies
TOKEN="YOUR_TOKEN"

# Should work (200)
curl http://localhost:3000/api/admin/me \
  -H "Cookie: core_token=$TOKEN"

curl http://localhost:3000/api/admin/overview \
  -H "Cookie: core_token=$TOKEN"
```

### 5.3 Test Superuser-Only API Routes

**As Regular Admin:**
```bash
# Replace with regular admin token
TOKEN="REGULAR_ADMIN_TOKEN"

# Should be blocked (403)
curl http://localhost:3000/api/admin/user \
  -H "Cookie: core_token=$TOKEN"

curl -X POST http://localhost:3000/api/admin/user/create \
  -H "Content-Type: application/json" \
  -H "Cookie: core_token=$TOKEN" \
  -d '{"username":"test","password":"test123"}'
```

**As Superuser:**
```bash
# Replace with superuser token
TOKEN="SUPERUSER_TOKEN"

# Should work (200)
curl http://localhost:3000/api/admin/user \
  -H "Cookie: core_token=$TOKEN"
```

## Step 6: Test Edge Cases

### 6.1 Test Inactive Admin Login

1. Try to login as `inactiveadmin` (password: `inactive123`)
2. **Expected**: Login should fail or admin should be blocked

### 6.2 Test Token Validation

1. After login, modify the `core_token` cookie value in DevTools
2. Try accessing `/admin/dashboard`
3. **Expected**: Redirected to login

### 6.3 Test Concurrent Sessions

1. Login in one browser tab
2. Login in another tab/incognito window with different admin
3. **Expected**: Both sessions work independently

## Step 7: Test Other Admin Features

### 7.1 Dashboard Overview

1. Login as any admin
2. Navigate to `/admin/dashboard`
3. **Expected**: Overview stats displayed (projects, services, blogs, clients)

### 7.2 Projects CRUD

1. Navigate to `/admin/project`
2. Test create, read, update, delete operations
3. **Expected**: All operations work for authenticated admins

### 7.3 Services CRUD

1. Navigate to `/admin/service`
2. Test create, read, update, delete operations
3. **Expected**: All operations work for authenticated admins

### 7.4 Blogs CRUD

1. Navigate to `/admin/blog`
2. Test create, read, update, delete operations
3. **Expected**: All operations work for authenticated admins

## Step 8: Security Verification

### 8.1 Cookie Security

1. Login and check cookie in DevTools
2. Verify:
   - `HttpOnly` flag is set ✅
   - `SameSite` is set to `lax` ✅
   - `Secure` flag is set in production ✅

### 8.2 Token Payload

1. Decode JWT token (use jwt.io or similar)
2. Verify payload contains:
   - `sub` (admin ID)
   - `username`
   - `isSuperUser` ✅

### 8.3 Password Hashing

1. Check database directly:
   ```bash
   node scripts/get-all-admins.js
   ```
2. Verify passwords are hashed (not plain text)

## Step 9: Manual Testing Checklist

Use this checklist to ensure all tests pass:

### Authentication
- [ ] Login with valid credentials works
- [ ] Login with invalid credentials fails
- [ ] OTP flow works correctly
- [ ] OTP expiration works (wait 6+ minutes)
- [ ] Already authenticated users redirected from login

### Route Protection
- [ ] Unauthenticated users blocked from `/admin/*`
- [ ] `/admin/login` accessible without auth
- [ ] Authenticated users can access admin routes
- [ ] Superuser can access `/admin/user/*`
- [ ] Regular admin blocked from `/admin/user/*`

### User CRUD (Superuser Only)
- [ ] Create user (superuser) ✅
- [ ] Create user (regular admin) ❌ 403
- [ ] List users (superuser) ✅
- [ ] List users (regular admin) ❌ Redirected
- [ ] Update user (superuser) ✅
- [ ] Update user (regular admin) ❌ 403
- [ ] Delete user (superuser) ✅
- [ ] Delete user (regular admin) ❌ 403

### Other Admin Features
- [ ] Dashboard overview loads
- [ ] Projects CRUD works
- [ ] Services CRUD works
- [ ] Blogs CRUD works
- [ ] Profile endpoint works (`/api/admin/me`)

## Troubleshooting

### Issue: OTP not received
- Check email spam folder
- Verify `GMAIL_USER` and `GMAIL_APP_PASSWORD` in `.env`
- Check server logs for errors

### Issue: Middleware not protecting routes
- Verify `middleware.js` is in the correct location (`src/middleware.js`)
- Check that `await verifyToken(token)` is used (not just `verifyToken(token)`)
- Clear `.next` cache and restart server

### Issue: Superuser check not working
- Verify JWT token includes `isSuperUser` field
- Check `verifySuperUser()` function in `lib/adminAuth.js`
- Ensure middleware checks `payload?.isSuperUser`

## Notes

1. **OTP Testing**: For automated testing, consider mocking the email service or using a test email service
2. **Token Expiry**: Tokens expire after 7 days - test re-login after expiry
3. **Database State**: Always verify database state matches expectations using `get-all-admins.js`

## Additional Testing Scripts

- `scripts/create-test-admins.js` - Create all test admins
- `scripts/get-all-admins.js` - List all admins
- `scripts/test-auth-flow.js` - Test authentication flow (password step)
- `scripts/test-api-protection.js` - Test API route protection

---

**Last Updated**: Based on comprehensive testing plan implementation

