import { IsNumberString, MaxLength, IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePersonDto {
    @IsNumberString()@MaxLength(14)
    dni: string;

    @IsString()
    dni_type: string;

    @IsString()@MaxLength(50)@IsNotEmpty()
    name: string;

    @IsString()@MaxLength(50)@IsNotEmpty()
    last_name: string;

    @IsString()@MaxLength(1)
    sex: "M" | "F";

    @IsDateString()
    birthdate: string;

    @Transform((x)=> x.value ? x.value : null )
    @IsString()@IsOptional()@MaxLength(100)
    birth_place?: string | null;

    @IsDateString()@IsOptional()
    expedition_date?: string | null;

    @IsString()@IsOptional()@MaxLength(100)
    expeditien_pace?: string | null
}
