import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() featureSelected = new EventEmitter<string>();
  isAuthenticated: boolean = false;
  private userSub: Subscription;

  constructor(
    private dataStorageDevice: DataStorageService,
    private authService: AuthService,
    private store: Store<fromApp.AppState>,
  ) {}

  ngOnInit(): void {
    this.userSub = this.store
      .select('auth')
      .pipe(
        map((authState) => {
          return authState.user;
        })
      )
      .subscribe((user) => {
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
      });
  }

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }

  onSaveData() {
    this.dataStorageDevice.storeRecipes();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }

  onFetchData() {
    this.dataStorageDevice.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
