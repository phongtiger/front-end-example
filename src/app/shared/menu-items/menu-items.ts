import {Injectable} from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  {state: 'report', type: 'link', name: 'Excel', icon: 'code'},
  {state: 'code', type: 'link', name: 'Generate Code', icon: 'code'},
  {state: 'legend', type: 'link', name: 'Legend', icon: 'import_contacts'},
  {state: 'marketing', type: 'link', name: 'Order Marketing', icon: 'add_shopping_cart'},
  {state: 'sale', type: 'link', name: 'Order Sale', icon: 'gavel'},
  {state: 'account', type: 'link', name: 'Account', icon: 'account_circle'},
  {state: 'login', type: 'link', name: 'Login', icon: 'view_comfy'},
  {state: 'dashboard', type: 'link', name: 'Dashboard', icon: 'av_timer'},
  // {state: 'button', type: 'link', name: 'Buttons', icon: 'crop_7_5'},
  // {state: 'grid', type: 'link', name: 'Grid List', icon: 'view_comfy'},
  // {state: 'lists', type: 'link', name: 'Lists', icon: 'view_list'},
  // {state: 'menu', type: 'link', name: 'Menu', icon: 'view_headline'},
  // {state: 'tabs', type: 'link', name: 'Tabs', icon: 'tab'},
  // {state: 'stepper', type: 'link', name: 'Stepper', icon: 'web'},
  // {state: 'expansion', type: 'link', name: 'Expansion Panel', icon: 'vertical_align_center'},
  // {state: 'chips', type: 'link', name: 'Chips', icon: 'vignette'},
  // {state: 'toolbar', type: 'link', name: 'Toolbar', icon: 'voicemail'},
  // {state: 'progress-snipper', type: 'link', name: 'Progress snipper', icon: 'border_horizontal'},
  // {state: 'progress', type: 'link', name: 'Progress Bar', icon: 'blur_circular'},
  // {state: 'dialog', type: 'link', name: 'Dialog', icon: 'assignment_turned_in'},
  // {state: 'tooltip', type: 'link', name: 'Tooltip', icon: 'assistant'},
  // {state: 'snackbar', type: 'link', name: 'Snackbar', icon: 'adb'},
  // {state: 'slider', type: 'link', name: 'Slider', icon: 'developer_mode'},
  // {state: 'slide-toggle', type: 'link', name: 'Slide Toggle', icon: 'all_inclusive'}
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
