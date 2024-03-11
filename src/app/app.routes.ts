import { Routes } from '@angular/router';
import {ModelSelectionComponent} from "./pages/model-selection/model-selection.component";
import {ModelConfigurationComponent} from "./pages/model-configuration/model-configuration.component";
import {isStepThreeAllowed$, isStepTwoAllowed$} from "./route.guards";
import {ConfiguratorSummaryComponent} from "./pages/configurator-summary/configurator-summary.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: "step_one",
    pathMatch: "full",
  },
  {
    path: 'step_one',
    component: ModelSelectionComponent,
  },
  {
    path: 'step_two',
    component: ModelConfigurationComponent,
    canActivate: [isStepTwoAllowed$],
  },
  {
    path: 'step_three',
    component: ConfiguratorSummaryComponent,
    canActivate: [isStepThreeAllowed$],
  }
];
