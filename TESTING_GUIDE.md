# Testing Guide - i18n & Separate Layouts Implementation

## Quick Start

### How to Access Different Sections

#### Regular User

- **Login:** `/en/auth/login` or `/vi/auth/login`
- **Email:** `john@example.com` or `jane@example.com`
- **Password:** `password123`
- **Features:** Shop, blog, user profile, cart, checkout
- **Profile URL:** `/en/user/profile`

#### Admin User

- **Login:** `/en/auth/login` or `/vi/auth/login`
- **Email:** `admin@example.com`
- **Password:** `admin123`
- **Features:** Dashboard, analytics, product management, order management
- **Dashboard URL:** `/en/admin`
- **Dashboard URL (VI):** `/vi/admin`

#### Public Pages

- **Home:** `/en` or `/vi`
- **Shop:** `/en/shop` or `/vi/shop`
- **Blog:** `/en/blog` or `/vi/blog`
- **About:** `/en/about` or `/vi/about`
- **Contact:** `/en/contact` or `/vi/contact`

### Switching Languages

The site supports English (en) and Vietnamese (vi) languages:

1. **Via URL:** Change the locale prefix
   - From: `/en/shop`
   - To: `/vi/shop`

2. **Via Language Switcher:** Use the language switch component in the header

3. **Layout Structure:**
   - All routes must include locale: `/{locale}/...`
   - Example: `/en/auth/login`, `/vi/shop`

## Layout Features

### 1. Main Layout (`/[locale]`)

- **Includes:** Header + Footer
- **Pages:** Shop, Blog, About, Contact
- **Access:** Public (no authentication required)

### 2. Auth Layout (`/[locale]/auth`)

- **Includes:** No Header/Footer (clean form focus)
- **Pages:** Login, Register, Forgot Password
- **Access:** Public (no authentication required)
- **Redirects:** Logged-in users to `/[locale]`

### 3. User Layout (`/[locale]/user`)

- **Includes:** Header + Footer
- **Pages:** Profile, Orders, Wishlist, Settings
- **Access:** Authenticated users only
- **Redirects:** Unauthenticated users to `/[locale]/auth/login`

### 4. Admin Layout (`/[locale]/admin`)

- **Includes:** Sidebar + Main content area
- **Pages:** Dashboard, Products, Orders, Customers, Analytics
- **Access:** Admin users only
- **Redirects:** Non-admin users to `/[locale]`

## i18n Support

### Translations Available For:

- ✅ Navigation items
- ✅ Footer content
- ✅ Authentication forms
- ✅ User account pages
- ✅ Admin pages
- ✅ Common UI elements

### Using Translations in Components:

```typescript
'use client';
import { useTranslations, useLocale } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div>
      <h1>{t('nav.home')}</h1>
      <a href={`/${locale}/shop`}>{t('nav.shop')}</a>
    </div>
  );
}
```

## Session Testing

### Test Admin Access

1. Go to `/en/auth/login`
2. Login with `admin@example.com` / `admin123`
3. You should see an "Admin Dashboard" link in the user dropdown
4. Click it to access the admin dashboard at `/en/admin`
5. Admin should see a sidebar with admin menu

### Test User Access

1. Go to `/en/auth/login`
2. Login with `john@example.com` / `password123`
3. Click on your profile icon to see the user dropdown
4. Navigate to your profile at `/en/user/profile`

### Test Auth Protection

1. Try to access `/en/admin` without logging in
2. You should be redirected to home page
3. Try to access `/en/user/profile` without logging in
4. You should be redirected to `/en/auth/login`

### Test Language Switching

1. On `/en/shop`, click the language switcher
2. Should navigate to `/vi/shop`
3. All text should be in Vietnamese
4. Switch back to `/en/shop` and all text should be in English

## Important Routes

| Route               | Purpose         | Locale | Auth | Role  |
| ------------------- | --------------- | ------ | ---- | ----- |
| `/en`               | Homepage        | ✅     | ❌   | Any   |
| `/en/shop`          | Shop            | ✅     | ❌   | Any   |
| `/en/blog`          | Blog            | ✅     | ❌   | Any   |
| `/en/auth/login`    | Login           | ✅     | ❌   | Any   |
| `/en/auth/register` | Register        | ✅     | ❌   | Any   |
| `/en/user/profile`  | User Profile    | ✅     | ✅   | User  |
| `/en/admin`         | Admin Dashboard | ✅     | ✅   | Admin |

## Troubleshooting

### Issue: "Not Found" when accessing a page

**Solution:** Make sure you're using the correct locale in the URL.

- ❌ `/shop`
- ✅ `/en/shop` or `/vi/shop`

### Issue: Redirected to login when accessing admin

**Solution:** You need to be logged in with an admin account.

1. Login with `admin@example.com` / `admin123`
2. Then try accessing `/en/admin`

### Issue: Page not showing translations

**Solution:** Make sure you're using `useTranslations()` hook and that the key exists in `messages/[locale].json`

### Issue: Build fails with i18n error

**Solution:** Ensure:

1. `messages/en.json` and `messages/vi.json` exist
2. `src/i18n/request.ts` is configured correctly
3. `next.config.ts` has the `withNextIntl()` wrapper

## File Locations

- **Messages:** `messages/en.json`, `messages/vi.json`
- **i18n Config:** `src/i18n/request.ts`
- **Middleware:** `src/middleware.ts`
- **Layouts:** `src/app/[locale]/layout.tsx`, `src/app/[locale]/auth/layout.tsx`, etc.
- **Components:** `src/components/Header.tsx`, `src/components/Footer.tsx`

## Next Steps

1. Update existing routes to work with `[locale]` prefix
2. Add more admin pages for product and order management
3. Add forgot password and password reset functionality
4. Implement user profile editing
5. Add more translation keys as features expand
6. Set up proper backend API integration
7. Add database persistence for users and translations
