import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { UserInterfaceService } from '../../services/user-interface.service';

@Component({
  selector: 'app-user-interface',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.scss']
})
export class UserInterfaceComponent implements OnInit {

    constructor(private interfaceService:UserInterfaceService,private formBuilder:FormBuilder  ) { }
   
    ngOnInit(): void {
    
     
    }
   
   
 
   
  
  
}
