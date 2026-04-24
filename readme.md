# Metier Blog Management System

## วิธีการรันโปรเจกต์

### Step 1: Clone Repository

```bash
git clone <repository-url>
cd <project-folder>
```

---

### Step 2: Start Docker Services

รันคำสั่งด้านล่าง:

```bash
docker compose up -d
```

คำสั่งนี้จะทำการ:

* Start PostgreSQL database
* Initialize database schema และ seed data
* Start pgAdmin
* Install dependencies ของโปรเจกต์
* Generate Prisma Client
* Sync Prisma schema กับ PostgreSQL
* Start Next.js application

โดยไม่ต้อง setup เพิ่มเติม

---

## URL สำหรับเข้าใช้งาน

### Main Application

Frontend + Backend

```txt
http://localhost:3000
```

---

### pgAdmin

เครื่องมือสำหรับจัดการ Database

```txt
http://localhost:5050
```

### pgAdmin Login

```txt
Email: admin@metier.com
Password: admin123
```

---

## Admin Login

ใช้ข้อมูลด้านล่างสำหรับเข้าสู่ระบบหลังบ้าน:

```txt
URL: http://localhost:3000/login

Username: admin
Password: admin123
```

---

## หมายเหตุเพิ่มเติม

รายละเอียด Tech Stack แบบแยกส่วนจะอยู่ภายในแต่ละ folder:

* `/metier-app/README.md`
* `/metier-db/README.md`

เหตุผลในการออกแบบ database diagram, รายละเอียด Tech Stackcและรูป ER Diagram อยู่ใน folder 

* `/metier-db/database-diagram.md`
* `/metier-db/metier-db-readme.md`
* `/metier-db/er-diagram.png`
