import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
        path: 'private',
        loadChildren: () => import('./private/private.module').then(m => m.PrivateModule)
    },
    {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'private'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
