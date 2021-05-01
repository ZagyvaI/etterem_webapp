var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, OnInit, Input, Output, ChangeDetectorRef, EventEmitter, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from 'primeng/api';
let Paginator = class Paginator {
    constructor(cd) {
        this.cd = cd;
        this.pageLinkSize = 5;
        this.onPageChange = new EventEmitter();
        this.alwaysShow = true;
        this.dropdownScrollHeight = '200px';
        this.currentPageReportTemplate = '{currentPage} of {totalPages}';
        this.totalRecords = 0;
        this.rows = 0;
        this._first = 0;
    }
    ngOnInit() {
        this.updatePaginatorState();
    }
    ngOnChanges(simpleChange) {
        if (simpleChange.totalRecords) {
            this.updatePageLinks();
            this.updatePaginatorState();
            this.updateFirst();
            this.updateRowsPerPageOptions();
        }
        if (simpleChange.first) {
            this._first = simpleChange.first.currentValue;
            this.updatePageLinks();
            this.updatePaginatorState();
        }
        if (simpleChange.rows) {
            this.updatePageLinks();
            this.updatePaginatorState();
        }
        if (simpleChange.rowsPerPageOptions) {
            this.updateRowsPerPageOptions();
        }
    }
    get first() {
        return this._first;
    }
    set first(val) {
        this._first = val;
    }
    updateRowsPerPageOptions() {
        if (this.rowsPerPageOptions) {
            this.rowsPerPageItems = [];
            for (let opt of this.rowsPerPageOptions) {
                if (typeof opt == 'object' && opt['showAll']) {
                    this.rowsPerPageItems.push({ label: opt['showAll'], value: this.totalRecords });
                }
                else {
                    this.rowsPerPageItems.push({ label: String(opt), value: opt });
                }
            }
        }
    }
    isFirstPage() {
        return this.getPage() === 0;
    }
    isLastPage() {
        return this.getPage() === this.getPageCount() - 1;
    }
    getPageCount() {
        return Math.ceil(this.totalRecords / this.rows) || 1;
    }
    calculatePageLinkBoundaries() {
        let numberOfPages = this.getPageCount(), visiblePages = Math.min(this.pageLinkSize, numberOfPages);
        //calculate range, keep current in middle if necessary
        let start = Math.max(0, Math.ceil(this.getPage() - ((visiblePages) / 2))), end = Math.min(numberOfPages - 1, start + visiblePages - 1);
        //check when approaching to last page
        var delta = this.pageLinkSize - (end - start + 1);
        start = Math.max(0, start - delta);
        return [start, end];
    }
    updatePageLinks() {
        this.pageLinks = [];
        let boundaries = this.calculatePageLinkBoundaries(), start = boundaries[0], end = boundaries[1];
        for (let i = start; i <= end; i++) {
            this.pageLinks.push(i + 1);
        }
    }
    changePage(p) {
        var pc = this.getPageCount();
        if (p >= 0 && p < pc) {
            this._first = this.rows * p;
            var state = {
                page: p,
                first: this.first,
                rows: this.rows,
                pageCount: pc
            };
            this.updatePageLinks();
            this.onPageChange.emit(state);
            this.updatePaginatorState();
        }
    }
    updateFirst() {
        const page = this.getPage();
        if (page > 0 && (this.first >= this.totalRecords)) {
            Promise.resolve(null).then(() => this.changePage(page - 1));
        }
    }
    getPage() {
        return Math.floor(this.first / this.rows);
    }
    changePageToFirst(event) {
        if (!this.isFirstPage()) {
            this.changePage(0);
        }
        event.preventDefault();
    }
    changePageToPrev(event) {
        this.changePage(this.getPage() - 1);
        event.preventDefault();
    }
    changePageToNext(event) {
        this.changePage(this.getPage() + 1);
        event.preventDefault();
    }
    changePageToLast(event) {
        if (!this.isLastPage()) {
            this.changePage(this.getPageCount() - 1);
        }
        event.preventDefault();
    }
    onPageLinkClick(event, page) {
        this.changePage(page);
        event.preventDefault();
    }
    onRppChange(event) {
        this.changePage(this.getPage());
    }
    updatePaginatorState() {
        this.paginatorState = {
            page: this.getPage(),
            pageCount: this.getPageCount(),
            rows: this.rows,
            first: this.first,
            totalRecords: this.totalRecords
        };
    }
    get currentPageReport() {
        return this.currentPageReportTemplate
            .replace("{currentPage}", (this.getPage() + 1).toString())
            .replace("{totalPages}", this.getPageCount().toString());
    }
};
Paginator.ctorParameters = () => [
    { type: ChangeDetectorRef }
];
__decorate([
    Input()
], Paginator.prototype, "pageLinkSize", void 0);
__decorate([
    Output()
], Paginator.prototype, "onPageChange", void 0);
__decorate([
    Input()
], Paginator.prototype, "style", void 0);
__decorate([
    Input()
], Paginator.prototype, "styleClass", void 0);
__decorate([
    Input()
], Paginator.prototype, "alwaysShow", void 0);
__decorate([
    Input()
], Paginator.prototype, "templateLeft", void 0);
__decorate([
    Input()
], Paginator.prototype, "templateRight", void 0);
__decorate([
    Input()
], Paginator.prototype, "dropdownAppendTo", void 0);
__decorate([
    Input()
], Paginator.prototype, "dropdownScrollHeight", void 0);
__decorate([
    Input()
], Paginator.prototype, "currentPageReportTemplate", void 0);
__decorate([
    Input()
], Paginator.prototype, "showCurrentPageReport", void 0);
__decorate([
    Input()
], Paginator.prototype, "totalRecords", void 0);
__decorate([
    Input()
], Paginator.prototype, "rows", void 0);
__decorate([
    Input()
], Paginator.prototype, "rowsPerPageOptions", void 0);
__decorate([
    Input()
], Paginator.prototype, "first", null);
Paginator = __decorate([
    Component({
        selector: 'p-paginator',
        template: `
        <div [class]="styleClass" [ngStyle]="style" [ngClass]="'ui-paginator ui-widget ui-widget-header ui-unselectable-text ui-helper-clearfix'"
            *ngIf="alwaysShow ? true : (pageLinks && pageLinks.length > 1)">
            <div class="ui-paginator-left-content" *ngIf="templateLeft">
                <ng-container *ngTemplateOutlet="templateLeft; context: {$implicit: paginatorState}"></ng-container>
            </div>
            <span class="ui-paginator-current" *ngIf="showCurrentPageReport">{{currentPageReport}}</span>
            <a [attr.tabindex]="isFirstPage() ? null : '0'" class="ui-paginator-first ui-paginator-element ui-state-default ui-corner-all"
                    (click)="changePageToFirst($event)" (keydown.enter)="changePageToFirst($event)" [ngClass]="{'ui-state-disabled':isFirstPage()}" [tabindex]="isFirstPage() ? -1 : null">
                <span class="ui-paginator-icon pi pi-step-backward"></span>
            </a>
            <a tabindex="0" [attr.tabindex]="isFirstPage() ? null : '0'" class="ui-paginator-prev ui-paginator-element ui-state-default ui-corner-all"
                    (click)="changePageToPrev($event)" (keydown.enter)="changePageToPrev($event)" [ngClass]="{'ui-state-disabled':isFirstPage()}" [tabindex]="isFirstPage() ? -1 : null">
                <span class="ui-paginator-icon pi pi-caret-left"></span>
            </a>
            <span class="ui-paginator-pages">
                <a tabindex="0" *ngFor="let pageLink of pageLinks" class="ui-paginator-page ui-paginator-element ui-state-default ui-corner-all"
                    (click)="onPageLinkClick($event, pageLink - 1)" (keydown.enter)="onPageLinkClick($event, pageLink - 1)" [ngClass]="{'ui-state-active': (pageLink-1 == getPage())}">{{pageLink}}</a>
            </span>
            <a [attr.tabindex]="isLastPage() ? null : '0'" class="ui-paginator-next ui-paginator-element ui-state-default ui-corner-all"
                    (click)="changePageToNext($event)" (keydown.enter)="changePageToNext($event)" [ngClass]="{'ui-state-disabled':isLastPage()}" [tabindex]="isLastPage() ? -1 : null">
                <span class="ui-paginator-icon pi pi-caret-right"></span>
            </a>
            <a [attr.tabindex]="isLastPage() ? null : '0'" class="ui-paginator-last ui-paginator-element ui-state-default ui-corner-all"
                    (click)="changePageToLast($event)" (keydown.enter)="changePageToLast($event)" [ngClass]="{'ui-state-disabled':isLastPage()}" [tabindex]="isLastPage() ? -1 : null">
                <span class="ui-paginator-icon pi pi-step-forward"></span>
            </a>
            <p-dropdown [options]="rowsPerPageItems" [(ngModel)]="rows" *ngIf="rowsPerPageOptions" 
                (onChange)="onRppChange($event)" [appendTo]="dropdownAppendTo" [scrollHeight]="dropdownScrollHeight"></p-dropdown>
            <div class="ui-paginator-right-content" *ngIf="templateRight">
                <ng-container *ngTemplateOutlet="templateRight; context: {$implicit: paginatorState}"></ng-container>
            </div>
        </div>
    `
    })
], Paginator);
export { Paginator };
let PaginatorModule = class PaginatorModule {
};
PaginatorModule = __decorate([
    NgModule({
        imports: [CommonModule, DropdownModule, FormsModule, SharedModule],
        exports: [Paginator, DropdownModule, FormsModule, SharedModule],
        declarations: [Paginator]
    })
], PaginatorModule);
export { PaginatorModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9wYWdpbmF0b3IvIiwic291cmNlcyI6WyJwYWdpbmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBQyxNQUFNLEVBQUMsaUJBQWlCLEVBQUMsWUFBWSxFQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsYUFBYSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFJLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRWhELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxhQUFhLENBQUM7QUF1Q3pDLElBQWEsU0FBUyxHQUF0QixNQUFhLFNBQVM7SUFzQ2xCLFlBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBcENoQyxpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUV4QixpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBTXRELGVBQVUsR0FBWSxJQUFJLENBQUM7UUFRM0IseUJBQW9CLEdBQVcsT0FBTyxDQUFDO1FBRXZDLDhCQUF5QixHQUFXLCtCQUErQixDQUFDO1FBSXBFLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBRXpCLFNBQUksR0FBVyxDQUFDLENBQUM7UUFVMUIsV0FBTSxHQUFXLENBQUMsQ0FBQztJQUV5QixDQUFDO0lBRTdDLFFBQVE7UUFDSixJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsV0FBVyxDQUFDLFlBQTJCO1FBQ25DLElBQUksWUFBWSxDQUFDLFlBQVksRUFBRTtZQUMzQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsSUFBSSxD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RTs0REFBcUU7QUFFcEU7SUFBUixLQUFLLEVBQUU7d0RBQWdDO0FBRS9CO0lBQVIsS0FBSyxFQUFFOytDQUEwQjtBQUV6QjtJQUFSLEtBQUssRUFBRTt1Q0FBa0I7QUFFakI7SUFBUixLQUFLLEVBQUU7cURBQTJCO0FBd0MxQjtJQUFSLEtBQUssRUFBRTtzQ0FFUDtBQXRFUSxTQUFTO0lBckNyQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsYUFBYTtRQUN2QixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQWlDVDtLQUNKLENBQUM7R0FDVyxTQUFTLENBOE1yQjtTQTlNWSxTQUFTO0FBcU50QixJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0NBQUksQ0FBQTtBQUFuQixlQUFlO0lBTDNCLFFBQVEsQ0FBQztRQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLFlBQVksQ0FBQztRQUMvRCxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxZQUFZLENBQUM7UUFDNUQsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDO0tBQzVCLENBQUM7R0FDVyxlQUFlLENBQUk7U0FBbkIsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LE9uSW5pdCxJbnB1dCxPdXRwdXQsQ2hhbmdlRGV0ZWN0b3JSZWYsRXZlbnRFbWl0dGVyLFRlbXBsYXRlUmVmLCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXN9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0Zvcm1zTW9kdWxlfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0Ryb3Bkb3duTW9kdWxlfSBmcm9tICdwcmltZW5nL2Ryb3Bkb3duJztcbmltcG9ydCB7U2VsZWN0SXRlbX0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHtTaGFyZWRNb2R1bGV9IGZyb20gJ3ByaW1lbmcvYXBpJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXBhZ2luYXRvcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW25nQ2xhc3NdPVwiJ3VpLXBhZ2luYXRvciB1aS13aWRnZXQgdWktd2lkZ2V0LWhlYWRlciB1aS11bnNlbGVjdGFibGUtdGV4dCB1aS1oZWxwZXItY2xlYXJmaXgnXCJcbiAgICAgICAgICAgICpuZ0lmPVwiYWx3YXlzU2hvdyA/IHRydWUgOiAocGFnZUxpbmtzICYmIHBhZ2VMaW5rcy5sZW5ndGggPiAxKVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXBhZ2luYXRvci1sZWZ0LWNvbnRlbnRcIiAqbmdJZj1cInRlbXBsYXRlTGVmdFwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZUxlZnQ7IGNvbnRleHQ6IHskaW1wbGljaXQ6IHBhZ2luYXRvclN0YXRlfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXBhZ2luYXRvci1jdXJyZW50XCIgKm5nSWY9XCJzaG93Q3VycmVudFBhZ2VSZXBvcnRcIj57e2N1cnJlbnRQYWdlUmVwb3J0fX08L3NwYW4+XG4gICAgICAgICAgICA8YSBbYXR0ci50YWJpbmRleF09XCJpc0ZpcnN0UGFnZSgpID8gbnVsbCA6ICcwJ1wiIGNsYXNzPVwidWktcGFnaW5hdG9yLWZpcnN0IHVpLXBhZ2luYXRvci1lbGVtZW50IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbFwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VQYWdlVG9GaXJzdCgkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwiY2hhbmdlUGFnZVRvRmlyc3QoJGV2ZW50KVwiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtZGlzYWJsZWQnOmlzRmlyc3RQYWdlKCl9XCIgW3RhYmluZGV4XT1cImlzRmlyc3RQYWdlKCkgPyAtMSA6IG51bGxcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXBhZ2luYXRvci1pY29uIHBpIHBpLXN0ZXAtYmFja3dhcmRcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8YSB0YWJpbmRleD1cIjBcIiBbYXR0ci50YWJpbmRleF09XCJpc0ZpcnN0UGFnZSgpID8gbnVsbCA6ICcwJ1wiIGNsYXNzPVwidWktcGFnaW5hdG9yLXByZXYgdWktcGFnaW5hdG9yLWVsZW1lbnQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5nZVBhZ2VUb1ByZXYoJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cImNoYW5nZVBhZ2VUb1ByZXYoJGV2ZW50KVwiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtZGlzYWJsZWQnOmlzRmlyc3RQYWdlKCl9XCIgW3RhYmluZGV4XT1cImlzRmlyc3RQYWdlKCkgPyAtMSA6IG51bGxcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXBhZ2luYXRvci1pY29uIHBpIHBpLWNhcmV0LWxlZnRcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXBhZ2luYXRvci1wYWdlc1wiPlxuICAgICAgICAgICAgICAgIDxhIHRhYmluZGV4PVwiMFwiICpuZ0Zvcj1cImxldCBwYWdlTGluayBvZiBwYWdlTGlua3NcIiBjbGFzcz1cInVpLXBhZ2luYXRvci1wYWdlIHVpLXBhZ2luYXRvci1lbGVtZW50IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbFwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvblBhZ2VMaW5rQ2xpY2soJGV2ZW50LCBwYWdlTGluayAtIDEpXCIgKGtleWRvd24uZW50ZXIpPVwib25QYWdlTGlua0NsaWNrKCRldmVudCwgcGFnZUxpbmsgLSAxKVwiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtYWN0aXZlJzogKHBhZ2VMaW5rLTEgPT0gZ2V0UGFnZSgpKX1cIj57e3BhZ2VMaW5rfX08L2E+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8YSBbYXR0ci50YWJpbmRleF09XCJpc0xhc3RQYWdlKCkgPyBudWxsIDogJzAnXCIgY2xhc3M9XCJ1aS1wYWdpbmF0b3ItbmV4dCB1aS1wYWdpbmF0b3ItZWxlbWVudCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGxcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2hhbmdlUGFnZVRvTmV4dCgkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwiY2hhbmdlUGFnZVRvTmV4dCgkZXZlbnQpXCIgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1kaXNhYmxlZCc6aXNMYXN0UGFnZSgpfVwiIFt0YWJpbmRleF09XCJpc0xhc3RQYWdlKCkgPyAtMSA6IG51bGxcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXBhZ2luYXRvci1pY29uIHBpIHBpLWNhcmV0LXJpZ2h0XCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPGEgW2F0dHIudGFiaW5kZXhdPVwiaXNMYXN0UGFnZSgpID8gbnVsbCA6ICcwJ1wiIGNsYXNzPVwidWktcGFnaW5hdG9yLWxhc3QgdWktcGFnaW5hdG9yLWVsZW1lbnQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5nZVBhZ2VUb0xhc3QoJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cImNoYW5nZVBhZ2VUb0xhc3QoJGV2ZW50KVwiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtZGlzYWJsZWQnOmlzTGFzdFBhZ2UoKX1cIiBbdGFiaW5kZXhdPVwiaXNMYXN0UGFnZSgpID8gLTEgOiBudWxsXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1wYWdpbmF0b3ItaWNvbiBwaSBwaS1zdGVwLWZvcndhcmRcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8cC1kcm9wZG93biBbb3B0aW9uc109XCJyb3dzUGVyUGFnZUl0ZW1zXCIgWyhuZ01vZGVsKV09XCJyb3dzXCIgKm5nSWY9XCJyb3dzUGVyUGFnZU9wdGlvbnNcIiBcbiAgICAgICAgICAgICAgICAob25DaGFuZ2UpPVwib25ScHBDaGFuZ2UoJGV2ZW50KVwiIFthcHBlbmRUb109XCJkcm9wZG93bkFwcGVuZFRvXCIgW3Njcm9sbEhlaWdodF09XCJkcm9wZG93blNjcm9sbEhlaWdodFwiPjwvcC1kcm9wZG93bj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1wYWdpbmF0b3ItcmlnaHQtY29udGVudFwiICpuZ0lmPVwidGVtcGxhdGVSaWdodFwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZVJpZ2h0OyBjb250ZXh0OiB7JGltcGxpY2l0OiBwYWdpbmF0b3JTdGF0ZX1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2luYXRvciBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcblxuICAgIEBJbnB1dCgpIHBhZ2VMaW5rU2l6ZTogbnVtYmVyID0gNTtcblxuICAgIEBPdXRwdXQoKSBvblBhZ2VDaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGFsd2F5c1Nob3c6IGJvb2xlYW4gPSB0cnVlO1xuICAgIFxuICAgIEBJbnB1dCgpIHRlbXBsYXRlTGVmdDogVGVtcGxhdGVSZWY8YW55PjtcbiAgICBcbiAgICBASW5wdXQoKSB0ZW1wbGF0ZVJpZ2h0OiBUZW1wbGF0ZVJlZjxhbnk+O1xuXG4gICAgQElucHV0KCkgZHJvcGRvd25BcHBlbmRUbzogYW55O1xuXG4gICAgQElucHV0KCkgZHJvcGRvd25TY3JvbGxIZWlnaHQ6IHN0cmluZyA9ICcyMDBweCc7XG5cbiAgICBASW5wdXQoKSBjdXJyZW50UGFnZVJlcG9ydFRlbXBsYXRlOiBzdHJpbmcgPSAne2N1cnJlbnRQYWdlfSBvZiB7dG90YWxQYWdlc30nO1xuXG4gICAgQElucHV0KCkgc2hvd0N1cnJlbnRQYWdlUmVwb3J0OiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgdG90YWxSZWNvcmRzOiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCkgcm93czogbnVtYmVyID0gMDtcbiAgICBcbiAgICBASW5wdXQoKSByb3dzUGVyUGFnZU9wdGlvbnM6IGFueVtdO1xuXG4gICAgcGFnZUxpbmtzOiBudW1iZXJbXTtcblxuICAgIHJvd3NQZXJQYWdlSXRlbXM6IFNlbGVjdEl0ZW1bXTtcbiAgICBcbiAgICBwYWdpbmF0b3JTdGF0ZTogYW55O1xuXG4gICAgX2ZpcnN0OiBudW1iZXIgPSAwO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHt9XG4gICAgXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMudXBkYXRlUGFnaW5hdG9yU3RhdGUoKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcyhzaW1wbGVDaGFuZ2U6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS50b3RhbFJlY29yZHMpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnZUxpbmtzKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBhZ2luYXRvclN0YXRlKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZpcnN0KCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJvd3NQZXJQYWdlT3B0aW9ucygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5maXJzdCkge1xuICAgICAgICAgICAgdGhpcy5fZmlyc3QgPSBzaW1wbGVDaGFuZ2UuZmlyc3QuY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdlTGlua3MoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnaW5hdG9yU3RhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2Uucm93cykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdlTGlua3MoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnaW5hdG9yU3RhdGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2Uucm93c1BlclBhZ2VPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVJvd3NQZXJQYWdlT3B0aW9ucygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQElucHV0KCkgZ2V0IGZpcnN0KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maXJzdDtcbiAgICB9XG4gICAgc2V0IGZpcnN0KHZhbDpudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fZmlyc3QgPSB2YWw7XG4gICAgfVxuXG4gICAgdXBkYXRlUm93c1BlclBhZ2VPcHRpb25zKCkge1xuICAgICAgICBpZih0aGlzLnJvd3NQZXJQYWdlT3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5yb3dzUGVyUGFnZUl0ZW1zID0gW107XG4gICAgICAgICAgICBmb3IgKGxldCBvcHQgb2YgdGhpcy5yb3dzUGVyUGFnZU9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9wdCA9PSAnb2JqZWN0JyAmJiBvcHRbJ3Nob3dBbGwnXSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvd3NQZXJQYWdlSXRlbXMucHVzaCh7bGFiZWw6IG9wdFsnc2hvd0FsbCddLCB2YWx1ZTogdGhpcy50b3RhbFJlY29yZHN9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm93c1BlclBhZ2VJdGVtcy5wdXNoKHtsYWJlbDogU3RyaW5nKG9wdCksIHZhbHVlOiBvcHR9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0ZpcnN0UGFnZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UGFnZSgpID09PSAwO1xuICAgIH1cblxuICAgIGlzTGFzdFBhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhZ2UoKSA9PT0gdGhpcy5nZXRQYWdlQ291bnQoKSAtIDE7XG4gICAgfVxuXG4gICAgZ2V0UGFnZUNvdW50KCkge1xuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKHRoaXMudG90YWxSZWNvcmRzL3RoaXMucm93cyl8fDE7XG4gICAgfVxuXG4gICAgY2FsY3VsYXRlUGFnZUxpbmtCb3VuZGFyaWVzKCkge1xuICAgICAgICBsZXQgbnVtYmVyT2ZQYWdlcyA9IHRoaXMuZ2V0UGFnZUNvdW50KCksXG4gICAgICAgIHZpc2libGVQYWdlcyA9IE1hdGgubWluKHRoaXMucGFnZUxpbmtTaXplLCBudW1iZXJPZlBhZ2VzKTtcblxuICAgICAgICAvL2NhbGN1bGF0ZSByYW5nZSwga2VlcCBjdXJyZW50IGluIG1pZGRsZSBpZiBuZWNlc3NhcnlcbiAgICAgICAgbGV0IHN0YXJ0ID0gTWF0aC5tYXgoMCwgTWF0aC5jZWlsKHRoaXMuZ2V0UGFnZSgpIC0gKCh2aXNpYmxlUGFnZXMpIC8gMikpKSxcbiAgICAgICAgZW5kID0gTWF0aC5taW4obnVtYmVyT2ZQYWdlcyAtIDEsIHN0YXJ0ICsgdmlzaWJsZVBhZ2VzIC0gMSk7XG5cbiAgICAgICAgLy9jaGVjayB3aGVuIGFwcHJvYWNoaW5nIHRvIGxhc3QgcGFnZVxuICAgICAgICB2YXIgZGVsdGEgPSB0aGlzLnBhZ2VMaW5rU2l6ZSAtIChlbmQgLSBzdGFydCArIDEpO1xuICAgICAgICBzdGFydCA9IE1hdGgubWF4KDAsIHN0YXJ0IC0gZGVsdGEpO1xuXG4gICAgICAgIHJldHVybiBbc3RhcnQsIGVuZF07XG4gICAgfVxuXG4gICAgdXBkYXRlUGFnZUxpbmtzKCkge1xuICAgICAgICB0aGlzLnBhZ2VMaW5rcyA9IFtdO1xuICAgICAgICBsZXQgYm91bmRhcmllcyA9IHRoaXMuY2FsY3VsYXRlUGFnZUxpbmtCb3VuZGFyaWVzKCksXG4gICAgICAgIHN0YXJ0ID0gYm91bmRhcmllc1swXSxcbiAgICAgICAgZW5kID0gYm91bmRhcmllc1sxXTtcblxuICAgICAgICBmb3IobGV0IGkgPSBzdGFydDsgaSA8PSBlbmQ7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5wYWdlTGlua3MucHVzaChpICsgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGFuZ2VQYWdlKHAgOm51bWJlcikge1xuICAgICAgICB2YXIgcGMgPSB0aGlzLmdldFBhZ2VDb3VudCgpO1xuXG4gICAgICAgIGlmKHAgPj0gMCAmJiBwIDwgcGMpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcnN0ID0gdGhpcy5yb3dzICogcDtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHtcbiAgICAgICAgICAgICAgICBwYWdlOiBwLFxuICAgICAgICAgICAgICAgIGZpcnN0OiB0aGlzLmZpcnN0LFxuICAgICAgICAgICAgICAgIHJvd3M6IHRoaXMucm93cyxcbiAgICAgICAgICAgICAgICBwYWdlQ291bnQ6IHBjXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdlTGlua3MoKTtcblxuICAgICAgICAgICAgdGhpcy5vblBhZ2VDaGFuZ2UuZW1pdChzdGF0ZSk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBhZ2luYXRvclN0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVGaXJzdCgpIHtcbiAgICAgICAgY29uc3QgcGFnZSA9IHRoaXMuZ2V0UGFnZSgpO1xuICAgICAgICBpZiAocGFnZSA+IDAgJiYgKHRoaXMuZmlyc3QgPj0gdGhpcy50b3RhbFJlY29yZHMpKSB7XG4gICAgICAgICAgICBQcm9taXNlLnJlc29sdmUobnVsbCkudGhlbigoKSA9PiB0aGlzLmNoYW5nZVBhZ2UocGFnZSAtIDEpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFBhZ2UoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IodGhpcy5maXJzdCAvIHRoaXMucm93cyk7XG4gICAgfVxuXG4gICAgY2hhbmdlUGFnZVRvRmlyc3QoZXZlbnQpIHtcbiAgICAgIGlmKCF0aGlzLmlzRmlyc3RQYWdlKCkpe1xuICAgICAgICAgIHRoaXMuY2hhbmdlUGFnZSgwKTtcbiAgICAgIH1cblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VQYWdlVG9QcmV2KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlUGFnZSh0aGlzLmdldFBhZ2UoKSAtIDEpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGNoYW5nZVBhZ2VUb05leHQoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VQYWdlKHRoaXMuZ2V0UGFnZSgpICArIDEpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGNoYW5nZVBhZ2VUb0xhc3QoZXZlbnQpIHtcbiAgICAgIGlmKCF0aGlzLmlzTGFzdFBhZ2UoKSl7XG4gICAgICAgICAgdGhpcy5jaGFuZ2VQYWdlKHRoaXMuZ2V0UGFnZUNvdW50KCkgLSAxKTtcbiAgICAgIH1cblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblBhZ2VMaW5rQ2xpY2soZXZlbnQsIHBhZ2UpIHtcbiAgICAgICAgdGhpcy5jaGFuZ2VQYWdlKHBhZ2UpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uUnBwQ2hhbmdlKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlUGFnZSh0aGlzLmdldFBhZ2UoKSk7XG4gICAgfVxuICAgIFxuICAgIHVwZGF0ZVBhZ2luYXRvclN0YXRlKCkge1xuICAgICAgICB0aGlzLnBhZ2luYXRvclN0YXRlID0ge1xuICAgICAgICAgICAgcGFnZTogdGhpcy5nZXRQYWdlKCksXG4gICAgICAgICAgICBwYWdlQ291bnQ6IHRoaXMuZ2V0UGFnZUNvdW50KCksXG4gICAgICAgICAgICByb3dzOiB0aGlzLnJvd3MsXG4gICAgICAgICAgICBmaXJzdDogdGhpcy5maXJzdCxcbiAgICAgICAgICAgIHRvdGFsUmVjb3JkczogdGhpcy50b3RhbFJlY29yZHNcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBjdXJyZW50UGFnZVJlcG9ydCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFBhZ2VSZXBvcnRUZW1wbGF0ZVxuICAgICAgICAgICAgLnJlcGxhY2UoXCJ7Y3VycmVudFBhZ2V9XCIsICh0aGlzLmdldFBhZ2UoKSArIDEpLnRvU3RyaW5nKCkpXG4gICAgICAgICAgICAucmVwbGFjZShcInt0b3RhbFBhZ2VzfVwiLCB0aGlzLmdldFBhZ2VDb3VudCgpLnRvU3RyaW5nKCkpO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLERyb3Bkb3duTW9kdWxlLEZvcm1zTW9kdWxlLFNoYXJlZE1vZHVsZV0sXG4gICAgZXhwb3J0czogW1BhZ2luYXRvcixEcm9wZG93bk1vZHVsZSxGb3Jtc01vZHVsZSxTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1BhZ2luYXRvcl1cbn0pXG5leHBvcnQgY2xhc3MgUGFnaW5hdG9yTW9kdWxlIHsgfVxuIl19