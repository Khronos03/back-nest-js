import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({})
export class Role {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    name: string;
    @Column()
    is_delete: Boolean;
    @Column()
    created_at: Date;
    @Column()
    update_at: Date;
}
