import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/components/user/services/cart/cart.service';
import { AbstractControl, FormBuilder, FormGroup,Validators } from '@angular/forms';
import { cartData } from 'src/app/components/user/pages/products/products.component';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  statusForm:FormGroup;
  constructor(private cartService:CartService,private formBuilder: FormBuilder) { }
orderData;
status;
  ngOnInit(): void {
    this.cartService.getAllOrder().subscribe((data) => {
      this.orderData=data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      console.log(data.map((a)=>(a.totalvalue)))
    
    })
    this.statusForm = this.formBuilder.group(
      {
        status:'',
      }
    )
  }
  
orderUpdate(id,ind){
  this.showSubItem(ind); 
  this.cartService.putOrderStatus(id,this.statusForm.value).subscribe((res:any) => {  
  }) 
}


visibleIndex = -1;
  showSubItem(ind) {
    if (this.visibleIndex === ind) {
      this.visibleIndex = -1;
    } else {
      this.visibleIndex = ind;
    }
  }
}
