-- CreateEnum
CREATE TYPE "ProfessorStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'RETIRED', 'ON_LEAVE');

-- CreateTable
CREATE TABLE "Professor" (
    "id" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" "ProfessorStatus" NOT NULL DEFAULT 'ACTIVE',
    "department" TEXT,
    "title" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Professor_code_key" ON "Professor"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_email_key" ON "Professor"("email");
