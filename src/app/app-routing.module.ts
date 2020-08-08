import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './modules/core/guards/auth.guard';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLandingPage = () => redirectUnauthorizedTo(['']);

const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: () => import('./modules/pages/login/login.module').then(m => m.LoginPageModule)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./modules/pages/dashboard/dashboard.module').then(m => m.DashboardPageModule),
        data: {authGuardPipe: redirectUnauthorizedToLandingPage},
        canActivate: [AngularFireAuthGuard]
    },
    {
        path: 'account',
        loadChildren: () => import('./modules/pages/account/account.module').then(m => m.AccountPageModule),
        data: {authGuardPipe: redirectUnauthorizedToLandingPage},
        canActivate: [AngularFireAuthGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
