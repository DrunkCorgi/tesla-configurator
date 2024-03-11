import {inject} from "@angular/core";
import {UserInputSummaryService} from "./shared/services/user-input-summary.service";
import {Observable} from "rxjs";

export function isStepTwoAllowed$(): Observable<boolean> {
  const userSummaryService = inject(UserInputSummaryService);
  return userSummaryService.isStepTwoAllowed$();
}

export function isStepThreeAllowed$(): Observable<boolean> {
  const userSummaryService = inject(UserInputSummaryService);
  return userSummaryService.isStepThreeAllowed$();
}
