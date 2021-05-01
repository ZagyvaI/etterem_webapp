var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input, Output, EventEmitter, forwardRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
export var TOGGLEBUTTON_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return ToggleButton; }),
    multi: true
};
var ToggleButton = /** @class */ (function () {
    function ToggleButton() {
        this.onLabel = 'Yes';
        this.offLabel = 'No';
        this.iconPos = 'left';
        this.onChange = new EventEmitter();
        this.checked = false;
        this.focus = false;
        this.onModelChange = function () { };
        this.onModelTouched = function () { };
    }
    ToggleButton.prototype.ngAfterViewInit = function () {
        if (this.checkboxViewChild) {
            this.checkbox = this.checkboxViewChild.nativeElement;
        }
    };
    ToggleButton.prototype.toggle = function (event) {
        if (!this.disabled) {
            this.checked = !this.checked;
            this.onModelChange(this.checked);
            this.onModelTouched();
            this.onChange.emit({
                originalEvent: event,
                checked: this.checked
            });
            if (this.checkbox) {
                this.checkbox.focus();
            }
        }
    };
    ToggleButton.prototype.onFocus = function () {
        this.focus = true;
    };
    ToggleButton.prototype.onBlur = function () {
        this.focus = false;
        this.onModelTouched();
    };
    ToggleButton.prototype.writeValue = function (value) {
        this.checked = value;
    };
    ToggleButton.prototype.registerOnChange = function (fn) {
        this.onModelChange = fn;
    };
    ToggleButton.prototype.registerOnTouched = function (fn) {
        this.onModelTouched = fn;
    };
    ToggleButton.prototype.setDisabledState = function (val) {
        this.disabled = val;
    };
    Object.defineProperty(ToggleButton.prototype, "hasOnLabel", {
        get: function () {
            return this.onLabel && this.onLabel.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ToggleButton.prototype, "hasOffLabel", {
        get: function () {
            return this.onLabel && this.onLabel.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input()
    ], ToggleButton.prototype, "onLabel", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "offLabel", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "onIcon", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "offIcon", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "disabled", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "style", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "inputId", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "tabindex", void 0);
    __decorate([
        Input()
    ], ToggleButton.prototype, "iconPos", void 0);
    __decorate([
        Output()
    ], ToggleButton.prototype, "onChange", void 0);
    __decorate([
        ViewChild('checkbox', { static: true })
    ], ToggleButton.prototype, "checkboxViewChild", void 0);
    ToggleButton = __decorate([
        Component({
            selector: 'p-toggleButton',
            template: "\n        <div [ngClass]=\"{'ui-button ui-togglebutton ui-widget ui-state-default ui-corner-all': true, 'ui-button-text-only': (!onIcon && !offIcon), \n                'ui-button-text-icon-left': (onIcon && offIcon && hasOnLabel && hasOffLabel && iconPos === 'left'), \n                'ui-button-text-icon-right': (onIcon && offIcon && hasOnLabel && hasOffLabel && iconPos === 'right'),'ui-button-icon-only': (onIcon && offIcon && !hasOnLabel && !hasOffLabel),\n                'ui-state-active': checked,'ui-state-focus':focus,'ui-state-disabled':disabled}\" [ngStyle]=\"style\" [class]=\"styleClass\" \n                (click)=\"toggle($event)\" (keydown.enter)=\"toggle($event)\">\n            <div class=\"ui-helper-hidden-accessible\">\n                <input #checkbox type=\"checkbox\" [attr.id]=\"inputId\" [checked]=\"checked\" (focus)=\"onFocus()\" (blur)=\"onBlur()\" [attr.tabindex]=\"tabindex\">\n            </div>\n            <span *ngIf=\"onIcon||offIcon\" class=\"ui-button-icon-left\" [class]=\"checked ? this.onIcon : this.offIcon\" [ngClass]=\"{'ui-button-icon-left': (iconPos === 'left'), \n            'ui-button-icon-right': (iconPos === 'right')}\"></span>\n            <span class=\"ui-button-text ui-unselectable-text\">{{checked ? hasOnLabel ? onLabel : 'ui-btn' : hasOffLabel ? offLabel : 'ui-btn'}}</span>\n        </div>\n    ",
            providers: [TOGGLEBUTTON_VALUE_ACCESSOR]
        })
    ], ToggleButton);
    return ToggleButton;
}());
export { ToggleButton };
var ToggleButtonModule = /** @class */ (function () {
    function ToggleButtonModule() {
    }
    ToggleButtonModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [ToggleButton],
            declarations: [ToggleButton]
        })
    ], ToggleButtonModule);
    return ToggleButtonModule;
}());
export { ToggleButtonModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9nZ2xlYnV0dG9uLmpzIiwic291cmNlUm9vdCI6Im5nOi8vcHJpbWVuZy90b2dnbGVidXR0b24vIiwic291cmNlcyI6WyJ0b2dnbGVidXR0b24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsVUFBVSxFQUFlLFNBQVMsRUFBWSxNQUFNLGVBQWUsQ0FBQztBQUN6SCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLGlCQUFpQixFQUF1QixNQUFNLGdCQUFnQixDQUFDO0FBRXZFLE1BQU0sQ0FBQyxJQUFNLDJCQUEyQixHQUFRO0lBQzlDLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxjQUFNLE9BQUEsWUFBWSxFQUFaLENBQVksQ0FBQztJQUMzQyxLQUFLLEVBQUUsSUFBSTtDQUNaLENBQUM7QUFvQkY7SUFBQTtRQUVhLFlBQU8sR0FBVyxLQUFLLENBQUM7UUFFeEIsYUFBUSxHQUFXLElBQUksQ0FBQztRQWdCeEIsWUFBTyxHQUFXLE1BQU0sQ0FBQztRQUV4QixhQUFRLEdBQXNCLElBQUksWUFBWSxFQUFFLENBQUM7UUFNM0QsWUFBTyxHQUFZLEtBQUssQ0FBQztRQUV6QixVQUFLLEdBQVksS0FBSyxDQUFDO1FBRXZCLGtCQUFhLEdBQWEsY0FBTyxDQUFDLENBQUM7UUFFbkMsbUJBQWMsR0FBYSxjQUFPLENBQUMsQ0FBQztJQXVEeEMsQ0FBQztJQXJERyxzQ0FBZSxHQUFmO1FBQ0ksSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUM7WUFDdkIsSUFBSSxDQUFDLFFBQVEsR0FBc0IsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQztTQUMzRTtJQUNMLENBQUM7SUFFRCw2QkFBTSxHQUFOLFVBQU8sS0FBWTtRQUNmLElBQUcsQ0FBQyxJQUFJLENBQUMs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dCB7TmdNb2R1bGUsQ29tcG9uZW50LElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsZm9yd2FyZFJlZixBZnRlclZpZXdJbml0LFZpZXdDaGlsZCxFbGVtZW50UmVmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOR19WQUxVRV9BQ0NFU1NPUiwgQ29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuZXhwb3J0IGNvbnN0IFRPR0dMRUJVVFRPTl9WQUxVRV9BQ0NFU1NPUjogYW55ID0ge1xuICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVG9nZ2xlQnV0dG9uKSxcbiAgbXVsdGk6IHRydWVcbn07XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC10b2dnbGVCdXR0b24nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyd1aS1idXR0b24gdWktdG9nZ2xlYnV0dG9uIHVpLXdpZGdldCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGwnOiB0cnVlLCAndWktYnV0dG9uLXRleHQtb25seSc6ICghb25JY29uICYmICFvZmZJY29uKSwgXG4gICAgICAgICAgICAgICAgJ3VpLWJ1dHRvbi10ZXh0LWljb24tbGVmdCc6IChvbkljb24gJiYgb2ZmSWNvbiAmJiBoYXNPbkxhYmVsICYmIGhhc09mZkxhYmVsICYmIGljb25Qb3MgPT09ICdsZWZ0JyksIFxuICAgICAgICAgICAgICAgICd1aS1idXR0b24tdGV4dC1pY29uLXJpZ2h0JzogKG9uSWNvbiAmJiBvZmZJY29uICYmIGhhc09uTGFiZWwgJiYgaGFzT2ZmTGFiZWwgJiYgaWNvblBvcyA9PT0gJ3JpZ2h0JyksJ3VpLWJ1dHRvbi1pY29uLW9ubHknOiAob25JY29uICYmIG9mZkljb24gJiYgIWhhc09uTGFiZWwgJiYgIWhhc09mZkxhYmVsKSxcbiAgICAgICAgICAgICAgICAndWktc3RhdGUtYWN0aXZlJzogY2hlY2tlZCwndWktc3RhdGUtZm9jdXMnOmZvY3VzLCd1aS1zdGF0ZS1kaXNhYmxlZCc6ZGlzYWJsZWR9XCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFxuICAgICAgICAgICAgICAgIChjbGljayk9XCJ0b2dnbGUoJGV2ZW50KVwiIChrZXlkb3duLmVudGVyKT1cInRvZ2dsZSgkZXZlbnQpXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktaGVscGVyLWhpZGRlbi1hY2Nlc3NpYmxlXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0ICNjaGVja2JveCB0eXBlPVwiY2hlY2tib3hcIiBbYXR0ci5pZF09XCJpbnB1dElkXCIgW2NoZWNrZWRdPVwiY2hlY2tlZFwiIChmb2N1cyk9XCJvbkZvY3VzKClcIiAoYmx1cik9XCJvbkJsdXIoKVwiIFthdHRyLnRhYmluZGV4XT1cInRhYmluZGV4XCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwib25JY29ufHxvZmZJY29uXCIgY2xhc3M9XCJ1aS1idXR0b24taWNvbi1sZWZ0XCIgW2NsYXNzXT1cImNoZWNrZWQgPyB0aGlzLm9uSWNvbiA6IHRoaXMub2ZmSWNvblwiIFtuZ0NsYXNzXT1cInsndWktYnV0dG9uLWljb24tbGVmdCc6IChpY29uUG9zID09PSAnbGVmdCcpLCBcbiAgICAgICAgICAgICd1aS1idXR0b24taWNvbi1yaWdodCc6IChpY29uUG9zID09PSAncmlnaHQnKX1cIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLWJ1dHRvbi10ZXh0IHVpLXVuc2VsZWN0YWJsZS10ZXh0XCI+e3tjaGVja2VkID8gaGFzT25MYWJlbCA/IG9uTGFiZWwgOiAndWktYnRuJyA6IGhhc09mZkxhYmVsID8gb2ZmTGFiZWwgOiAndWktYnRuJ319PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIHByb3ZpZGVyczogW1RPR0dMRUJVVFRPTl9WQUxVRV9BQ0NFU1NPUl1cbn0pXG5leHBvcnQgY2xhc3MgVG9nZ2xlQnV0dG9uIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBASW5wdXQoKSBvbkxhYmVsOiBzdHJpbmcgPSAnWWVzJztcblxuICAgIEBJbnB1dCgpIG9mZkxhYmVsOiBzdHJpbmcgPSAnTm8nO1xuXG4gICAgQElucHV0KCkgb25JY29uOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBvZmZJY29uOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBpbnB1dElkOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSB0YWJpbmRleDogbnVtYmVyO1xuXG4gICAgQElucHV0KCkgaWNvblBvczogc3RyaW5nID0gJ2xlZnQnO1xuXG4gICAgQE91dHB1dCgpIG9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICBcbiAgICBAVmlld0NoaWxkKCdjaGVja2JveCcsIHsgc3RhdGljOiB0cnVlIH0pIGNoZWNrYm94Vmlld0NoaWxkOiBFbGVtZW50UmVmO1xuICAgIFxuICAgIGNoZWNrYm94OiBIVE1MSW5wdXRFbGVtZW50O1xuICAgIFxuICAgIGNoZWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIGZvY3VzOiBib29sZWFuID0gZmFsc2U7XG4gICAgXG4gICAgb25Nb2RlbENoYW5nZTogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgICBcbiAgICBvbk1vZGVsVG91Y2hlZDogRnVuY3Rpb24gPSAoKSA9PiB7fTtcbiAgICBcbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmNoZWNrYm94Vmlld0NoaWxkKXtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tib3ggPSA8SFRNTElucHV0RWxlbWVudD4gdGhpcy5jaGVja2JveFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50O1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIHRvZ2dsZShldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYoIXRoaXMuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZCA9ICF0aGlzLmNoZWNrZWQ7XG4gICAgICAgICAgICB0aGlzLm9uTW9kZWxDaGFuZ2UodGhpcy5jaGVja2VkKTtcbiAgICAgICAgICAgIHRoaXMub25Nb2RlbFRvdWNoZWQoKTtcbiAgICAgICAgICAgIHRoaXMub25DaGFuZ2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgY2hlY2tlZDogdGhpcy5jaGVja2VkXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICh0aGlzLmNoZWNrYm94KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja2JveC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Gb2N1cygpIHtcbiAgICAgICAgdGhpcy5mb2N1cyA9IHRydWU7XG4gICAgfVxuICAgIFxuICAgIG9uQmx1cigpIHtcbiAgICAgICAgdGhpcy5mb2N1cyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkKCk7XG4gICAgfVxuICAgIFxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueSkgOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gdmFsdWU7XG4gICAgfVxuICAgIFxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IEZ1bmN0aW9uKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25Nb2RlbENoYW5nZSA9IGZuO1xuICAgIH1cblxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBGdW5jdGlvbik6IHZvaWQge1xuICAgICAgICB0aGlzLm9uTW9kZWxUb3VjaGVkID0gZm47XG4gICAgfVxuICAgIFxuICAgIHNldERpc2FibGVkU3RhdGUodmFsOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSB2YWw7XG4gICAgfVxuICAgIFxuICAgIGdldCBoYXNPbkxhYmVsKCk6Ym9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLm9uTGFiZWwgJiYgdGhpcy5vbkxhYmVsLmxlbmd0aCA+IDA7XG4gICAgfVxuICAgIFxuICAgIGdldCBoYXNPZmZMYWJlbCgpOmJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5vbkxhYmVsICYmIHRoaXMub25MYWJlbC5sZW5ndGggPiAwO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbVG9nZ2xlQnV0dG9uXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtUb2dnbGVCdXR0b25dXG59KVxuZXhwb3J0IGNsYXNzIFRvZ2dsZUJ1dHRvbk1vZHVsZSB7IH1cbiJdfQ==