import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiModalComponent } from './ui-modal/ui-modal.component';
import { AnimationModalComponent } from './animation-modal/animation-modal.component';

@NgModule({
    imports: [CommonModule],
    declarations: [UiModalComponent, AnimationModalComponent],
    exports: [UiModalComponent, AnimationModalComponent]
})
export class ModalModule {
    static forRoot(): any[] | import("@angular/core").Type<any> | import("@angular/core").ModuleWithProviders<{}> {
        throw new Error('Method not implemented.');
    }
}
