# Role Assignment Hierarchy Fix

## Problem Fixed

Previously, users could assign roles to any other user regardless of their position in the organizational hierarchy. This led to potential security issues where lower-level administrators could assign roles to higher-level administrators.

## Solution Implemented

### 1. Added `parentId` field to User entity
- Tracks who created each user
- Establishes parent-child relationships in the hierarchy

### 2. Updated Role Assignment Logic
The system now prevents users from assigning roles to users with smaller `parentId` values.

### Example Hierarchy:
```
Super Admin (id: 1, parentId: null)
├── Province Admin (id: 10, parentId: 1)
    ├── District Admin (id: 11, parentId: 10)
        ├── Local Officer (id: 12, parentId: 11)
```

### Restriction Rules:
1. **District Admin (id: 11, parentId: 10)** CANNOT assign roles to:
   - Province Admin (id: 10) - because 10 < 11
   - Super Admin (id: 1) - because 1 < 11

2. **District Admin (id: 11, parentId: 10)** CAN assign roles to:
   - Local Officer (id: 12) - because they created this user
   - Themselves - self-assignment allowed

### Changes Made:

#### User Entity (`src/users/entity/user.entity.ts`)
- Added `parentId: number` field

#### Users Service (`src/users/users.service.ts`)
- Updated `create()` method to set parentId when creating users
- Updated `assignRole()` method with hierarchy validation:
  - Checks if target user's parentId < current user's id
  - Ensures users can only assign roles to users they created or manage

#### Users Controller (`src/users/users.controller.ts`)
- Updated endpoints to pass current user context

#### Auth Service (`src/auth/auth.service.ts`)
- Updated registration to handle parentId for new user registrations

## Database Migration

Since `synchronize: true` is enabled in TypeORM configuration, the database schema will automatically update when you restart the application. The new `parentId` column will be added to the `user` table.

## Usage Example

```typescript
// This will fail - District Admin trying to assign role to Province Admin
POST /users/10/role/2
Headers: { Authorization: "Bearer <district_admin_token>" }
// Response: "Cannot assign role to user with higher hierarchy level (smaller parentId)"

// This will succeed - District Admin assigning role to Local Officer they created
POST /users/12/role/3
Headers: { Authorization: "Bearer <district_admin_token>" }
// Response: Success
```