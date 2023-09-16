import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../../services/products/product.service';

@Component({
  selector: 'app-products-create',
  templateUrl: './products-create.component.html',
  styleUrls: ['./products-create.component.scss']
})
export class ProductsCreateComponent implements OnInit {

  productForm!: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder,private router:Router,private apiService:ProductService) { }
  private index: number = 0;
  ngOnInit(): void {
    this.productForm = this.formBuilder.group(
      { productName:['',Validators.required],
        productCode: ['', Validators.required],
        productPrice:['',Validators.required],
        productCategory:[""],
        productDescription:[""], 
        productImage:["",Validators.required],
        productOffer:[""],
        productStatus:[""],
        productCount:[""],
        quantity:0
      }
    )

  }
  // onSelectFile(event) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();

  //     reader.readAsDataURL(event.target.files[0]); // read file as data url

  //     reader.onload = (event) => { // called once readAsDataURL is completed
  //       this.productForm.value.productImage = event.target.result;
     
  //     }
  //   }
  // }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        console.log(reader.result); // log base64 string to console
        this.productForm.get('productImage').setValue(reader.result);
      };
      reader.readAsDataURL(event.target.files[0]); // read file as data url

    }
  }
  handleInputChange(e) {
    var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    this.productForm.value.productImage = reader.result;
    console.log( this.productForm.value.productImage)
  }

 public fields: Object = { text: 'Game', value: 'Id' };

  onChange(args: any): void {
    if(this.productForm.value.productCount==0){
          this.productForm.value.productStatus=='Out of Stock'
    }
}
  // user register
 createProduct() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.apiService.create(this.productForm.value).subscribe((res:any) => {
     
    }) 
    this.router.navigate(['admin/products-list']);
  }
  
  get f(): { [key: string]: AbstractControl } {
    return this.productForm.controls;
  }
  
}
