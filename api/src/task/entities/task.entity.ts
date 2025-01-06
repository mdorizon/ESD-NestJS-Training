import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('task')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;
  //
  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;
  //
  @Column({ type: 'text', nullable: true })
  description: string;
  //
  @Column({ type: 'boolean', default: false })
  completed: boolean;
  //
  @CreateDateColumn()
  createdAt: Date;
  //
  @UpdateDateColumn()
  updatedAt: Date;
}
