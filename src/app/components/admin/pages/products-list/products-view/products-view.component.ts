import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { productData } from 'src/app/components/model/product';
import { ProductService } from '../../../services/products/product.service';

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.scss']
})
export class ProductsViewComponent implements OnInit {
  public productData!: productData[];
  constructor(private router:Router,private apiService :ProductService) { }

  ngOnInit(): void {
    this.getAllData();
  }
addProduct(){
  this.router.navigateByUrl('admin/products-list/create')
}
getAllData() {
  this.apiService.getAll().subscribe((data: productData[]) => {
    console.log(data);
    this.productData = data;
  })
}
edit(data:any){
  localStorage.setItem('product', JSON.stringify(data));
   this.router.navigateByUrl('admin/products-list/edit')
}
deleteProduct(id:number){
console.log(id);
   this.apiService.delete(id).subscribe(res=>{
    this.getAllData();
  })
 
}
}
