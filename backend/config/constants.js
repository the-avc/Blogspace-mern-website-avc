// Application constants
export const PORT = 3000;

// Email validation regex
export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Pagination limits
export const MAX_LIMIT = 5;
export const COMMENT_LIMIT = 5;

// Validation limits
export const MIN_NAME_LENGTH = 3;
export const MIN_PASSWORD_LENGTH = 6;
export const MAX_DESCRIPTION_LENGTH = 200;
export const MAX_TAGS_COUNT = 5;

// config/constants.js (additions)
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500
};

export const RESPONSE_MESSAGES = {
    USER_CREATED: 'User created successfully',
    LOGIN_SUCCESS: 'Login successful',
    BLOG_CREATED: 'Blog created successfully',
    COMMENT_ADDED: 'Comment added successfully',
    OPERATION_SUCCESS: 'Operation completed successfully'
};

export const ERROR_MESSAGES = {
    EMAIL_EXISTS: 'Email already exists',
    INVALID_CREDENTIALS: 'Invalid email or password',
    UNAUTHORIZED: 'Access denied',
    BLOG_NOT_FOUND: 'Blog not found',
    VALIDATION_ERROR: 'Validation failed'
};
