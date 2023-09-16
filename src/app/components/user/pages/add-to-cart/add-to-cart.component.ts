import {
  Component, ElementRef,
  OnInit,
  QueryList,
  VERSION,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { CartService } from '../../services/cart/cart.service';
import { CurrencyPipe } from "@angular/common";
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { userData } from 'src/app/components/sign-in/userData';
import { cartProduct, order, productData } from 'src/app/components/model/product';
import { findIndex, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// import codes from "../pincode";
// import manualDistance from "../manualDistance";
import { TmToastrService } from '@tmlib/ui-sdk/toastr';
import { TmComponentStatus } from '@tmlib/ui-sdk/helpers';
import { ProductService } from 'src/app/components/admin/services/products/product.service';
import { TmDialogRef } from '@tmlib/ui-sdk/dialog';
import { cartData, dropDownQuantity } from '../products/products.component';
@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss']
})

export class AddToCartComponent implements OnInit {
  items;
  cartProduct: productData[] = [];
  public dropDownQuantityValue: dropDownQuantity[] = [];
  checkoutForm: FormGroup;
  submitted = false;
  @ViewChildren("subTotalWrap") subTotalItems: QueryList<ElementRef>;
  @ViewChildren("subTotalWrap_existing") subTotalItems_existing: QueryList<
    ElementRef
  >;
  @ViewChild('autoInput') input;

  constructor(private apiService: ProductService, private dialogRef: TmDialogRef<AddToCartComponent>, public cartService: CartService, private router: Router, private toastrService: TmToastrService,
    private currencyPipe: CurrencyPipe, private formBuilder: FormBuilder, private http: HttpClient) {
    // this.codes = codes;
  }
  userdata!: userData;
  options;
  filteredOptions$: Observable<any>;
  // codes;
  shipping;
  distance;
  cartsData: cartData;

  //https://indianpincodeapi.onrender.com/pincode
  ngOnInit(): void {
    this.userdata = JSON.parse(localStorage.getItem('currentuser') || '{}');
    this.cartProduct = this.cartService.getCartItems();
    this.updateTotalPrice();
    this.gst();
    this.checkoutForm = this.formBuilder.group({
      email: this.userdata.email,
      address: this.userdata.address,
      orderCode: new Date() + '277',
      pincode: "",
      payment: "",
      status: 'processing',
      date: new Date(),
      deliveryCharge: this.shipping,
      totalvalue: this.totalPrice,
      products:[]
    });


  }


  showToast(duration) {
    this.toastrService.success(
      `Getting packed`, 'Your order has been submitted', { duration }
    );
  }
  getDeliverCharges(data) {
    // this.distance = this.getDistance('624003', data);

    console.log(this.distance);
    if ((this.distance <= 100) && (data <= 500)) {
      return this.shipping = 'free';
    }
    else if ((this.distance > 100) && (this.distance < 300) && (data <= 500)) {
      return this.shipping = '49 Ruppees'
    }
    else {
      return this.shipping = '100 Ruppees'
    }
  }

  totalValue;

  onSubmit(customerData) {
    // Process checkout data here
    console.warn('Your order has been submitted', customerData);


  }
  // getPincode() {
  //   this.cartService.getPostCode().subscribe((data) => {
  //     console.log(data);
  //     this.options = data;
  //   })
  // }
  payment = [
    { id: 1, value: 'Cash On delivery' },
    { id: 2, value: 'IMPS' },
    { id: 3, value: 'NEFT' },
    { id: 4, value: 'Pay with UPI' },
    { id: 5, value: 'Debit / Credit card' }
  ]
  updateQty = JSON.parse(localStorage.getItem('cart_items'));
  changeSubtotal(item, index) {
    const qty = item.quantity;
    const amt = item.price;
    const subTotal = amt * qty;
    const subTotal_converted = this.currencyPipe.transform(subTotal, "USD");
    this.subTotalItems.toArray()[
      index
    ].nativeElement.innerHTML = subTotal_converted;
    this.cartService.saveCart();
  }

  //----- remove specific item
  removeFromCart(item) {
    this.cartService.removeItem(item);
    this.items = this.cartService.getItems();
  }

