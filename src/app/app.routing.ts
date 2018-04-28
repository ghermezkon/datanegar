import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: 'list', loadChildren: './list.component/list.modules#ListModule' },
    { path: 'admin', loadChildren: './admin/admin.module#AdminModule' },
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes);