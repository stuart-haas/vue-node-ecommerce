import { PrimaryGeneratedColumn, Column, Generated, Entity, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Product {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    sku: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    price: number

    @Column()
    inStock: number

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date

    @Column()
    @Generated("uuid")
    uid: string
}