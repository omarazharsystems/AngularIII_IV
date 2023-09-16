import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { TmToastrService } from '@tmlib/ui-sdk/toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { productData } from 'src/app/components/model/product';
import { CartService } from '../../services/cart/cart.service';
import { cartData } from '../products/products.component';
import { SnackbarService } from 'ngx-snackbar';
import { TmDialogService } from '@tmlib/ui-sdk/dialog';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orderData;
  productData;
  productDetails: cartData;
  rallies$: Observable<any[]>;
  constructor(private http: HttpClient,private snackbarService:SnackbarService,private dialogService: TmDialogService, private cartService: CartService, private toastrService: TmToastrService) { }
  userData;
  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('currentuser') || '{}');
    this.getData();
  }
  orderDate;

  getData() {
    this.cartService.getAllOrder().subscribe((data: any) => {
      // console.log(data);
      this.orderData = data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      console.log(this.orderData);
      this.orderData = this.orderData.filter((p) => p.email === this.userData.email);
      this.orderDate = this.orderData.map((p) => this.orderDate = p.date);
      console.log(this.orderDate)
    })
    // this.cartService.getAllCart().subscribe((data) => {

    // // this.productDetails=data;
    // //  if(this.productDetails.date === this.orderDate && this.productDetails.email===this.userData.email)
    // //  {

    // //  }




    // //  console.log(this.productDetails.map((p)=>(p.product[0].productName)))  

    // });

  }
  orderdeatils = false;
  orderFilter;
  public counts = ["Progress","Packed","Shipped",
  "Delivered"];
  public orderStatus = "Progress"
  orderDetails(item) {
    this.orderdeatils = true;
    this.orderFilter = this.orderData.filter((p) => p.id === item.id);
  }
  back() {
    this.orderdeatils = false;
  }
  sortRalliesByDateDesc() {

  }
  snackBarOpen:boolean=false;
  cancel(id) {
    this.cartService.deleteOrder(id).subscribe((data) => ({
 
    }))
this.showToast(1000)
// this.snackbarService.add({
//   msg: 'success',
//   action: {
//     text: 'close',
//     color: 'red'
//   },
// });

  }
  showToast(duration) {
    this.toastrService.danger('**', `order canceled`, { duration });
  }

  history(){
    // this.snackbarService.add({
    //   msg: 'Your order cancel successfully',
    //   color:'white',
    
    //   customClass:'snackBar',
    //   action: {
    //     text: ' ',
    //     color: '',
      
    //   },
  
      
    // });


  }
  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: ' ' });
  }
  closeSnackBar(){
    
  }
}
