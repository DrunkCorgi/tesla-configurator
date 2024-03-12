import {Component, OnInit} from '@angular/core';
import {CarService} from "../../shared/services/car.service";
import {UserInputSummaryService} from "../../shared/services/user-input-summary.service";
import {Observable, switchMap, tap} from "rxjs";
import {AsyncPipe, CurrencyPipe, JsonPipe, NgForOf, NgIf} from "@angular/common";
import {CarConfig, CarConfigDetails} from "../../shared/types/car-config";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-model-configuration',
  standalone: true,
  imports: [
    JsonPipe,
    AsyncPipe,
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    FormsModule,
    CurrencyPipe
  ],
  templateUrl: './model-configuration.component.html',
  styleUrl: './model-configuration.component.scss'
})
export class ModelConfigurationComponent implements OnInit {

  carConfig$!: Observable<CarConfig>;
  selectedConfigId: string = '';
  selectedTow: boolean = false;
  selectedYoke: boolean = false;
  selectedConfigDetails?: CarConfigDetails;

  constructor(private readonly userInputSummaryService: UserInputSummaryService,
              private readonly carService: CarService) {
  }

  ngOnInit(): void {
    this.selectedConfigId = this.userInputSummaryService.selectedCarConfigId$.value;
    this.selectedTow = this.userInputSummaryService.towSelected$.value;
    this.selectedYoke = this.userInputSummaryService.yokeSelected$.value;


    this.carConfig$ = this.userInputSummaryService.selectedCarCode$.pipe(
      switchMap((carCode: string) => {
        return this.carService.getCarConfig$(carCode)
          .pipe(
            tap((carConfig: CarConfig) => {
              this.selectedConfigDetails = carConfig.configs.find((carConfigDetails: CarConfigDetails) =>
                carConfigDetails.id === this.selectedConfigId);
            })
          );
      })
    );
  }

  carConfigChange(carConfig: CarConfig): void {
    this.selectedConfigDetails = carConfig.configs.find((carConfigDetails: CarConfigDetails) => carConfigDetails.id === this.selectedConfigId);
    this.userInputSummaryService.selectedCarConfigId$.next(this.selectedConfigId);
  }

  includeTowChanged(): void {
    this.userInputSummaryService.towSelected$.next(this.selectedTow);
  }

  includeYokeChanged(): void {
    this.userInputSummaryService.yokeSelected$.next(this.selectedYoke);
  }
}
