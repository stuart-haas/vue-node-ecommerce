import { BaseEntity, Generated, Column, Entity, PrimaryColumn } from 'typeorm'
import { SessionEntity } from 'typeorm-store'

@Entity()
export class Session extends BaseEntity implements SessionEntity {
    
    @PrimaryColumn()
    id: string

    @Column()
    expiresAt: number

    @Column({type: "text"})
    data: string

    @Column()
    @Generated("uuid")
    uid: string
}