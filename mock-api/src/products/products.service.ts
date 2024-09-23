import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { fa, fakerTR as faker } from '@faker-js/faker';

@Injectable()
export class ProductsService implements OnModuleInit {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async onModuleInit() {
    const productsInDb = await this.findAll({});
    if(productsInDb.length > 0) return;
    const products: CreateProductDto[] = [];
    for (let _ = 0; _ < 200; _++) {
      let { productName, productDescription, price } = faker.commerce;
      products.push({
        name: productName(),
        description: productDescription(),
        price: +price(),
        isActive: faker.datatype.boolean({ probability: 0.6 }),
      } as any);
    }

    for await (const element of products) {
      await this.create(element);
    }
  }
  async create(createProductDto: CreateProductDto) {
    try {
      let consumer = await this.productRepository.save(
        this.productRepository.create(createProductDto),
      );
      return this.findOne(consumer.id);
    } catch (error) {
      console.log(error);
      throw new BadRequestException("Can't create!");
    }
  }
  findAll(
    where: FindOptionsWhere<Product> | FindOptionsWhere<Product>[] = {
      
    },
  ) {
    return this.productRepository.find({
      where,
    });
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne({
      where: { id },
    });
    console.log(product);
    if(!product) throw new NotFoundException();

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    delete updateProductDto.id;
    await this.productRepository.update(id, updateProductDto);
    return this.findOne(id);
  }

  remove(id: string) {
    this.productRepository.delete(id);
    return {
      success: true
    }
  }

  async removeAll() {
    this.productRepository.remove(await this.findAll());
    return;
  }

  updateImage(id: string, image: string) {
    return this.update(id, {
      picture: image,
    });
  }
}
