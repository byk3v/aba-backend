import { Usuario } from "src/usuarios/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class Role{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({type: 'varchar', length: 30, nullable: false, unique: true})
    nombre: string;
    
    @Column({type: 'varchar', length: 30, nullable: false})
    descripcion: string;

    @ManyToMany(type=> Usuario, usuario=> usuario.roles)
    @JoinTable({name: 'user_roles'})
    users: Usuario[];
    
    @Column({type: 'varchar', length: 8, default: "ACTIVE"})
    status: string;

    @CreateDateColumn({type: 'timestamp'})
    createdAt: Date;

}