import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Crisis, CrisisService } from "./crisis.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { switchMap } from "rxjs/operators";


@Component({
    template: `
    <ul class="items">
        <li *ngFor="let crisis of crises$ | async"
          [class.selected]="crisis.id === selectedId">
            <a [routerLink]="[crisis.id]">
            <span class="badge">{{ crisis.id }}</span>{{ crisis.name }}
            </a>
        </li>
  </ul>
  <router-outlet></router-outlet>
    `
})

export class CrisisComponent {
    crises$: Observable<Crisis[]>;
    selectedId: number;

    constructor(
        private service: CrisisService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.crises$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                this.selectedId = +params.get('id');
                return this.crises$ = this.service.getCrises();
            })
        )
    }
}