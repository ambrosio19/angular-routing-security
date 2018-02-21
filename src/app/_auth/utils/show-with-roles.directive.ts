import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from '../auth.service';
import {CurrentUser} from '../models/current-user.class';

@Directive({ selector: '[appShowWithRoles]'})
export class ShowWithRolesDirective {
  private hasView = false;
  private roles: string[];
  private currentUser: CurrentUser;

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private authService: AuthService) {
    this.authService.currentUser.subscribe((currentUser: CurrentUser) => {
      this.currentUser = currentUser;
      this.refresh();
    });
  }

  @Input() set appShowWithRoles(roles: string[]) {
    this.roles = roles;
    this.refresh();
  }

  private refresh() {
    const hasRoles = this.currentUser.hasRoles(this.roles);

    if (hasRoles && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasRoles && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
