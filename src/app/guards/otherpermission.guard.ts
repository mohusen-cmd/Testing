import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class OtherGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        let Type = localStorage.getItem("Permission");
        if (Type == null || Type == undefined || Type == "") {
            this.router.navigate(["/login"]);
            return false;
        }
        else if (Type.toLowerCase() == "otheruser") {
            return true;
        }
        else {
            this.router.navigate(["/login"]);
            return false;
        }
    }

}