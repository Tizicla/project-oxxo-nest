import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundException } from '@nestjs/common';
import {v4 as uuid} from 'uuid';

@Injectable()
export class ProductsService {
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
    createProductDto.productID = uuid();
    this.products.push(createProductDto);
    return createProductDto; 
  }

  findAll() {
    return this.products;
  }

  findOne(id: string) {
    const productFound = this.products.filter((product) => product.productID === id)[0];
    if (!productFound) throw new NotFoundException(`Product with ID ${id} not found`);
      return productFound;
  }

  findbyProvider(id:string){
    const productsFound = this.products.filter((product) => product.provider === id);
    if (!productsFound) throw new NotFoundException(`Products with provider ID ${id} not found`);
    return productsFound;
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    let product = this.findOne(id);
    return {
      ...product,
      ...updateProductDto,
    }
  }

  remove(id: string) {
    const {productID} = this.findOne (id);
    this.products= this.products.filter((product) => product.productID !== productID);
    return this.products;
    return `Product with ID ${id} has been removed`;
  } 
}
