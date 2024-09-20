import { Transform } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: 0 })
  price: number;

  @Column({ nullable: true })
  description: string;

  @Column({ default: '', type: 'simple-array' })
  tags: string[];

  @Transform(({ value }) => {
    if (value != null) {
      return `${process.env.PUBLIC_URL}/${value}`;
    }
    return '';
  })
  @Column({ default: 'product.png', nullable: true })
  picture: string;

  @Column({ default: false })
  isActive: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
