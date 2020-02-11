import { PrimaryGeneratedColumn, Column, Generated, Entity, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Image {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column()
    path: string

    @Column({type: "text"})
    data: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date

    @Column()
    @Generated("uuid")
    uid: string
}