-- =========================
-- DEFAULT ADMIN USER
-- =========================
-- Username: admin
-- Password: admin123
-- (Stored as bcrypt hash)

INSERT INTO admin (
    username,
    password
)
VALUES (
    'admin',
    '$2b$10$vhebf3S9zirHGnSCHfHOquIY0wy/qTQRHNiIvaCBNAQKqaykC/rYi'
);

-- =========================
-- SAMPLE BLOG DATA
-- =========================

INSERT INTO blog (
    title,
    short_description,
    description,
    slug,
    thumbnail,
    view_amount,
    status
)
VALUES
(
    'Getting Started with Next.js',
    'Introduction to building modern web applications using Next.js',
    'This article explains the basics of Next.js, including routing, layouts, server components, and deployment strategies for modern frontend applications.',
    'getting-started-with-nextjs',
    'https://example.com/images/nextjs-thumbnail.jpg',
    0,
    'PUBLISH'
),
(
    'Understanding PostgreSQL for Backend Development',
    'Learn how PostgreSQL works in real-world backend systems',
    'This blog covers PostgreSQL fundamentals such as tables, indexes, foreign keys, relationships, performance optimization, and production-ready database design.',
    'understanding-postgresql-backend',
    'https://example.com/images/postgresql-thumbnail.jpg',
    0,
    'PUBLISH'
);