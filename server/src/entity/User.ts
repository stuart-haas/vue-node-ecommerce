import { PrimaryGeneratedColumn, Column, Generated, Entity, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({name: 'username', unique: true})
    username: string

    @Column({name: 'email', unique: true})
    email: string

    @Column()
    password: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date

    @Column()
    @Generated("uuid")
    uid: string
}