import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PrivateRoutingModule} from './private-routing.module';
import {PrivateComponent} from './private.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {NgChartsModule} from "ng2-charts";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {DetailComponent} from './detail/detail.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatDividerModule} from "@angular/material/divider";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";


@NgModule({
    declarations: [
        PrivateComponent,
        DetailComponent
    ],
    imports: [
        CommonModule,
        PrivateRoutingModule,
        MatProgressSpinnerModule,
        MatCardModule,
        NgChartsModule,
        MatExpansionModule,
        MatIconModule,
        MatButtonModule,
        MatGridListModule,
        MatDividerModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule
    ]
})
export class PrivateModule {
}
