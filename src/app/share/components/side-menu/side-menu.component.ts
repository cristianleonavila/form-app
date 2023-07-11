import { Component } from '@angular/core';
import { MenuItem } from '../../interfaces/menu-item';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css']
})
export class SideMenuComponent {

  public reactiveMenu:MenuItem[] = [
    { title: 'Básicos', route: 'reactive/basic'},
    { title: 'Dinámicos', route: 'reactive/dynamic'},
    { title: 'Switches', route: 'reactive/switches'}
  ];

  public authMenu:MenuItem[] = [
    { title: 'Registro', route: 'auth'}

  ];  
}
