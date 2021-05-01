var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
var InplaceDisplay = /** @class */ (function () {
    function InplaceDisplay() {
    }
    InplaceDisplay = __decorate([
        Component({
            selector: 'p-inplaceDisplay',
            template: '<ng-content></ng-content>'
        })
    ], InplaceDisplay);
    return InplaceDisplay;
}());
export { InplaceDisplay };
var InplaceContent = /** @class */ (function () {
    function InplaceContent() {
    }
    InplaceContent = __decorate([
        Component({
            selector: 'p-inplaceContent',
            template: '<ng-content></ng-content>'
        })
    ], InplaceContent);
    return InplaceContent;
}());
export { InplaceContent };
var Inplace = /** @class */ (function () {
    function Inplace() {
        this.onActivate = new EventEmitter();
        this.onDeactivate = new EventEmitter();
    }
    Inplace.prototype.activate = function (event) {
        if (!this.disabled) {
            this.active = true;
            this.onActivate.emit(event);
        }
    };
    Inplace.prototype.deactivate = function (event) {
        if (!this.disabled) {
            this.active = false;
            this.hover = false;
            this.onDeactivate.emit(event);
        }
    };
    __decorate([
        Input()
    ], Inplace.prototype, "active", void 0);
    __decorate([
        Input()
    ], Inplace.prototype, "closable", void 0);
    __decorate([
        Input()
    ], Inplace.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], Inplace.prototype, "style", void 0);
    __decorate([
        Input()
    ], Inplace.prototype, "styleClass", void 0);
    __decorate([
        Output()
    ], Inplace.prototype, "onActivate", void 0);
    __decorate([
        Output()
    ], Inplace.prototype, "onDeactivate", void 0);
    Inplace = __decorate([
        Component({
            selector: 'p-inplace',
            template: "\n        <div [ngClass]=\"{'ui-inplace ui-widget': true, 'ui-inplace-closable': closable}\" [ngStyle]=\"style\" [class]=\"styleClass\">\n            <div class=\"ui-inplace-display\" (click)=\"activate($event)\"\n                [ngClass]=\"{'ui-state-disabled':disabled}\" *ngIf=\"!active\">\n                <ng-content select=\"[pInplaceDisplay]\"></ng-content>\n            </div>\n            <div class=\"ui-inplace-content\" *ngIf=\"active\">\n                <ng-content select=\"[pInplaceContent]\"></ng-content>\n                <button type=\"button\" icon=\"pi pi-times\" pButton (click)=\"deactivate($event)\" *ngIf=\"closable\"></button>\n            </div>\n        </div>\n    "
        })
    ], Inplace);
    return Inplace;
}());
export { Inplace };
var InplaceModule = /** @class */ (function () {
    function InplaceModule() {
    }
    InplaceModule = __decorate([
        NgModule({
            imports: [CommonModule, ButtonModule],
            exports: [Inplace, InplaceDisplay, InplaceContent, ButtonModule],
            declarations: [Inplace, InplaceDisplay, InplaceContent]
        })
    ], InplaceModule);
    return InplaceModule;
}());
export { InplaceModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wbGFjZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvaW5wbGFjZS8iLCJzb3VyY2VzIjpbImlucGxhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDM0UsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQU01QztJQUFBO0lBQTZCLENBQUM7SUFBakIsY0FBYztRQUoxQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFFBQVEsRUFBRSwyQkFBMkI7U0FDeEMsQ0FBQztPQUNXLGNBQWMsQ0FBRztJQUFELHFCQUFDO0NBQUEsQUFBOUIsSUFBOEI7U0FBakIsY0FBYztBQU0zQjtJQUFBO0lBQTZCLENBQUM7SUFBakIsY0FBYztRQUoxQixTQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFFBQVEsRUFBRSwyQkFBMkI7U0FDeEMsQ0FBQztPQUNXLGNBQWMsQ0FBRztJQUFELHFCQUFDO0NBQUEsQUFBOUIsSUFBOEI7U0FBakIsY0FBYztBQWlCM0I7SUFBQTtRQVljLGVBQVUsR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUVuRCxpQkFBWSxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBa0JuRSxDQUFDO0lBZEcsMEJBQVEsR0FBUixVQUFTLEtBQWE7UUFDbEIsSUFBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztZQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMvQjtJQUNMLENBQUM7SUFFRCw0QkFBVSxHQUFWLFVBQVcsS0FBYTtRQUNwQixJQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ3BCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ2pDO0lBQ0wsQ0FBQztJQTdCUTtRQUFSLEtBQUssRUFBRTsyQ0FBaUI7SUFFaEI7UUFBUixLQUFLLEVBQUU7NkNBQW1CO0lBRWxCO1FBQVIsS0FBSyxFQUFFOzZDQUFtQjtJQUVsQjtRQUFSLEtBQUssRUFBRTswQ0FBWTtJQUVYO1FBQVIsS0FBSyxFQUFFOytDQUFvQjtJQUVsQjtRQUFULE1BQU0sRUFBRTsrQ0FBb0Q7SUFFbkQ7UUFBVCxNQUFNLEVBQUU7aURBQXNEO0lBZHRELE9BQU87UUFmbkIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFdBQVc7WUFDckIsUUFBUSxFQUFFLHdyQkFXVDtTQUNKLENBQUM7T0FDVyxPQUFPLENBZ0NuQjtJQUFELGNBQUM7Q0FBQSxBQWhDRCxJQWdDQztTQWhDWSxPQUFPO0FBdUNwQjtJQUFBO0lBQTZCLENBQUM7SUFBakIsYUFBYTtRQUx6QixRQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUMsWUFBWSxDQUFDO1lBQ3BDLE9BQU8sRUFBRSxDQUFDLE9BQU8sRUFBQyxjQUFjLEVBQUMsY0FBYyxFQUFDLFlBQVksQ0FBQztZQUM3RCxZQUFZLEVBQUUsQ0FBQyxPQUFPLEVBQUMsY0FBYyxFQUFDLGNBQWMsQ0FBQztTQUN4RCxDQUFDO09BQ1csYUFBYSxDQUFJO0lBQUQsb0JBQUM7Q0FBQSxBQUE5QixJQUE4QjtTQUFqQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsSW5wdXQsT3V0cHV0LEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7QnV0dG9uTW9kdWxlfSBmcm9tICdwcmltZW5nL2J1dHRvbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1pbnBsYWNlRGlzcGxheScsXG4gICAgdGVtcGxhdGU6ICc8bmctY29udGVudD48L25nLWNvbnRlbnQ+J1xufSlcbmV4cG9ydCBjbGFzcyBJbnBsYWNlRGlzcGxheSB7fVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtaW5wbGFjZUNvbnRlbnQnLFxuICAgIHRlbXBsYXRlOiAnPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50Pidcbn0pXG5leHBvcnQgY2xhc3MgSW5wbGFjZUNvbnRlbnQge31cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLWlucGxhY2UnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd1aS1pbnBsYWNlIHVpLXdpZGdldCc6IHRydWUsICd1aS1pbnBsYWNlLWNsb3NhYmxlJzogY2xvc2FibGV9XCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWlucGxhY2UtZGlzcGxheVwiIChjbGljayk9XCJhY3RpdmF0ZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXN0YXRlLWRpc2FibGVkJzpkaXNhYmxlZH1cIiAqbmdJZj1cIiFhY3RpdmVcIj5cbiAgICAgICAgICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbcElucGxhY2VEaXNwbGF5XVwiPjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLWlucGxhY2UtY29udGVudFwiICpuZ0lmPVwiYWN0aXZlXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3BJbnBsYWNlQ29udGVudF1cIj48L25nLWNvbnRlbnQ+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgaWNvbj1cInBpIHBpLXRpbWVzXCIgcEJ1dHRvbiAoY2xpY2spPVwiZGVhY3RpdmF0ZSgkZXZlbnQpXCIgKm5nSWY9XCJjbG9zYWJsZVwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgSW5wbGFjZSB7XG5cbiAgICBASW5wdXQoKSBhY3RpdmU6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBjbG9zYWJsZTogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgc3R5bGU6IGFueTtcblxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBPdXRwdXQoKSBvbkFjdGl2YXRlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbkRlYWN0aXZhdGU6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgaG92ZXI6IGJvb2xlYW47XG5cbiAgICBhY3RpdmF0ZShldmVudD86IEV2ZW50KSB7XG4gICAgICAgIGlmKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm9uQWN0aXZhdGUuZW1pdChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWFjdGl2YXRlKGV2ZW50PzogRXZlbnQpIHtcbiAgICAgICAgaWYoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmhvdmVyID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm9uRGVhY3RpdmF0ZS5lbWl0KGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLEJ1dHRvbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW0lucGxhY2UsSW5wbGFjZURpc3BsYXksSW5wbGFjZUNvbnRlbnQsQnV0dG9uTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtJbnBsYWNlLElucGxhY2VEaXNwbGF5LElucGxhY2VDb250ZW50XVxufSlcbmV4cG9ydCBjbGFzcyBJbnBsYWNlTW9kdWxlIHsgfVxuIl19