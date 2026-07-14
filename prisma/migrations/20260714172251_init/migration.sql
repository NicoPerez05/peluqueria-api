-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('CLIENT', 'PELUQUERO', 'ADMIN');

-- CreateEnum
CREATE TYPE "TurnoEstado" AS ENUM ('CONFIRMADO', 'RECHAZADO', 'CANCELADO', 'PENDIENTE', 'COMPLETADO');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido" TEXT NOT NULL,
    "DNI" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "numeroTelefono" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'CLIENT',

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Turno" (
    "id" SERIAL NOT NULL,
    "id_cliente" INTEGER NOT NULL,
    "id_peluquero" INTEGER,
    "id_servicio" INTEGER NOT NULL,
    "id_horario" INTEGER NOT NULL,
    "estado" "TurnoEstado" NOT NULL DEFAULT 'PENDIENTE',
    "precio_final" DOUBLE PRECISION NOT NULL,
    "motivo_cancelacion" TEXT,

    CONSTRAINT "Turno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Servicio" (
    "id" SERIAL NOT NULL,
    "nombre_servicio" TEXT NOT NULL,
    "precio_servicio" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Servicio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Horario" (
    "id" SERIAL NOT NULL,
    "fecha_hora" TIMESTAMP(3) NOT NULL,
    "disponible" BOOLEAN NOT NULL DEFAULT true,
    "id_peluquero" INTEGER NOT NULL,

    CONSTRAINT "Horario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_DNI_key" ON "Usuario"("DNI");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Turno_id_horario_key" ON "Turno"("id_horario");

-- AddForeignKey
ALTER TABLE "Turno" ADD CONSTRAINT "Turno_id_cliente_fkey" FOREIGN KEY ("id_cliente") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turno" ADD CONSTRAINT "Turno_id_peluquero_fkey" FOREIGN KEY ("id_peluquero") REFERENCES "Usuario"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turno" ADD CONSTRAINT "Turno_id_servicio_fkey" FOREIGN KEY ("id_servicio") REFERENCES "Servicio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Turno" ADD CONSTRAINT "Turno_id_horario_fkey" FOREIGN KEY ("id_horario") REFERENCES "Horario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Horario" ADD CONSTRAINT "Horario_id_peluquero_fkey" FOREIGN KEY ("id_peluquero") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
