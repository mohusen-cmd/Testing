import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
@Injectable()
export class Authguard implements CanActivate {
    constructor(public router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if (localStorage.getItem("token") != null) {
            return true;
        }
        else {
            this.router.navigate(["/login"]);
            return false;
        }
    }

}