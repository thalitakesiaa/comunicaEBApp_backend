/*
  Warnings:

  - You are about to drop the column `group_position_id` on the `employees` table. All the data in the column will be lost.
  - You are about to drop the column `area_id` on the `service_stations` table. All the data in the column will be lost.
  - You are about to drop the `areas` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `assignments` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `group_positions` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `position_id` to the `employees` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "assignments" DROP CONSTRAINT "assignments_service_station_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_group_position_id_fkey";

-- DropForeignKey
ALTER TABLE "service_stations" DROP CONSTRAINT "service_stations_area_id_fkey";

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "group_position_id",
ADD COLUMN     "position_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "service_stations" DROP COLUMN "area_id";

-- DropTable
DROP TABLE "areas";

-- DropTable
DROP TABLE "assignments";

-- DropTable
DROP TABLE "group_positions";

-- CreateTable
CREATE TABLE "positions" (
    "position_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "service_station_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "positions_pkey" PRIMARY KEY ("position_id")
);

-- CreateTable
CREATE TABLE "work_assignments" (
    "assignment_id" SERIAL NOT NULL,
    "exercise_label" VARCHAR(32) NOT NULL,
    "service_station_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "work_assignments_pkey" PRIMARY KEY ("assignment_id")
);

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "positions"("position_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "positions" ADD CONSTRAINT "positions_service_station_id_fkey" FOREIGN KEY ("service_station_id") REFERENCES "service_stations"("service_station_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "work_assignments" ADD CONSTRAINT "work_assignments_service_station_id_fkey" FOREIGN KEY ("service_station_id") REFERENCES "service_stations"("service_station_id") ON DELETE RESTRICT ON UPDATE CASCADE;
