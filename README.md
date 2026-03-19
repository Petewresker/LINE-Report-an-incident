# 🗄️ Database Documentation (DynamoDB)

ส่วนนี้เป็นข้อมูลโครงสร้างฐานข้อมูลสำหรับโปรเจกต์ **LINE-Report-an-incident** ที่สร้างด้วย AWS SAM

## 📌 ข้อมูลตารางหลัก
- **Table Name:** `IncidentReports-[ชื่อStackName]` 
  *(ดูชื่อเต็มได้จาก AWS Console หรือหลังรัน sam deploy เสร็จ)*
- **Region:** `us-east-1`
- **Billing Mode:** PAY_PER_REQUEST (On-demand)

### 🔑 Primary Key Structure
| Key Type | Attribute Name | Data Type | Description |
| :--- | :--- | :--- | :--- |
| **Partition Key (PK)** | `PK` | String (S) | ID ของ Incident หรือ User (e.g., `INCIDENT#123`) |
| **Sort Key (SK)** | `SK` | String (S) | Timestamp ISO8601 (e.g., `2026-03-19T03:00:00Z`) |

---

## 🔍 Secondary Indexes (GSI)
สำหรับฝั่ง **Agency Portal** ใช้ดึงข้อมูลแยกตามหน่วยงาน:
- **Index Name:** `GSI1_AgencyPortal`
- **Partition Key:** `AgencyAccessToken` (S)
- **Sort Key:** `PK` (S)
- **Projection:** ALL

---

## 🛠️ วิธีการใช้งานสำหรับ Developer (Backend)
ใช้ SDK เชื่อมต่อโดยดึงชื่อตารางจาก Environment Variable **ห้าม Hardcode ชื่อตารางลงในโค้ด:**
`const tableName = process.env.TABLE_NAME;`

**ตัวอย่างโครงสร้างข้อมูล (Item Example):**
```json
{
  "PK": "INCIDENT#ID001",
  "SK": "2026-03-19T08:30:00Z",
  "AgencyAccessToken": "POLICE_BKK_001",
  "reporterName": "สมชาย ใจดี",
  "description": "พบอุบัติเหตุรถชน",
  "status": "PENDING",
  "location": { "lat": 14.06, "lng": 100.60 }
}
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
   //ตัวนี้ env aws ในเครื่องเวลารัน test npm run dev จะมาอ่านตัวนี้

### 3. สร้าง stack aws ในเครื่อง (DynamoDB,Lambda,SNS,Rekognition,ApiGateway)
1. ต้องมี AWS SAM CLI https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html
2.powershell terminal ใช้คำสั่ง aws configure 
   AWS_ACCESS_KEY_ID=ใส่ค่าที่ก๊อปมา 
   AWS_SECRET_ACCESS_KEY=ใส่ค่าที่ก๊อปมา
   AWS_SESSION_TOKEN=ใส่ค่าที่ก๊อปมา (Token ยาวๆ)
   AWS_REGION=us-east-1
หลังจากเสร็จเครื่องจะรู้ว่าเราใช้ learner lab //เช็คว่าโหลด sam CLI ยังด้วย sam --version
***credential พวกนี้จะเปลี่ยนทุกครั้งที่เปิดใหม่ อย่าลืมเเปลี่ยนทั้งใน .env กับ aws configure

3.sam build จะรวมแพ็กใน template.yaml แล้วจะมีไฟล์ .aws-sam
4.sam deploy --guided สำหรับครั้งแรก จะมี
Stack Name [sam-app]: ชื่ออะไรก็ได้ local ตัวเอง
        AWS Region [us-east-1]: us-east-1
        #Shows you resources changes to be deployed and require a 'Y' to initiate deploy
        Confirm changes before deploy [y/N]: y
        #SAM needs permission to be able to create roles to connect to the resources in your template
        Allow SAM CLI IAM role creation [Y/n]: y
        #Preserves the state of previously provisioned resources when an operation fails
        Disable rollback [y/N]: y
        IncidentProcessorFunction has no authentication. Is this okay? [y/N]: y
        IncidentProcessorFunction has no authentication. Is this okay? [y/N]: y
        Save arguments to configuration file [Y/n]: y
        SAM configuration file [samconfig.toml]: enter เลย
        SAM configuration environment [default]: enter เลย
เสร็จจะได้ Successfully created/updated stack - xxx in us-east-1 และ samconfig.toml

>>ลองเข้าไปดูใน learner lab แล้ว search cloudformation จะมี service ทั้งหมดที่สร้าง<<