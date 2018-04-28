import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { ArticleComponent, AdminContainerComponent } from "app/admin";

const routes: Routes=[
    { path: '',  component: AdminContainerComponent,
        children: [
                    //  {
                    //      path: 'list',
                    //      component: MainListComponent
                    //  }
        ] },
    //{ path: 'hero/:id', component: HeroDetailComponent }
    
];

export const AdminRouting: ModuleWithProviders = RouterModule.forChild(routes);