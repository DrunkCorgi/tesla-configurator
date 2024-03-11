import {Component} from '@angular/core';
import {StepProgressComponent} from "./components/step-progress/step-progress.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    StepProgressComponent,
    RouterOutlet
  ],
  templateUrl: 'app.component.html',
  styleUrl: 'app.component.scss'
})
export class AppComponent {
}
