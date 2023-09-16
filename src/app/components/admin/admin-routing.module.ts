import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from '../user/user.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { ProductsCreateComponent } from './pages/products-list/products-create/products-create.component';
import { ProductsEditComponent } from './pages/products-list/products-edit/products-edit.component';
import { ProductsListComponent } from './pages/products-list/products-list.component';
import { ProductsViewComponent } from './pages/products-list/products-view/products-view.component';
import { CarouselCreateComponent } from './pages/user-interface/carousel/carousel-create/carousel-create.component';
import { CarouselComponent } from './pages/user-interface/carousel/carousel.component';
import { UserInterfaceComponent } from './pages/user-interface/user-interface.component';
import { UserListComponent } from './pages/user-list/user-list.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent,data: {
    title: 'Admin'
  } },
  {
    path:'user-interface',component:UserInterfaceComponent,data:{
      title:'Admin'
    },children:[
      {path:'carousel-view',component:CarouselComponent,data:{
        title:'Admin'
      }},
      {path:'carousel-create',component:CarouselCreateComponent,data:{
        title:'Admin'
      }},
      {path:'**',component:CarouselComponent,data:{
        title:'Admin'
      }},
  
  
  ]
  },
  { path: 'user-list', component: UserListComponent,data: {
    title: 'Admin'
  } },
  {path:'products-list',component:ProductsListComponent,
  children:[
    {path:'create',component:ProductsCreateComponent,data: {
      title: 'Admin'
    }},
  {path:'edit',component:ProductsEditComponent,data: {
    title: 'Admin'
  }},{
    path:'**',component:ProductsViewComponent,data: {
      title: 'Admin'
    }
  },
],data: {
  title: 'Admin'
}

   },
   {
    path:'order-list',component:OrderListComponent,data:{
      title:'Admin'
    }
   }
   ,
  { path: '**', component: DashboardComponent,data: {
    title: 'Admin'
  } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
