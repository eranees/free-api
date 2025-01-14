import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { PetGender } from '../../core/globals.constants';

@Entity('pet')
@Unique(['ownerEmail', 'name'])
export class PetEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'timestamptz' })
  dob: Date;

  @Column({ enum: PetGender })
  gender: PetGender;

  @Column({ nullable: true })
  breed?: string;

  @Column({})
  ownerName: string;

  @Column({})
  ownerEmail: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  deletedAt: Date;
}
