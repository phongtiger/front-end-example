import { Routes } from '@angular/router';

import { ButtonsComponent } from './buttons/buttons.component';
import { GridComponent } from './grid/grid.component';
import { ListsComponent } from './lists/lists.component';
import { MenuComponent } from './menu/menu.component';
import { TabsComponent } from './tabs/tabs.component';
import { StepperComponent } from './stepper/stepper.component';
import { ExpansionComponent } from './expansion/expansion.component';
import { ChipsComponent } from './chips/chips.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProgressSnipperComponent } from './progress-snipper/progress-snipper.component';
import { ProgressComponent } from './progress/progress.component';
import { DialogComponent } from './dialog/dialog.component';
import { TooltipComponent } from './tooltip/tooltip.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { SliderComponent } from './slider/slider.component';
import { SlideToggleComponent } from './slide-toggle/slide-toggle.component';
import {LoginComponent} from '../account/login/login.component';
import {AccountComponent} from '../account/account/account.component';
import {OrderMarketingComponent} from "../order-marketing/order-marketing.component";
import {OrderSaleComponent} from "../order-sale/order-sale.component";
import {AdminComponent} from '../admin/admin.component';
import {LegendComponent} from '../legend/legend.component';
import {GenerateCodeComponent} from "../generate-code/generate-code.component";
import {EditOrderComponent} from "../edit-order/edit-order.component";
import {ReportComponent} from "../report/report.component";

export const MaterialRoutes: Routes = [
  {
    path: 'button',
    component: ButtonsComponent
  },
  {
    path: 'grid',
    component: GridComponent
  },
  {
    path: 'lists',
    component: ListsComponent
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'tabs',
    component: TabsComponent
  },
  {
    path: 'stepper',
    component: StepperComponent
  },
  {
    path: 'expansion',
    component: ExpansionComponent
  },
  {
    path: 'chips',
    component: ChipsComponent
  },
  {
    path: 'toolbar',
    component: ToolbarComponent
  },
  {
    path: 'progress-snipper',
    component: ProgressSnipperComponent
  },
  {
    path: 'progress',
    component: ProgressComponent
  },
  {
    path: 'dialog',
    component: DialogComponent
  },
  {
    path: 'tooltip',
    component: TooltipComponent
  },
  {
    path: 'snackbar',
    component: SnackbarComponent
  },
  {
    path: 'slider',
    component: SliderComponent
  },
  {
    path: 'slide-toggle',
    component: SlideToggleComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'marketing',
    component: OrderMarketingComponent
  },
  {
    path: 'sale',
    component: OrderSaleComponent
  },
  {
    path: 'admin',
    component: AdminComponent
  },
  {
    path: 'legend',
    component: LegendComponent
  },
  {
    path: 'code',
    component: GenerateCodeComponent
  },
  {
    path: 'editorder/:id',
    component: EditOrderComponent
  },
  {
    path: 'report',
    component: ReportComponent
  }
];
