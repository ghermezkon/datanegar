import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainListComponent, MainDetailComponent } from "app/list.component";

const routes: Routes = [
    {
        path: ':link', component: MainListComponent,
    }, {
        path: ':link/:detail', component: MainDetailComponent,
    }
];

export const ListRouting: ModuleWithProviders = RouterModule.forChild(routes);