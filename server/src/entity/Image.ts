import { PrimaryGeneratedColumn, Column, Generated, Entity, CreateDateColumn, UpdateDateColumn, OneToOne } from 'typeorm'
import { Prediction } from '@entity/Prediction'

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

    @OneToOne(type => Prediction, prediction => prediction.image, { onDelete: 'CASCADE' })
    prediction: Prediction

    @Column()
    @Generated("uuid")
    uid: string
}