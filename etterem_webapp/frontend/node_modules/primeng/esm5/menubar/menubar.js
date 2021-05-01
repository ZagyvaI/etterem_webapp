var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, Input, Renderer2, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { RouterModule } from '@angular/router';
var MenubarSub = /** @class */ (function () {
    function MenubarSub(renderer, cd) {
        this.renderer = renderer;
        this.cd = cd;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.menuHoverActive = false;
    }
    Object.defineProperty(MenubarSub.prototype, "parentActive", {
        get: function () {
            return this._parentActive;
        },
        set: function (value) {
            if (!this.root) {
                this._parentActive = value;
                if (!value)
                    this.activeItem = null;
            }
        },
        enumerable: true,
        configurable: true
    });
    MenubarSub.prototype.onItemMenuClick = function (event, item, menuitem) {
        if (!this.autoDisplay) {
            if (menuitem.disabled) {
                return;
            }
            this.activeItem = this.activeMenu ? (this.activeMenu.isEqualNode(item) ? null : item) : item;
            var nextElement = item.children[0].nextElementSibling;
            if (nextElement) {
                var sublist = nextElement.children[0];
                if (this.autoZIndex) {
                    sublist.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
                }
                if (this.root) {
                    sublist.style.top = DomHandler.getOuterHeight(item.children[0]) + 'px';
                    sublist.style.left = '0px';
                }
                else {
                    sublist.style.top = '0px';
                    sublist.style.left = DomHandler.getOuterWidth(item.children[0]) + 'px';
                }
            }
            this.menuClick = true;
            this.menuHoverActive = this.activeMenu ? (!this.activeMenu.isEqualNode(item)) : true;
            this.activeMenu = this.activeMenu ? (this.activeMenu.isEqualNode(item) ? null : item) : item;
            this.bindEventListener();
        }
    };
    MenubarSub.prototype.bindEventListener = function () {
        var _this = this;
        if (!this.documentClickListener) {
            this.documentClickListener = this.renderer.listen('document', 'click', function (event) {
                if (!_this.menuClick) {
                    _this.activeItem = null;
                    _this.menuHoverActive = false;
                    _this.activeMenu = false;
                }
                _this.menuClick = false;
            });
        }
    };
    MenubarSub.prototype.onItemMouseEnter = function (event, item, menuitem) {
        if (this.autoDisplay || (!this.autoDisplay && this.root && this.menuHoverActive)) {
            if (menuitem.disabled) {
                return;
            }
            if ((this.activeItem && !this.activeItem.isEqualNode(item) || !this.activeItem)) {
                this.activeItem = item;
                var nextElement = item.children[0].nextElementSibling;
                if (nextElement) {
                    var sublist = nextElement.children[0];
                    sublist.style.zIndex = String(++DomHandler.zindex);
                    if (this.root) {
                        sublist.style.top = DomHandler.getOuterHeight(item.children[0]) + 'px';
                        sublist.style.left = '0px';
                    }
                    else {
                        sublist.style.top = '0px';
                        sublist.style.left = DomHandler.getOuterWidth(item.children[0]) + 'px';
                    }
                }
                this.activeMenu = item;
            }
        }
    };
    MenubarSub.prototype.itemClick = function (event, item) {
        if (item.disabled) {
            event.preventDefault();
            return;
        }
        if (!item.url) {
            event.preventDefault();
        }
        if (item.command) {
            item.command({
                originalEvent: event,
                item: item
            });
        }
        this.activeItem = null;
    };
    MenubarSub.prototype.listClick = function (event) {
        if (this.autoDisplay) {
            this.activeItem = null;
        }
    };
    MenubarSub.prototype.ngOnDestroy = function () {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
        }
    };
    MenubarSub.ctorParameters = function () { return [
        { type: Renderer2 },
        { type: ChangeDetectorRef }
    ]; };
    __decorate([
        Input()
    ], MenubarSub.prototype, "item", void 0);
    __decorate([
        Input()
    ], MenubarSub.prototype, "root", void 0);
    __decorate([
        Input()
    ], MenubarSub.prototype, "autoDisplay", void 0);
    __decorate([
        Input()
    ], MenubarSub.prototype, "autoZIndex", void 0);
    __decorate([
        Input()
    ], MenubarSub.prototype, "baseZIndex", void 0);
    __decorate([
        Input()
    ], MenubarSub.prototype, "parentActive", null);
    MenubarSub = __decorate([
        Component({
            selector: 'p-menubarSub',
            template: "\n        <ul [ngClass]=\"{'ui-menubar-root-list':root, 'ui-widget-content ui-corner-all ui-submenu-list ui-shadow':!root}\"\n            (click)=\"listClick($event)\">\n            <ng-template ngFor let-child [ngForOf]=\"(root ? item : item.items)\">\n                <li *ngIf=\"child.separator\" class=\"ui-menu-separator ui-widget-content\" [ngClass]=\"{'ui-helper-hidden': child.visible === false}\">\n                <li *ngIf=\"!child.separator\" #listItem [ngClass]=\"{'ui-menuitem ui-corner-all':true,\n                        'ui-menu-parent':child.items,'ui-menuitem-active':listItem==activeItem,'ui-helper-hidden': child.visible === false}\"\n                        (mouseenter)=\"onItemMouseEnter($event,listItem,child)\" (click)=\"onItemMenuClick($event, listItem, child)\">\n                    <a *ngIf=\"!child.routerLink\" [href]=\"child.url||'#'\" [attr.data-automationid]=\"child.automationId\" [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\" (click)=\"itemClick($event, child)\"\n                         [ngClass]=\"{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':child.disabled}\" [ngStyle]=\"child.style\" [class]=\"child.styleClass\" [attr.tabindex]=\"child.tabindex ? child.tabindex : '0'\">\n                        <span class=\"ui-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                        <span class=\"ui-submenu-icon pi pi-fw\" *ngIf=\"child.items\" [ngClass]=\"{'pi-caret-down':root,'pi-caret-right':!root}\"></span>\n                    </a>\n                    <a *ngIf=\"child.routerLink\" [routerLink]=\"child.routerLink\" [attr.data-automationid]=\"child.automationId\" [queryParams]=\"child.queryParams\" [routerLinkActive]=\"'ui-state-active'\" [routerLinkActiveOptions]=\"child.routerLinkActiveOptions||{exact:false}\"\n                        [attr.target]=\"child.target\" [attr.title]=\"child.title\" [attr.id]=\"child.id\" [attr.tabindex]=\"child.tabindex ? child.tabindex : '0'\"\n                        (click)=\"itemClick($event, child)\" [ngClass]=\"{'ui-menuitem-link ui-corner-all':true,'ui-state-disabled':child.disabled}\" [ngStyle]=\"child.style\" [class]=\"child.styleClass\">\n                        <span class=\"ui-menuitem-icon\" *ngIf=\"child.icon\" [ngClass]=\"child.icon\"></span>\n                        <span class=\"ui-menuitem-text\">{{child.label}}</span>\n                        <span class=\"ui-submenu-icon pi pi-fw\" *ngIf=\"child.items\" [ngClass]=\"{'pi-caret-down':root,'pi-caret-right':!root}\"></span>\n                    </a>\n                    <p-menubarSub class=\"ui-submenu\" [parentActive]=\"listItem==activeItem\" [item]=\"child\" *ngIf=\"child.items\" [autoDisplay]=\"true\"></p-menubarSub>\n                </li>\n            </ng-template>\n        </ul>\n    "
        })
    ], MenubarSub);
    return MenubarSub;
}());
export { MenubarSub };
var Menubar = /** @class */ (function () {
    function Menubar(el, renderer) {
        this.el = el;
        this.renderer = renderer;
        this.autoZIndex = true;
        this.baseZIndex = 0;
    }
    Object.defineProperty(Menubar.prototype, "autoDisplay", {
        get: function () {
            return this._autoDisplay;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Menubar.prototype, "utc", {
        set: function (_utc) {
            console.log("AutoDisplay property is deprecated and functionality is not available.");
        },
        enumerable: true,
        configurable: true
    });
    Menubar.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    __decorate([
        Input()
    ], Menubar.prototype, "model", void 0);
    __decorate([
        Input()
    ], Menubar.prototype, "style", void 0);
    __decorate([
        Input()
    ], Menubar.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Menubar.prototype, "autoZIndex", void 0);
    __decorate([
        Input()
    ], Menubar.prototype, "baseZIndex", void 0);
    __decorate([
        Input()
    ], Menubar.prototype, "autoDisplay", null);
    Menubar = __decorate([
        Component({
            selector: 'p-menubar',
            template: "\n        <div [ngClass]=\"{'ui-menubar ui-widget ui-widget-content ui-corner-all':true}\" [class]=\"styleClass\" [ngStyle]=\"style\">\n            <p-menubarSub [item]=\"model\" root=\"root\" [baseZIndex]=\"baseZIndex\" [autoZIndex]=\"autoZIndex\">\n                <ng-content></ng-content>\n            </p-menubarSub>\n            <div class=\"ui-menubar-custom\">\n                <ng-content></ng-content>\n            </div>\n        </div>\n    "
        })
    ], Menubar);
    return Menubar;
}());
export { Menubar };
var MenubarModule = /** @class */ (function () {
    function MenubarModule() {
    }
    MenubarModule = __decorate([
        NgModule({
            imports: [CommonModule, RouterModule],
            exports: [Menubar, RouterModule],
            declarations: [Menubar, MenubarSub]
        })
    ], MenubarModule);
    return MenubarModule;
}());
export { MenubarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudWJhci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvbWVudWJhci8iLCJzb3VyY2VzIjpbIm1lbnViYXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQy9HLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQStCL0M7SUFxQ0ksb0JBQW1CLFFBQW1CLEVBQVUsRUFBcUI7UUFBbEQsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUFVLE9BQUUsR0FBRixFQUFFLENBQW1CO1FBN0I1RCxlQUFVLEdBQVksSUFBSSxDQUFDO1FBRTNCLGVBQVUsR0FBVyxDQUFDLENBQUM7UUFxQmhDLG9CQUFlLEdBQVksS0FBSyxDQUFDO0lBTXdDLENBQUM7SUF6QmpFLHNCQUFJLG9DQUFZO2FBQWhCO1lBRUwsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzlCLENBQUM7YUFDRCxVQUFpQixLQUFLO1lBQ2xCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO2dCQUNaLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO2dCQUUzQixJQUFJLENBQUMsS0FBSztvQkFDTixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzthQUM5QjtRQUNMLENBQUM7OztPQVJBO0lBd0JELG9DQUFlLEdBQWYsVUFBZ0IsS0FBWSxFQUFFLElBQW1CLEVBQUUsUUFBa0I7UUFDakUsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDbkIsSUFBSSxRQUFRLENBQUMsUUFBUSxFQUFFO2dCQUNuQixPQUFPO2FB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UixRQUFRLENBQVc7UUFicEQsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUzQixlQUFVLEdBQVcsQ0FBQyxDQUFDO0lBV2lDLENBQUM7SUFQekQsc0JBQUksZ0NBQVc7YUFBZjtZQUNMLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztRQUM3QixDQUFDOzs7T0FBQTtJQUNELHNCQUFJLHdCQUFHO2FBQVAsVUFBUSxJQUFhO1lBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsd0VBQXdFLENBQUMsQ0FBQztRQUMxRixDQUFDOzs7T0FBQTs7Z0JBRXNCLFVBQVU7Z0JBQW1CLFNBQVM7O0lBbkJwRDtRQUFSLEtBQUssRUFBRTswQ0FBbUI7SUFFbEI7UUFBUixLQUFLLEVBQUU7MENBQVk7SUFFWDtRQUFSLEtBQUssRUFBRTsrQ0FBb0I7SUFFbkI7UUFBUixLQUFLLEVBQUU7K0NBQTRCO0lBRTNCO1FBQVIsS0FBSyxFQUFFOytDQUF3QjtJQUl2QjtRQUFSLEtBQUssRUFBRTs4Q0FFUDtJQWhCUSxPQUFPO1FBYm5CLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSx1Y0FTVDtTQUNKLENBQUM7T0FDVyxPQUFPLENBc0JuQjtJQUFELGNBQUM7Q0FBQSxBQXRCRCxJQXNCQztTQXRCWSxPQUFPO0FBNkJwQjtJQUFBO0lBQTZCLENBQUM7SUFBakIsYUFBYTtRQUx6QixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsWUFBWSxDQUFDO1lBQ3JDLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUM7WUFDaEMsWUFBWSxFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQztTQUN0QyxDQUFDO09BQ1csYUFBYSxDQUFJO0lBQUQsb0JBQUM7Q0FBQSxBQUE5QixJQUE4QjtTQUFqQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIENvbXBvbmVudCwgRWxlbWVudFJlZiwgSW5wdXQsIFJlbmRlcmVyMiwgT25EZXN0cm95LENoYW5nZURldGVjdG9yUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IE1lbnVJdGVtIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLW1lbnViYXJTdWInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDx1bCBbbmdDbGFzc109XCJ7J3VpLW1lbnViYXItcm9vdC1saXN0Jzpyb290LCAndWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCB1aS1zdWJtZW51LWxpc3QgdWktc2hhZG93Jzohcm9vdH1cIlxuICAgICAgICAgICAgKGNsaWNrKT1cImxpc3RDbGljaygkZXZlbnQpXCI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LWNoaWxkIFtuZ0Zvck9mXT1cIihyb290ID8gaXRlbSA6IGl0ZW0uaXRlbXMpXCI+XG4gICAgICAgICAgICAgICAgPGxpICpuZ0lmPVwiY2hpbGQuc2VwYXJhdG9yXCIgY2xhc3M9XCJ1aS1tZW51LXNlcGFyYXRvciB1aS13aWRnZXQtY29udGVudFwiIFtuZ0NsYXNzXT1cInsndWktaGVscGVyLWhpZGRlbic6IGNoaWxkLnZpc2libGUgPT09IGZhbHNlfVwiPlxuICAgICAgICAgICAgICAgIDxsaSAqbmdJZj1cIiFjaGlsZC5zZXBhcmF0b3JcIiAjbGlzdEl0ZW0gW25nQ2xhc3NdPVwieyd1aS1tZW51aXRlbSB1aS1jb3JuZXItYWxsJzp0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3VpLW1lbnUtcGFyZW50JzpjaGlsZC5pdGVtcywndWktbWVudWl0ZW0tYWN0aXZlJzpsaXN0SXRlbT09YWN0aXZlSXRlbSwndWktaGVscGVyLWhpZGRlbic6IGNoaWxkLnZpc2libGUgPT09IGZhbHNlfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAobW91c2VlbnRlcik9XCJvbkl0ZW1Nb3VzZUVudGVyKCRldmVudCxsaXN0SXRlbSxjaGlsZClcIiAoY2xpY2spPVwib25JdGVtTWVudUNsaWNrKCRldmVudCwgbGlzdEl0ZW0sIGNoaWxkKVwiPlxuICAgICAgICAgICAgICAgICAgICA8YSAqbmdJZj1cIiFjaGlsZC5yb3V0ZXJMaW5rXCIgW2hyZWZdPVwiY2hpbGQudXJsfHwnIydcIiBbYXR0ci5kYXRhLWF1dG9tYXRpb25pZF09XCJjaGlsZC5hdXRvbWF0aW9uSWRcIiBbYXR0ci50YXJnZXRdPVwiY2hpbGQudGFyZ2V0XCIgW2F0dHIudGl0bGVdPVwiY2hpbGQudGl0bGVcIiBbYXR0ci5pZF09XCJjaGlsZC5pZFwiIChjbGljayk9XCJpdGVtQ2xpY2soJGV2ZW50LCBjaGlsZClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktbWVudWl0ZW0tbGluayB1aS1jb3JuZXItYWxsJzp0cnVlLCd1aS1zdGF0ZS1kaXNhYmxlZCc6Y2hpbGQuZGlzYWJsZWR9XCIgW25nU3R5bGVdPVwiY2hpbGQuc3R5bGVcIiBbY2xhc3NdPVwiY2hpbGQuc3R5bGVDbGFzc1wiIFthdHRyLnRhYmluZGV4XT1cImNoaWxkLnRhYmluZGV4ID8gY2hpbGQudGFiaW5kZXggOiAnMCdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktbWVudWl0ZW0taWNvblwiICpuZ0lmPVwiY2hpbGQuaWNvblwiIFtuZ0NsYXNzXT1cImNoaWxkLmljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLXRleHRcIj57e2NoaWxkLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXN1Ym1lbnUtaWNvbiBwaSBwaS1md1wiICpuZ0lmPVwiY2hpbGQuaXRlbXNcIiBbbmdDbGFzc109XCJ7J3BpLWNhcmV0LWRvd24nOnJvb3QsJ3BpLWNhcmV0LXJpZ2h0Jzohcm9vdH1cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPGEgKm5nSWY9XCJjaGlsZC5yb3V0ZXJMaW5rXCIgW3JvdXRlckxpbmtdPVwiY2hpbGQucm91dGVyTGlua1wiIFthdHRyLmRhdGEtYXV0b21hdGlvbmlkXT1cImNoaWxkLmF1dG9tYXRpb25JZFwiIFtxdWVyeVBhcmFtc109XCJjaGlsZC5xdWVyeVBhcmFtc1wiIFtyb3V0ZXJMaW5rQWN0aXZlXT1cIid1aS1zdGF0ZS1hY3RpdmUnXCIgW3JvdXRlckxpbmtBY3RpdmVPcHRpb25zXT1cImNoaWxkLnJvdXRlckxpbmtBY3RpdmVPcHRpb25zfHx7ZXhhY3Q6ZmFsc2V9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhcmdldF09XCJjaGlsZC50YXJnZXRcIiBbYXR0ci50aXRsZV09XCJjaGlsZC50aXRsZVwiIFthdHRyLmlkXT1cImNoaWxkLmlkXCIgW2F0dHIudGFiaW5kZXhdPVwiY2hpbGQudGFiaW5kZXggPyBjaGlsZC50YWJpbmRleCA6ICcwJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwiaXRlbUNsaWNrKCRldmVudCwgY2hpbGQpXCIgW25nQ2xhc3NdPVwieyd1aS1tZW51aXRlbS1saW5rIHVpLWNvcm5lci1hbGwnOnRydWUsJ3VpLXN0YXRlLWRpc2FibGVkJzpjaGlsZC5kaXNhYmxlZH1cIiBbbmdTdHlsZV09XCJjaGlsZC5zdHlsZVwiIFtjbGFzc109XCJjaGlsZC5zdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lbnVpdGVtLWljb25cIiAqbmdJZj1cImNoaWxkLmljb25cIiBbbmdDbGFzc109XCJjaGlsZC5pY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZW51aXRlbS10ZXh0XCI+e3tjaGlsZC5sYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1zdWJtZW51LWljb24gcGkgcGktZndcIiAqbmdJZj1cImNoaWxkLml0ZW1zXCIgW25nQ2xhc3NdPVwieydwaS1jYXJldC1kb3duJzpyb290LCdwaS1jYXJldC1yaWdodCc6IXJvb3R9XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDxwLW1lbnViYXJTdWIgY2xhc3M9XCJ1aS1zdWJtZW51XCIgW3BhcmVudEFjdGl2ZV09XCJsaXN0SXRlbT09YWN0aXZlSXRlbVwiIFtpdGVtXT1cImNoaWxkXCIgKm5nSWY9XCJjaGlsZC5pdGVtc1wiIFthdXRvRGlzcGxheV09XCJ0cnVlXCI+PC9wLW1lbnViYXJTdWI+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvdWw+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBNZW51YmFyU3ViIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIGl0ZW06IE1lbnVJdGVtO1xuXG4gICAgQElucHV0KCkgcm9vdDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGF1dG9EaXNwbGF5OiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgYXV0b1pJbmRleDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgQElucHV0KCkgZ2V0IHBhcmVudEFjdGl2ZSgpOmJvb2xlYW4gXG4gICAge1xuICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50QWN0aXZlO1xuICAgIH1cbiAgICBzZXQgcGFyZW50QWN0aXZlKHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5yb290KSB7XG4gICAgICAgICAgICB0aGlzLl9wYXJlbnRBY3RpdmUgPSB2YWx1ZTtcblxuICAgICAgICAgICAgaWYgKCF2YWx1ZSlcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3BhcmVudEFjdGl2ZTpib29sZWFuO1xuXG4gICAgZG9jdW1lbnRDbGlja0xpc3RlbmVyOiBhbnk7XG5cbiAgICBtZW51Q2xpY2s6IGJvb2xlYW47XG4gIFxuICAgIG1lbnVIb3ZlckFjdGl2ZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgYWN0aXZlSXRlbTogYW55O1xuXG4gICAgYWN0aXZlTWVudTogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7IH1cblxuICAgIG9uSXRlbU1lbnVDbGljayhldmVudDogRXZlbnQsIGl0ZW06IEhUTUxMSUVsZW1lbnQsIG1lbnVpdGVtOiBNZW51SXRlbSkge1xuICAgICAgICBpZiAoIXRoaXMuYXV0b0Rpc3BsYXkpIHtcbiAgICAgICAgICAgIGlmIChtZW51aXRlbS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5hY3RpdmVJdGVtID0gdGhpcy5hY3RpdmVNZW51ID8gKHRoaXMuYWN0aXZlTWVudS5pc0VxdWFsTm9kZShpdGVtKSA/IG51bGwgOiBpdGVtKSA6IGl0ZW07XG4gICAgICAgICAgICBsZXQgbmV4dEVsZW1lbnQgPSA8SFRNTExJRWxlbWVudD5pdGVtLmNoaWxkcmVuWzBdLm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIGlmIChuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGxldCBzdWJsaXN0ID0gPEhUTUxVTGlzdEVsZW1lbnQ+bmV4dEVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYXV0b1pJbmRleCkge1xuICAgICAgICAgICAgICAgICAgICBzdWJsaXN0LnN0eWxlLnpJbmRleCA9IFN0cmluZyh0aGlzLmJhc2VaSW5kZXggKyAoKytEb21IYW5kbGVyLnppbmRleCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJvb3QpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VibGlzdC5zdHlsZS50b3AgPSBEb21IYW5kbGVyLmdldE91dGVySGVpZ2h0KGl0ZW0uY2hpbGRyZW5bMF0pICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgc3VibGlzdC5zdHlsZS5sZWZ0ID0gJzBweCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHN1Ymxpc3Quc3R5bGUudG9wID0gJzBweCc7XG4gICAgICAgICAgICAgICAgICAgIHN1Ymxpc3Quc3R5bGUubGVmdCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aChpdGVtLmNoaWxkcmVuWzBdKSArICdweCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm1lbnVDbGljayA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1lbnVIb3ZlckFjdGl2ZSA9IHRoaXMuYWN0aXZlTWVudSA/ICghdGhpcy5hY3RpdmVNZW51LmlzRXF1YWxOb2RlKGl0ZW0pKSA6IHRydWU7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZU1lbnUgPSB0aGlzLmFjdGl2ZU1lbnUgPyAodGhpcy5hY3RpdmVNZW51LmlzRXF1YWxOb2RlKGl0ZW0pID8gbnVsbDogaXRlbSkgOiBpdGVtO1xuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRMaXN0ZW5lcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZEV2ZW50TGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oJ2RvY3VtZW50JywgJ2NsaWNrJywoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMubWVudUNsaWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVudUhvdmVyQWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlTWVudSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm1lbnVDbGljayA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkl0ZW1Nb3VzZUVudGVyKGV2ZW50OiBFdmVudCwgaXRlbTogSFRNTExJRWxlbWVudCwgbWVudWl0ZW06IE1lbnVJdGVtKSB7XG4gICAgICAgIGlmICh0aGlzLmF1dG9EaXNwbGF5IHx8ICghdGhpcy5hdXRvRGlzcGxheSAmJiB0aGlzLnJvb3QgJiYgdGhpcy5tZW51SG92ZXJBY3RpdmUpKSB7XG4gICAgICAgICAgICBpZiAobWVudWl0ZW0uZGlzYWJsZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgodGhpcy5hY3RpdmVJdGVtICYmICF0aGlzLmFjdGl2ZUl0ZW0uaXNFcXVhbE5vZGUoaXRlbSkgfHwgIXRoaXMuYWN0aXZlSXRlbSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBpdGVtO1xuICAgICAgICAgICAgICAgIGxldCBuZXh0RWxlbWVudCA9IDxIVE1MTElFbGVtZW50Pml0ZW0uY2hpbGRyZW5bMF0ubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgIGlmIChuZXh0RWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc3VibGlzdCA9IDxIVE1MVUxpc3RFbGVtZW50Pm5leHRFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgICAgICAgICAgICAgICAgICBzdWJsaXN0LnN0eWxlLnpJbmRleCA9IFN0cmluZygrK0RvbUhhbmRsZXIuemluZGV4KTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yb290KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJsaXN0LnN0eWxlLnRvcCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQoaXRlbS5jaGlsZHJlblswXSkgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VibGlzdC5zdHlsZS5sZWZ0ID0gJzBweCdcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Ymxpc3Quc3R5bGUudG9wID0gJzBweCc7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJsaXN0LnN0eWxlLmxlZnQgPSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgoaXRlbS5jaGlsZHJlblswXSkgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYWN0aXZlTWVudSA9IGl0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGl0ZW1DbGljayhldmVudCwgaXRlbTogTWVudUl0ZW0pIMKge1xuICAgICAgICBpZiAoaXRlbS5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXRlbS51cmwpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXRlbS5jb21tYW5kKSB7XG4gICAgICAgICAgICBpdGVtLmNvbW1hbmQoe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5hY3RpdmVJdGVtID0gbnVsbDtcbiAgICB9XG5cbiAgICBsaXN0Q2xpY2soZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b0Rpc3BsYXkpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlSXRlbSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgIGlmKHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyID0gbnVsbDtcbiAgICAgIH1cblxuICAgIH1cblxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtbWVudWJhcicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3VpLW1lbnViYXIgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwnOnRydWV9XCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbbmdTdHlsZV09XCJzdHlsZVwiPlxuICAgICAgICAgICAgPHAtbWVudWJhclN1YiBbaXRlbV09XCJtb2RlbFwiIHJvb3Q9XCJyb290XCIgW2Jhc2VaSW5kZXhdPVwiYmFzZVpJbmRleFwiIFthdXRvWkluZGV4XT1cImF1dG9aSW5kZXhcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICA8L3AtbWVudWJhclN1Yj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1tZW51YmFyLWN1c3RvbVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIE1lbnViYXIge1xuXG4gICAgQElucHV0KCkgbW9kZWw6IE1lbnVJdGVtW107XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgYXV0b1pJbmRleDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBiYXNlWkluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgcHJpdmF0ZSBfYXV0b0Rpc3BsYXk6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBnZXQgYXV0b0Rpc3BsYXkoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hdXRvRGlzcGxheTtcbiAgICB9XG4gICAgc2V0IHV0YyhfdXRjOiBib29sZWFuKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQXV0b0Rpc3BsYXkgcHJvcGVydHkgaXMgZGVwcmVjYXRlZCBhbmQgZnVuY3Rpb25hbGl0eSBpcyBub3QgYXZhaWxhYmxlLlwiKTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyByZW5kZXJlcjogUmVuZGVyZXIyKSB7IH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBSb3V0ZXJNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtNZW51YmFyLCBSb3V0ZXJNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW01lbnViYXIsIE1lbnViYXJTdWJdXG59KVxuZXhwb3J0IGNsYXNzIE1lbnViYXJNb2R1bGUgeyB9XG4iXX0=