# คู่มือทำโปรเจกต์ MERN Chat 110

เอกสารนี้สรุปการทำงานของโปรเจกต์, เทคโนโลยีที่ใช้, และขั้นตอนตั้งค่าเพื่อรันระบบได้จริง

## 1. ภาพรวมโปรเจกต์

โปรเจกต์นี้เป็นแอปแชตแบบ Full Stack โดยมี
- Frontend: React + Vite
- Backend: Node.js + Express
- Database: MongoDB
- Realtime: Socket.IO
- Media Upload: Cloudinary
- Auth: JWT ใน HttpOnly Cookie

## 2. เทคโนโลยีที่ใช้

### Frontend (client)
- React 19
- Vite 7
- React Router
- Zustand (state management)
- Axios
- Socket.IO Client
- Tailwind CSS 4 + DaisyUI
- React Hot Toast
- Lucide React

### Backend (server)
- Node.js
- Express 5
- Mongoose
- Socket.IO
- JWT (jsonwebtoken)
- bcryptjs
- cookie-parser
- cors
- dotenv
- Cloudinary

## 3. โครงสร้างหลักของระบบ

- `client/` สำหรับหน้าเว็บและ UI
- `server/` สำหรับ REST API, Auth, DB และ Socket server
- API หลักเริ่มต้นที่ `/api/v1`
  - `GET /api/v1/user/check`
  - `POST /api/v1/user/signup`
  - `POST /api/v1/user/login`
  - `POST /api/v1/user/logout`
  - `PUT /api/v1/user/update-profile`
  - `GET /api/v1/message/users`
  - `GET /api/v1/message/:id`
  - `POST /api/v1/message/send/:id`

## 4. สิ่งที่ต้องมีก่อนเริ่ม

1. ติดตั้ง Node.js (แนะนำ LTS)
2. มี MongoDB URI (Atlas หรือ Local)
3. มีบัญชี Cloudinary (ถ้าต้องการอัปโหลดรูป)
4. มี Git และ npm ใช้งานได้ใน Terminal

## 5. ขั้นตอนติดตั้งโปรเจกต์

### Step 1: เข้าโฟลเดอร์โปรเจกต์

```bash
cd c:/Users/HP-NPRU/Desktop/mern_chat_110
```

### Step 2: ติดตั้ง dependencies ฝั่ง server

```bash
cd server
npm install
```

### Step 3: ติดตั้ง dependencies ฝั่ง client

```bash
cd ../client
npm install
```

## 6. ตั้งค่า Environment Variables

### Step 4: สร้างไฟล์ `server/.env`

ตัวอย่างค่า (ใส่ค่าจริงของคุณเอง):

```env
PORT=5000
BASE_URL=http://localhost:5173
MONGODB=your_mongodb_connection_string
SECRET=your_jwt_secret
node_mode=development
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

คำอธิบายสำคัญ:
- `BASE_URL` ต้องตรงกับ URL ฝั่ง frontend เพื่อให้ CORS และ cookie ทำงานได้
- `SECRET` ใช้สำหรับ sign/verify JWT

### Step 5: สร้างไฟล์ `client/.env`

```env
VITE_BASE_URL=http://localhost:5000/api/v1
VITE_SOCKET_URL=http://localhost:5000
```

คำอธิบายสำคัญ:
- `VITE_BASE_URL` ต้องลงท้ายด้วย `/api/v1` เพื่อให้เรียก endpoint ได้ตรง
- `VITE_SOCKET_URL` คือ URL ของ Socket server

## 7. ขั้นตอนรันโปรเจกต์

### Step 6: รัน backend (Terminal 1)

```bash
cd server
npm start
```

ถ้าสำเร็จจะเห็นข้อความประมาณ:
- `Connect to database successfully`
- `Server on http://localhost:5000`

### Step 7: รัน frontend (Terminal 2)

```bash
cd client
npm run dev
```

จากนั้นเปิดเบราว์เซอร์ที่ URL ของ Vite (ปกติ `http://localhost:5173`)

## 8. ลำดับการทำงานของแอป (Workflow)

1. สมัครสมาชิกหรือเข้าสู่ระบบ
2. ระบบออก JWT แล้วเก็บใน HttpOnly cookie
3. หน้าเว็บเรียก `check auth` เพื่อยืนยันสถานะผู้ใช้
4. เมื่อ login แล้ว client เชื่อม Socket.IO พร้อมส่ง `userId`
5. เลือกผู้ใช้ทางซ้ายเพื่อดู/ส่งข้อความ
6. ข้อความถูกบันทึกใน MongoDB และส่งต่อผ่าน socket event

## 9. คำสั่งที่ใช้บ่อยระหว่างพัฒนา

### ฝั่ง client

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

### ฝั่ง server

```bash
npm start
```

## 10. ปัญหาที่พบบ่อยและวิธีเช็ก

### 1) CORS หรือ cookie ไม่ทำงาน
- เช็กว่า `server/.env` ค่า `BASE_URL` ตรงกับ URL ของ frontend
- เช็กว่า `client/.env` ค่า `VITE_BASE_URL` ชี้ไป backend ถูกพอร์ต

### 2) ต่อฐานข้อมูลไม่ได้
- เช็กค่า `MONGODB`
- เช็ก whitelist IP และ credential ใน MongoDB Atlas

### 3) อัปโหลดรูปไม่ได้
- เช็ก Cloudinary ทั้ง 3 ค่าใน `server/.env`

### 4) Socket ไม่เชื่อมต่อ
- เช็กค่า `VITE_SOCKET_URL`
- เช็กว่า backend รันอยู่และพอร์ตตรงกัน

## 11. ขั้นตอนพัฒนาฟีเจอร์ใหม่ (แนะนำ)

1. ดึงโค้ดล่าสุด
2. สร้าง branch ใหม่
3. พัฒนาและทดสอบในเครื่อง
4. Commit แบบสื่อความหมาย
5. Push และเปิด Pull Request

---

ถ้าต้องการ ผมสามารถทำเวอร์ชันแยกเพิ่มให้ได้อีก 2 แบบ:
- Quick Start 1 หน้า (สำหรับเริ่มรันเร็ว)
- Developer Handbook (สำหรับทีม, รวมมาตรฐาน commit/branch/review)
