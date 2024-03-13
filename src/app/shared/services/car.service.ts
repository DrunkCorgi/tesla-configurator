import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, switchMap, tap, timer} from "rxjs";
import {Car} from "../types/car";
import {CarConfig} from "../types/car-config";

@Injectable({
  providedIn: 'root',
})
export class CarService {

  cars$!: Observable<Car[]>;

  carConfig?: CarConfig;

  constructor(private httpClient: HttpClient) {
  }

  public getCars$(): Observable<Car[]> {
    if (!this.cars$) {
      // We delay the firing of this observable because firefox seems to have a problem calling this url using the mockServiceWorker.
      // My guess is that the worker isn't ready by the time the call is made in firefox at least....
      this.cars$ = timer(250).pipe(switchMap(() =>
        this.httpClient.get<Car[]>('/models')
      ));
    }
    return this.cars$;
  }

  public getCarConfig$(carCode: string): Observable<CarConfig> {
    return this.httpClient.get<CarConfig>(`/options/${carCode}`)
      .pipe(
        tap((carConfig) => this.carConfig = carConfig));
  }
}
