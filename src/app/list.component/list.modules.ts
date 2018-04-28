import { NgModule}  from '@angular/core';
import { ListRouting } from "app/list.component/list-routing";
import { CommonModule } from "@angular/common";
import { MainListComponent, MainDetailComponent } from "app/list.component";

@NgModule({
    imports: [CommonModule, ListRouting],
    declarations: [MainListComponent, MainDetailComponent],
})
export class ListModule{}