  //----- clear cart item
  clearCart(items) {
    // this.items.forEach((item, index) => this.cartService.removeItem(index));
    this.cartService.clearCart(items);
    this.items = [...this.cartService.getItems()];
  }
  checkout = false;
  checkOut() {
    this.checkout = !this.checkout;
    console.log(this.totalPrice);
  }
  selectedItem = '';
  orderData = {};
  orderedItems;
  order() {
    this.submitted = true;
    this.checkoutForm.value.product=this.cartService.getCartItems();
    this.checkoutForm.value.total = this.totalValue;
    if (this.checkoutForm.invalid) {
      return;
    }

    // localStorage.setItem('order',JSON.stringify(this.checkoutForm.value))
    console.log(this.checkoutForm.value)
    this.apiService.postOrder(this.checkoutForm.value).subscribe((res: any) => {

    });

    this.cartService.postCartItem({ date: new Date(), email: this.userdata.email, product: this.cartService.getCartItems() }).subscribe((res: any) => {

    });


    // console.log(this.checkoutForm.value)
    this.cartProduct = [];
    this.cartService.clearCart(this.cartProduct);

    this.cartService.productList.next(this.cartProduct);
    this.checkoutForm.reset();

    this.showToast(3000);

    this.dialogRef.close();
    // window.location.reload();
  }

  // getlatLng(pincode) {
  //   return this.codes[pincode];
  // }

  // getDistance(toPincode, fromPincode) {
  //   let distance = 1;
  //   // const doesExist = manualDistance[toPincode];
  //   if (doesExist && doesExist[fromPincode]) {
  //     distance = doesExist[fromPincode]
  //   } else {
  //     const toCoords = this.getlatLng(toPincode);
  //     const fromCoords = this.getlatLng(fromPincode);
  //     distance = calculategeoDistance(toCoords, fromCoords);
  //     if (toPincode === fromPincode) {
  //       distance = 1;
  //     }
  //   }
  //   return distance;

  // }
  get f(): { [key: string]: AbstractControl } {
    return this.checkoutForm.controls;
  }
  dropDownValue(quantity: any, id: number) {
    this.dropDownQuantityValue.push({ id: id, quantity: quantity.value });
    console.log("dropDownValue", this.dropDownQuantityValue);
  }
  updateCart(product: dropDownQuantity) {
    const selectedQuantity = this.dropDownQuantityValue.find((quantites: { id: number, quantity: number }) => quantites.id == product.id);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    product.quantity = selectedQuantity!.quantity;
    console.log("addQuantityToCart quantity", selectedQuantity);
  }
  gstCartTotal = 0;
  //Gst
  gst(): number {
    let total = 0;
    this.cartProduct.map((a: productData) => {
      total = ((total + (a.quantity * a.price)));
    })
    return total;
  }
  //Total Price
  totalPrice = 0;
  updateTotalPrice(): number {
    let total = 0;
    this.cartProduct.map((a: productData) => {
      total = (total + (a.quantity * a.price));
    })
    return this.totalPrice = total;
  }
  //remove Individual Cart Products
  removeSingleProducts(product: productData) {
    this.cartProduct.map((a: productData, index: number) => {
      if (product.id === a.id) {
        this.cartProduct.splice(index, 1);
      }
    })
    this.cartService.productList.next(this.cartProduct)
  }
  //remove all Cart Products
  removeAllProducts() {
    this.cartProduct = [];
    this.cartService.clearCart(this.cartProduct);
    this.cartService.productList.next(this.cartProduct);
    localStorage.removeItem("cart_items")
  }
  //close Dialog Box
  dialogCloseBtn() {
    this.dialogRef.close();
  }

}
export const toRad = value => {
  const RADIANT_CONSTANT = 0.0174532925199433;
  return value * RADIANT_CONSTANT;
};
export const calculategeoDistance = (start, end) => {
  const KM_RATIO = 6371;
  try {
    const dLat = toRad(end.lat - start.lat);
    const dLon = toRad(end.lng - start.lng);
    const lat1Rad = toRad(start.lat);
    const lat2Rad = toRad(end.lat);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1Rad) * Math.cos(lat2Rad);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const dMtrs = KM_RATIO * c;
    return dMtrs;
  } catch (e) {
    return -1;
  }

};
