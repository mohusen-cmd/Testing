import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class LoadingService {
    private loadingSubject = new BehaviorSubject(false)
    loading$: Observable<boolean> = this.loadingSubject.asObservable()

    showloadingUntile<T>(obs$: Observable<T>): Observable<T> {
        return undefined
    }

    loadingOn() {
        this.loadingSubject.next(true)
    }

    loadingOf() {
          this.loadingSubject.next(false)
    }
}