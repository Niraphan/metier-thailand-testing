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
-- SAMPLE BLOG DATA (15 BLOGS)
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
    'https://picsum.photos/seed/blog-1/800/500',
    125,
    'PUBLISH'
),
(
    'Understanding PostgreSQL for Backend Development',
    'Learn how PostgreSQL works in real-world backend systems',
    'This blog covers PostgreSQL fundamentals such as tables, indexes, foreign keys, relationships, performance optimization, and production-ready database design.',
    'understanding-postgresql-backend',
    'https://picsum.photos/seed/blog-2/800/500',
    98,
    'PUBLISH'
),
(
    'Mastering TypeScript for Frontend Developers',
    'Improve your frontend development workflow using TypeScript',
    'Learn about interfaces, generics, utility types, strict mode, and how TypeScript improves code quality and maintainability.',
    'mastering-typescript-frontend',
    'https://picsum.photos/seed/blog-3/800/500',
    76,
    'PUBLISH'
),
(
    'Prisma ORM Best Practices',
    'How to structure your backend with Prisma and PostgreSQL',
    'This article explores Prisma schema design, migrations, relations, performance optimization, and production-ready backend patterns.',
    'prisma-orm-best-practices',
    'https://picsum.photos/seed/blog-4/800/500',
    112,
    'PUBLISH'
),
(
    'Building Authentication with JWT',
    'A practical guide to secure login systems using JWT',
    'Understand how JWT works, token generation, refresh tokens, security concerns, and implementation examples using Next.js.',
    'building-authentication-with-jwt',
    'https://picsum.photos/seed/blog-5/800/500',
    134,
    'PUBLISH'
),
(
    'Responsive Design with Tailwind CSS',
    'Create beautiful responsive layouts using Tailwind CSS',
    'This guide covers utility-first CSS, responsive breakpoints, layout systems, and modern frontend UI best practices.',
    'responsive-design-tailwind-css',
    'https://picsum.photos/seed/blog-6/800/500',
    65,
    'PUBLISH'
),
(
    'REST API Design Principles',
    'Learn how to design clean and scalable backend APIs',
    'Topics include REST conventions, resource naming, status codes, pagination, filtering, validation, and API consistency.',
    'rest-api-design-principles',
    'https://picsum.photos/seed/blog-7/800/500',
    89,
    'PUBLISH'
),
(
    'Database Indexing Explained',
    'Understand indexes and how they improve query performance',
    'This article explains B-tree indexes, composite indexes, unique indexes, query optimization, and performance tradeoffs.',
    'database-indexing-explained',
    'https://picsum.photos/seed/blog-8/800/500',
    54,
    'PUBLISH'
),
(
    'Deploying Next.js Applications',
    'Best practices for production deployment',
    'Learn how to deploy Next.js projects using Vercel, environment variables, serverless functions, and production monitoring.',
    'deploying-nextjs-applications',
    'https://picsum.photos/seed/blog-9/800/500',
    143,
    'PUBLISH'
),
(
    'Docker for Fullstack Developers',
    'Using Docker to simplify development and deployment',
    'This guide explains Docker basics, Docker Compose, PostgreSQL containers, local development workflows, and deployment strategies.',
    'docker-for-fullstack-developers',
    'https://picsum.photos/seed/blog-10/800/500',
    91,
    'PUBLISH'
),
(
    'Improving SQL Query Performance',
    'Tips for optimizing SQL queries in production systems',
    'Learn how to optimize joins, indexes, query plans, sorting, filtering, and efficient pagination strategies.',
    'improving-sql-query-performance',
    'https://picsum.photos/seed/blog-11/800/500',
    61,
    'UNPUBLISH'
),
(
    'Frontend State Management Guide',
    'Managing complex UI state efficiently',
    'Explore React state patterns, Context API, Zustand, Redux, and how to structure scalable frontend applications.',
    'frontend-state-management-guide',
    'https://picsum.photos/seed/blog-12/800/500',
    74,
    'UNPUBLISH'
),
(
    'Secure Password Storage with bcrypt',
    'Why password hashing matters in backend development',
    'This article explains password hashing, bcrypt salt rounds, security best practices, and secure authentication flows.',
    'secure-password-storage-bcrypt',
    'https://picsum.photos/seed/blog-13/800/500',
    81,
    'PUBLISH'
),
(
    'Improving UX with Loading States',
    'Better user experience through proper loading patterns',
    'Learn how skeleton loaders, optimistic UI, spinners, and loading states improve product quality and usability.',
    'improving-ux-loading-states',
    'https://picsum.photos/seed/blog-14/800/500',
    52,
    'PUBLISH'
);

