# RIG - Invisible Grills Platform

A modern Next.js platform for showcasing and managing invisible grill solutions. This project includes a public-facing website and a comprehensive admin panel for content management.

## 🏠 About

**Invisible Grills | Safety with Uncompromised Views**

Premium invisible grills for balconies, windows, and facades—engineered for safety, durability, and elegant aesthetics. This platform serves both as a marketing website and a content management system for managing services, projects, blogs, and user accounts.

## ✨ Features

### Public Website
- **Homepage** - Showcase of invisible grill solutions with GSAP animations
- **Services** - Detailed service listings with features, specifications, FAQs, and testimonials
- **Projects** - Portfolio of completed installations with galleries
- **Blog** - Content management system with rich text editor (TipTap)
- **Contact** - Contact forms and information
- **About** - Company information and story

### Admin Panel
- **Secure Authentication** - OTP-based admin login system with JWT tokens
- **Role-Based Access Control** - Superuser and regular admin roles
- **Content Management**:
  - Services CRUD with rich media galleries
  - Projects CRUD with detailed case studies
  - Blog posts with TipTap rich text editor
  - User management (superuser only)
- **Dashboard** - Overview statistics and analytics
- **File Management** - AWS S3 integration for image uploads

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS 4** - Styling
- **GSAP** - Animations and scroll effects
- **TipTap** - Rich text editor for blog posts
- **Radix UI** - Accessible component primitives
- **Recharts** - Data visualization for dashboard

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - ORM for database management
- **PostgreSQL** - Database
- **JWT (jose)** - Authentication tokens
- **bcryptjs** - Password hashing
- **Nodemailer** - OTP email delivery

### Infrastructure
- **AWS S3** - File storage for images and media
- **Cookies** - Session management

## 📋 Prerequisites

- **Node.js** 18+ (for built-in fetch support)
- **PostgreSQL** database
- **AWS S3** bucket (for file uploads)
- **Gmail account** (for OTP emails)

## 🚀 Getting Started

### 1. Clone the Repository

git clone <repository-url>
cd rig1### 2. Install Dependencies

npm install### 3. Environment Variables

Create a `.env` file in the root directory:

# Database
DATABASE_URL="postgresql://user:password@localhost:5432/rig_db"

# Authentication
JWT_SECRET="your-super-secret-jwt-key-change-in-production"

# Email (for OTP)
GMAIL_USER="your-email@gmail.com"
GMAIL_APP_PASSWORD="your-gmail-app-password"
ADMIN_EMAIL="admin@example.com"  # Optional, defaults to admin email from DB

# AWS S3 (for file uploads)
AWS_ACCESS_KEY_ID="your-aws-access-key"
AWS_SECRET_ACCESS_KEY="your-aws-secret-key"
AWS_REGION="us-east-1"
AWS_BUCKET_NAME="your-bucket-name"

# App URL (optional, for testing scripts)
TEST_URL="http://localhost:3000"### 4. Database Setup

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Open Prisma Studio to view data
npx prisma studio### 5. Create Admin Account

# Create main admin account (superuser)
node scripts/create-admin.js

# Or create multiple test admins for testing
node scripts/create-test-admins.js
**Default Admin Credentials:**
- Username: `admin`
- Password: `admin@1234`
- Role: Superuser

### 6. Run Development Server

npm run devOpen [http://localhost:3000](http://localhost:3000) to view the website.

Admin panel: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

## 📁 Project Structure
rig1/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── admin/          # Admin panel pages
│   │   ├── api/            # API routes
│   │   │   ├── admin/      # Admin API endpoints
│   │   │   └── auth/       # Authentication endpoints
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact page
│   │   ├── projects/       # Projects listing and details
│   │   └── services/       # Services listing and details
│   ├── components/         # React components
│   │   ├── admin/         # Admin-specific components
│   │   └── ui/            # Reusable UI components
│   ├── lib/               # Utility functions
│   │   ├── auth.js        # JWT authentication
│   │   ├── adminAuth.js   # Admin authorization
│   │   ├── prisma.js      # Prisma client
│   │   └── uploadToS3.js  # AWS S3 upload
│   └── middleware.js      # Next.js middleware for route protection
├── prisma/
│   └── schema.prisma      # Database schema
├── scripts/               # Utility scripts
│   ├── create-admin.js   # Create admin account
│   ├── create-test-admins.js  # Create test admins
│   ├── get-all-admins.js     # List all admins
│   └── test-*.js         # Testing scripts
└── public/               # Static assets

##Install Dependencies:
npm installn System

### Authentication Flow

1. **Password Verification** - Admin enters username and password
2. **OTP Generation** - System generates 6-digit OTP and emails it
3. **OTP Verification** - Admin enters OTP to complete login
4. **JWT Token** - System issues JWT token stored in HTTP-only cookie

### Access Control

- **Regular Admins** - Can manage services, projects, and blogs
- **Superusers** - All regular admin permissions + user management (CRUD)

### Protected Routes

All `/admin/*` routes (except `/admin/login`) require authentication.

User management routes (`/admin/user/*`) require superuser privileges.

## 🧪 Testing

### Quick Test

See `QUICK_TEST_GUIDE.md` for quick testing steps.

### Comprehensive Testing

See `TESTING_INSTRUCTIONS.md` for detailed testing procedures.

### Test Scripts

# Create test admin accounts
node scripts/create-test-admins.js

# List all admins
node scripts/get-all-admins.js

# Test authentication flow (requires running server)
node scripts/test-auth-flow.js

# Test API protection
node scripts/test-api-protection.js### Test Accounts

After running `create-test-admins.js`:

- **Superuser**: `admin` / `admin@1234`
- **Regular Admin**: `testadmin` / `testpass123`
- **Another Superuser**: `superuser` / `superpass123`

## 📝 Available Scripts
ash
# Development
npm run dev          # Start development server

# Build
npm run build        # Build for production (includes Prisma generate)

# Production
npm start            # Start production server

# Linting
npm run lint         # Run ESLint## 🔧 Configuration

### Database Models

- **Service** - Services with features, specs, FAQs, testimonials
- **Project** - Project portfolio with galleries
- **Blog** - Blog posts with rich content
- **Admin** - Admin users with role-based access
- **SEO** - SEO metadata for pages

See `prisma/schema.prisma` for full schema.

### Middleware

The middleware (`src/middleware.js`) handles:
- Route protection for `/admin/*` routes
- Authentication verification
- Superuser authorization for user management routes

## 📚 Documentation

- **`TESTING_INSTRUCTIONS.md`** - Comprehensive testing guide
- **`QUICK_TEST_GUIDE.md`** - Quick reference for testing
- **`scripts/README.md`** - Script documentation

## 🚢 Deployment

### Build for Production

npm run build
npm start### Environment Variables

Ensure all required environment variables are set in your production environment.

### Database Migrations

Run migrations in production:

npx prisma migrate deploy## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly (see testing documentation)
4. Submit a pull request

## 📄 License

Private project - All rights reserved

## 📞 Support

For issues or questions, please contact the development team.

---

**Built with ❤️ using Next.js**# rigrills
