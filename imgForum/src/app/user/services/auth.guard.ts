import { Injectable } from '@angular/core'
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, } from '@angular/router'
import { UserService } from './user.service'

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private userService: UserService,
        private router: Router
    ) {} 
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if( this.userService.isLoggedIn() ) {
            // if user is login, allow access
            return true
        } else {
            // if not, deny access, and ask to login first 
            this.router.navigate(['/user/login'], {
                queryParams: {
                    return: state.url 
                }
            });
            return false;
        }
    }
}