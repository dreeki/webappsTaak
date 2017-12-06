import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() public currentUser: Observable<string>

  constructor() { }

  ngOnInit() {
  }

}
