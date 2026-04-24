# metier-app

## Tech Stack

โปรเจกต์นี้พัฒนาด้วย **Next.js (App Router)** โดยรวมทั้ง Frontend และ Backend API ไว้ภายในโปรเจกต์เดียว เพื่อให้การพัฒนาและการ deploy ง่ายขึ้น

---

## Frontend

### Next.js

ใช้สำหรับสร้างหน้าเว็บไซต์และจัดการ Routing รวมถึงใช้ API Routes สำหรับ backend ภายในโปรเจกต์เดียว

### React

ใช้สำหรับการสร้าง UI แบบ Component-based ทำให้สามารถจัดการและ reuse component ได้ง่าย

### Tailwind CSS

ใช้สำหรับ styling และ responsive design ช่วยให้พัฒนา UI ได้รวดเร็วและ maintain ได้ง่าย

### Material UI Icons (MUI Icons)

ใช้สำหรับ icon management ภายในระบบ เช่น ปุ่ม Add / Delete / Edit / Navigation ต่าง ๆ

### Framer Motion

ใช้สำหรับ animation และ transition เพื่อให้ UX ลื่นไหลมากขึ้น

ตัวอย่าง:

* page transition
* modal animation
* hover interaction
* loading animation

### React Query

ใช้สำหรับจัดการ API state

ช่วยเรื่อง:

* data fetching
* caching
* background refetch
* loading state
* mutation management

ลดการเขียน state management ที่ซับซ้อน

### Yup

ใช้สำหรับ form validation แบบ schema-based

ช่วยให้:

* validation ชัดเจน
* maintain ง่าย
* reusable
* ลด validation logic ที่กระจัดกระจาย

---

## Backend

### Next.js API Routes

ใช้สำหรับสร้าง backend endpoint ภายในโปรเจกต์เดียว

ตัวอย่าง:

* blog CRUD
* comment API
* admin login
* image upload
* protected admin routes

ข้อดีคือไม่ต้องแยก backend service ออกมา

### Prisma ORM

ใช้สำหรับจัดการ database schema และ query database

ช่วยเรื่อง:

* type-safe query
* schema management
* migration support
* maintainability

### JWT Authentication

ใช้สำหรับระบบ Admin Login

เมื่อ login สำเร็จ จะสร้าง token และเก็บเป็น cookie (`admin_token`) เพื่อใช้ป้องกัน route `/admin`

### Middleware

ใช้สำหรับ route protection

หากไม่มี `admin_token` จะไม่สามารถเข้าหน้า `/admin` ได้ และจะถูก redirect ไปหน้า login

---

## Main Features

* Public Blog Listing
* Blog Detail
* Blog Search
* Pagination
* Blog Comments
* View Count Tracking
* Admin Login
* Admin Blog Management
* Multiple Image Upload (max 6)
* Protected Admin Routes

---

## Development Environment

### Bun

ใช้เป็น package manager และ runtime

ข้อดี:

* install เร็วกว่า npm
* startup เร็ว
* เหมาะกับ development workflow

### Docker

ใช้สำหรับรัน application ภายใน container เพื่อให้ environment เหมือนกันทุกเครื่อง
