import { type } from "os";
import { Role } from "src/roles/entities/role.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    @OneToOne(type => Role, role => role.name, { cascade: true })
    @JoinColumn({ name: 'rol_id' })
    role: Role;
    @Column()
    is_delete: Boolean;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    update_at: Date;
}