-- =========================
-- SAMPLE BLOG PICTURES
-- =========================
-- ใช้ INSERT + SELECT เพื่ออ้างอิง blog_id จาก slug
-- ไม่ต้อง hardcode UUID
-- วิธีนี้ดีที่สุดสำหรับ relational seed

-- ---------------------------------
-- Blog: getting-started-with-nextjs
-- ---------------------------------

INSERT INTO blog_picture (blog_id, image_url)
SELECT
    blog_id,
    'https://picsum.photos/seed/nextjs-detail-1/1000/600'
FROM blog
WHERE slug = 'getting-started-with-nextjs';

INSERT INTO blog_picture (blog_id, image_url)
SELECT
    blog_id,
    'https://picsum.photos/seed/nextjs-detail-2/1000/600'
FROM blog
WHERE slug = 'getting-started-with-nextjs';

INSERT INTO blog_picture (blog_id, image_url)
SELECT
    blog_id,
    'https://picsum.photos/seed/nextjs-detail-3/1000/600'
FROM blog
WHERE slug = 'getting-started-with-nextjs';


-- ---------------------------------
-- Blog: understanding-postgresql-backend
-- ---------------------------------

INSERT INTO blog_picture (blog_id, image_url)
SELECT
    blog_id,
    'https://picsum.photos/seed/postgres-detail-1/1000/600'
FROM blog
WHERE slug = 'understanding-postgresql-backend';

INSERT INTO blog_picture (blog_id, image_url)
SELECT
    blog_id,
    'https://picsum.photos/seed/postgres-detail-2/1000/600'
FROM blog
WHERE slug = 'understanding-postgresql-backend';

INSERT INTO blog_picture (blog_id, image_url)
SELECT
    blog_id,
    'https://picsum.photos/seed/postgres-detail-3/1000/600'
FROM blog
WHERE slug = 'understanding-postgresql-backend';


-- ---------------------------------
-- Blog: prisma-orm-best-practices
-- ---------------------------------

INSERT INTO blog_picture (blog_id, image_url)
SELECT
    blog_id,
    'https://picsum.photos/seed/prisma-detail-1/1000/600'
FROM blog
WHERE slug = 'prisma-orm-best-practices';

INSERT INTO blog_picture (blog_id, image_url)
SELECT
    blog_id,
    'https://picsum.photos/seed/prisma-detail-2/1000/600'
FROM blog
WHERE slug = 'prisma-orm-best-practices';

INSERT INTO blog_picture (blog_id, image_url)
SELECT
    blog_id,
    'https://picsum.photos/seed/prisma-detail-3/1000/600'
FROM blog
WHERE slug = 'prisma-orm-best-practices';


-- ---------------------------------
-- Blog: building-authentication-with-jwt
-- ---------------------------------

INSERT INTO blog_picture (blog_id, image_url)
SELECT
    blog_id,
    'https://picsum.photos/seed/jwt-detail-1/1000/600'
FROM blog
WHERE slug = 'building-authentication-with-jwt';

INSERT INTO blog_picture (blog_id, image_url)
SELECT
    blog_id,
    'https://picsum.photos/seed/jwt-detail-2/1000/600'
FROM blog
WHERE slug = 'building-authentication-with-jwt';

