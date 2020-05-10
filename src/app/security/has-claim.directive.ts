import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from './auth.service';

@Directive({
  selector: '[hasClaim]'
})
export class HasClaimDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authoService: AuthenticationService) { }
  
    @Input() set hasClaim(claims: any) {

      //
      if (this.authoService.hasClaim(claims)) {
        // Add template to DOM
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        // Remove template from DOM
        this.viewContainer.clear();
      }
    }


}