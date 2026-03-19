# LINE-Report-an-incident
# 🗄️ Database Documentation (DynamoDB)

ส่วนนี้เป็นข้อมูลโครงสร้างฐานข้อมูลสำหรับโปรเจกต์ **LINE-Report-an-incident** ที่สร้างไว้บน AWS (Manual Setup)

## 📌 ข้อมูลตารางหลัก
- **Table Name:** `IncidentReports_Group3`
- **Region:** `us-east-1`
- **Billing Mode:** PAY_PER_REQUEST (On-demand)

### 🔑 Primary Key Structure
| Key Type | Attribute Name | Data Type | Description |
| :--- | :--- | :--- | :--- |
| **Partition Key (PK)** | `PK` | String (S) | ID ของ Incident หรือ User (e.g., `INCIDENT#123`) |
| **Sort Key (SK)** | `SK` | String (S) | Timestamp หรือ Metadata (e.g., `2026-03-19T03:00:00`) |

---

## 🔍 Secondary Indexes (GSI)
สำหรับฝั่ง **Agency Portal** หรือ **Admin** ให้ใช้ Index นี้ในการดึงข้อมูลเหตุการณ์แยกตามหน่วยงาน:

- **Index Name:** `GSI1_AgencyPortal`
- **Partition Key:** `AgencyAccessToken` (S)
- **Sort Key:** `PK` (S)
- **Projection:** ALL (ดึงทุก Attribute ออกมาได้เลย)

---

## 🛠️ วิธีการใช้งานสำหรับ Developer (Backend)
เพื่อน จะเขียนโค้ดเชื่อมต่อ ให้ใช้ SDK ตามชื่อฟิลด์ด้านบน ตัวอย่างโครงสร้างข้อมูล (Item Example):
```json
{
  "PK": "INCIDENT#ID001",
  "SK": "2026-03-19T08:30:00",
  "AgencyAccessToken": "POLICE_BKK_001",
  "reporterName": "สมชาย ใจดี",
  "description": "พบอุบัติเหตุรถชนหน้า ม.ธรรมศาสตร์",
  "status": "PENDING",
  "location": { "lat": 14.06, "lng": 100.60 }
}

## 🧪 วิธีทดสอบการเชื่อมต่อ (For Backend)
หากต้องการทดสอบว่าเชื่อมต่อได้จริง ให้ลองใช้ AWS CLI รันคำสั่งนี้ใน Terminal:
`aws dynamodb describe-table --table-name IncidentReports`

*หากขึ้นข้อมูลตารางมา แสดงว่าเชื่อมต่อสำเร็จและเริ่มเขียนโค้ด CRUD ได้เลย!*

## 🚀 ขั้นตอนการเชื่อมต่อ Database (สำหรับทีม Developer)

เนื่องจากเราใช้ **AWS Academy Learner Lab** ทุกคนต้องตั้งค่า Credential ในเครื่องตัวเองก่อนเริ่มเขียนโค้ด ดังนี้:

### 1. ดึง Credentials จาก AWS
1. เข้าหน้า **AWS Learner Lab** ของตนเอง
2. กดปุ่ม **"AWS Details"** (ปุ่มสีขาวข้างปุ่ม AWS สีส้ม)
3. กดปุ่ม **"Show"** ตรงหัวข้อ **AWS CLI**
4. ก๊อปปี้ค่าทั้งหมดในกรอบ (Access Key, Secret Key และ Session Token)

### 2. ตั้งค่าไฟล์ `.env` ในเครื่อง
1. ก๊อปปี้ไฟล์ `.env.example` ในโปรเจกต์แล้วเปลี่ยนชื่อเป็น **`.env`**
2. นำค่าที่ก๊อปมาจากข้อ 1 มาวางในไฟล์ `.env` ดังนี้:
   ```env
   AWS_ACCESS_KEY_ID=ใส่ค่าที่ก๊อปมา
   AWS_SECRET_ACCESS_KEY=ใส่ค่าที่ก๊อปมา
   AWS_SESSION_TOKEN=ใส่ค่าที่ก๊อปมา (Token ยาวๆ)
   AWS_REGION=us-east-1
   DYNAMODB_TABLE_NAME=IncidentReports