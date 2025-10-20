import { nanoid } from 'nanoid';

export const generateBlogId = (title, existingId = null) => {
    if (existingId) return existingId;
    
    return title.replace(/[^a-zA-Z0-9]/g, ' ')
               .replace(/\s+/g, "-")
               .trim() + nanoid();
};

export const formatTags = (tags) => {
    return tags.map(tag => tag.toLowerCase());
};

