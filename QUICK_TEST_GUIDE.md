# Quick Test Guide - Admin Access Control

## Quick Start

### 1. Setup Test Data
```bash
# Create all test admins
node scripts/create-test-admins.js

# Verify admins
node scripts/get-all-admins.js
```

### 2. Start Server
```bash
npm run dev
```

### 3. Test Login

**Main Admin (Superuser):**
- URL: `http://localhost:3000/admin/login`
- Username: `admin`
- Password: `admin@1234`
- Complete OTP flow (check email)

**Regular Admin:**
- Username: `testadmin`
- Password: `testpass123`

**Superuser:**
- Username: `superuser`
- Password: `superpass123`

### 4. Test Access Control

**Test Regular Admin:**
1. Login as `testadmin`
2. Try accessing `/admin/user` ❌ Should redirect to dashboard
3. Access `/admin/dashboard`, `/admin/project`, etc. ✅ Should work

**Test Superuser:**
1. Login as `admin` or `superuser`
2. Access `/admin/user` ✅ Should work
3. Create/Read/Update/Delete users ✅ Should work

### 5. Test Route Protection

**Unauthenticated:**
1. Clear cookies or use incognito
2. Try accessing `/admin/dashboard` ❌ Should redirect to login

**Authenticated:**
1. After login, access admin routes ✅ Should work

## Test Checklist

### Authentication
- [ ] Login with `admin` / `admin@1234` works
- [ ] Invalid credentials fail
- [ ] OTP flow works
- [ ] Logout works (clears cookie)

### Route Protection
- [ ] Unauthenticated → blocked
- [ ] Authenticated → allowed
- [ ] Regular admin → blocked from `/admin/user`
- [ ] Superuser → allowed to `/admin/user`

### User CRUD (Superuser Only)
- [ ] Create user (superuser) ✅
- [ ] Create user (regular admin) ❌ 403
- [ ] List users (superuser) ✅
- [ ] List users (regular admin) ❌ Redirected
- [ ] Update user (superuser) ✅
- [ ] Update user (regular admin) ❌ 403
- [ ] Delete user (superuser) ✅
- [ ] Delete user (regular admin) ❌ 403

## Common Test Scenarios

### Scenario 1: New Superuser Login
1. Create superuser: `node scripts/create-test-admins.js`
2. Login: `admin` / `admin@1234`
3. Verify: Can access `/admin/user`
4. Verify: Can create/update/delete users

### Scenario 2: Regular Admin Restrictions
1. Login: `testadmin` / `testpass123`
2. Verify: Cannot access `/admin/user` (redirected)
3. Verify: Can access other admin routes

### Scenario 3: Unauthenticated Access
1. Clear cookies
2. Verify: All `/admin/*` routes redirect to login
3. Verify: `/admin/login` accessible

## API Testing with curl

### Get Current Admin
```bash
curl http://localhost:3000/api/admin/me \
  -H "Cookie: core_token=YOUR_TOKEN"
```

### List Users (Superuser Only)
```bash
curl http://localhost:3000/api/admin/user \
  -H "Cookie: core_token=SUPERUSER_TOKEN"
```

### Create User (Superuser Only)
```bash
curl -X POST http://localhost:3000/api/admin/user/create \
  -H "Content-Type: application/json" \
  -H "Cookie: core_token=SUPERUSER_TOKEN" \
  -d '{
    "username": "newuser",
    "password": "newpass123",
    "email": "new@example.com",
    "isSuperUser": false,
    "isActive": true
  }'
```

## Troubleshooting

**OTP not received?**
- Check spam folder
- Verify `GMAIL_USER` and `GMAIL_APP_PASSWORD` in `.env`

**Routes not protected?**
- Verify `middleware.js` is in `src/`
- Check that `await verifyToken(token)` is used
- Clear `.next` cache: `rm -rf .next`

**Superuser check not working?**
- Verify JWT includes `isSuperUser`
- Check `verifySuperUser()` function
- Ensure middleware checks `payload?.isSuperUser`

## Files Modified/Fixed

1. **`src/middleware.js`** - Fixed missing `await` for `verifyToken()`
2. **`scripts/create-admin.js`** - Updated password to `admin@1234` and added superuser flag
3. **`scripts/create-test-admins.js`** - Created comprehensive test admin script
4. **`scripts/get-all-admins.js`** - Created script to list all admins
5. **`scripts/test-auth-flow.js`** - Created auth flow test script
6. **`scripts/test-api-protection.js`** - Created API protection test script

## Additional Documentation

- `TESTING_INSTRUCTIONS.md` - Comprehensive testing instructions
- `scripts/README.md` - Detailed script documentation
- `comprehensive-testing-guide-for-admin-access-control-system.plan.md` - Full testing plan

