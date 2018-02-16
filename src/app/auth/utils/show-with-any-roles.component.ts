import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from '../auth.service';

@Directive({ selector: '[appShowWithRoles]'})
export class ShowWithRolesDirective {
  private hasView = false;

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private authService: AuthService) {
  }

  @Input() set appShowWithRoles(roles: string[]) {
    if (this.authService.currentUser.hasAnyRoles(roles) && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!this.authService.currentUser.hasAnyRoles(roles) && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
