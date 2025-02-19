-- CreateTable
CREATE TABLE "areas" (
    "area_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "areas_pkey" PRIMARY KEY ("area_id")
);

-- CreateTable
CREATE TABLE "service_posts" (
    "service_post_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "area_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "service_posts_pkey" PRIMARY KEY ("service_post_id")
);

-- CreateTable
CREATE TABLE "assignments" (
    "assignment_id" SERIAL NOT NULL,
    "exercise_label" VARCHAR(32) NOT NULL,
    "service_post_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assignments_pkey" PRIMARY KEY ("assignment_id")
);

-- AddForeignKey
ALTER TABLE "service_posts" ADD CONSTRAINT "service_posts_area_id_fkey" FOREIGN KEY ("area_id") REFERENCES "areas"("area_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assignments" ADD CONSTRAINT "assignments_service_post_id_fkey" FOREIGN KEY ("service_post_id") REFERENCES "service_posts"("service_post_id") ON DELETE RESTRICT ON UPDATE CASCADE;
