import {Directive, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from '../auth.service';
import {CurrentUser} from '../models/current-user.class';

@Directive({ selector: '[appShowWithLogged]'})
export class ShowWithLoggedDirective {
  private hasView = false;
  private currentUser: CurrentUser;

  constructor(private templateRef: TemplateRef<any>, private viewContainer: ViewContainerRef, private authService: AuthService) {
    this.authService.currentUser.subscribe((currentUser: CurrentUser) => {
      this.currentUser = currentUser;
      this.refresh();
    });
  }

  private refresh() {
    const isLogged = this.currentUser.isLogged();

    if (isLogged && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!isLogged && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
