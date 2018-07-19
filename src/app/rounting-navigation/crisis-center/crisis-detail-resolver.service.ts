import { Injectable } from "../../../../node_modules/@angular/core";
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from "../../../../node_modules/@angular/router";
import { CrisisService, Crisis } from "./crisis.service";
import { Observable } from "../../../../node_modules/rxjs";
import { map, take } from "../../../../node_modules/rxjs/operators";

@Injectable()

export class CrisisDetailResolver implements Resolve<Crisis>{

    constructor(private cs: CrisisService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Crisis> {
        let id = route.paramMap.get('id');

        return this.cs.getCrisis(id).pipe(
            take(1),
            map(crisis => {
                if (crisis) {
                    return crisis;
                } else {
                    this.router.navigate(['/crisis-center']);
                    return null;
                }
            })
        )
    }
}