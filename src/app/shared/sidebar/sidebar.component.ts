import {Component, OnInit} from '@angular/core';
import {MenuLink} from "../../model/data-types";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

    menuStatus = true;

    constructor() {
    }

    ngOnInit(): void {
    }

    linksArr: MenuLink[] = [
        {name: 'data', link: '/data', icon: 'table_chart'},
        {name: 'graphs', link: './graphs', icon: 'show_chart'},
    ];

    changeMenuStatus() {
        this.menuStatus = !this.menuStatus;
    }

}
