import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundException } from '@nestjs/common';
import {v4 as uuid} from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ){}

  private products: CreateProductDto[] = [
    {
      productID: uuid(),
      productName: "Sabritas Limón",
      price: 29,
      countSeal: 3,
      provider: uuid(),
    },
    {
      productID: uuid(),
      productName: "Coca-Cola 600 ml",
      price: 25,
      countSeal: 2,
      provider: uuid(),  
    },
    {
      productID: uuid(),
      productName: "Agua Ciel 600 ml",
      price: 10,
      countSeal: 2,
      provider: uuid(),  
    },
  ]

  create(createProductDto: CreateProductDto) {
    const product = this.productRepository.save(createProductDto);
    return product; 
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    const product = this.productRepository.findOneBy({
      productID:id,
    })
    if (!product) throw new NotFoundException( `Product with ID ${id} not found`);
    return product;
  }

  findbyProvider(id:string){
    const productsFound = this.products.filter((product) => product.provider === id);
    if (!productsFound) throw new NotFoundException(`Products with provider ID ${id} not found`);
    return productsFound;
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      productID:id,
      ...updateProductDto
    })
    if (!productToUpdate) throw new NotFoundException(`Product with ID ${id} not found`);
    this.productRepository.save(productToUpdate);
    return productToUpdate;
  }

  remove(id: string) {
    this.findOne(id)
    this.productRepository.delete({
      productID:id
    })
    return {
      message: `Product with ID ${id} deleted`
    }
  } 
}
