# metier-db

## Database Overview

โปรเจกต์นี้ใช้ **PostgreSQL** เป็นฐานข้อมูลหลักสำหรับระบบ Blog Management

โดยมีการออกแบบให้รองรับทั้งฝั่ง Public Blog และ Admin Management

---

## Why PostgreSQL

เลือกใช้ PostgreSQL เพราะ:

* รองรับ relational data structure ได้ดี
* เหมาะกับ CRUD application
* มีความเสถียรสูง
* รองรับ production workload ได้ดี
* ใช้งานร่วมกับ Prisma ได้ดี
* ขยายระบบในอนาคตได้ง่าย

---

## Main Entities

### Blogs

เก็บข้อมูลบทความ เช่น

* title
* slug
* content
* excerpt
* category
* thumbnail
* createdAt
* updatedAt
* viewCount
* status

---

### Blog Images

รองรับการอัปโหลดหลายรูปต่อ 1 blog

ความสัมพันธ์:

* 1 Blog → Many Images

มีการจำกัด upload สูงสุด 6 รูป

---

### Comments

เก็บ comment จากผู้ใช้งานหน้า blog detail

ข้อมูลหลัก เช่น

* username
* comment
* createdAt
* blogId

ความสัมพันธ์:

* 1 Blog → Many Comments

---

### Admin User

ใช้สำหรับเข้าสู่ระบบหลังบ้าน

ใน MVP นี้ใช้ single admin account

ไม่มีระบบ multi-user หรือ role management

---

## Database Initialization

ภายใน folder นี้มี SQL script สำหรับ setup database อัตโนมัติผ่าน Docker

```bash
metier-db/
├── 01-schema.sql
└── 02-init.sql
```

โดยแบ่งหน้าที่ชัดเจนดังนี้

---

## 01-schema.sql

ใช้สำหรับสร้างโครงสร้างหลักของระบบ (Database Structure)

ประกอบด้วย:

* UUID Extension (`uuid-ossp`)
* ENUM Types
* Tables
* Foreign Keys
* Constraints
* Indexes

### ENUM Types

มีการสร้าง enum สำหรับควบคุม status ของข้อมูล

#### blog_status

* PUBLISH
* UNPUBLISH

#### comment_status

* PENDING
* APPROVED
* REJECTED

---

### Main Tables

#### admin

เก็บข้อมูล admin สำหรับเข้าสู่ระบบหลังบ้าน

#### blog

เก็บข้อมูลบทความ เช่น

* title
* short_description
* description
* slug
* thumbnail
* view_amount
* status

#### blog_picture

รองรับหลายรูปต่อ 1 blog

ความสัมพันธ์:

* 1 Blog → Many Pictures

#### blog_comment

เก็บ comment จากผู้ใช้งาน

ความสัมพันธ์:

* 1 Blog → Many Comments

---

### Indexes

มีการเพิ่ม indexes เพื่อช่วยเรื่อง performance เช่น

* blog slug
* blog status
* comment status
* foreign key references

ช่วยให้ query เร็วขึ้นใน production use case

---

## 02-init.sql

ใช้สำหรับสร้างข้อมูลตั้งต้นของระบบ (Seed Data)

เพื่อให้ reviewer สามารถ run project และทดสอบได้ทันทีโดยไม่ต้องสร้างข้อมูลเอง

ประกอบด้วย:

### Default Admin User

สร้าง admin เริ่มต้นสำหรับ login

```txt
Username: admin
Password: admin123
```

โดย password ถูกเก็บในรูปแบบ bcrypt hash

---

### Sample Blog Data

สร้าง sample blog หลายรายการ เช่น

* Next.js
* PostgreSQL
* Prisma
* JWT
* Docker
* Tailwind CSS

เพื่อให้หน้า Home / Detail / Search / Pagination พร้อมใช้งานทันที

---

### Sample Blog Pictures

เพิ่มหลายรูปให้แต่ละ blog โดยใช้

```sql
INSERT + SELECT
```

เพื่ออ้างอิง `blog_id` ผ่าน `slug`

ข้อดีคือ:

* ไม่ต้อง hardcode UUID
* maintain ง่าย
* relational ถูกต้อง

---

### Sample Comments

สร้าง comment ตัวอย่างพร้อม status หลายแบบ

* APPROVED
* PENDING
* REJECTED

เพื่อ demo ระบบ admin moderation

---

ภายใน folder นี้มี SQL script สำหรับ setup database อัตโนมัติผ่าน Docker

```bash
metier-db/
├── 01-schema.sql
└── 02-init.sql
```

---

## 01-schema.sql

ใช้สำหรับสร้าง:

* tables
* relations
* constraints
* indexes เบื้องต้น

เป็นโครงสร้างเริ่มต้นของระบบ

---

## 02-init.sql

ใช้สำหรับ insert initial data เช่น

* default admin account
* sample data (ถ้ามี)

ช่วยให้ reviewer สามารถ run project และทดสอบได้ทันที

---

## Prisma + SQL Together

โปรเจกต์นี้ใช้ทั้ง:

* SQL initialization files
* Prisma schema

เหตุผล:

### SQL

ช่วยให้ Docker setup ได้เร็ว และพร้อมใช้งานทันที

### Prisma

ช่วยเรื่อง:

* type-safe query
* maintainability
* schema evolution
* future migration support

ทั้งสองส่วนจึงทำงานร่วมกันเพื่อให้ทั้ง setup ง่าย และ maintain ได้ดี

---

## Assumptions

### View Count

ทุกครั้งที่เรียก Blog Detail API จะเพิ่มยอด view ทันที

Known limitation:

การ refresh หน้าเว็บหลายครั้งจะเพิ่มยอด view ซ้ำ

Reason:

ยอมรับได้ในระดับ MVP และสามารถพัฒนาต่อเป็น IP/session tracking ได้ภายหลัง

---

### Simple Admin Structure

ใช้ single admin account แทน full authentication system

Reason:

Project scope เน้นที่ blog management มากกว่าระบบ user management
