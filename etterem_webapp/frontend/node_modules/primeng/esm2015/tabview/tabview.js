var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, ElementRef, OnDestroy, Input, Output, EventEmitter, AfterContentInit, ContentChildren, QueryList, TemplateRef, EmbeddedViewRef, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';
import { SharedModule, PrimeTemplate } from 'primeng/api';
let idx = 0;
let TabViewNav = class TabViewNav {
    constructor() {
        this.orientation = 'top';
        this.onTabClick = new EventEmitter();
        this.onTabCloseClick = new EventEmitter();
    }
    getDefaultHeaderClass(tab) {
        let styleClass = 'ui-state-default ui-corner-' + this.orientation;
        if (tab.headerStyleClass) {
            styleClass = styleClass + " " + tab.headerStyleClass;
        }
        return styleClass;
    }
    clickTab(event, tab) {
        this.onTabClick.emit({
            originalEvent: event,
            tab: tab
        });
    }
    clickClose(event, tab) {
        this.onTabCloseClick.emit({
            originalEvent: event,
            tab: tab
        });
    }
};
__decorate([
    Input()
], TabViewNav.prototype, "tabs", void 0);
__decorate([
    Input()
], TabViewNav.prototype, "orientation", void 0);
__decorate([
    Output()
], TabViewNav.prototype, "onTabClick", void 0);
__decorate([
    Output()
], TabViewNav.prototype, "onTabCloseClick", void 0);
TabViewNav = __decorate([
    Component({
        selector: '[p-tabViewNav]',
        host: {
            '[class.ui-tabview-nav]': 'true',
            '[class.ui-helper-reset]': 'true',
            '[class.ui-helper-clearfix]': 'true',
            '[class.ui-widget-header]': 'true',
            '[class.ui-corner-all]': 'true'
        },
        template: `
        <ng-template ngFor let-tab [ngForOf]="tabs">
            <li [class]="getDefaultHeaderClass(tab)" [ngStyle]="tab.headerStyle" role="presentation"
                [ngClass]="{'ui-tabview-selected ui-state-active': tab.selected, 'ui-state-disabled': tab.disabled}"
                (click)="clickTab($event,tab)" *ngIf="!tab.closed" tabindex="0" (keydown.enter)="clickTab($event,tab)">
                <a [attr.id]="tab.id + '-label'" role="tab" [attr.aria-selected]="tab.selected" [attr.aria-controls]="tab.id" [pTooltip]="tab.tooltip" [tooltipPosition]="tab.tooltipPosition" [positionStyle]="tab.tooltipPositionStyle" [tooltipStyleClass]="tab.tooltipStyleClass">
                    <ng-container *ngIf="!tab.headerTemplate" >
                        <span class="ui-tabview-left-icon" [ngClass]="tab.leftIcon" *ngIf="tab.leftIcon"></span>
                        <span class="ui-tabview-title">{{tab.header}}</span>
                        <span class="ui-tabview-right-icon" [ngClass]="tab.rightIcon" *ngIf="tab.rightIcon"></span>
                    </ng-container>
                    <ng-container *ngIf="tab.headerTemplate">
                        <ng-container *ngTemplateOutlet="tab.headerTemplate"></ng-container>
                    </ng-container>
                </a>
                <span *ngIf="tab.closable" class="ui-tabview-close pi pi-times" (click)="clickClose($event,tab)"></span>
            </li>
        </ng-template>
    `
    })
], TabViewNav);
export { TabViewNav };
let TabPanel = class TabPanel {
    constructor(viewContainer) {
        this.viewContainer = viewContainer;
        this.cache = true;
        this.tooltipPosition = 'top';
        this.tooltipPositionStyle = 'absolute';
        this.id = `ui-tabpanel-${idx++}`;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    get selected() {
        return this._selected;
    }
    set selected(val) {
        this._selected = val;
        this.loaded = true;
    }
    ngOnDestroy() {
        this.view = null;
    }
};
TabPanel.ctorParameters = () => [
    { type: ViewContainerRef }
];
__decorate([
    Input()
], TabPanel.prototype, "header", void 0);
__decorate([
    Input()
], TabPanel.prototype, "disabled", void 0);
__decorate([
    Input()
], TabPanel.prototype, "closable", void 0);
__decorate([
    Input()
], TabPanel.prototype, "headerStyle", void 0);
__decorate([
    Input()
], TabPanel.prototype, "headerStyleClass", void 0);
__decorate([
    Input()
], TabPanel.prototype, "leftIcon", void 0);
__decorate([
    Input()
], TabPanel.prototype, "rightIcon", void 0);
__decorate([
    Input()
], TabPanel.prototype, "cache", void 0);
__decorate([
    Input()
], TabPanel.prototype, "tooltip", void 0);
__decorate([
    Input()
], TabPanel.prototype, "tooltipPosition", void 0);
__decorate([
    Input()
], TabPanel.prototype, "tooltipPositionStyle", void 0);
__decorate([
    Input()
], TabPanel.prototype, "tooltipStyleClass", void 0);
__decorate([
    ContentChildren(PrimeTemplate)
], TabPanel.prototype, "templates", void 0);
__decorate([
    Input()
], TabPanel.prototype, "selected", null);
TabPanel = __decorate([
    Component({
        selector: 'p-tabPanel',
        template: `
        <div [attr.id]="id" class="ui-tabview-panel ui-widget-content" [ngClass]="{'ui-helper-hidden': !selected}"
            role="tabpanel" [attr.aria-hidden]="!selected" [attr.aria-labelledby]="id + '-label'" *ngIf="!closed">
            <ng-content></ng-content>
            <ng-container *ngIf="contentTemplate && (cache ? loaded : selected)">
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </ng-container>
        </div>
    `
    })
], TabPanel);
export { TabPanel };
let TabView = class TabView {
    constructor(el) {
        this.el = el;
        this.orientation = 'top';
        this.onChange = new EventEmitter();
        this.onClose = new EventEmitter();
        this.activeIndexChange = new EventEmitter();
    }
    ngAfterContentInit() {
        this.initTabs();
        this.tabPanels.changes.subscribe(_ => {
            this.initTabs();
        });
    }
    initTabs() {
        this.tabs = this.tabPanels.toArray();
        let selectedTab = this.findSelectedTab();
        if (!selectedTab && this.tabs.length) {
            if (this.activeIndex != null && this.tabs.length > this.activeIndex)
                this.tabs[this.activeIndex].selected = true;
            else
                this.tabs[0].selected = true;
        }
    }
    open(event, tab) {
        if (tab.disabled) {
            if (event) {
                event.preventDefault();
            }
            return;
        }
        if (!tab.selected) {
            let selectedTab = this.findSelectedTab();
            if (selectedTab) {
                selectedTab.selected = false;
            }
            tab.selected = true;
            let selectedTabIndex = this.findTabIndex(tab);
            this.preventActiveIndexPropagation = true;
            this.activeIndexChange.emit(selectedTabIndex);
            this.onChange.emit({ originalEvent: event, index: selectedTabIndex });
        }
        if (event) {
            event.preventDefault();
        }
    }
    close(event, tab) {
        if (this.controlClose) {
            this.onClose.emit({
                originalEvent: event,
                index: this.findTabIndex(tab),
                close: () => {
                    this.closeTab(tab);
                }
            });
        }
        else {
            this.closeTab(tab);
            this.onClose.emit({
                originalEvent: event,
                index: this.findTabIndex(tab)
            });
        }
        event.stopPropagation();
    }
    closeTab(tab) {
        if (tab.disabled) {
            return;
        }
        if (tab.selected) {
            tab.selected = false;
            for (let i = 0; i < this.tabs.length; i++) {
                let tabPanel = this.tabs[i];
                if (!tabPanel.closed && !tab.disabled) {
                    tabPanel.selected = true;
                    break;
                }
            }
        }
        tab.closed = true;
    }
    findSelectedTab() {
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].selected) {
                return this.tabs[i];
            }
        }
        return null;
    }
    findTabIndex(tab) {
        let index = -1;
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i] == tab) {
                index = i;
                break;
            }
        }
        return index;
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    get activeIndex() {
        return this._activeIndex;
    }
    set activeIndex(val) {
        this._activeIndex = val;
        if (this.preventActiveIndexPropagation) {
            this.preventActiveIndexPropagation = false;
            return;
        }
        if (this.tabs && this.tabs.length && this._activeIndex != null && this.tabs.length > this._activeIndex) {
            this.findSelectedTab().selected = false;
            this.tabs[this._activeIndex].selected = true;
        }
    }
};
TabView.ctorParameters = () => [
    { type: ElementRef }
];
__decorate([
    Input()
], TabView.prototype, "orientation", void 0);
__decorate([
    Input()
], TabView.prototype, "style", void 0);
__decorate([
    Input()
], TabView.prototype, "styleClass", void 0);
__decorate([
    Input()
], TabView.prototype, "controlClose", void 0);
__decorate([
    ContentChildren(TabPanel)
], TabView.prototype, "tabPanels", void 0);
__decorate([
    Output()
], TabView.prototype, "onChange", void 0);
__decorate([
    Output()
], TabView.prototype, "onClose", void 0);
__decorate([
    Output()
], TabView.prototype, "activeIndexChange", void 0);
__decorate([
    Input()
], TabView.prototype, "activeIndex", null);
TabView = __decorate([
    Component({
        selector: 'p-tabView',
        template: `
        <div [ngClass]="'ui-tabview ui-widget ui-widget-content ui-corner-all ui-tabview-' + orientation" [ngStyle]="style" [class]="styleClass">
            <ul p-tabViewNav role="tablist" *ngIf="orientation!='bottom'" [tabs]="tabs" [orientation]="orientation"
                (onTabClick)="open($event.originalEvent, $event.tab)" (onTabCloseClick)="close($event.originalEvent, $event.tab)"></ul>
            <div class="ui-tabview-panels">
                <ng-content></ng-content>
            </div>
            <ul p-tabViewNav role="tablist" *ngIf="orientation=='bottom'" [tabs]="tabs" [orientation]="orientation"
                (onTabClick)="open($event.originalEvent, $event.tab)" (onTabCloseClick)="close($event.originalEvent, $event.tab)"></ul>
        </div>
    `
    })
], TabView);
export { TabView };
let TabViewModule = class TabViewModule {
};
TabViewModule = __decorate([
    NgModule({
        imports: [CommonModule, SharedModule, TooltipModule],
        exports: [TabView, TabPanel, TabViewNav, SharedModule],
        declarations: [TabView, TabPanel, TabViewNav]
    })
], TabViewModule);
export { TabViewModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFidmlldy5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvdGFidmlldy8iLCJzb3VyY2VzIjpbInRhYnZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsVUFBVSxFQUFDLFNBQVMsRUFBQyxLQUFLLEVBQUMsTUFBTSxFQUFDLFlBQVksRUFBQyxnQkFBZ0IsRUFDbEYsZUFBZSxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUMsZUFBZSxFQUFDLGdCQUFnQixFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JHLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDOUMsT0FBTyxFQUFDLFlBQVksRUFBQyxhQUFhLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFHdkQsSUFBSSxHQUFHLEdBQVcsQ0FBQyxDQUFDO0FBK0JwQixJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFVO0lBQXZCO1FBSWEsZ0JBQVcsR0FBVyxLQUFLLENBQUM7UUFFM0IsZUFBVSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRW5ELG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7SUF1QnRFLENBQUM7SUFyQkcscUJBQXFCLENBQUMsR0FBWTtRQUM5QixJQUFJLFVBQVUsR0FBRyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQ2xFLElBQUcsR0FBRyxDQUFDLGdCQUFnQixFQUFFO1lBQ3JCLFVBQVUsR0FBRyxVQUFVLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztTQUN4RDtRQUNELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxRQUFRLENBQUMsS0FBSyxFQUFFLEdBQWE7UUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDakIsYUFBYSxFQUFFLEtBQUs7WUFDcEIsR0FBRyxFQUFFLEdBQUc7U0FDWCxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsVUFBVSxDQUFDLEtBQUssRUFBRSxHQUFhO1FBQzNCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDO1lBQ3RCLGFBQWEsRUFBRSxLQUFLO1lBQ3BCLEdBQUcsRUFBRSxHQUFHO1NBQ1gsQ0FBQyxDQUFBO0lBQ04sQ0FBQztDQUNKLENBQUE7QUE3Qlk7SUFBUixLQUFLLEVBQUU7d0NBQWtCO0FBRWpCO0lBQVIsS0FBSyxFQUFFOytDQUE2QjtBQUUzQjtJQUFULE1BQU0sRUFBRTs4Q0FBb0Q7QUFFbkQ7SUFBVCxNQUFNLEVBQUU7bURBQXlEO0FBUnpELFVBQVU7SUE3QnRCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxnQkFBZ0I7UUFDMUIsSUFBSSxFQUFDO1lBQ0Qsd0JBQXdCLEVBQUUsTUFBTTtZQUNoQyx5QkFBeUIsRUFBRSxNQUFNO1lBQ2pDLDRCQUE0QixFQUFFLE1BQU07WUFDcEMsMEJBQTBCLEVBQUUsTUFBTTtZQUNsQyx1QkFBdUIsRUFBRSxNQUFNO1NBQ2xDO1FBQ0QsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7S0FrQlQ7S0FDSixDQUFDO0dBQ1csVUFBVSxDQStCdEI7U0EvQlksVUFBVTtBQTZDdkIsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUTtJQTRCakIsWUFBbUIsYUFBK0I7UUFBL0Isa0JBQWEsR0FBYixhQUFhLENBQWtCO1FBWnpDLFVBQUssR0FBWSxJQUFJLENBQUM7UUFJdEIsb0JBQWUsR0FBVyxLQUFLLENBQUM7UUFFaEMseUJBQW9CLEdBQVcsVUFBVSxDQUFDO1FBZ0JuRCxPQUFFLEdBQVcsZUFBZSxHQUFHLEVBQUUsRUFBRSxDQUFDO0lBVmlCLENBQUM7SUFnQnRELGtCQUFrQjtRQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDNUIsUUFBTyxJQUFJLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ25CLEtBQUssUUFBUTtvQkFDVCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ3hDLE1BQU07Z0JBRU4sS0FBSyxTQUFTO29CQUNWLElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDekMsTUFBTTtnQkFFTjtvQkFDSSxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ3pDLE1BQU07YUFDVDtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVRLElBQUksUUFBUTtRQUNqQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDMUIsQ0FBQztJQUVELElBQUksUUFBUSxDQUFDLEdBQVk7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxHQUFHLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7SUFDdkIsQ0FBQztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztJQUNyQixDQUFDO0NBQ0osQ0FBQTs7WUE5Q3FDLGdCQUFnQjs7QUExQnpDO0lBQVIsS0FBSyxFQUFFO3dDQUFnQjtBQUVmO0lBQVIsS0FBSyxFQUFFOzBDQUFtQjtBQUVsQjtJQUFSLEtBQUssRUFBRTswQ0FBbUI7QUFFbEI7SUFBUixLQUFLLEVBQUU7NkNBQWtCO0FBRWpCO0lBQVIsS0FBSyxFQUFFO2tEQUEwQjtBQUV6QjtJQUFSLEtBQUssRUFBRTswQ0FBa0I7QUFFakI7SUFBUixLQUFLLEVBQUU7MkNBQW1CO0FBRWxCO0lBQVIsS0FBSyxFQUFFO3VDQUF1QjtBQUV0QjtJQUFSLEtBQUssRUFBRTt5Q0FBYztBQUViO0lBQVIsS0FBSyxFQUFFO2lEQUFpQztBQUVoQztJQUFSLEtBQUssRUFBRTtzREFBMkM7QUFFMUM7SUFBUixLQUFLLEVBQUU7bURBQTJCO0FBRUg7SUFBL0IsZUFBZSxDQUFDLGFBQWEsQ0FBQzsyQ0FBMkI7QUFvQ2pEO0lBQVIsS0FBSyxFQUFFO3dDQUVQO0FBaEVRLFFBQVE7SUFacEIsU0FBUyxDQUFDO1FBQ1AsUUFBUSxFQUFFLFlBQVk7UUFDdEIsUUFBUSxFQUFFOzs7Ozs7OztLQVFUO0tBQ0osQ0FBQztHQUNXLFFBQVEsQ0EwRXBCO1NBMUVZLFFBQVE7QUEwRnJCLElBQWEsT0FBTyxHQUFwQixNQUFhLE9BQU87SUEwQmhCLFlBQW1CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBeEJ4QixnQkFBVyxHQUFXLEtBQUssQ0FBQztRQVUzQixhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFakQsWUFBTyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRWhELHNCQUFpQixHQUF5QixJQUFJLFlBQVksRUFBRSxDQUFDO0lBVW5DLENBQUM7SUFFckMsa0JBQWtCO1FBQ2QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRWhCLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNqQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsUUFBUTtRQUNKLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNyQyxJQUFJLFdBQVcsR0FBYSxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDbkQsSUFBRyxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNqQyxJQUFHLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxXQUFXO2dCQUM5RCxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDOztnQkFFNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ3BDO0lBQ0wsQ0FBQztJQUVELElBQUksQ0FBQyxLQUFZLEVBQUUsR0FBYTtRQUM1QixJQUFHLEdBQUcsQ0FBQyxRQUFRLEVBQUU7WUFDYixJQUFHLEtBQUssRUFBRTtnQkFDTixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDMUI7WUFDRCxPQUFPO1NBQ1Y7UUFFRCxJQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRTtZQUNkLElBQUksV0FBVyxHQUFhLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztZQUNuRCxJQUFHLFdBQVcsRUFBRTtnQkFDWixXQUFXLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQTthQUMvQjtZQUVELEdBQUcsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsNkJBQTZCLEdBQUcsSUFBSSxDQUFDO1lBQzFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLGdCQUFnQixFQUFDLENBQUMsQ0FBQztTQUN2RTtRQUVELElBQUcsS0FBSyxFQUFFO1lBQ04sS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQzFCO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxLQUFZLEVBQUUsR0FBYTtRQUM3QixJQUFHLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQztnQkFDN0IsS0FBSyxFQUFFLEdBQUcsRUFBRTtvQkFDUixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QixDQUFDO2FBQUMsQ0FDTCxDQUFDO1NBQ0w7YUFDSTtZQUNELElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDbkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0JBQ2QsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQzthQUNoQyxDQUFDLENBQUM7U0FDTjtRQUVELEtBQUssQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUM1QixDQUFDO0lBRUQsUUFBUSxDQUFDLEdBQWE7UUFDbEIsSUFBRyxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQ2IsT0FBTztTQUNWO1FBQ0QsSUFBRyxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQ2IsR0FBRyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDckIsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN0QyxJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixJQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBRSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUU7b0JBQ2hDLFFBQVEsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO29CQUN6QixNQUFNO2lCQUNUO2FBQ0o7U0FDSjtRQUVELEdBQUcsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxlQUFlO1FBQ1gsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RDLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3RCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN2QjtTQUNKO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFlBQVksQ0FBQyxHQUFhO1FBQ3RCLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2YsS0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RDLElBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUU7Z0JBQ3BCLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ1YsTUFBTTthQUNUO1NBQ0o7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQsbUJBQW1CO1FBQ2YsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVRLElBQUksV0FBVztRQUNwQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUVELElBQUksV0FBVyxDQUFDLEdBQVU7UUFDdEIsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLENBQUM7UUFDeEIsSUFBRyxJQUFJLENBQUMsNkJBQTZCLEVBQUU7WUFDbkMsSUFBSSxDQUFDLDZCQUE2QixHQUFHLEtBQUssQ0FBQztZQUMzQyxPQUFPO1NBQ1Y7UUFFRCxJQUFHLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUNuRyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1NBQ2hEO0lBQ0wsQ0FBQztDQUNKLENBQUE7O1lBOUgwQixVQUFVOztBQXhCeEI7SUFBUixLQUFLLEVBQUU7NENBQTZCO0FBRTVCO0lBQVIsS0FBSyxFQUFFO3NDQUFZO0FBRVg7SUFBUixLQUFLLEVBQUU7MkNBQW9CO0FBRW5CO0lBQVIsS0FBSyxFQUFFOzZDQUF1QjtBQUVKO0lBQTFCLGVBQWUsQ0FBQyxRQUFRLENBQUM7MENBQWdDO0FBRWhEO0lBQVQsTUFBTSxFQUFFO3lDQUFrRDtBQUVqRDtJQUFULE1BQU0sRUFBRTt3Q0FBaUQ7QUFFaEQ7SUFBVCxNQUFNLEVBQUU7a0RBQThEO0FBd0g5RDtJQUFSLEtBQUssRUFBRTswQ0FFUDtBQTFJUSxPQUFPO0lBZG5CLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFFBQVEsRUFBRTs7Ozs7Ozs7OztLQVVUO0tBQ0osQ0FBQztHQUNXLE9BQU8sQ0F3Sm5CO1NBeEpZLE9BQU87QUFnS3BCLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7Q0FBSSxDQUFBO0FBQWpCLGFBQWE7SUFMekIsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFDLFlBQVksRUFBQyxhQUFhLENBQUM7UUFDbEQsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxVQUFVLEVBQUMsWUFBWSxDQUFDO1FBQ25ELFlBQVksRUFBRSxDQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsVUFBVSxDQUFDO0tBQzlDLENBQUM7R0FDVyxhQUFhLENBQUk7U0FBakIsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LEVsZW1lbnRSZWYsT25EZXN0cm95LElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsQWZ0ZXJDb250ZW50SW5pdCxcbiAgICAgICAgQ29udGVudENoaWxkcmVuLFF1ZXJ5TGlzdCxUZW1wbGF0ZVJlZixFbWJlZGRlZFZpZXdSZWYsVmlld0NvbnRhaW5lclJlZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7VG9vbHRpcE1vZHVsZX0gZnJvbSAncHJpbWVuZy90b29sdGlwJztcbmltcG9ydCB7U2hhcmVkTW9kdWxlLFByaW1lVGVtcGxhdGV9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7QmxvY2thYmxlVUl9IGZyb20gJ3ByaW1lbmcvYXBpJztcblxubGV0IGlkeDogbnVtYmVyID0gMDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdbcC10YWJWaWV3TmF2XScsXG4gICAgaG9zdDp7XG4gICAgICAgICdbY2xhc3MudWktdGFidmlldy1uYXZdJzogJ3RydWUnLFxuICAgICAgICAnW2NsYXNzLnVpLWhlbHBlci1yZXNldF0nOiAndHJ1ZScsXG4gICAgICAgICdbY2xhc3MudWktaGVscGVyLWNsZWFyZml4XSc6ICd0cnVlJyxcbiAgICAgICAgJ1tjbGFzcy51aS13aWRnZXQtaGVhZGVyXSc6ICd0cnVlJyxcbiAgICAgICAgJ1tjbGFzcy51aS1jb3JuZXItYWxsXSc6ICd0cnVlJ1xuICAgIH0sXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC10YWIgW25nRm9yT2ZdPVwidGFic1wiPlxuICAgICAgICAgICAgPGxpIFtjbGFzc109XCJnZXREZWZhdWx0SGVhZGVyQ2xhc3ModGFiKVwiIFtuZ1N0eWxlXT1cInRhYi5oZWFkZXJTdHlsZVwiIHJvbGU9XCJwcmVzZW50YXRpb25cIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktdGFidmlldy1zZWxlY3RlZCB1aS1zdGF0ZS1hY3RpdmUnOiB0YWIuc2VsZWN0ZWQsICd1aS1zdGF0ZS1kaXNhYmxlZCc6IHRhYi5kaXNhYmxlZH1cIlxuICAgICAgICAgICAgICAgIChjbGljayk9XCJjbGlja1RhYigkZXZlbnQsdGFiKVwiICpuZ0lmPVwiIXRhYi5jbG9zZWRcIiB0YWJpbmRleD1cIjBcIiAoa2V5ZG93bi5lbnRlcik9XCJjbGlja1RhYigkZXZlbnQsdGFiKVwiPlxuICAgICAgICAgICAgICAgIDxhIFthdHRyLmlkXT1cInRhYi5pZCArICctbGFiZWwnXCIgcm9sZT1cInRhYlwiIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwidGFiLnNlbGVjdGVkXCIgW2F0dHIuYXJpYS1jb250cm9sc109XCJ0YWIuaWRcIiBbcFRvb2x0aXBdPVwidGFiLnRvb2x0aXBcIiBbdG9vbHRpcFBvc2l0aW9uXT1cInRhYi50b29sdGlwUG9zaXRpb25cIiBbcG9zaXRpb25TdHlsZV09XCJ0YWIudG9vbHRpcFBvc2l0aW9uU3R5bGVcIiBbdG9vbHRpcFN0eWxlQ2xhc3NdPVwidGFiLnRvb2x0aXBTdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdGFiLmhlYWRlclRlbXBsYXRlXCIgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS10YWJ2aWV3LWxlZnQtaWNvblwiIFtuZ0NsYXNzXT1cInRhYi5sZWZ0SWNvblwiICpuZ0lmPVwidGFiLmxlZnRJY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS10YWJ2aWV3LXRpdGxlXCI+e3t0YWIuaGVhZGVyfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXRhYnZpZXctcmlnaHQtaWNvblwiIFtuZ0NsYXNzXT1cInRhYi5yaWdodEljb25cIiAqbmdJZj1cInRhYi5yaWdodEljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwidGFiLmhlYWRlclRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwidGFiLmhlYWRlclRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cInRhYi5jbG9zYWJsZVwiIGNsYXNzPVwidWktdGFidmlldy1jbG9zZSBwaSBwaS10aW1lc1wiIChjbGljayk9XCJjbGlja0Nsb3NlKCRldmVudCx0YWIpXCI+PC9zcGFuPlxuICAgICAgICAgICAgPC9saT5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICBgLFxufSlcbmV4cG9ydCBjbGFzcyBUYWJWaWV3TmF2IHtcbiAgICBcbiAgICBASW5wdXQoKSB0YWJzOiBUYWJQYW5lbFtdO1xuXG4gICAgQElucHV0KCkgb3JpZW50YXRpb246IHN0cmluZyA9ICd0b3AnO1xuXG4gICAgQE91dHB1dCgpIG9uVGFiQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIEBPdXRwdXQoKSBvblRhYkNsb3NlQ2xpY2s6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIFxuICAgIGdldERlZmF1bHRIZWFkZXJDbGFzcyh0YWI6VGFiUGFuZWwpIHtcbiAgICAgICAgbGV0IHN0eWxlQ2xhc3MgPSAndWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItJyArIHRoaXMub3JpZW50YXRpb247XG4gICAgICAgIGlmKHRhYi5oZWFkZXJTdHlsZUNsYXNzKSB7XG4gICAgICAgICAgICBzdHlsZUNsYXNzID0gc3R5bGVDbGFzcyArIFwiIFwiICsgdGFiLmhlYWRlclN0eWxlQ2xhc3M7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN0eWxlQ2xhc3M7XG4gICAgfVxuICAgIFxuICAgIGNsaWNrVGFiKGV2ZW50LCB0YWI6IFRhYlBhbmVsKSB7XG4gICAgICAgIHRoaXMub25UYWJDbGljay5lbWl0KHtcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgdGFiOiB0YWJcbiAgICAgICAgfSlcbiAgICB9XG4gICAgXG4gICAgY2xpY2tDbG9zZShldmVudCwgdGFiOiBUYWJQYW5lbCkge1xuICAgICAgICB0aGlzLm9uVGFiQ2xvc2VDbGljay5lbWl0KHtcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgdGFiOiB0YWJcbiAgICAgICAgfSlcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC10YWJQYW5lbCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbYXR0ci5pZF09XCJpZFwiIGNsYXNzPVwidWktdGFidmlldy1wYW5lbCB1aS13aWRnZXQtY29udGVudFwiIFtuZ0NsYXNzXT1cInsndWktaGVscGVyLWhpZGRlbic6ICFzZWxlY3RlZH1cIlxuICAgICAgICAgICAgcm9sZT1cInRhYnBhbmVsXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwiIXNlbGVjdGVkXCIgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImlkICsgJy1sYWJlbCdcIiAqbmdJZj1cIiFjbG9zZWRcIj5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb250ZW50VGVtcGxhdGUgJiYgKGNhY2hlID8gbG9hZGVkIDogc2VsZWN0ZWQpXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgVGFiUGFuZWwgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSBjbG9zYWJsZTogYm9vbGVhbjtcbiAgICBcbiAgICBASW5wdXQoKSBoZWFkZXJTdHlsZTogYW55O1xuICAgIFxuICAgIEBJbnB1dCgpIGhlYWRlclN0eWxlQ2xhc3M6IHN0cmluZztcbiAgICBcbiAgICBASW5wdXQoKSBsZWZ0SWNvbjogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIHJpZ2h0SWNvbjogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIGNhY2hlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHRvb2x0aXA6IGFueTtcbiAgICBcbiAgICBASW5wdXQoKSB0b29sdGlwUG9zaXRpb246IHN0cmluZyA9ICd0b3AnO1xuXG4gICAgQElucHV0KCkgdG9vbHRpcFBvc2l0aW9uU3R5bGU6IHN0cmluZyA9ICdhYnNvbHV0ZSc7XG5cbiAgICBASW5wdXQoKSB0b29sdGlwU3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xuICAgIFxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2aWV3Q29udGFpbmVyOiBWaWV3Q29udGFpbmVyUmVmKSB7fVxuICAgIFxuICAgIGNsb3NlZDogYm9vbGVhbjtcbiAgICBcbiAgICB2aWV3OiBFbWJlZGRlZFZpZXdSZWY8YW55PjtcbiAgICBcbiAgICBfc2VsZWN0ZWQ6IGJvb2xlYW47XG4gICAgXG4gICAgbG9hZGVkOiBib29sZWFuO1xuICAgIFxuICAgIGlkOiBzdHJpbmcgPSBgdWktdGFicGFuZWwtJHtpZHgrK31gO1xuICAgIFxuICAgIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcblxuICAgIGhlYWRlclRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIFxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgdGhpcy50ZW1wbGF0ZXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgc3dpdGNoKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaGVhZGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjb250ZW50JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIEBJbnB1dCgpIGdldCBzZWxlY3RlZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkO1xuICAgIH1cblxuICAgIHNldCBzZWxlY3RlZCh2YWw6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0ZWQgPSB2YWw7XG4gICAgICAgIHRoaXMubG9hZGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudmlldyA9IG51bGw7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdGFiVmlldycsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCIndWktdGFidmlldyB1aS13aWRnZXQgdWktd2lkZ2V0LWNvbnRlbnQgdWktY29ybmVyLWFsbCB1aS10YWJ2aWV3LScgKyBvcmllbnRhdGlvblwiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgIDx1bCBwLXRhYlZpZXdOYXYgcm9sZT1cInRhYmxpc3RcIiAqbmdJZj1cIm9yaWVudGF0aW9uIT0nYm90dG9tJ1wiIFt0YWJzXT1cInRhYnNcIiBbb3JpZW50YXRpb25dPVwib3JpZW50YXRpb25cIlxuICAgICAgICAgICAgICAgIChvblRhYkNsaWNrKT1cIm9wZW4oJGV2ZW50Lm9yaWdpbmFsRXZlbnQsICRldmVudC50YWIpXCIgKG9uVGFiQ2xvc2VDbGljayk9XCJjbG9zZSgkZXZlbnQub3JpZ2luYWxFdmVudCwgJGV2ZW50LnRhYilcIj48L3VsPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXRhYnZpZXctcGFuZWxzXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8dWwgcC10YWJWaWV3TmF2IHJvbGU9XCJ0YWJsaXN0XCIgKm5nSWY9XCJvcmllbnRhdGlvbj09J2JvdHRvbSdcIiBbdGFic109XCJ0YWJzXCIgW29yaWVudGF0aW9uXT1cIm9yaWVudGF0aW9uXCJcbiAgICAgICAgICAgICAgICAob25UYWJDbGljayk9XCJvcGVuKCRldmVudC5vcmlnaW5hbEV2ZW50LCAkZXZlbnQudGFiKVwiIChvblRhYkNsb3NlQ2xpY2spPVwiY2xvc2UoJGV2ZW50Lm9yaWdpbmFsRXZlbnQsICRldmVudC50YWIpXCI+PC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbn0pXG5leHBvcnQgY2xhc3MgVGFiVmlldyBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsQmxvY2thYmxlVUkge1xuXG4gICAgQElucHV0KCkgb3JpZW50YXRpb246IHN0cmluZyA9ICd0b3AnO1xuICAgIFxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG4gICAgXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIGNvbnRyb2xDbG9zZTogYm9vbGVhbjtcbiAgICBcbiAgICBAQ29udGVudENoaWxkcmVuKFRhYlBhbmVsKSB0YWJQYW5lbHM6IFF1ZXJ5TGlzdDxUYWJQYW5lbD47XG5cbiAgICBAT3V0cHV0KCkgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIGFjdGl2ZUluZGV4Q2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBpbml0aWFsaXplZDogYm9vbGVhbjtcbiAgICBcbiAgICB0YWJzOiBUYWJQYW5lbFtdO1xuICAgIFxuICAgIF9hY3RpdmVJbmRleDogbnVtYmVyO1xuICAgIFxuICAgIHByZXZlbnRBY3RpdmVJbmRleFByb3BhZ2F0aW9uOiBib29sZWFuO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGVsOiBFbGVtZW50UmVmKSB7fVxuICAgICAgXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICB0aGlzLmluaXRUYWJzKCk7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnRhYlBhbmVscy5jaGFuZ2VzLnN1YnNjcmliZShfID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFRhYnMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIGluaXRUYWJzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnRhYnMgPSB0aGlzLnRhYlBhbmVscy50b0FycmF5KCk7XG4gICAgICAgIGxldCBzZWxlY3RlZFRhYjogVGFiUGFuZWwgPSB0aGlzLmZpbmRTZWxlY3RlZFRhYigpO1xuICAgICAgICBpZighc2VsZWN0ZWRUYWIgJiYgdGhpcy50YWJzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYodGhpcy5hY3RpdmVJbmRleCAhPSBudWxsICYmIHRoaXMudGFicy5sZW5ndGggPiB0aGlzLmFjdGl2ZUluZGV4KVxuICAgICAgICAgICAgICAgIHRoaXMudGFic1t0aGlzLmFjdGl2ZUluZGV4XS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy50YWJzWzBdLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBvcGVuKGV2ZW50OiBFdmVudCwgdGFiOiBUYWJQYW5lbCkge1xuICAgICAgICBpZih0YWIuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGlmKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYoIXRhYi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkVGFiOiBUYWJQYW5lbCA9IHRoaXMuZmluZFNlbGVjdGVkVGFiKCk7XG4gICAgICAgICAgICBpZihzZWxlY3RlZFRhYikge1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkVGFiLnNlbGVjdGVkID0gZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGFiLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFRhYkluZGV4ID0gdGhpcy5maW5kVGFiSW5kZXgodGFiKTtcbiAgICAgICAgICAgIHRoaXMucHJldmVudEFjdGl2ZUluZGV4UHJvcGFnYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVJbmRleENoYW5nZS5lbWl0KHNlbGVjdGVkVGFiSW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgaW5kZXg6IHNlbGVjdGVkVGFiSW5kZXh9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgY2xvc2UoZXZlbnQ6IEV2ZW50LCB0YWI6IFRhYlBhbmVsKSB7XG4gICAgICAgIGlmKHRoaXMuY29udHJvbENsb3NlKSB7XG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuZmluZFRhYkluZGV4KHRhYiksXG4gICAgICAgICAgICAgICAgY2xvc2U6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZVRhYih0YWIpO1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jbG9zZVRhYih0YWIpO1xuICAgICAgICAgICAgdGhpcy5vbkNsb3NlLmVtaXQoe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLmZpbmRUYWJJbmRleCh0YWIpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICAgIFxuICAgIGNsb3NlVGFiKHRhYjogVGFiUGFuZWwpIHtcbiAgICAgICAgaWYodGFiLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYodGFiLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICB0YWIuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnRhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgdGFiUGFuZWwgPSB0aGlzLnRhYnNbaV07XG4gICAgICAgICAgICAgICAgaWYoIXRhYlBhbmVsLmNsb3NlZCYmIXRhYi5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICB0YWJQYW5lbC5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGFiLmNsb3NlZCA9IHRydWU7XG4gICAgfVxuICAgIFxuICAgIGZpbmRTZWxlY3RlZFRhYigpIHtcbiAgICAgICAgZm9yKGxldCBpID0gMDsgaSA8IHRoaXMudGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYodGhpcy50YWJzW2ldLnNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudGFic1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgXG4gICAgZmluZFRhYkluZGV4KHRhYjogVGFiUGFuZWwpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gLTE7XG4gICAgICAgIGZvcihsZXQgaSA9IDA7IGkgPCB0aGlzLnRhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKHRoaXMudGFic1tpXSA9PSB0YWIpIHtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGluZGV4O1xuICAgIH1cbiAgICBcbiAgICBnZXRCbG9ja2FibGVFbGVtZW50KCk6IEhUTUxFbGVtZW50wqB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgfVxuICAgIFxuICAgIEBJbnB1dCgpIGdldCBhY3RpdmVJbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlSW5kZXg7XG4gICAgfVxuXG4gICAgc2V0IGFjdGl2ZUluZGV4KHZhbDpudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fYWN0aXZlSW5kZXggPSB2YWw7XG4gICAgICAgIGlmKHRoaXMucHJldmVudEFjdGl2ZUluZGV4UHJvcGFnYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMucHJldmVudEFjdGl2ZUluZGV4UHJvcGFnYXRpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMudGFicyAmJiB0aGlzLnRhYnMubGVuZ3RoICYmIHRoaXMuX2FjdGl2ZUluZGV4ICE9IG51bGwgJiYgdGhpcy50YWJzLmxlbmd0aCA+IHRoaXMuX2FjdGl2ZUluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLmZpbmRTZWxlY3RlZFRhYigpLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnRhYnNbdGhpcy5fYWN0aXZlSW5kZXhdLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsU2hhcmVkTW9kdWxlLFRvb2x0aXBNb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtUYWJWaWV3LFRhYlBhbmVsLFRhYlZpZXdOYXYsU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtUYWJWaWV3LFRhYlBhbmVsLFRhYlZpZXdOYXZdXG59KVxuZXhwb3J0IGNsYXNzIFRhYlZpZXdNb2R1bGUgeyB9XG4iXX0=