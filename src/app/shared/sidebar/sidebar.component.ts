import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuStatus = true;

  constructor() { }

  ngOnInit(): void {
  }

  linksArr = [
    { name: 'data', link: '/data', icon: 'table_chart' },
    { name: 'graphs', link: './graphs', icon: 'show_chart' },
];

changeMenuStatus() {
  this.menuStatus = !this.menuStatus;
}

}
