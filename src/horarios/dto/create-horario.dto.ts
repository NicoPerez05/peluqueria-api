import { ApiProperty } from '@nestjs/swagger';
import {Min, IsNotEmpty, IsDateString, IsBoolean, IsOptional, IsInt } from 'class-validator';

export class CreateHorarioDto {
  @ApiProperty({example: '2026-07-25T15:30:00.000Z' , description: 'Fecha_hora en la que se agenda el turno'})
  @IsDateString()
  @IsNotEmpty()
  fecha_hora!: string;

  @ApiProperty({example: true, description: 'Define si esta el horario disponible o no', required: false})
  @IsOptional()
  @IsBoolean()
  disponible?: boolean;

  @ApiProperty({example: 10, description: 'Id del peluquero que guardo el horario'})
  @IsInt()
  @Min(1)
  id_peluquero!: number;
}