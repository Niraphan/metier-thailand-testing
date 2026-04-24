## คำอธิบายการออกแบบฐานข้อมูล (Database Design Explanation)

### เหตุผลที่แยก Blog และ BlogPicture ออกเป็นคนละตาราง

เนื่องจาก 1 บทความสามารถมีรูปภาพได้หลายรูป (One-to-Many Relationship)

หากเก็บรูปทั้งหมดไว้ในตาราง Blog โดยตรง จะทำให้โครงสร้างข้อมูลไม่เป็น Normalized และยากต่อการจัดการในอนาคต

การแยกเป็นตาราง `blog_picture` ช่วยให้:

- รองรับการอัปโหลดหลายรูปต่อ 1 blog
- จัดการการเพิ่ม / ลบ / แก้ไขรูปภาพได้ง่าย
- รองรับการขยายระบบในอนาคต เช่น image sorting หรือ cloud storage

---

### เหตุผลที่แยก Comment ออกเป็นอีกตาราง

Comment เป็นข้อมูลที่เกิดจากผู้ใช้งาน (User Generated Content) และมีจำนวนเพิ่มขึ้นได้ตลอดเวลา

จึงไม่ควรเก็บรวมไว้ในตาราง Blog เพราะจะทำให้ข้อมูลหลักของบทความซับซ้อนเกินไป

การแยกเป็นตาราง `blog_comment` ช่วยให้:

- จัดการ comment ได้ง่าย
- รองรับระบบ approve / reject comment
- รองรับ admin moderation
- Query ข้อมูลได้มีประสิทธิภาพมากขึ้น

---

### เหตุผลที่ใช้ UUID เป็น Primary Key

เลือกใช้ UUID แทน Auto Increment ID เพราะ:

- ลดความเสี่ยงในการคาดเดา ID ผ่าน public API
- เหมาะกับระบบที่อาจขยายในอนาคต
- รองรับการทำงานร่วมกับหลาย service ได้ดีกว่า
- ปลอดภัยกว่าสำหรับ production system

เหมาะกับระบบที่มีการ expose ID ผ่าน URL เช่น Blog Detail

---

### เหตุผลที่ใช้ ENUM สำหรับ Status

ใช้ ENUM สำหรับ:

- `blog_status`
- `comment_status`

เพื่อควบคุมให้ข้อมูลสามารถเก็บได้เฉพาะค่าที่กำหนดเท่านั้น เช่น

- PUBLISH / UNPUBLISH
- PENDING / APPROVED / REJECTED

ข้อดีคือ:

- ลดโอกาสเกิด invalid data
- ช่วยให้ backend validation ง่ายขึ้น
- ทำให้ business logic ชัดเจนมากขึ้น

---

### เหตุผลที่เพิ่ม Index

มีการเพิ่ม Index ใน field ที่ถูกใช้งานบ่อย เช่น

- blog.slug
- blog.status
- blog_comment.status
- foreign key references

เหตุผลคือ:

- ช่วยให้ query เร็วขึ้น
- รองรับ pagination และ filtering ได้ดีขึ้น
- เพิ่ม performance ใน production use case

โดยเฉพาะ `slug` ซึ่งถูกใช้บ่อยในการเข้าหน้า Blog Detail

---

### เหตุผลที่แยก Admin ออกเป็นอีกตาราง

ระบบหลังบ้าน (Admin Panel) ต้องมีการ authentication แยกจากผู้ใช้งานทั่วไป

ใน MVP นี้เลือกใช้ single admin account เพื่อให้ scope ของระบบเหมาะสมกับ requirement

ข้อดีคือ:

- ลดความซับซ้อนของระบบ
- โฟกัสที่ blog management เป็นหลัก
- สามารถต่อยอดเป็น multi-user admin ได้ในอนาคต