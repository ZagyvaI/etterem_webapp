var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, Output, EventEmitter, ElementRef, ContentChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule, Footer } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
var idx = 0;
var Panel = /** @class */ (function () {
    function Panel(el) {
        this.el = el;
        this.collapsed = false;
        this.expandIcon = 'pi pi-plus';
        this.collapseIcon = 'pi pi-minus';
        this.showHeader = true;
        this.toggler = "icon";
        this.collapsedChange = new EventEmitter();
        this.onBeforeToggle = new EventEmitter();
        this.onAfterToggle = new EventEmitter();
        this.transitionOptions = '400ms cubic-bezier(0.86, 0, 0.07, 1)';
        this.id = "ui-panel-" + idx++;
    }
    Panel.prototype.onHeaderClick = function (event) {
        if (this.toggler === 'header') {
            this.toggle(event);
        }
    };
    Panel.prototype.onIconClick = function (event) {
        if (this.toggler === 'icon') {
            this.toggle(event);
        }
    };
    Panel.prototype.toggle = function (event) {
        if (this.animating) {
            return false;
        }
        this.animating = true;
        this.onBeforeToggle.emit({ originalEvent: event, collapsed: this.collapsed });
        if (this.toggleable) {
            if (this.collapsed)
                this.expand(event);
            else
                this.collapse(event);
        }
        event.preventDefault();
    };
    Panel.prototype.expand = function (event) {
        this.collapsed = false;
        this.collapsedChange.emit(this.collapsed);
    };
    Panel.prototype.collapse = function (event) {
        this.collapsed = true;
        this.collapsedChange.emit(this.collapsed);
    };
    Panel.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    Panel.prototype.onToggleDone = function (event) {
        this.animating = false;
        this.onAfterToggle.emit({ originalEvent: event, collapsed: this.collapsed });
    };
    Panel.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    __decorate([
        Input()
    ], Panel.prototype, "toggleable", void 0);
    __decorate([
        Input()
    ], Panel.prototype, "header", void 0);
    __decorate([
        Input()
    ], Panel.prototype, "collapsed", void 0);
    __decorate([
        Input()
    ], Panel.prototype, "style", void 0);
    __decorate([
        Input()
    ], Panel.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Panel.prototype, "expandIcon", void 0);
    __decorate([
        Input()
    ], Panel.prototype, "collapseIcon", void 0);
    __decorate([
        Input()
    ], Panel.prototype, "showHeader", void 0);
    __decorate([
        Input()
    ], Panel.prototype, "toggler", void 0);
    __decorate([
        Output()
    ], Panel.prototype, "collapsedChange", void 0);
    __decorate([
        Output()
    ], Panel.prototype, "onBeforeToggle", void 0);
    __decorate([
        Output()
    ], Panel.prototype, "onAfterToggle", void 0);
    __decorate([
        Input()
    ], Panel.prototype, "transitionOptions", void 0);
    __decorate([
        ContentChild(Footer, { static: true })
    ], Panel.prototype, "footerFacet", void 0);
    Panel = __decorate([
        Component({
            selector: 'p-panel',
            template: "\n        <div [attr.id]=\"id\" [ngClass]=\"'ui-panel ui-widget ui-widget-content ui-corner-all'\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div [ngClass]=\"{'ui-panel-titlebar ui-widget-header ui-helper-clearfix ui-corner-all': true, 'ui-panel-titlebar-clickable': (toggleable && toggler === 'header')}\" \n                *ngIf=\"showHeader\" (click)=\"onHeaderClick($event)\">\n                <span class=\"ui-panel-title\" *ngIf=\"header\">{{header}}</span>\n                <ng-content select=\"p-header\"></ng-content>\n                <a *ngIf=\"toggleable\" [attr.id]=\"id + '-label'\" class=\"ui-panel-titlebar-icon ui-panel-titlebar-toggler ui-corner-all ui-state-default\" tabindex=\"0\"\n                    (click)=\"onIconClick($event)\" (keydown.enter)=\"onIconClick($event)\" [attr.aria-controls]=\"id + '-content'\" role=\"tab\" [attr.aria-expanded]=\"!collapsed\">\n                    <span [class]=\"collapsed ? expandIcon : collapseIcon\"></span>\n                </a>\n            </div>\n            <div [attr.id]=\"id + '-content'\" class=\"ui-panel-content-wrapper\" [@panelContent]=\"collapsed ? {value: 'hidden', params: {transitionParams: animating ? transitionOptions : '0ms', height: '0', opacity:'0'}} : {value: 'visible', params: {transitionParams: animating ? transitionOptions : '0ms', height: '*', opacity: '1'}}\" (@panelContent.done)=\"onToggleDone($event)\"\n                [ngClass]=\"{'ui-panel-content-wrapper-overflown': collapsed||animating}\"\n                role=\"region\" [attr.aria-hidden]=\"collapsed\" [attr.aria-labelledby]=\"id + '-label'\">\n                <div class=\"ui-panel-content ui-widget-content\">\n                    <ng-content></ng-content>\n                </div>\n                \n                <div class=\"ui-panel-footer ui-widget-content\" *ngIf=\"footerFacet\">\n                    <ng-content select=\"p-footer\"></ng-content>\n                </div>\n            </div>\n        </div>\n    ",
            animations: [
                trigger('panelContent', [
                    state('hidden', style({
                        height: '0',
                        opacity: 0
                    })),
                    state('void', style({
                        height: '{{height}}',
                        opacity: '{{opacity}}'
                    }), { params: { height: '0', opacity: '0' } }),
                    state('visible', style({
                        height: '*',
                        opacity: 1
                    })),
                    transition('visible <=> hidden', animate('{{transitionParams}}')),
                    transition('void => hidden', animate('{{transitionParams}}')),
                    transition('void => visible', animate('{{transitionParams}}'))
                ])
            ]
        })
    ], Panel);
    return Panel;
}());
export { Panel };
var PanelModule = /** @class */ (function () {
    function PanelModule() {
    }
    PanelModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Panel, SharedModule],
            declarations: [Panel]
        })
    ], PanelModule);
    return PanelModule;
}());
export { PanelModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFuZWwuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL3BhbmVsLyIsInNvdXJjZXMiOlsicGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFDLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLEVBQUMsTUFBTSxhQUFhLENBQUM7QUFFaEQsT0FBTyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUUzRSxJQUFJLEdBQUcsR0FBVyxDQUFDLENBQUM7QUFnRHBCO0lBa0NJLGVBQW9CLEVBQWM7UUFBZCxPQUFFLEdBQUYsRUFBRSxDQUFZO1FBNUJ6QixjQUFTLEdBQVksS0FBSyxDQUFDO1FBTTNCLGVBQVUsR0FBVyxZQUFZLENBQUM7UUFFbEMsaUJBQVksR0FBVyxhQUFhLENBQUM7UUFFckMsZUFBVSxHQUFZLElBQUksQ0FBQztRQUUzQixZQUFPLEdBQVcsTUFBTSxDQUFDO1FBRXhCLG9CQUFlLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFFeEQsbUJBQWMsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUV2RCxrQkFBYSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO1FBRXZELHNCQUFpQixHQUFXLHNDQUFzQyxDQUFDO1FBTTVFLE9BQUUsR0FBVyxjQUFZLEdBQUcsRUFBSSxDQUFDO0lBRUksQ0FBQztJQUV0Qyw2QkFBYSxHQUFiLFVBQWMsS0FBWTtRQUN0QixJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQzNCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDdEI7SUFDTCxDQUFDO0lBRUQsMkJBQVcsR0FBWCxVQUFZLEtBQVk7UUFDcEIsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLE1BQU0sRUFBRTtZQUN6QixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQztJQUVELHNCQUFNLEdBQU4sVUFBTyxLQUFZO1FBQ2YsSUFBRyxJQUFJLENBQUMsU0FBUyxFQUFFO1lBQ2YsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDO1FBRTVFLElBQUcsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNoQixJQUFHLElBQUksQ0FBQyxTQUFTO2dCQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7O2dCQUVuQixJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzVCO1FBRUQsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxzQkFBTSxHQUFOLFVBQU8sS0FBSztRQUNSLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQsd0JBQVEsR0FBUixVQUFTLEtBQUs7UUFDVixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQztRQUN0QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVELG1DQUFtQixHQUFuQjtRQUNJLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFRCw0QkFBWSxHQUFaLFVBQWEsS0FBWTtRQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN2QixJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUMsQ0FBQyxDQUFDO0lBQy9FLENBQUM7O2dCQWpEdUIsVUFBVTs7SUFoQ3pCO1FBQVIsS0FBSyxFQUFFOzZDQUFxQjtJQUVwQjtRQUFSLEtBQUssRUFBRTt5Q0FBZ0I7SUFFZjtRQUFSLEtBQUssRUFBRTs0Q0FBNEI7SUFFM0I7UUFBUixLQUFLLEVBQUU7d0NBQVk7SUFFWDtRQUFSLEtBQUssRUFBRTs2Q0FBb0I7SUFFbkI7UUFBUixLQUFLLEVBQUU7NkNBQW1DO0lBRWxDO1FBQVIsS0FBSyxFQUFFOytDQUFzQztJQUVyQztRQUFSLEtBQUssRUFBRTs2Q0FBNEI7SUFFM0I7UUFBUixLQUFLLEVBQUU7MENBQTBCO0lBRXhCO1FBQVQsTUFBTSxFQUFFO2tEQUF5RDtJQUV4RDtRQUFULE1BQU0sRUFBRTtpREFBd0Q7SUFFdkQ7UUFBVCxNQUFNLEVBQUU7Z0RBQXVEO0lBRXZEO1FBQVIsS0FBSyxFQUFFO29EQUFvRTtJQUVwQztRQUF2QyxZQUFZLENBQUMsTUFBTSxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDOzhDQUFhO0lBNUIzQyxLQUFLO1FBOUNqQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsU0FBUztZQUNuQixRQUFRLEVBQUUsMDhEQXVCVDtZQUNELFVBQVUsRUFBRTtnQkFDUixPQUFPLENBQUMsY0FBYyxFQUFFO29CQUNwQixLQUFLLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQzt3QkFDbEIsTUFBTSxFQUFFLEdBQUc7d0JBQ1gsT0FBTyxFQUFFLENBQUM7cUJBQ2IsQ0FBQyxDQUFDO29CQUNILEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO3dCQUNoQixNQUFNLEVBQUUsWUFBWTt3QkFDcEIsT0FBTyxFQUFFLGFBQWE7cUJBQ3pCLENBQUMsRUFBRSxFQUFDLE1BQU0sRUFBRSxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBQyxFQUFDLENBQUM7b0JBQzFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDO3dCQUNuQixNQUFNLEVBQUUsR0FBRzt3QkFDWCxPQUFPLEVBQUUsQ0FBQztxQkFDYixDQUFDLENBQUM7b0JBQ0gsVUFBVSxDQUFDLG9CQUFvQixFQUFFLE9BQU8sQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO29CQUNqRSxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7b0JBQzdELFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztpQkFDakUsQ0FBQzthQUNMO1NBQ0osQ0FBQztPQUNXLEtBQUssQ0FxRmpCO0lBQUQsWUFBQztDQUFBLEFBckZELElBcUZDO1NBckZZLEtBQUs7QUE0RmxCO0lBQUE7SUFBMkIsQ0FBQztJQUFmLFdBQVc7UUFMdkIsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBQyxZQUFZLENBQUM7WUFDN0IsWUFBWSxFQUFFLENBQUMsS0FBSyxDQUFDO1NBQ3hCLENBQUM7T0FDVyxXQUFXLENBQUk7SUFBRCxrQkFBQztDQUFBLEFBQTVCLElBQTRCO1NBQWYsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsRWxlbWVudFJlZixDb250ZW50Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge1NoYXJlZE1vZHVsZSxGb290ZXJ9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7QmxvY2thYmxlVUl9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7dHJpZ2dlcixzdGF0ZSxzdHlsZSx0cmFuc2l0aW9uLGFuaW1hdGV9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuXG5sZXQgaWR4OiBudW1iZXIgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtcGFuZWwnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW2F0dHIuaWRdPVwiaWRcIiBbbmdDbGFzc109XCIndWktcGFuZWwgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwnXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3VpLXBhbmVsLXRpdGxlYmFyIHVpLXdpZGdldC1oZWFkZXIgdWktaGVscGVyLWNsZWFyZml4IHVpLWNvcm5lci1hbGwnOiB0cnVlLCAndWktcGFuZWwtdGl0bGViYXItY2xpY2thYmxlJzogKHRvZ2dsZWFibGUgJiYgdG9nZ2xlciA9PT0gJ2hlYWRlcicpfVwiIFxuICAgICAgICAgICAgICAgICpuZ0lmPVwic2hvd0hlYWRlclwiIChjbGljayk9XCJvbkhlYWRlckNsaWNrKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLXBhbmVsLXRpdGxlXCIgKm5nSWY9XCJoZWFkZXJcIj57e2hlYWRlcn19PC9zcGFuPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cInAtaGVhZGVyXCI+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgIDxhICpuZ0lmPVwidG9nZ2xlYWJsZVwiIFthdHRyLmlkXT1cImlkICsgJy1sYWJlbCdcIiBjbGFzcz1cInVpLXBhbmVsLXRpdGxlYmFyLWljb24gdWktcGFuZWwtdGl0bGViYXItdG9nZ2xlciB1aS1jb3JuZXItYWxsIHVpLXN0YXRlLWRlZmF1bHRcIiB0YWJpbmRleD1cIjBcIlxuICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib25JY29uQ2xpY2soJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cIm9uSWNvbkNsaWNrKCRldmVudClcIiBbYXR0ci5hcmlhLWNvbnRyb2xzXT1cImlkICsgJy1jb250ZW50J1wiIHJvbGU9XCJ0YWJcIiBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cIiFjb2xsYXBzZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gW2NsYXNzXT1cImNvbGxhcHNlZCA/IGV4cGFuZEljb24gOiBjb2xsYXBzZUljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IFthdHRyLmlkXT1cImlkICsgJy1jb250ZW50J1wiIGNsYXNzPVwidWktcGFuZWwtY29udGVudC13cmFwcGVyXCIgW0BwYW5lbENvbnRlbnRdPVwiY29sbGFwc2VkID8ge3ZhbHVlOiAnaGlkZGVuJywgcGFyYW1zOiB7dHJhbnNpdGlvblBhcmFtczogYW5pbWF0aW5nID8gdHJhbnNpdGlvbk9wdGlvbnMgOiAnMG1zJywgaGVpZ2h0OiAnMCcsIG9wYWNpdHk6JzAnfX0gOiB7dmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7dHJhbnNpdGlvblBhcmFtczogYW5pbWF0aW5nID8gdHJhbnNpdGlvbk9wdGlvbnMgOiAnMG1zJywgaGVpZ2h0OiAnKicsIG9wYWNpdHk6ICcxJ319XCIgKEBwYW5lbENvbnRlbnQuZG9uZSk9XCJvblRvZ2dsZURvbmUoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1wYW5lbC1jb250ZW50LXdyYXBwZXItb3ZlcmZsb3duJzogY29sbGFwc2VkfHxhbmltYXRpbmd9XCJcbiAgICAgICAgICAgICAgICByb2xlPVwicmVnaW9uXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwiY29sbGFwc2VkXCIgW2F0dHIuYXJpYS1sYWJlbGxlZGJ5XT1cImlkICsgJy1sYWJlbCdcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktcGFuZWwtY29udGVudCB1aS13aWRnZXQtY29udGVudFwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXBhbmVsLWZvb3RlciB1aS13aWRnZXQtY29udGVudFwiICpuZ0lmPVwiZm9vdGVyRmFjZXRcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwicC1mb290ZXJcIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ3BhbmVsQ29udGVudCcsIFtcbiAgICAgICAgICAgIHN0YXRlKCdoaWRkZW4nLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnMCcsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgc3RhdGUoJ3ZvaWQnLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAne3toZWlnaHR9fScsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogJ3t7b3BhY2l0eX19J1xuICAgICAgICAgICAgfSksIHtwYXJhbXM6IHtoZWlnaHQ6ICcwJywgb3BhY2l0eTogJzAnfX0pLFxuICAgICAgICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAnKicsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndmlzaWJsZSA8PT4gaGlkZGVuJywgYW5pbWF0ZSgne3t0cmFuc2l0aW9uUGFyYW1zfX0nKSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IGhpZGRlbicsIGFuaW1hdGUoJ3t7dHJhbnNpdGlvblBhcmFtc319JykpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiB2aXNpYmxlJywgYW5pbWF0ZSgne3t0cmFuc2l0aW9uUGFyYW1zfX0nKSlcbiAgICAgICAgXSlcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFBhbmVsIGltcGxlbWVudHMgQmxvY2thYmxlVUkge1xuXG4gICAgQElucHV0KCkgdG9nZ2xlYWJsZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgY29sbGFwc2VkOiBib29sZWFuID0gZmFsc2U7XG4gICAgXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcbiAgICBcbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG4gICAgXG4gICAgQElucHV0KCkgZXhwYW5kSWNvbjogc3RyaW5nID0gJ3BpIHBpLXBsdXMnO1xuICAgIFxuICAgIEBJbnB1dCgpIGNvbGxhcHNlSWNvbjogc3RyaW5nID0gJ3BpIHBpLW1pbnVzJztcbiAgXG4gICAgQElucHV0KCkgc2hvd0hlYWRlcjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSB0b2dnbGVyOiBzdHJpbmcgPSBcImljb25cIjtcbiAgICBcbiAgICBAT3V0cHV0KCkgY29sbGFwc2VkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkJlZm9yZVRvZ2dsZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25BZnRlclRvZ2dsZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgXG4gICAgQElucHV0KCkgdHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICc0MDBtcyBjdWJpYy1iZXppZXIoMC44NiwgMCwgMC4wNywgMSknO1xuXG4gICAgQENvbnRlbnRDaGlsZChGb290ZXIsIHsgc3RhdGljOiB0cnVlIH0pIGZvb3RlckZhY2V0O1xuICAgIFxuICAgIGFuaW1hdGluZzogYm9vbGVhbjtcbiAgICBcbiAgICBpZDogc3RyaW5nID0gYHVpLXBhbmVsLSR7aWR4Kyt9YDtcbiAgICBcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7fVxuXG4gICAgb25IZWFkZXJDbGljayhldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMudG9nZ2xlciA9PT0gJ2hlYWRlcicpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uSWNvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAodGhpcy50b2dnbGVyID09PSAnaWNvbicpIHtcbiAgICAgICAgICAgIHRoaXMudG9nZ2xlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICB0b2dnbGUoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmKHRoaXMuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vbkJlZm9yZVRvZ2dsZS5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgY29sbGFwc2VkOiB0aGlzLmNvbGxhcHNlZH0pO1xuICAgICAgICBcbiAgICAgICAgaWYodGhpcy50b2dnbGVhYmxlKSB7XG4gICAgICAgICAgICBpZih0aGlzLmNvbGxhcHNlZClcbiAgICAgICAgICAgICAgICB0aGlzLmV4cGFuZChldmVudCk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5jb2xsYXBzZShldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIFxuICAgIGV4cGFuZChldmVudCkge1xuICAgICAgICB0aGlzLmNvbGxhcHNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvbGxhcHNlZENoYW5nZS5lbWl0KHRoaXMuY29sbGFwc2VkKTtcbiAgICB9XG4gICAgXG4gICAgY29sbGFwc2UoZXZlbnQpIHtcbiAgICAgICAgdGhpcy5jb2xsYXBzZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmNvbGxhcHNlZENoYW5nZS5lbWl0KHRoaXMuY29sbGFwc2VkKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0QmxvY2thYmxlRWxlbWVudCgpOiBIVE1MRWxlbWVudMKge1xuICAgICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgIH1cbiAgICBcbiAgICBvblRvZ2dsZURvbmUoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMuYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25BZnRlclRvZ2dsZS5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgY29sbGFwc2VkOiB0aGlzLmNvbGxhcHNlZH0pO1xuICAgIH1cblxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtQYW5lbCxTaGFyZWRNb2R1bGVdLFxuICAgIGRlY2xhcmF0aW9uczogW1BhbmVsXVxufSlcbmV4cG9ydCBjbGFzcyBQYW5lbE1vZHVsZSB7IH1cbiJdfQ==