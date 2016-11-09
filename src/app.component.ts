import { Component } from '@angular/core'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/interval'
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/merge'
import 'rxjs/add/operator/startWith'
import 'rxjs/add/operator/scan'
import 'rxjs/add/operator/mapTo'
import { Subject } from 'rxjs/Subject'
import { Store } from '@ngrx/store'
import { SECOND, HOUR } from './reducers'

// Updated to Angular 2 final @NgModule features
// For more infor on modules, check out:
// https://egghead.io/lessons/angular-2-create-application-specific-angular-2-components)
@Component({
    selector: 'app',
    template: `
        <button (click)="click$.next()">Update</button>
        <h1>{{clock | async | date:'medium'}}</h1>
        `
})
export class App {
    click$ = new Subject();
    clock;

    constructor(store: Store<any>) {
        this.clock = store.select('clock')

        Observable.merge(
            this.click$.mapTo(HOUR),
            Observable.interval(1000).mapTo(SECOND)
        )
            .subscribe((type)=>{
                store.dispatch({type})
            })
    }
}