import { Route } from '@angular/router';
import { NoAuthGuard } from './core/auth/guards/noAuth.guard';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './core/auth/guards/auth.guard';
import { initialDataResolver } from './app.resolvers';


// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'example'},

    // Redirect signed-in user to the '/example'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'example'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
          { path: 'confirmation-required', loadChildren: () => import('./modules/auth/confirmation-required/confirmation-required.routes') },
          { path: 'forgot-password', loadChildren: () => import('./modules/auth/forgot-password/forgot-password.routes') },
          { path: 'reset-password', loadChildren: () => import('./modules/auth/reset-password/reset-password.routes') },
          { path: 'sign-in', loadChildren: () => import('./modules/auth/sign-in/sign-in.routes') },
          { path: 'sign-up', loadChildren: () => import('./modules/auth/sign-up/sign-up.routes') }
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
          { path: 'sign-out', loadChildren: () => import('./modules/auth/sign-out/sign-out.routes') },
          { path: 'unlock-session', loadChildren: () => import('./modules/auth/unlock-session/unlock-session.routes') }
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
          { path: 'home', loadChildren: () => import('./modules/landing/home/home.routes') },
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver
        },
        children: [
          { path: 'example', loadChildren: () => import('./modules/admin/example/example.routes') },
          // {path: 'example', loadChildren: () => import('././modules/admin/example/example.routes')},
        ]
    }
];
