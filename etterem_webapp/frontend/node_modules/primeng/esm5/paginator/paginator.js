var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { NgModule, Component, OnInit, Input, Output, ChangeDetectorRef, EventEmitter, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { SharedModule } from 'primeng/api';
var Paginator = /** @class */ (function () {
    function Paginator(cd) {
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
    Paginator.prototype.ngOnInit = function () {
        this.updatePaginatorState();
    };
    Paginator.prototype.ngOnChanges = function (simpleChange) {
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
    };
    Object.defineProperty(Paginator.prototype, "first", {
        get: function () {
            return this._first;
        },
        set: function (val) {
            this._first = val;
        },
        enumerable: true,
        configurable: true
    });
    Paginator.prototype.updateRowsPerPageOptions = function () {
        var e_1, _a;
        if (this.rowsPerPageOptions) {
            this.rowsPerPageItems = [];
            try {
                for (var _b = __values(this.rowsPerPageOptions), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var opt = _c.value;
                    if (typeof opt == 'object' && opt['showAll']) {
                        this.rowsPerPageItems.push({ label: opt['showAll'], value: this.totalRecords });
                    }
                    else {
                        this.rowsPerPageItems.push({ label: String(opt), value: opt });
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
    };
    Paginator.prototype.isFirstPage = function () {
        return this.getPage() === 0;
    };
    Paginator.prototype.isLastPage = function () {
        return this.getPage() === this.getPageCount() - 1;
    };
    Paginator.prototype.getPageCount = function () {
        return Math.ceil(this.totalRecords / this.rows) || 1;
    };
    Paginator.prototype.calculatePageLinkBoundaries = function () {
        var numberOfPages = this.getPageCount(), visiblePages = Math.min(this.pageLinkSize, numberOfPages);
        //calculate range, keep current in middle if necessary
        var start = Math.max(0, Math.ceil(this.getPage() - ((visiblePages) / 2))), end = Math.min(numberOfPages - 1, start + visiblePages - 1);
        //check when approaching to last page
        var delta = this.pageLinkSize - (end - start + 1);
        start = Math.max(0, start - delta);
        return [start, end];
    };
    Paginator.prototype.updatePageLinks = function () {
        this.pageLinks = [];
        var boundaries = this.calculatePageLinkBoundaries(), start = boundaries[0], end = boundaries[1];
        for (var i = start; i <= end; i++) {
            this.pageLinks.push(i + 1);
        }
    };
    Paginator.prototype.changePage = function (p) {
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
    };
    Paginator.prototype.updateFirst = function () {
        var _this = this;
        var page = this.getPage();
        if (page > 0 && (this.first >= this.totalRecords)) {
            Promise.resolve(null).then(function () { return _this.changePage(page - 1); });
        }
    };
    Paginator.prototype.getPage = function () {
        return Math.floor(this.first / this.rows);
    };
    Paginator.prototype.changePageToFirst = function (event) {
        if (!this.isFirstPage()) {
            this.changePage(0);
        }
        event.preventDefault();
    };
    Paginator.prototype.changePageToPrev = function (event) {
        this.changePage(this.getPage() - 1);
        event.preventDefault();
    };
    Paginator.prototype.changePageToNext = function (event) {
        this.changePage(this.getPage() + 1);
        event.preventDefault();
    };
    Paginator.prototype.changePageToLast = function (event) {
        if (!this.isLastPage()) {
            this.changePage(this.getPageCount() - 1);
        }
        event.preventDefault();
    };
    Paginator.prototype.onPageLinkClick = function (event, page) {
        this.changePage(page);
        event.preventDefault();
    };
    Paginator.prototype.onRppChange = function (event) {
        this.changePage(this.getPage());
    };
    Paginator.prototype.updatePaginatorState = function () {
        this.paginatorState = {
            page: this.getPage(),
            pageCount: this.getPageCount(),
            rows: this.rows,
            first: this.first,
            totalRecords: this.totalRecords
        };
    };
    Object.defineProperty(Paginator.prototype, "currentPageReport", {
        get: function () {
            return this.currentPageReportTemplate
                .replace("{currentPage}", (this.getPage() + 1).toString())
                .replace("{totalPages}", this.getPageCount().toString());
        },
        enumerable: true,
        configurable: true
    });
    Paginator.ctorParameters = function () { return [
        { type: ChangeDetectorRef }
    ]; };
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
            template: "\n        <div [class]=\"styleClass\" [ngStyle]=\"style\" [ngClass]=\"'ui-paginator ui-widget ui-widget-header ui-unselectable-text ui-helper-clearfix'\"\n            *ngIf=\"alwaysShow ? true : (pageLinks && pageLinks.length > 1)\">\n            <div class=\"ui-paginator-left-content\" *ngIf=\"templateLeft\">\n                <ng-container *ngTemplateOutlet=\"templateLeft; context: {$implicit: paginatorState}\"></ng-container>\n            </div>\n            <span class=\"ui-paginator-current\" *ngIf=\"showCurrentPageReport\">{{currentPageReport}}</span>\n            <a [attr.tabindex]=\"isFirstPage() ? null : '0'\" class=\"ui-paginator-first ui-paginator-element ui-state-default ui-corner-all\"\n                    (click)=\"changePageToFirst($event)\" (keydown.enter)=\"changePageToFirst($event)\" [ngClass]=\"{'ui-state-disabled':isFirstPage()}\" [tabindex]=\"isFirstPage() ? -1 : null\">\n                <span class=\"ui-paginator-icon pi pi-step-backward\"></span>\n            </a>\n            <a tabindex=\"0\" [attr.tabindex]=\"isFirstPage() ? null : '0'\" class=\"ui-paginator-prev ui-paginator-element ui-state-default ui-corner-all\"\n                    (click)=\"changePageToPrev($event)\" (keydown.enter)=\"changePageToPrev($event)\" [ngClass]=\"{'ui-state-disabled':isFirstPage()}\" [tabindex]=\"isFirstPage() ? -1 : null\">\n                <span class=\"ui-paginator-icon pi pi-caret-left\"></span>\n            </a>\n            <span class=\"ui-paginator-pages\">\n                <a tabindex=\"0\" *ngFor=\"let pageLink of pageLinks\" class=\"ui-paginator-page ui-paginator-element ui-state-default ui-corner-all\"\n                    (click)=\"onPageLinkClick($event, pageLink - 1)\" (keydown.enter)=\"onPageLinkClick($event, pageLink - 1)\" [ngClass]=\"{'ui-state-active': (pageLink-1 == getPage())}\">{{pageLink}}</a>\n            </span>\n            <a [attr.tabindex]=\"isLastPage() ? null : '0'\" class=\"ui-paginator-next ui-paginator-element ui-state-default ui-corner-all\"\n                    (click)=\"changePageToNext($event)\" (keydown.enter)=\"changePageToNext($event)\" [ngClass]=\"{'ui-state-disabled':isLastPage()}\" [tabindex]=\"isLastPage() ? -1 : null\">\n                <span class=\"ui-paginator-icon pi pi-caret-right\"></span>\n            </a>\n            <a [attr.tabindex]=\"isLastPage() ? null : '0'\" class=\"ui-paginator-last ui-paginator-element ui-state-default ui-corner-all\"\n                    (click)=\"changePageToLast($event)\" (keydown.enter)=\"changePageToLast($event)\" [ngClass]=\"{'ui-state-disabled':isLastPage()}\" [tabindex]=\"isLastPage() ? -1 : null\">\n                <span class=\"ui-paginator-icon pi pi-step-forward\"></span>\n            </a>\n            <p-dropdown [options]=\"rowsPerPageItems\" [(ngModel)]=\"rows\" *ngIf=\"rowsPerPageOptions\" \n                (onChange)=\"onRppChange($event)\" [appendTo]=\"dropdownAppendTo\" [scrollHeight]=\"dropdownScrollHeight\"></p-dropdown>\n            <div class=\"ui-paginator-right-content\" *ngIf=\"templateRight\">\n                <ng-container *ngTemplateOutlet=\"templateRight; context: {$implicit: paginatorState}\"></ng-container>\n            </div>\n        </div>\n    "
        })
    ], Paginator);
    return Paginator;
}());
export { Paginator };
var PaginatorModule = /** @class */ (function () {
    function PaginatorModule() {
    }
    PaginatorModule = __decorate([
        NgModule({
            imports: [CommonModule, DropdownModule, FormsModule, SharedModule],
            exports: [Paginator, DropdownModule, FormsModule, SharedModule],
            declarations: [Paginator]
        })
    ], PaginatorModule);
    return PaginatorModule;
}());
export { PaginatorModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9wYWdpbmF0b3IvIiwic291cmNlcyI6WyJwYWdpbmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxpQkFBaUIsRUFBQyxZQUFZLEVBQUMsV0FBVyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDMUksT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFaEQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGFBQWEsQ0FBQztBQXVDekM7SUFzQ0ksbUJBQW9CLEVBQXFCO1FBQXJCLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBcENoQyxpQkFBWSxHQUFXLENBQUMsQ0FBQztRQUV4QixpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBTXRELGVBQVUsR0FBWSxJQUFJLENBQUM7UUFRM0IseUJBQW9CLEdBQVcsT0FBTyxDQUFDO1FBRXZDLDhCQUF5QixHQUFXLCtCQUErQixDQUFDO1FBSXBFLGlCQUFZLEdBQVcsQ0FBQyxDQUFDO1FBRXpCLFNBQUksR0FBVyxDQUFDLENBQUM7UUFVMUIsV0FBTSxHQUFXLENBQUMsQ0FBQztJQUV5QixDQUFDO0lBRTdDLDRCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsK0JBQVcsR0FBWCxVQUFZLFlBQTJCO1FBQ25DLElBQUksWUFBWSxDQUFDLFlBQVksRUFBRTtZQUMzQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFD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QUU7aURBQW9CO0lBRW5CO1FBQVIsS0FBSyxFQUFFO2lEQUE0QjtJQUUzQjtRQUFSLEtBQUssRUFBRTttREFBZ0M7SUFFL0I7UUFBUixLQUFLLEVBQUU7b0RBQWlDO0lBRWhDO1FBQVIsS0FBSyxFQUFFO3VEQUF1QjtJQUV0QjtRQUFSLEtBQUssRUFBRTsyREFBd0M7SUFFdkM7UUFBUixLQUFLLEVBQUU7Z0VBQXFFO0lBRXBFO1FBQVIsS0FBSyxFQUFFOzREQUFnQztJQUUvQjtRQUFSLEtBQUssRUFBRTttREFBMEI7SUFFekI7UUFBUixLQUFLLEVBQUU7MkNBQWtCO0lBRWpCO1FBQVIsS0FBSyxFQUFFO3lEQUEyQjtJQXdDMUI7UUFBUixLQUFLLEVBQUU7MENBRVA7SUF0RVEsU0FBUztRQXJDckIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLGFBQWE7WUFDdkIsUUFBUSxFQUFFLDJwR0FpQ1Q7U0FDSixDQUFDO09BQ1csU0FBUyxDQThNckI7SUFBRCxnQkFBQztDQUFBLEFBOU1ELElBOE1DO1NBOU1ZLFNBQVM7QUFxTnRCO0lBQUE7SUFBK0IsQ0FBQztJQUFuQixlQUFlO1FBTDNCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBQyxjQUFjLEVBQUMsV0FBVyxFQUFDLFlBQVksQ0FBQztZQUMvRCxPQUFPLEVBQUUsQ0FBQyxTQUFTLEVBQUMsY0FBYyxFQUFDLFdBQVcsRUFBQyxZQUFZLENBQUM7WUFDNUQsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDO1NBQzVCLENBQUM7T0FDVyxlQUFlLENBQUk7SUFBRCxzQkFBQztDQUFBLEFBQWhDLElBQWdDO1NBQW5CLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxPbkluaXQsSW5wdXQsT3V0cHV0LENoYW5nZURldGVjdG9yUmVmLEV2ZW50RW1pdHRlcixUZW1wbGF0ZVJlZiwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtGb3Jtc01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtEcm9wZG93bk1vZHVsZX0gZnJvbSAncHJpbWVuZy9kcm9wZG93bic7XG5pbXBvcnQge1NlbGVjdEl0ZW19IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7U2hhcmVkTW9kdWxlfSBmcm9tICdwcmltZW5nL2FwaSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1wYWdpbmF0b3InLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtuZ0NsYXNzXT1cIid1aS1wYWdpbmF0b3IgdWktd2lkZ2V0IHVpLXdpZGdldC1oZWFkZXIgdWktdW5zZWxlY3RhYmxlLXRleHQgdWktaGVscGVyLWNsZWFyZml4J1wiXG4gICAgICAgICAgICAqbmdJZj1cImFsd2F5c1Nob3cgPyB0cnVlIDogKHBhZ2VMaW5rcyAmJiBwYWdlTGlua3MubGVuZ3RoID4gMSlcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1wYWdpbmF0b3ItbGVmdC1jb250ZW50XCIgKm5nSWY9XCJ0ZW1wbGF0ZUxlZnRcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGVMZWZ0OyBjb250ZXh0OiB7JGltcGxpY2l0OiBwYWdpbmF0b3JTdGF0ZX1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1wYWdpbmF0b3ItY3VycmVudFwiICpuZ0lmPVwic2hvd0N1cnJlbnRQYWdlUmVwb3J0XCI+e3tjdXJyZW50UGFnZVJlcG9ydH19PC9zcGFuPlxuICAgICAgICAgICAgPGEgW2F0dHIudGFiaW5kZXhdPVwiaXNGaXJzdFBhZ2UoKSA/IG51bGwgOiAnMCdcIiBjbGFzcz1cInVpLXBhZ2luYXRvci1maXJzdCB1aS1wYWdpbmF0b3ItZWxlbWVudCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGxcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiY2hhbmdlUGFnZVRvRmlyc3QoJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cImNoYW5nZVBhZ2VUb0ZpcnN0KCRldmVudClcIiBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzppc0ZpcnN0UGFnZSgpfVwiIFt0YWJpbmRleF09XCJpc0ZpcnN0UGFnZSgpID8gLTEgOiBudWxsXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1wYWdpbmF0b3ItaWNvbiBwaSBwaS1zdGVwLWJhY2t3YXJkXCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPGEgdGFiaW5kZXg9XCIwXCIgW2F0dHIudGFiaW5kZXhdPVwiaXNGaXJzdFBhZ2UoKSA/IG51bGwgOiAnMCdcIiBjbGFzcz1cInVpLXBhZ2luYXRvci1wcmV2IHVpLXBhZ2luYXRvci1lbGVtZW50IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbFwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VQYWdlVG9QcmV2KCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJjaGFuZ2VQYWdlVG9QcmV2KCRldmVudClcIiBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzppc0ZpcnN0UGFnZSgpfVwiIFt0YWJpbmRleF09XCJpc0ZpcnN0UGFnZSgpID8gLTEgOiBudWxsXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1wYWdpbmF0b3ItaWNvbiBwaSBwaS1jYXJldC1sZWZ0XCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1wYWdpbmF0b3ItcGFnZXNcIj5cbiAgICAgICAgICAgICAgICA8YSB0YWJpbmRleD1cIjBcIiAqbmdGb3I9XCJsZXQgcGFnZUxpbmsgb2YgcGFnZUxpbmtzXCIgY2xhc3M9XCJ1aS1wYWdpbmF0b3ItcGFnZSB1aS1wYWdpbmF0b3ItZWxlbWVudCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGxcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25QYWdlTGlua0NsaWNrKCRldmVudCwgcGFnZUxpbmsgLSAxKVwiIChrZXlkb3duLmVudGVyKT1cIm9uUGFnZUxpbmtDbGljaygkZXZlbnQsIHBhZ2VMaW5rIC0gMSlcIiBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWFjdGl2ZSc6IChwYWdlTGluay0xID09IGdldFBhZ2UoKSl9XCI+e3twYWdlTGlua319PC9hPlxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPGEgW2F0dHIudGFiaW5kZXhdPVwiaXNMYXN0UGFnZSgpID8gbnVsbCA6ICcwJ1wiIGNsYXNzPVwidWktcGFnaW5hdG9yLW5leHQgdWktcGFnaW5hdG9yLWVsZW1lbnQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cImNoYW5nZVBhZ2VUb05leHQoJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cImNoYW5nZVBhZ2VUb05leHQoJGV2ZW50KVwiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtZGlzYWJsZWQnOmlzTGFzdFBhZ2UoKX1cIiBbdGFiaW5kZXhdPVwiaXNMYXN0UGFnZSgpID8gLTEgOiBudWxsXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1wYWdpbmF0b3ItaWNvbiBwaSBwaS1jYXJldC1yaWdodFwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgIDxhIFthdHRyLnRhYmluZGV4XT1cImlzTGFzdFBhZ2UoKSA/IG51bGwgOiAnMCdcIiBjbGFzcz1cInVpLXBhZ2luYXRvci1sYXN0IHVpLXBhZ2luYXRvci1lbGVtZW50IHVpLXN0YXRlLWRlZmF1bHQgdWktY29ybmVyLWFsbFwiXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjaGFuZ2VQYWdlVG9MYXN0KCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJjaGFuZ2VQYWdlVG9MYXN0KCRldmVudClcIiBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzppc0xhc3RQYWdlKCl9XCIgW3RhYmluZGV4XT1cImlzTGFzdFBhZ2UoKSA/IC0xIDogbnVsbFwiPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktcGFnaW5hdG9yLWljb24gcGkgcGktc3RlcC1mb3J3YXJkXCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPHAtZHJvcGRvd24gW29wdGlvbnNdPVwicm93c1BlclBhZ2VJdGVtc1wiIFsobmdNb2RlbCldPVwicm93c1wiICpuZ0lmPVwicm93c1BlclBhZ2VPcHRpb25zXCIgXG4gICAgICAgICAgICAgICAgKG9uQ2hhbmdlKT1cIm9uUnBwQ2hhbmdlKCRldmVudClcIiBbYXBwZW5kVG9dPVwiZHJvcGRvd25BcHBlbmRUb1wiIFtzY3JvbGxIZWlnaHRdPVwiZHJvcGRvd25TY3JvbGxIZWlnaHRcIj48L3AtZHJvcGRvd24+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktcGFnaW5hdG9yLXJpZ2h0LWNvbnRlbnRcIiAqbmdJZj1cInRlbXBsYXRlUmlnaHRcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGVSaWdodDsgY29udGV4dDogeyRpbXBsaWNpdDogcGFnaW5hdG9yU3RhdGV9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBQYWdpbmF0b3IgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG5cbiAgICBASW5wdXQoKSBwYWdlTGlua1NpemU6IG51bWJlciA9IDU7XG5cbiAgICBAT3V0cHV0KCkgb25QYWdlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBhbHdheXNTaG93OiBib29sZWFuID0gdHJ1ZTtcbiAgICBcbiAgICBASW5wdXQoKSB0ZW1wbGF0ZUxlZnQ6IFRlbXBsYXRlUmVmPGFueT47XG4gICAgXG4gICAgQElucHV0KCkgdGVtcGxhdGVSaWdodDogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIEBJbnB1dCgpIGRyb3Bkb3duQXBwZW5kVG86IGFueTtcblxuICAgIEBJbnB1dCgpIGRyb3Bkb3duU2Nyb2xsSGVpZ2h0OiBzdHJpbmcgPSAnMjAwcHgnO1xuXG4gICAgQElucHV0KCkgY3VycmVudFBhZ2VSZXBvcnRUZW1wbGF0ZTogc3RyaW5nID0gJ3tjdXJyZW50UGFnZX0gb2Yge3RvdGFsUGFnZXN9JztcblxuICAgIEBJbnB1dCgpIHNob3dDdXJyZW50UGFnZVJlcG9ydDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHRvdGFsUmVjb3JkczogbnVtYmVyID0gMDtcblxuICAgIEBJbnB1dCgpIHJvd3M6IG51bWJlciA9IDA7XG4gICAgXG4gICAgQElucHV0KCkgcm93c1BlclBhZ2VPcHRpb25zOiBhbnlbXTtcblxuICAgIHBhZ2VMaW5rczogbnVtYmVyW107XG5cbiAgICByb3dzUGVyUGFnZUl0ZW1zOiBTZWxlY3RJdGVtW107XG4gICAgXG4gICAgcGFnaW5hdG9yU3RhdGU6IGFueTtcblxuICAgIF9maXJzdDogbnVtYmVyID0gMDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7fVxuICAgIFxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVBhZ2luYXRvclN0YXRlKCk7XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoc2ltcGxlQ2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2UudG90YWxSZWNvcmRzKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBhZ2VMaW5rcygpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdpbmF0b3JTdGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGaXJzdCgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVSb3dzUGVyUGFnZU9wdGlvbnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2UuZmlyc3QpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZpcnN0ID0gc2ltcGxlQ2hhbmdlLmZpcnN0LmN1cnJlbnRWYWx1ZTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnZUxpbmtzKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBhZ2luYXRvclN0YXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnJvd3MpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnZUxpbmtzKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBhZ2luYXRvclN0YXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLnJvd3NQZXJQYWdlT3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVSb3dzUGVyUGFnZU9wdGlvbnMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpIGdldCBmaXJzdCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmlyc3Q7XG4gICAgfVxuICAgIHNldCBmaXJzdCh2YWw6bnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2ZpcnN0ID0gdmFsO1xuICAgIH1cblxuICAgIHVwZGF0ZVJvd3NQZXJQYWdlT3B0aW9ucygpIHtcbiAgICAgICAgaWYodGhpcy5yb3dzUGVyUGFnZU9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMucm93c1BlclBhZ2VJdGVtcyA9IFtdO1xuICAgICAgICAgICAgZm9yIChsZXQgb3B0IG9mIHRoaXMucm93c1BlclBhZ2VPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHQgPT0gJ29iamVjdCcgJiYgb3B0WydzaG93QWxsJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yb3dzUGVyUGFnZUl0ZW1zLnB1c2goe2xhYmVsOiBvcHRbJ3Nob3dBbGwnXSwgdmFsdWU6IHRoaXMudG90YWxSZWNvcmRzfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvd3NQZXJQYWdlSXRlbXMucHVzaCh7bGFiZWw6IFN0cmluZyhvcHQpLCB2YWx1ZTogb3B0fSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNGaXJzdFBhZ2UoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFBhZ2UoKSA9PT0gMDtcbiAgICB9XG5cbiAgICBpc0xhc3RQYWdlKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRQYWdlKCkgPT09IHRoaXMuZ2V0UGFnZUNvdW50KCkgLSAxO1xuICAgIH1cblxuICAgIGdldFBhZ2VDb3VudCgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguY2VpbCh0aGlzLnRvdGFsUmVjb3Jkcy90aGlzLnJvd3MpfHwxO1xuICAgIH1cblxuICAgIGNhbGN1bGF0ZVBhZ2VMaW5rQm91bmRhcmllcygpIHtcbiAgICAgICAgbGV0IG51bWJlck9mUGFnZXMgPSB0aGlzLmdldFBhZ2VDb3VudCgpLFxuICAgICAgICB2aXNpYmxlUGFnZXMgPSBNYXRoLm1pbih0aGlzLnBhZ2VMaW5rU2l6ZSwgbnVtYmVyT2ZQYWdlcyk7XG5cbiAgICAgICAgLy9jYWxjdWxhdGUgcmFuZ2UsIGtlZXAgY3VycmVudCBpbiBtaWRkbGUgaWYgbmVjZXNzYXJ5XG4gICAgICAgIGxldCBzdGFydCA9IE1hdGgubWF4KDAsIE1hdGguY2VpbCh0aGlzLmdldFBhZ2UoKSAtICgodmlzaWJsZVBhZ2VzKSAvIDIpKSksXG4gICAgICAgIGVuZCA9IE1hdGgubWluKG51bWJlck9mUGFnZXMgLSAxLCBzdGFydCArIHZpc2libGVQYWdlcyAtIDEpO1xuXG4gICAgICAgIC8vY2hlY2sgd2hlbiBhcHByb2FjaGluZyB0byBsYXN0IHBhZ2VcbiAgICAgICAgdmFyIGRlbHRhID0gdGhpcy5wYWdlTGlua1NpemUgLSAoZW5kIC0gc3RhcnQgKyAxKTtcbiAgICAgICAgc3RhcnQgPSBNYXRoLm1heCgwLCBzdGFydCAtIGRlbHRhKTtcblxuICAgICAgICByZXR1cm4gW3N0YXJ0LCBlbmRdO1xuICAgIH1cblxuICAgIHVwZGF0ZVBhZ2VMaW5rcygpIHtcbiAgICAgICAgdGhpcy5wYWdlTGlua3MgPSBbXTtcbiAgICAgICAgbGV0IGJvdW5kYXJpZXMgPSB0aGlzLmNhbGN1bGF0ZVBhZ2VMaW5rQm91bmRhcmllcygpLFxuICAgICAgICBzdGFydCA9IGJvdW5kYXJpZXNbMF0sXG4gICAgICAgIGVuZCA9IGJvdW5kYXJpZXNbMV07XG5cbiAgICAgICAgZm9yKGxldCBpID0gc3RhcnQ7IGkgPD0gZW5kOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMucGFnZUxpbmtzLnB1c2goaSArIDEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2hhbmdlUGFnZShwIDpudW1iZXIpIHtcbiAgICAgICAgdmFyIHBjID0gdGhpcy5nZXRQYWdlQ291bnQoKTtcblxuICAgICAgICBpZihwID49IDAgJiYgcCA8IHBjKSB7XG4gICAgICAgICAgICB0aGlzLl9maXJzdCA9IHRoaXMucm93cyAqIHA7XG4gICAgICAgICAgICB2YXIgc3RhdGUgPSB7XG4gICAgICAgICAgICAgICAgcGFnZTogcCxcbiAgICAgICAgICAgICAgICBmaXJzdDogdGhpcy5maXJzdCxcbiAgICAgICAgICAgICAgICByb3dzOiB0aGlzLnJvd3MsXG4gICAgICAgICAgICAgICAgcGFnZUNvdW50OiBwY1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGFnZUxpbmtzKCk7XG5cbiAgICAgICAgICAgIHRoaXMub25QYWdlQ2hhbmdlLmVtaXQoc3RhdGUpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQYWdpbmF0b3JTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlRmlyc3QoKSB7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLmdldFBhZ2UoKTtcbiAgICAgICAgaWYgKHBhZ2UgPiAwICYmICh0aGlzLmZpcnN0ID49IHRoaXMudG90YWxSZWNvcmRzKSkge1xuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4gdGhpcy5jaGFuZ2VQYWdlKHBhZ2UgLSAxKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRQYWdlKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKHRoaXMuZmlyc3QgLyB0aGlzLnJvd3MpO1xuICAgIH1cblxuICAgIGNoYW5nZVBhZ2VUb0ZpcnN0KGV2ZW50KSB7XG4gICAgICBpZighdGhpcy5pc0ZpcnN0UGFnZSgpKXtcbiAgICAgICAgICB0aGlzLmNoYW5nZVBhZ2UoMCk7XG4gICAgICB9XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgY2hhbmdlUGFnZVRvUHJldihldmVudCkge1xuICAgICAgICB0aGlzLmNoYW5nZVBhZ2UodGhpcy5nZXRQYWdlKCkgLSAxKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VQYWdlVG9OZXh0KGV2ZW50KSB7XG4gICAgICAgIHRoaXMuY2hhbmdlUGFnZSh0aGlzLmdldFBhZ2UoKSAgKyAxKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBjaGFuZ2VQYWdlVG9MYXN0KGV2ZW50KSB7XG4gICAgICBpZighdGhpcy5pc0xhc3RQYWdlKCkpe1xuICAgICAgICAgIHRoaXMuY2hhbmdlUGFnZSh0aGlzLmdldFBhZ2VDb3VudCgpIC0gMSk7XG4gICAgICB9XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25QYWdlTGlua0NsaWNrKGV2ZW50LCBwYWdlKSB7XG4gICAgICAgIHRoaXMuY2hhbmdlUGFnZShwYWdlKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblJwcENoYW5nZShldmVudCkge1xuICAgICAgICB0aGlzLmNoYW5nZVBhZ2UodGhpcy5nZXRQYWdlKCkpO1xuICAgIH1cbiAgICBcbiAgICB1cGRhdGVQYWdpbmF0b3JTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5wYWdpbmF0b3JTdGF0ZSA9IHtcbiAgICAgICAgICAgIHBhZ2U6IHRoaXMuZ2V0UGFnZSgpLFxuICAgICAgICAgICAgcGFnZUNvdW50OiB0aGlzLmdldFBhZ2VDb3VudCgpLFxuICAgICAgICAgICAgcm93czogdGhpcy5yb3dzLFxuICAgICAgICAgICAgZmlyc3Q6IHRoaXMuZmlyc3QsXG4gICAgICAgICAgICB0b3RhbFJlY29yZHM6IHRoaXMudG90YWxSZWNvcmRzXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgY3VycmVudFBhZ2VSZXBvcnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRQYWdlUmVwb3J0VGVtcGxhdGVcbiAgICAgICAgICAgIC5yZXBsYWNlKFwie2N1cnJlbnRQYWdlfVwiLCAodGhpcy5nZXRQYWdlKCkgKyAxKS50b1N0cmluZygpKVxuICAgICAgICAgICAgLnJlcGxhY2UoXCJ7dG90YWxQYWdlc31cIiwgdGhpcy5nZXRQYWdlQ291bnQoKS50b1N0cmluZygpKTtcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSxEcm9wZG93bk1vZHVsZSxGb3Jtc01vZHVsZSxTaGFyZWRNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtQYWdpbmF0b3IsRHJvcGRvd25Nb2R1bGUsRm9ybXNNb2R1bGUsU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtQYWdpbmF0b3JdXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2luYXRvck1vZHVsZSB7IH1cbiJdfQ==