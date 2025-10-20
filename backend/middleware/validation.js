import { EMAIL_REGEX, MIN_NAME_LENGTH, MIN_PASSWORD_LENGTH, MAX_DESCRIPTION_LENGTH, MAX_TAGS_COUNT } from '../config/constants.js';

export const validateSignupData = (req, res, next) => {
    const { fullname, email, password } = req.body;
    
    if (fullname.length < MIN_NAME_LENGTH) {
        return res.status(403).json({ error: "too short name" });
    }
    
    if (!email.length) {
        return res.status(403).json({ error: "enter Email" });
    }
    
    if (password.length < MIN_PASSWORD_LENGTH) {
        return res.status(403).json({ error: "password too short" });
    }
    
    if (!EMAIL_REGEX.test(email)) {
        return res.status(403).json({ error: "Invalid Email" });
    }
    
    next();
};

export const validateBlogData = (req, res, next) => {
    const { title, des, content, tags } = req.body;
    
    if (!title.length) {
        return res.status(403).json({ error: "title is must" });
    }
    
    if (!des.length || des.length > MAX_DESCRIPTION_LENGTH) {
        return res.status(403).json({ error: "blog description must be under 200 characters" });
    }
    
    if (!content.blocks.length) {
        return res.status(403).json({ error: "content is must" });
    }
    
    if (!tags.length || tags.length > MAX_TAGS_COUNT) {
        return res.status(403).json({ error: "tags are necessary" });
    }
    
    next();
};

export const validateCommentData = (req, res, next) => {
    const { comment } = req.body;
    
    if (!comment.length) {
        return res.status(403).json({ error: "comment is must" });
    }
    
    next();
};

