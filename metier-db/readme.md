# Metier Blog System

## Project Structure

```text
metier-project/
│
├── docker-compose.yaml
│
├── metier-fe/
│
├── metier-be/
│
├── metier-db/
│   ├── schema.sql
│   ├── init.sql
│   └── README.md
│
└── README.md
```

---

## Database Design Overview

ระบบนี้ใช้ PostgreSQL เป็นหลัก โดยรองรับฟีเจอร์ตามโจทย์ดังนี้

* แสดงรายการ Blog ทั้งหมด
* ค้นหา Blog
* Pagination
* รายละเอียด Blog พร้อมรูปเพิ่มเติม
* ระบบ Comment ที่ต้องรอ Admin approve
* Admin Panel สำหรับจัดการ Blog และ Comment
* Publish / Unpublish Blog
* แก้ไข Blog Slug

---

# Database Tables

## 1. blog

เก็บข้อมูลหลักของบทความ Blog

| Field             | Type         | Description                      |
| ----------------- | ------------ | -------------------------------- |
| blog_id           | UUID         | Primary Key                      |
| title             | VARCHAR(255) | ชื่อบทความ                       |
| short_description | TEXT         | รายละเอียดแบบย่อ                 |
| description       | TEXT         | รายละเอียดฉบับเต็ม               |
| slug              | VARCHAR(255) | URL Slug (ต้องไม่ซ้ำ)            |
| thumbnail         | TEXT         | รูปปก Blog                       |
| view_amount       | INTEGER      | จำนวนผู้เข้าชม                   |
| status            | ENUM         | สถานะ Blog (PUBLISH / UNPUBLISH) |
| created_at        | TIMESTAMP    | วันที่สร้าง                      |
| updated_at        | TIMESTAMP    | วันที่อัปเดตล่าสุด               |

### Notes

* `slug` ต้องเป็น unique
* `thumbnail` ใช้เป็นรูปหลักของ Blog
* `view_amount` เพิ่มเมื่อมีผู้เข้าชมรายละเอียด Blog
* `status` ใช้ควบคุมการแสดงผลหน้า public

---

## 2. blog_picture

เก็บรูปเพิ่มเติมของแต่ละ Blog

| Field           | Type      | Description        |
| --------------- | --------- | ------------------ |
| blog_picture_id | UUID      | Primary Key        |
| blog_id         | UUID      | Foreign Key → blog |
| image_url       | TEXT      | URL ของรูปภาพ      |
| created_at      | TIMESTAMP | วันที่เพิ่มรูป     |

### Notes

* 1 Blog สามารถมีรูปเพิ่มเติมได้ไม่เกิน 6 รูป
* จำนวนรูปจะถูก validate ที่ backend

---

## 3. blog_comment

เก็บ Comment ของผู้ใช้งาน

| Field           | Type         | Description        |
| --------------- | ------------ | ------------------ |
| blog_comment_id | UUID         | Primary Key        |
| blog_id         | UUID         | Foreign Key → blog |
| username        | VARCHAR(100) | ชื่อผู้ส่ง         |
| comment         | TEXT         | ข้อความ Comment    |
| status          | ENUM         | สถานะ Comment      |
| created_at      | TIMESTAMP    | วันที่ส่ง Comment  |

### Comment Status

* `PENDING` → รอการตรวจสอบ
* `APPROVED` → อนุมัติและแสดงผล
* `REJECTED` → ไม่อนุมัติ

### Notes

* Comment ใหม่จะเริ่มต้นที่ `PENDING`
* Admin ต้อง approve ก่อนจึงจะแสดงผล
* ต้อง validate ให้ข้อความเป็นภาษาไทยและตัวเลขเท่านั้นที่ backend

---

## 4. admin

เก็บข้อมูลผู้ดูแลระบบ

| Field      | Type         | Description             |
| ---------- | ------------ | ----------------------- |
| admin_id   | UUID         | Primary Key             |
| username   | VARCHAR(100) | Username สำหรับ Login   |
| password   | TEXT         | Password (เก็บแบบ hash) |
| created_at | TIMESTAMP    | วันที่สร้าง             |

### Notes

* `username` ต้องไม่ซ้ำ
* password ต้องเก็บแบบ hash เท่านั้น (ห้าม plain text)

---

# ENUM Types

## blog_status

```sql
PUBLISH
UNPUBLISH
```

---

## comment_status

```sql
PENDING
APPROVED
REJECTED
```

---

# Relationship Summary

```text
blog
 ├── has many → blog_picture
 └── has many → blog_comment

admin
 └── manages → blog + blog_comment
```
