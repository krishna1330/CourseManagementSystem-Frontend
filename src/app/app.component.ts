import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/header.component";
import { BodyComponent } from "./shared/components/body/body.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, HeaderComponent, BodyComponent, RouterModule, CommonModule]
})
export class AppComponent {
  title = 'CourseManagementSystem-Frontend';
  hideHeader: boolean = true;

  constructor(private router: Router) {

  }

  ngOnInit() {
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        this.hideHeader = e.url === '/login' ? false : true;
      }

      if (e instanceof NavigationEnd) {
        this.hideHeader = e.url === '/signup' ? false : true;
      }
    })
  }
}
