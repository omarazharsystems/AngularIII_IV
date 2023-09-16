export interface productData{
    id:number;
    productCode:string;
    title:string;
    price:number;
    productCategory:string;
    description:string;
    images:any;
    productCount:number;
    productStatus:string;
    productOffer:string;
    quantity:number;
    qtyTotal:number;
    total:number;
}
export interface cartProduct{
        productnumber:number;
        productCode:string;
        title:string;
        price:number;
        productCategory:string;
        description:string;
        images:any;
        productStatus:string;
        productOffer:string;
        quantity:number;
        qtyTotal:number;
        subTotal:number;
        total:number;
}
export interface orderHistory{
    email:string;
    orders:cartProduct;
}
export interface order{
    id:number;
    orderCode:string;
    email:string;
    orderDate:Date;
    address:string;
    total:number;
}
