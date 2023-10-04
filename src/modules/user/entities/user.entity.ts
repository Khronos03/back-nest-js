import { Role } from "src/modules/role/entities/role.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({})
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    full_name: string;
    
    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    phone: string;

    @Column({ default: false })
    is_delete: Boolean;
    
    @OneToOne(() => Role, (role) => role.user)
    @JoinColumn()
    role: Role;    

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    update_at: Date;
}
