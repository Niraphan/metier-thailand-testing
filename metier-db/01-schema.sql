-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =========================
-- ENUM TYPES
-- =========================

CREATE TYPE blog_status AS ENUM (
    'PUBLISH',
    'UNPUBLISH'
);

CREATE TYPE comment_status AS ENUM (
    'PENDING',
    'APPROVED',
    'REJECTED'
);

-- =========================
-- TABLE: admin
-- =========================

CREATE TABLE admin (
    admin_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    username VARCHAR(100) NOT NULL UNIQUE,
    password TEXT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- TABLE: blog
-- =========================

CREATE TABLE blog (
    blog_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    title VARCHAR(255) NOT NULL,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,

    slug VARCHAR(255) NOT NULL UNIQUE,

    thumbnail TEXT NOT NULL,

    view_amount INTEGER NOT NULL DEFAULT 0,

    status blog_status NOT NULL DEFAULT 'UNPUBLISH',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- TABLE: blog_picture
-- =========================

CREATE TABLE blog_picture (
    blog_picture_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    blog_id UUID NOT NULL,

    image_url TEXT NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_blog_picture_blog
        FOREIGN KEY (blog_id)
        REFERENCES blog(blog_id)
        ON DELETE CASCADE
);

-- =========================
-- TABLE: blog_comment
-- =========================

CREATE TABLE blog_comment (
    blog_comment_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    blog_id UUID NOT NULL,

    username VARCHAR(100) NOT NULL,
    comment TEXT NOT NULL,

    status comment_status NOT NULL DEFAULT 'PENDING',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_blog_comment_blog
        FOREIGN KEY (blog_id)
        REFERENCES blog(blog_id)
        ON DELETE CASCADE
);

-- =========================
-- INDEXES (Recommended)
-- =========================

CREATE INDEX idx_blog_slug
ON blog(slug);

CREATE INDEX idx_blog_status
ON blog(status);

CREATE INDEX idx_blog_comment_status
ON blog_comment(status);

CREATE INDEX idx_blog_comment_blog_id
ON blog_comment(blog_id);

CREATE INDEX idx_blog_picture_blog_id
ON blog_picture(blog_id);