import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatestWith, map, Observable, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserInputSummaryService {

  selectedCarCode$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  selectedCarColorCode$: BehaviorSubject<string> = new BehaviorSubject<string>("");

  selectedCarConfigId$: BehaviorSubject<string> = new BehaviorSubject<string>("");
  towSelected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  yokeSelected$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  subscription: Subscription = new Subscription();

  constructor() {
    // Only subscribes once while app is running and is getting deleted when closing app.
    this.subscription.add(this.selectedCarCode$.subscribe(() => this.clearModelSpecificSelections()))
  }

  public isStepTwoAllowed$(): Observable<boolean> {
    return this.selectedCarCode$.pipe(
      combineLatestWith(this.selectedCarColorCode$),
      map(([selectedCar, selectedColor ]) => {
        return !!selectedCar && !!selectedColor;
      }),
    );
  }

  public isStepThreeAllowed$(): Observable<boolean> {
    return this.isStepTwoAllowed$().pipe(
      combineLatestWith(this.selectedCarConfigId$),
      map(([isStepTwoAllowed, selectedCarConfigId]) => isStepTwoAllowed && !!selectedCarConfigId)
    );
  }

  private clearModelSpecificSelections(): void {
    this.selectedCarConfigId$.next('');
    this.towSelected$.next(false);
    this.yokeSelected$.next(false);
  }
}
