import {Component, OnInit} from '@angular/core';
import {UserInputSummaryService} from "../../shared/services/user-input-summary.service";
import {Observable} from "rxjs";
import {AsyncPipe, NgClass} from "@angular/common";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-step-progress',
  standalone: true,
  imports: [
    AsyncPipe,
    NgClass,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './step-progress.component.html',
  styleUrl: './step-progress.component.scss'
})
export class StepProgressComponent implements OnInit{
  isStepTwoAllowed$!: Observable<boolean>;
  isStepThreeAllowed$!: Observable<boolean>;

  constructor(private readonly userInputSummaryService: UserInputSummaryService) {
  }

  ngOnInit(): void {
    this.isStepTwoAllowed$ = this.userInputSummaryService.isStepTwoAllowed$();
    this.isStepThreeAllowed$ = this.userInputSummaryService.isStepThreeAllowed$();
  }
}

