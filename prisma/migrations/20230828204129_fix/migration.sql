-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('AGENT', 'DEALERSHIP', 'FEILDOFFICER', 'ADMIN', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('APPROVED', 'REJECTED', 'UNDER_REVIEW', 'PENDING');

-- CreateEnum
CREATE TYPE "Lane" AS ENUM ('FIRST', 'SECOND');

-- CreateEnum
CREATE TYPE "GuardianRelation" AS ENUM ('SONOF', 'DOF', 'WOF');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('CURRENT', 'SAVING');

-- CreateEnum
CREATE TYPE "Proof" AS ENUM ('PASSBOOK', 'CHECQUE', 'STATEMENT');

-- CreateEnum
CREATE TYPE "Method" AS ENUM ('ONLINE', 'CASH', 'CHECQUE', 'NETBANKING', 'UPI');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "CareerApplication" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "role" "ROLE" NOT NULL,
    "LastName" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "Status" "Status" NOT NULL DEFAULT 'PENDING',
    "ApplicationID" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "docId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "approvedAt" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "CareerApplicationDocument" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "EmployeeDocument" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "employeeId" INTEGER
);

-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "employeeCode" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "title" TEXT,
    "firstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "role" "ROLE" NOT NULL,
    "city" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "designation" TEXT,
    "resumeId" INTEGER,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "park" BOOLEAN NOT NULL DEFAULT false,
    "managedById" INTEGER,
    "joinedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "lane" "Lane" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "CustomerDocument" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "loanId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "guardian_relation" "GuardianRelation" NOT NULL,
    "guardian_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "loanInNumber" INTEGER NOT NULL,
    "loanInWords" TEXT NOT NULL,
    "loanYear" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "district" TEXT NOT NULL,
    "State" TEXT NOT NULL,
    "pinCode" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "bank" TEXT NOT NULL,
    "AccountNumber" TEXT NOT NULL,
    "ifsc" TEXT NOT NULL,
    "accountType" "Type" NOT NULL,
    "photoId" INTEGER,
    "addharId" INTEGER,
    "adharNumber" TEXT NOT NULL,
    "panNumber" TEXT NOT NULL,
    "panId" INTEGER,
    "bankProof" "Proof" NOT NULL,
    "proofId" INTEGER,
    "status" "Status" NOT NULL,
    "customerId" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "WelcomeLetter" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "charge" INTEGER NOT NULL DEFAULT 4130,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3)
);

-- CreateTable
CREATE TABLE "Icard" (
    "id" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "profilepic" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "AppointmentSalary" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "photo" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "salary" TEXT NOT NULL,
    "targetOne" INTEGER NOT NULL,
    "targetTwo" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "invoice" (
    "id" SERIAL NOT NULL,
    "invoiceId" TEXT NOT NULL,
    "customerId" INTEGER NOT NULL,
    "desciption" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "price" INTEGER,
    "qty" INTEGER,
    "subT" INTEGER,
    "paymentMethod" "Method" NOT NULL,
    "recived" INTEGER,
    "refence" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "ApprovalLetter" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "permanentAddress" TEXT NOT NULL,
    "processingCharge" TEXT NOT NULL,
    "photo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "JointPercent" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "photo" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "file_charge" INTEGER NOT NULL,
    "loan_amount" INTEGER NOT NULL,
    "processing_fee" INTEGER NOT NULL,
    "add_charge" INTEGER NOT NULL,
    "service_tax" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Message_id_key" ON "Message"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CareerApplication_id_key" ON "CareerApplication"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CareerApplication_Email_key" ON "CareerApplication"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "CareerApplication_Phone_key" ON "CareerApplication"("Phone");

-- CreateIndex
CREATE UNIQUE INDEX "CareerApplication_docId_key" ON "CareerApplication"("docId");

-- CreateIndex
CREATE UNIQUE INDEX "CareerApplicationDocument_id_key" ON "CareerApplicationDocument"("id");

-- CreateIndex
CREATE UNIQUE INDEX "EmployeeDocument_id_key" ON "EmployeeDocument"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_id_key" ON "Employee"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_employeeCode_key" ON "Employee"("employeeCode");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_resumeId_key" ON "Employee"("resumeId");

-- CreateIndex
CREATE UNIQUE INDEX "News_id_key" ON "News"("id");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerDocument_id_key" ON "CustomerDocument"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_id_key" ON "Customer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_loanId_key" ON "Customer"("loanId");

-- CreateIndex
CREATE UNIQUE INDEX "WelcomeLetter_id_key" ON "WelcomeLetter"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Icard_id_key" ON "Icard"("id");

-- CreateIndex
CREATE UNIQUE INDEX "AppointmentSalary_id_key" ON "AppointmentSalary"("id");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_id_key" ON "invoice"("id");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_invoiceId_key" ON "invoice"("invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "ApprovalLetter_id_key" ON "ApprovalLetter"("id");

-- CreateIndex
CREATE UNIQUE INDEX "JointPercent_id_key" ON "JointPercent"("id");

-- AddForeignKey
ALTER TABLE "CareerApplication" ADD CONSTRAINT "CareerApplication_docId_fkey" FOREIGN KEY ("docId") REFERENCES "CareerApplicationDocument"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmployeeDocument" ADD CONSTRAINT "EmployeeDocument_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_managedById_fkey" FOREIGN KEY ("managedById") REFERENCES "Employee"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "CustomerDocument"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_addharId_fkey" FOREIGN KEY ("addharId") REFERENCES "CustomerDocument"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_panId_fkey" FOREIGN KEY ("panId") REFERENCES "CustomerDocument"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_proofId_fkey" FOREIGN KEY ("proofId") REFERENCES "CustomerDocument"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WelcomeLetter" ADD CONSTRAINT "WelcomeLetter_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WelcomeLetter" ADD CONSTRAINT "WelcomeLetter_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Icard" ADD CONSTRAINT "Icard_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AppointmentSalary" ADD CONSTRAINT "AppointmentSalary_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invoice" ADD CONSTRAINT "invoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApprovalLetter" ADD CONSTRAINT "ApprovalLetter_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JointPercent" ADD CONSTRAINT "JointPercent_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
