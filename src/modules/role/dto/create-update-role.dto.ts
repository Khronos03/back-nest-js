import { IsOptional } from "class-validator";
import { Column } from "typeorm";

export class CreateUpdateRoleDto {
    @Column()
    @IsOptional()
    name: string;

    @Column({ default: false })
    @IsOptional()
    is_delete: Boolean;
}
