/*
  Warnings:

  - A unique constraint covering the columns `[email,roomId]` on the table `invites` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "pinned" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE UNIQUE INDEX "invites_email_roomId_key" ON "invites"("email", "roomId");
