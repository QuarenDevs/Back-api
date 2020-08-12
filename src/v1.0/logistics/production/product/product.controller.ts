import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { Product } from './product.mg-document';
import { CreateProduct } from './dto/create-product.dto';
import { UpdateProduct } from './dto/update-product.dto';

@ApiTags('Logistics / Production / Product')
@Controller('api/v1.0/products')
export class ProductController {
    
    modelName = 'Product';

    constructor(private productService: ProductService){}

    @Get()
    index(): Promise<Product[]>  {
        return this.productService.getProducts();
    }

    @Get(':id')
    show(@Param('id') id:string):Promise<Product>{
        return this.productService.getProduct(id);
    }

    @Post()
    create(@Body() bodyParams: CreateProduct):Promise<Product>{
        return this.productService.createProduct(bodyParams);
    }

    
    @Put(':id')
    update(@Param('id') id:string, @Body() bodyParams: UpdateProduct):Promise<Product>{
        return this.productService.updateProduct(id, bodyParams);
    }
    
    @Delete(':id')
    delete(@Param('id') id:string):Promise<Product>{
        return this.productService.deleteProduct(id);
    }

    
    
}
