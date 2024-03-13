import {Component, OnInit} from '@angular/core';
import {UserInputSummaryService} from "../../shared/services/user-input-summary.service";
import {CarService} from "../../shared/services/car.service";
import {BehaviorSubject, map, Observable, zip} from "rxjs";
import {Car} from "../../shared/types/car";
import {CarColor} from "../../shared/types/car-color";
import {CarConfigDetails} from "../../shared/types/car-config";
import {AsyncPipe, CurrencyPipe, JsonPipe, NgIf} from "@angular/common";

@Component({
  selector: 'app-configurator-summary',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe,
    NgIf,
    CurrencyPipe
  ],
  templateUrl: './configurator-summary.component.html',
  styleUrl: './configurator-summary.component.scss'
})
export class ConfiguratorSummaryComponent implements OnInit {

  PACKAGE_FIXED_COST: number = 1000;

  selectedCar$!: Observable<Car>;
  selectedColor$!: Observable<CarColor>;

  selectedTowHitch$!: BehaviorSubject<boolean>;
  selectedYoke$!: BehaviorSubject<boolean>;

  totalCost$!: Observable<number>;

  selectedCarCode!: string;
  selectedColorCode!: string;

  selectedCarConfig!: CarConfigDetails;


  constructor(private readonly userInputSummaryService: UserInputSummaryService,
              private readonly carService: CarService) {
  }

  ngOnInit(): void {
    this.selectedCarCode = this.userInputSummaryService.selectedCarCode$.value;
    this.selectedColorCode = this.userInputSummaryService.selectedCarColorCode$.value;

    this.selectedTowHitch$ = this.userInputSummaryService.towSelected$;
    this.selectedYoke$ = this.userInputSummaryService.yokeSelected$;

    this.selectedCarConfig = this.carService.carConfig!.configs.filter((carConfigDetails: CarConfigDetails) =>
      carConfigDetails.id === this.userInputSummaryService.selectedCarConfigId$.value)[0];

    this.initializeSelectedCarObservable();
    this.initializeSelectedColorObservable();

    this.initializeTotalCostObservable();
  }

  private initializeSelectedCarObservable(): void {
    this.selectedCar$ = this.carService.cars$.pipe(
      map((cars: Car[]) =>
        cars.filter((car: Car) => car.code === this.userInputSummaryService.selectedCarCode$.value)[0],
      ),
    );
  }

  private initializeSelectedColorObservable(): void {
    this.selectedColor$ = this.selectedCar$.pipe(
      map((car: Car) =>
        car.colors.filter((color: CarColor) => color.code === this.userInputSummaryService.selectedCarColorCode$.value)[0],
      ),
    );
  }

  private initializeTotalCostObservable(): void {
    this.totalCost$ =  zip(this.selectedColor$, this.selectedTowHitch$, this.selectedYoke$).pipe(
      map(([color, towHitch, yoke]: [CarColor, boolean, boolean]) => {
        let totalCost = 0;
        totalCost += color.price;
        totalCost += towHitch ? this.PACKAGE_FIXED_COST : 0;
        totalCost += yoke ? this.PACKAGE_FIXED_COST : 0;
        totalCost += this.selectedCarConfig.price;

        return totalCost;
      })
    )
  }
}