INSERT INTO blog_picture (blog_id, image_url)
SELECT
    blog_id,
    'https://picsum.photos/seed/jwt-detail-3/1000/600'
FROM blog
WHERE slug = 'building-authentication-with-jwt';


-- ---------------------------------
-- Blog: docker-for-fullstack-developers
-- ---------------------------------

INSERT INTO blog_picture (blog_id, image_url)
SELECT
    blog_id,
    'https://picsum.photos/seed/docker-detail-1/1000/600'
FROM blog
WHERE slug = 'docker-for-fullstack-developers';

INSERT INTO blog_picture (blog_id, image_url)
SELECT
    blog_id,
    'https://picsum.photos/seed/docker-detail-2/1000/600'
FROM blog
WHERE slug = 'docker-for-fullstack-developers';

INSERT INTO blog_picture (blog_id, image_url)
SELECT
    blog_id,
    'https://picsum.photos/seed/docker-detail-3/1000/600'
FROM blog
WHERE slug = 'docker-for-fullstack-developers';


-- =========================
-- SAMPLE COMMENTS
-- =========================
-- มีทั้ง APPROVED / PENDING / REJECTED
-- เพื่อ demo admin moderation

-- ---------------------------------
-- Blog: getting-started-with-nextjs
-- ---------------------------------

INSERT INTO blog_comment (
    blog_id,
    username,
    comment,
    status
)
SELECT
    blog_id,
    'สมชาย',
    'บทความนี้ดีมาก 123',
    'APPROVED'
FROM blog
WHERE slug = 'getting-started-with-nextjs';

INSERT INTO blog_comment (
    blog_id,
    username,
    comment,
    status
)
SELECT
    blog_id,
    'มานะ',
    'อยากอ่านเพิ่มเติม 456',
    'PENDING'
FROM blog
WHERE slug = 'getting-started-with-nextjs';


-- ---------------------------------
-- Blog: understanding-postgresql-backend
-- ---------------------------------

INSERT INTO blog_comment (
    blog_id,
    username,
    comment,
    status
)
SELECT
    blog_id,
    'วิชัย',
    'เนื้อหาเข้าใจง่ายมาก 789',
    'APPROVED'
FROM blog
WHERE slug = 'understanding-postgresql-backend';

INSERT INTO blog_comment (
    blog_id,
    username,
    comment,
    status
)
SELECT
    blog_id,
    'สุชาติ',
    'ขอบคุณสำหรับความรู้ 101',
    'REJECTED'
FROM blog
WHERE slug = 'understanding-postgresql-backend';


-- ---------------------------------
-- Blog: building-authentication-with-jwt
-- ---------------------------------

INSERT INTO blog_comment (
    blog_id,
    username,
    comment,
    status
)
SELECT
    blog_id,
    'กิตติ',
    'JWT อธิบายดีมาก 202',
    'PENDING'
FROM blog
WHERE slug = 'building-authentication-with-jwt';

INSERT INTO blog_comment (
    blog_id,
    username,
    comment,
    status
)
SELECT
    blog_id,
    'ธนา',
    'บทความนี้ช่วยได้เยอะ 303',
    'APPROVED'
FROM blog
WHERE slug = 'building-authentication-with-jwt';


-- ---------------------------------
-- Blog: docker-for-fullstack-developers
-- ---------------------------------

INSERT INTO blog_comment (
    blog_id,
    username,
    comment,
    status
)
SELECT
    blog_id,
    'ประยูร',
    'Docker ใช้งานจริงมาก 404',
    'APPROVED'
FROM blog
WHERE slug = 'docker-for-fullstack-developers';

INSERT INTO blog_comment (
    blog_id,
    username,
    comment,
    status
)
SELECT
    blog_id,
    'อนันต์',
    'อยากให้เขียนต่ออีก 505',
    'PENDING'
FROM blog
WHERE slug = 'docker-for-fullstack-developers';