import {Component, OnInit} from '@angular/core';
import {CarService} from "../../shared/services/car.service";
import {map, Observable, switchMap} from "rxjs";
import {Car} from "../../shared/types/car";
import {AsyncPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {UserInputSummaryService} from "../../shared/services/user-input-summary.service";
import {FormsModule} from "@angular/forms";
import {CarColor} from "../../shared/types/car-color";

@Component({
  selector: 'app-model-selection',
  standalone: true,
  imports: [
    AsyncPipe,
    NgForOf,
    FormsModule,
    JsonPipe,
    NgIf
  ],
  templateUrl: './model-selection.component.html',
  styleUrl: './model-selection.component.scss'
})
export class ModelSelectionComponent implements OnInit {

  cars$!: Observable<Car[]>;
  colors$!: Observable<CarColor[]>;

  selectedCarCode?: string;
  selectedCarColorCode?: string;

  constructor(private readonly carModelService: CarService,
              private readonly userInputSummaryService: UserInputSummaryService) {
  }

  ngOnInit(): void {
    this.cars$ = this.carModelService.getCars$();

    this.colors$ = this.userInputSummaryService.selectedCarCode$.pipe(
      switchMap((carCode) => this.cars$.pipe(
        map((cars) => cars.find((car) => car.code === carCode)?.colors ?? []),
      )),
    );

    this.selectedCarCode = this.userInputSummaryService.selectedCarCode$.value;
    this.selectedCarColorCode = this.userInputSummaryService.selectedCarColorCode$.value;
  }

  carModelChange(): void {
    if (this.selectedCarCode) {
      this.userInputSummaryService.selectedCarCode$.next(this.selectedCarCode);

      // Reset color on model change
      this.selectedCarColorCode = "";
      this.userInputSummaryService.selectedCarColorCode$.next(this.selectedCarColorCode);
    }
  }

  carColorChange(): void {
    if (this.selectedCarColorCode) {
      this.userInputSummaryService.selectedCarColorCode$.next(this.selectedCarColorCode);
    }
  }
}
