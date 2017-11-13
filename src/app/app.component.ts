import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  form: FormGroup;
  deniedNames = ['test', 'bond'];
  ngOnInit(){

    this.form = new FormGroup({
      'projectName' : new FormControl(null , [Validators.required ], this.nameCheckAsync.bind(this)),
      'email' : new FormControl(null, [Validators.required, Validators.email] ),
      'status' : new FormControl('stable')

    });

  }

  nameCheckAsync(control: FormControl): Promise<any> | Observable<any> {

    const promise = new Promise<any>((resolve , reject) => {

      setTimeout(() => {

        if (this.deniedNames.indexOf(control.value) !== -1){
          resolve({'NameInvalid': true});
        }else{
          resolve(null);
        }

      }, 1500);

    });

    return promise;
  }


  /*nameCheck(control: FormControl): {[s: string]: boolean}{

    if (this.deniedNames.indexOf(control.value) !== -1){
      return {'Project Name invalid': true };
    }else{
      return null;
    }

   }*/





  onSubmit(){

    console.log(this.form.value);
    this.form.reset({'projectName': '' , 'email': '' , 'status': 'stable' });

  }




}
