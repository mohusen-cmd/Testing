import { ErrorHandler, Injectable } from "@angular/core";
import { throwError } from "rxjs";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class AppErrorHandler implements ErrorHandler {
    handleError(error: any): void {
        window.alert(error.message.toString());
        throwError(error);
    }

}