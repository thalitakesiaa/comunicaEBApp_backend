/*
  Warnings:

  - You are about to drop the column `location` on the `employees` table. All the data in the column will be lost.
  - Added the required column `service_station_id` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "employees" DROP COLUMN "location",
ADD COLUMN     "service_station_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_service_station_id_fkey" FOREIGN KEY ("service_station_id") REFERENCES "service_stations"("service_station_id") ON DELETE RESTRICT ON UPDATE CASCADE;
