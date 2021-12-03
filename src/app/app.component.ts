import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { bindCallback } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'InterTabCart';
  bc = new BroadcastChannel('cart_channel')
  //@Input() cartCounter: number = 0;
  cartCounter: number = 0;

  constructor(private cd: ChangeDetectorRef) { 
    let c = localStorage.getItem('cartCounter')
    this.cartCounter = Number(c);
  }
  
  ngOnInit(): void {
    this.bc.onmessage = (event) => { 
      if(event.data == 'update')
      {
        let c = localStorage.getItem('cartCounter')
        this.cartCounter = Number(c);
        console.log('message received ' + this.cartCounter);
        this.cd.detectChanges();
      }

    }
  }

  handleAddToCart(){
    this.cartCounter++;
    console.log("adding item.. " + this.cartCounter);
    localStorage.setItem('cartCounter', this.cartCounter.toString());
    this.bc.postMessage('update');
  }  
}

