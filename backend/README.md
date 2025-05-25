# BlogSpace Backend API Documentation

This document describes all API endpoints available in the backend server ([backend/server.js](backend/server.js)).

---

## Authentication

### POST `/signup`

Register a new user.

**Request Body:**
```json
{
  "fullname": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "JWT_TOKEN",
  "profile_img": "https://...",
  "username": "john",
  "fullname": "John Doe"
}
```

---

### POST `/signin`

Login an existing user.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "JWT_TOKEN",
  "profile_img": "https://...",
  "username": "john",
  "fullname": "John Doe"
}
```

---

## Blogs

### POST `/latest-blogs`

Get the latest published blogs.

**Request Body:**
```json
{
  "page": 1
}
```

**Response:**
```json
{
  "blogs": [
    {
      "blog_id": "blog-123",
      "title": "My Blog",
      "des": "Short description",
      "banner": "https://...",
      "activity": { ... },
      "tags": ["tag1"],
      "publishedAt": "2024-06-01T00:00:00.000Z",
      "author": {
        "personal_info": {
          "profile_img": "...",
          "username": "...",
          "fullname": "..."
        }
      }
    }
  ]
}
```

---

### GET `/trending-blogs`

Get trending blogs.

**Response:**
```json
{
  "blogs": [
    {
      "blog_id": "blog-123",
      "title": "My Blog",
      "publishedAt": "2024-06-01T00:00:00.000Z",
      "author": { ... }
    }
  ]
}
```

---

### POST `/create-blog`

Create or update a blog. **Requires Authorization header.**

**Request Body:**
```json
{
  "title": "Blog Title",
  "des": "Short description",
  "banner": "https://...",
  "tags": ["tag1", "tag2"],
  "content": { "blocks": [...] },
  "id": "optional-blog-id"
}
```

**Response:**
```json
{ "id": "blog-123" }
```

---

### POST `/get-blog`

Get a blog by its blog_id.

**Request Body:**
```json
{
  "blog_id": "blog-123",
  "mode": "edit" // or omit for normal view
}
```

**Response:**
```json
{
  "blog": {
    "title": "...",
    "des": "...",
    "content": { ... },
    "banner": "...",
    "activity": { ... },
    "publishedAt": "...",
    "blog_id": "...",
    "tags": ["..."],
    "author": { ... }
  }
}
```

---

### POST `/user-written-blogs`

Get blogs written by the authenticated user. **Requires Authorization header.**

**Request Body:**
```json
{ "page": 1 }
```

**Response:**
```json
{
  "blogs": [
    { "blog_id": "...", "title": "...", ... }
  ]
}
```

---

### POST `/delete-blog`

Delete a blog by its blog_id. **Requires Authorization header.**

**Request Body:**
```json
{ "blog_id": "blog-123" }
```

**Response:**
```json
{
  "status": "deleted",
  "blogs": [ ... ] // Updated list of user's blogs
}
```

---

## Users

### POST `/search-users`

Search users by username.

**Request Body:**
```json
{ "query": "john" }
```

**Response:**
```json
{
  "users": [
    {
      "personal_info": {
        "fullname": "John Doe",
        "username": "john",
        "profile_img": "https://..."
      }
    }
  ]
}
```

---

### POST `/get-profile`

Get a user's profile by username.

**Request Body:**
```json
{ "username": "john" }
```

**Response:**
```json
{
  "personal_info": { ... },
  "social_links": { ... },
  "account_info": { ... },
  "joinedAt": "..."
}
```

---

## Blog Interactions

### POST `/like-blog`

Like or unlike a blog. **Requires Authorization header.**

**Request Body:**
```json
{
  "_id": "BLOG_OBJECT_ID",
  "liked": false // set to true if already liked, false otherwise
}
```

**Response:**
```json
{ "liked": true }
```

---

### POST `/is-liked`

Check if the authenticated user has liked a blog. **Requires Authorization header.**

**Request Body:**
```json
{ "_id": "BLOG_OBJECT_ID" }
```

**Response:**
```json
{ "result": true }
```

---

## Comments

### POST `/add-comment`

Add a comment or reply to a blog. **Requires Authorization header.**

**Request Body:**
```json
{
  "_id": "BLOG_OBJECT_ID",
  "comment": "Nice post!",
  "replying_to": "COMMENT_OBJECT_ID", // optional, for replies
  "blog_author": "USER_OBJECT_ID"
}
```

**Response:**
```json
{
  "comment": "Nice post!",
  "commentedAt": "...",
  "user_id": "...",
  "children": [],
  "_id": "COMMENT_OBJECT_ID"
}
```

---

### POST `/get-blog-comments`

Get comments for a blog.

**Request Body:**
```json
{
  "blog_id": "BLOG_OBJECT_ID",
  "skip": 0
}
```

**Response:**
```json
[
  {
    "comment": "Nice post!",
    "commented_by": { ... },
    "commentedAt": "...",
    ...
  }
]
```

---

### POST `/delete-comment`

Delete a comment. **Requires Authorization header.**

**Request Body:**
```json
{ "_id": "COMMENT_OBJECT_ID" }
```

**Response:**
```json
{ "status": "deleted" }
```

---

## Error Handling

All endpoints return errors in the following format:
```json
{ "error": "Error message" }
```

---

## Authorization

Endpoints marked with **Requires Authorization header** need a header:
```
Authorization: Bearer <access_token>
```
where `<access_token>` is received from `/signup` or `/signin`.

---

## Notes

- All dates are in ISO 8601 format.
- All IDs (blog_id, _id) are strings.
- For more details, see the implementation in [backend/server.js](backend/server.js).
