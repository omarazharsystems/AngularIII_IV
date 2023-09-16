import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserInterfaceService } from '../../../services/user-interface.service';
import { of } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';
export interface Carousel {
  id: any;
  carouselImage: any;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  public testData:any[]=[];
  title = 'My App';
  constructor(public interfaceService: UserInterfaceService, private cdr: ChangeDetectorRef,private router: Router, private formBuilder: FormBuilder) { 
  
  }

  ngOnInit(): void {
  
  this.getData()
    
    console.log('check',this.testData)
  }
  create() {
    this.router.navigateByUrl('admin/user-interface/carousel-create')
  }
  getData() {
    this.interfaceService.getAll().subscribe(
      (data: Carousel[]) => {
        this.testData = data;
        this.cdr.detectChanges(); // manually trigger change detection
      },
      (error) => {
        console.log(error);
      }
    );
  }
  delete(id){
    this.interfaceService.deleteCarousel(id).subscribe((a)=>(
      console.log("deleted")
    ))
    this.getData()
  }
}
