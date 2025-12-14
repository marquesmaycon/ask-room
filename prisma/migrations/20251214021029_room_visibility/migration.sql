-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('PUBLIC', 'LINK', 'PRIVATE');

-- AlterTable
ALTER TABLE "rooms" ADD COLUMN     "visibility" "Visibility" NOT NULL DEFAULT 'PUBLIC';
