import { NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Navigation, Router, RouterOutlet } from '@angular/router';
import { FuseFullscreenComponent } from 'src/@fuse/components/fullscreen';
import { FuseLoadingBarComponent } from 'src/@fuse/components/loading-bar';
import { FuseHorizontalNavigationComponent, FuseNavigationService, FuseVerticalNavigationComponent } from 'src/@fuse/components/navigation';
import { FuseMediaWatcherService } from 'src/@fuse/services/media-watcher';

import { Subject, takeUntil } from 'rxjs';
import { LanguagesComponent } from 'src/app/layout/common/languages/languages.component';
import { NavigationService } from 'src/app/core/navigation/navigation.service';
import { MessagesComponent } from 'src/app/layout/common/messages/messages.component';
import { NotificationsComponent } from 'src/app/layout/common/notifications/notifications.component';
import { QuickChatComponent } from 'src/app/layout/common/quick-chat/quick-chat.component';
import { SearchComponent } from 'src/app/layout/common/search/search.component';
import { ShortcutsComponent } from 'src/app/layout/common/shortcuts/shortcuts.component';
import { UserComponent } from 'src/app/layout/common/user/user.component';

@Component({
    selector     : 'enterprise-layout',
    templateUrl  : './enterprise.component.html',
    encapsulation: ViewEncapsulation.None,
    standalone   : true,
    imports      : [FuseLoadingBarComponent, NgIf, FuseVerticalNavigationComponent, MatButtonModule, MatIconModule, LanguagesComponent, FuseFullscreenComponent, SearchComponent, ShortcutsComponent, MessagesComponent, NotificationsComponent, UserComponent, FuseHorizontalNavigationComponent, RouterOutlet, QuickChatComponent],
})
export class EnterpriseLayoutComponent implements OnInit, OnDestroy
{
    isScreenSmall: boolean;
    navigation: Navigation;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _navigationService: NavigationService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number
    {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to navigation data
        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) =>
            {
                this.navigation = navigation;
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) =>
            {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void
    {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        if ( navigation )
        {
            // Toggle the opened status
            navigation.toggle();
        }
    }
}
