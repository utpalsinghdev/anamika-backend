-- DropForeignKey
ALTER TABLE "WelcomeLetter" DROP CONSTRAINT "WelcomeLetter_customerId_fkey";

-- AlterTable
ALTER TABLE "AppointmentSalary" ADD COLUMN     "agentName" TEXT,
ADD COLUMN     "agentNumber" TEXT;

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "dob" DROP NOT NULL,
ALTER COLUMN "email" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL,
ALTER COLUMN "district" DROP NOT NULL,
ALTER COLUMN "State" DROP NOT NULL,
ALTER COLUMN "pinCode" DROP NOT NULL,
ALTER COLUMN "bank" DROP NOT NULL,
ALTER COLUMN "AccountNumber" DROP NOT NULL,
ALTER COLUMN "ifsc" DROP NOT NULL,
ALTER COLUMN "accountType" DROP NOT NULL,
ALTER COLUMN "adharNumber" DROP NOT NULL,
ALTER COLUMN "panNumber" DROP NOT NULL,
ALTER COLUMN "bankProof" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "WelcomeLetter" ADD CONSTRAINT "WelcomeLetter_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
