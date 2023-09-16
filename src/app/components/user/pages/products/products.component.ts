import { ChangeDetectorRef, Component, ElementRef, OnInit, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { ProductService } from 'src/app/components/admin/services/products/product.service';
import { cartProduct, productData } from 'src/app/components/model/product';
import { filter } from 'rxjs/operators';
import { CartService } from '../../services/cart/cart.service';
import { HttpClient } from '@angular/common/http';
import { TmToastrService } from '@tmlib/ui-sdk/toastr';
import { TmComponentStatus } from '@tmlib/ui-sdk/helpers';
import { CurrencyPipe } from '@angular/common';
import { TmDialogService } from '@tmlib/ui-sdk/dialog';
import { UserInterfaceService } from 'src/app/components/admin/services/user-interface.service';
import { Carousel } from 'src/app/components/admin/pages/user-interface/carousel/carousel.component';
export interface cartData {
  email: string,
  date: Date,
  product: productData

}

export interface dropDownQuantity {
  id: number;
  quantity: number;
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],

})

export class ProductsComponent implements OnInit {
  message: string;

  constructor(private apiService: ProductService,  private dialogService: TmDialogService, private currencyPipe: CurrencyPipe, private toastrService: TmToastrService, private http: HttpClient, private router: Router, private cartService: CartService) {
    this.cartsData;

  }

  products: productData[] = []
  filterProducts: productData[] = []
  cartsData: cartData[] = [];
  ngOnInit(): void {
    this.getAllData();
    // this.interfaceService.getAllCarousel().subscribe((data:any) => {
    //   this.carouselData = data;
    //  console.log(this.carouselData)
    // })
    this.userData = JSON.parse(localStorage.getItem('currentuser') || '{}');
    console.log(this.userData)
    console.log(this.userData.email);
  }


  userData;
  carouselData:Carousel[]=[];
  items = [];
  getAllData() {
    console.log("**********************************************************************",this.products); // Add this line to check the product data

    this.cartService.getAllCartItems()
      .subscribe((res: any) => {
        this.products = res;
        this.filterProducts = res;
        this.products.map((a: productData) => {
          Object.assign(a, { total: a.price })
        });
      })


  }


  showToast(duration) {
    this.toastrService.success('check in cart', `Product added succesfully`, { duration });
  }
  selectedItem = '';

  addToCart(item) {

    if (!this.cartService.itemInCart(item)) {

      item.qtyTotal = 1;

      this.showToast(1000);

      this.cartService.addToCart(item)
      const data=item

      this.apiService.update(data.id,data).subscribe((res)=>{

      })
      console.log(item)

      this.items = [...this.cartService.getItems()];

    }

  }

  selectedQty;
  filterData(data: string) {
    this.filterProducts = this.products.filter((p) => p.productCategory === data || data === '')
    console.log("filterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr",this.filterProducts);
  }
  getClassOf(val: any) {
    if (val === 0) {
      return 'offerNone';
    } else {
      return 'offerBatch';
    }
  }
  getClassofQuantity(val: any, status: any) {
    if (val === 0 || status === 'Out of stock') {
      return 'outofStock';
    }
    else {
      return 'inStock'
    }
  }
disabled=false;
isDisabled=false;
  increment(item) {
   item.quantity++;
  const qty=item.productCount--;
  if(item.productCount===0){
    item.productStatus='Out of stock'
  }

   console.log(item.productCount)

  }
  decrement(item) {
    item.quantity--;
    const qty=item.productCount++;
    if(item.productCount!=0){
      item.productStatus='In stock'
    }
  }

}
