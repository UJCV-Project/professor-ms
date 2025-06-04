/*
  Warnings:

  - The values [ACTIVE,INACTIVE,RETIRED,ON_LEAVE] on the enum `ProfessorStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `department` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `fullName` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Professor` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Professor` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Professor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `Professor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phoneNumber` to the `Professor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ProfessorStatus_new" AS ENUM ('activo', 'inactivo', 'jubilado', 'de_baja');
ALTER TABLE "Professor" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Professor" ALTER COLUMN "status" TYPE "ProfessorStatus_new" USING ("status"::text::"ProfessorStatus_new");
ALTER TYPE "ProfessorStatus" RENAME TO "ProfessorStatus_old";
ALTER TYPE "ProfessorStatus_new" RENAME TO "ProfessorStatus";
DROP TYPE "ProfessorStatus_old";
ALTER TABLE "Professor" ALTER COLUMN "status" SET DEFAULT 'activo';
COMMIT;

-- AlterTable
ALTER TABLE "Professor" DROP COLUMN "department",
DROP COLUMN "fullName",
DROP COLUMN "phone",
DROP COLUMN "title",
ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'activo';
