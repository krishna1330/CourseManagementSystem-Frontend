import { Component } from '@angular/core';
import { CoursesComponent } from "../courses/courses.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    imports: [CoursesComponent]
})
export class HomeComponent {

}
