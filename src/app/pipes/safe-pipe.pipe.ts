import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

@Pipe({
    name: 'safePipe'
})
export class SafePipePipe implements PipeTransform {
    constructor(protected sanitizer: DomSanitizer) {

    }
    transform(url) {
        const URL = "https://gateway.mipaymentchoice.com/api/v2/transactions/bcp"
        return this.sanitizer.bypassSecurityTrustUrl(URL)
    }

}