import { Component, signal, WritableSignal } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  showModal:WritableSignal<boolean> = signal(false)

toggleModal(){
  this.showModal.set(!this.showModal());
}
}
