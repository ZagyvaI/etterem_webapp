var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
let ProgressSpinner = class ProgressSpinner {
    constructor() {
        this.strokeWidth = "2";
        this.fill = "none";
        this.animationDuration = "2s";
    }
};
__decorate([
    Input()
], ProgressSpinner.prototype, "style", void 0);
__decorate([
    Input()
], ProgressSpinner.prototype, "styleClass", void 0);
__decorate([
    Input()
], ProgressSpinner.prototype, "strokeWidth", void 0);
__decorate([
    Input()
], ProgressSpinner.prototype, "fill", void 0);
__decorate([
    Input()
], ProgressSpinner.prototype, "animationDuration", void 0);
ProgressSpinner = __decorate([
    Component({
        selector: 'p-progressSpinner',
        template: `
        <div class="ui-progress-spinner" [ngStyle]="style" [ngClass]="styleClass">
            <svg class="ui-progress-spinner-svg" viewBox="25 25 50 50" [style.animation-duration]="animationDuration">
                <circle class="ui-progress-spinner-circle" cx="50" cy="50" r="20" [attr.fill]="fill" [attr.stroke-width]="strokeWidth" stroke-miterlimit="10"/>
            </svg>
        </div>
    `
    })
], ProgressSpinner);
export { ProgressSpinner };
let ProgressSpinnerModule = class ProgressSpinnerModule {
};
ProgressSpinnerModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [ProgressSpinner],
        declarations: [ProgressSpinner]
    })
], ProgressSpinnerModule);
export { ProgressSpinnerModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZ3Jlc3NzcGlubmVyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy9wcm9ncmVzc3NwaW5uZXIvIiwic291cmNlcyI6WyJwcm9ncmVzc3NwaW5uZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQVk3QyxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFlO0lBQTVCO1FBTWEsZ0JBQVcsR0FBVyxHQUFHLENBQUM7UUFFMUIsU0FBSSxHQUFXLE1BQU0sQ0FBQztRQUV0QixzQkFBaUIsR0FBVyxJQUFJLENBQUM7SUFFOUMsQ0FBQztDQUFBLENBQUE7QUFWWTtJQUFSLEtBQUssRUFBRTs4Q0FBWTtBQUVYO0lBQVIsS0FBSyxFQUFFO21EQUFvQjtBQUVuQjtJQUFSLEtBQUssRUFBRTtvREFBMkI7QUFFMUI7SUFBUixLQUFLLEVBQUU7NkNBQXVCO0FBRXRCO0lBQVIsS0FBSyxFQUFFOzBEQUFrQztBQVZqQyxlQUFlO0lBVjNCLFNBQVMsQ0FBQztRQUNQLFFBQVEsRUFBRSxtQkFBbUI7UUFDN0IsUUFBUSxFQUFFOzs7Ozs7S0FNVDtLQUNKLENBQUM7R0FDVyxlQUFlLENBWTNCO1NBWlksZUFBZTtBQW1CNUIsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBcUI7Q0FBSSxDQUFBO0FBQXpCLHFCQUFxQjtJQUxqQyxRQUFRLENBQUM7UUFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7UUFDdkIsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO1FBQzFCLFlBQVksRUFBRSxDQUFDLGVBQWUsQ0FBQztLQUNsQyxDQUFDO0dBQ1cscUJBQXFCLENBQUk7U0FBekIscUJBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1wcm9ncmVzc1NwaW5uZXInLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgY2xhc3M9XCJ1aS1wcm9ncmVzcy1zcGlubmVyXCIgW25nU3R5bGVdPVwic3R5bGVcIiBbbmdDbGFzc109XCJzdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICA8c3ZnIGNsYXNzPVwidWktcHJvZ3Jlc3Mtc3Bpbm5lci1zdmdcIiB2aWV3Qm94PVwiMjUgMjUgNTAgNTBcIiBbc3R5bGUuYW5pbWF0aW9uLWR1cmF0aW9uXT1cImFuaW1hdGlvbkR1cmF0aW9uXCI+XG4gICAgICAgICAgICAgICAgPGNpcmNsZSBjbGFzcz1cInVpLXByb2dyZXNzLXNwaW5uZXItY2lyY2xlXCIgY3g9XCI1MFwiIGN5PVwiNTBcIiByPVwiMjBcIiBbYXR0ci5maWxsXT1cImZpbGxcIiBbYXR0ci5zdHJva2Utd2lkdGhdPVwic3Ryb2tlV2lkdGhcIiBzdHJva2UtbWl0ZXJsaW1pdD1cIjEwXCIvPlxuICAgICAgICAgICAgPC9zdmc+XG4gICAgICAgIDwvZGl2PlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgUHJvZ3Jlc3NTcGlubmVyIHtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG4gICAgXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuICAgIFxuICAgIEBJbnB1dCgpIHN0cm9rZVdpZHRoOiBzdHJpbmcgPSBcIjJcIjtcbiAgICBcbiAgICBASW5wdXQoKSBmaWxsOiBzdHJpbmcgPSBcIm5vbmVcIjtcbiAgICBcbiAgICBASW5wdXQoKSBhbmltYXRpb25EdXJhdGlvbjogc3RyaW5nID0gXCIyc1wiO1xuICAgIFxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtQcm9ncmVzc1NwaW5uZXJdLFxuICAgIGRlY2xhcmF0aW9uczogW1Byb2dyZXNzU3Bpbm5lcl1cbn0pXG5leHBvcnQgY2xhc3MgUHJvZ3Jlc3NTcGlubmVyTW9kdWxlIHsgfSJdfQ==