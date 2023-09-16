import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInterfaceService } from 'src/app/components/admin/services/user-interface.service';
export interface Carousel{
  id:any;
  carouselImage:any;
  }
@Component({
  selector: 'app-carousel-create',
  templateUrl: './carousel-create.component.html',
  styleUrls: ['./carousel-create.component.scss']
})

export class CarouselCreateComponent implements OnInit {
  carouselForm:FormGroup;
  constructor(private interfaceService:UserInterfaceService,private router:Router,private formBuilder:FormBuilder ) { }

  ngOnInit(): void {
    this.carouselForm = this.formBuilder.group({
      carouselImage:''
    })
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
     const reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url
      
      reader.onload = (event) => { // called once readAsDataURL is completed
        this.carouselForm.value.carouselImage = event.target.result;
     
      }
    }
  }
  submitted=false;
  createcarousel() {
    this.submitted = true;
   
    if (this.carouselForm.invalid) {
      return;
    }
    this.interfaceService.createCarousel(this.carouselForm.value).subscribe((res:any) => {
     this.router.navigateByUrl('/admin/user-interface/carousel-view')
    }) 
    
  }
  get f(): { [key: string]: AbstractControl } {
    return this.carouselForm.controls;
  }
}
