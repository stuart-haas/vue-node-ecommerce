import { PrimaryGeneratedColumn, Column, Generated, Entity, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm'
import { Image } from '@entity/Image'

@Entity()
export class Prediction {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: "text"})
    data: string

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    createdAt: Date

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    updatedAt: Date
    
    @OneToOne(type => Image, image => image.prediction, { onDelete: 'CASCADE' })
    @JoinColumn()
    image: Image

    @Column()
    @Generated("uuid")
    uid: string
}