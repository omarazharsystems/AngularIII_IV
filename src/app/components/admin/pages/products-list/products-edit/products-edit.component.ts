import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { productData } from 'src/app/components/model/product';
import { ProductService } from '../../../services/products/product.service';
@Component({
  selector: 'app-products-edit',
  templateUrl: './products-edit.component.html',
  styleUrls: ['./products-edit.component.scss']
})
export class ProductsEditComponent implements OnInit {
id:any;
  productsData:productData;
  productForm!: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private router:Router,private apiService:ProductService,private httpClient: HttpClient) { }
  private index: number = 0;
  ngOnInit(): void {
    this.productsData=JSON.parse(localStorage.getItem('product') || '{}')

    this.productForm = this.formBuilder.group(
      { title:[this.productsData.title],
        productCode: [this.productsData.productCode],
        price:[this.productsData.price],
        productCategory:[this.productsData.productCategory],
        description:[this.productsData.description],
        images:[this.productsData.images],
        productOffer:[this.productsData.productOffer],
        productStatus:[this.productsData.productStatus],
        productCount:[this.productsData.productCount],
        quantity:0
      }
    )

  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result); // log base64 string to console
        this.productForm.get('images').setValue(reader.result);
      };
      reader.readAsDataURL(event.target.files[0]); // read file as data url

    }
  }




  // user register
update() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.apiService.update(this.productsData.id,this.productForm.value).subscribe((res:any) => {
    })
    localStorage.removeItem('product');
    this.router.navigate(['admin/products-list']);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }




}
