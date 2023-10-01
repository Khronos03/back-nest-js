import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({})
export class Usuario {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column()
    full_name: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    phone: number;
    // TO-DO
    role;
    @Column()
    is_delete: Boolean;
    @Column()
    created_at: Date;
    @Column()
    update_at: Date;
}
