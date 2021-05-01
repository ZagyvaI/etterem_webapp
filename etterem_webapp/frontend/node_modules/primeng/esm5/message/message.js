var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
var UIMessage = /** @class */ (function () {
    function UIMessage() {
    }
    Object.defineProperty(UIMessage.prototype, "icon", {
        get: function () {
            var icon = null;
            if (this.severity) {
                switch (this.severity) {
                    case 'success':
                        icon = 'pi pi-check';
                        break;
                    case 'info':
                        icon = 'pi pi-info-circle';
                        break;
                    case 'error':
                        icon = 'pi pi-times';
                        break;
                    case 'warn':
                        icon = 'pi pi-exclamation-triangle';
                        break;
                    default:
                        icon = 'pi pi-info-circle';
                        break;
                }
            }
            return icon;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        Input()
    ], UIMessage.prototype, "severity", void 0);
    __decorate([
        Input()
    ], UIMessage.prototype, "text", void 0);
    UIMessage = __decorate([
        Component({
            selector: 'p-message',
            template: "\n        <div aria-live=\"polite\" class=\"ui-message ui-widget ui-corner-all\" *ngIf=\"severity\"\n        [ngClass]=\"{'ui-message-info': (severity === 'info'),\n                'ui-message-warn': (severity === 'warn'),\n                'ui-message-error': (severity === 'error'),\n                'ui-message-success': (severity === 'success')}\">\n            <span class=\"ui-message-icon\" [ngClass]=\"icon\"></span>\n            <span class=\"ui-message-text\" [innerHTML]=\"text\"></span>\n        </div>\n    "
        })
    ], UIMessage);
    return UIMessage;
}());
export { UIMessage };
var MessageModule = /** @class */ (function () {
    function MessageModule() {
    }
    MessageModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [UIMessage],
            declarations: [UIMessage]
        })
    ], MessageModule);
    return MessageModule;
}());
export { MessageModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvbWVzc2FnZS8iLCJzb3VyY2VzIjpbIm1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQWU3QztJQUFBO0lBbUNBLENBQUM7SUE3Qkcsc0JBQUksMkJBQUk7YUFBUjtZQUNJLElBQUksSUFBSSxHQUFXLElBQUksQ0FBQztZQUV4QixJQUFHLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2QsUUFBTyxJQUFJLENBQUMsUUFBUSxFQUFFO29CQUNsQixLQUFLLFNBQVM7d0JBQ1YsSUFBSSxHQUFHLGFBQWEsQ0FBQzt3QkFDekIsTUFBTTtvQkFFTixLQUFLLE1BQU07d0JBQ1AsSUFBSSxHQUFHLG1CQUFtQixDQUFDO3dCQUMvQixNQUFNO29CQUVOLEtBQUssT0FBTzt3QkFDUixJQUFJLEdBQUcsYUFBYSxDQUFDO3dCQUN6QixNQUFNO29CQUVOLEtBQUssTUFBTTt3QkFDUCxJQUFJLEdBQUcsNEJBQTRCLENBQUM7d0JBQ3hDLE1BQU07b0JBRU47d0JBQ0ksSUFBSSxHQUFHLG1CQUFtQixDQUFDO3dCQUMvQixNQUFNO2lCQUNUO2FBQ0o7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDOzs7T0FBQTtJQWhDUTtRQUFSLEtBQUssRUFBRTsrQ0FBa0I7SUFFakI7UUFBUixLQUFLLEVBQUU7MkNBQWM7SUFKYixTQUFTO1FBYnJCLFNBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxXQUFXO1lBQ3JCLFFBQVEsRUFBRSx5Z0JBU1Q7U0FDSixDQUFDO09BQ1csU0FBUyxDQW1DckI7SUFBRCxnQkFBQztDQUFBLEFBbkNELElBbUNDO1NBbkNZLFNBQVM7QUEwQ3RCO0lBQUE7SUFBNkIsQ0FBQztJQUFqQixhQUFhO1FBTHpCLFFBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztZQUN2QixPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUM7WUFDcEIsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDO1NBQzVCLENBQUM7T0FDVyxhQUFhLENBQUk7SUFBRCxvQkFBQztDQUFBLEFBQTlCLElBQThCO1NBQWpCLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxJbnB1dH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLW1lc3NhZ2UnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgYXJpYS1saXZlPVwicG9saXRlXCIgY2xhc3M9XCJ1aS1tZXNzYWdlIHVpLXdpZGdldCB1aS1jb3JuZXItYWxsXCIgKm5nSWY9XCJzZXZlcml0eVwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsndWktbWVzc2FnZS1pbmZvJzogKHNldmVyaXR5ID09PSAnaW5mbycpLFxuICAgICAgICAgICAgICAgICd1aS1tZXNzYWdlLXdhcm4nOiAoc2V2ZXJpdHkgPT09ICd3YXJuJyksXG4gICAgICAgICAgICAgICAgJ3VpLW1lc3NhZ2UtZXJyb3InOiAoc2V2ZXJpdHkgPT09ICdlcnJvcicpLFxuICAgICAgICAgICAgICAgICd1aS1tZXNzYWdlLXN1Y2Nlc3MnOiAoc2V2ZXJpdHkgPT09ICdzdWNjZXNzJyl9XCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lc3NhZ2UtaWNvblwiIFtuZ0NsYXNzXT1cImljb25cIj48L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lc3NhZ2UtdGV4dFwiIFtpbm5lckhUTUxdPVwidGV4dFwiPjwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgYFxufSlcbmV4cG9ydCBjbGFzcyBVSU1lc3NhZ2Uge1xuXG4gICAgQElucHV0KCkgc2V2ZXJpdHk6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHRleHQ6IHN0cmluZztcblxuICAgIGdldCBpY29uKCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBpY29uOiBzdHJpbmcgPSBudWxsO1xuXG4gICAgICAgIGlmKHRoaXMuc2V2ZXJpdHkpIHtcbiAgICAgICAgICAgIHN3aXRjaCh0aGlzLnNldmVyaXR5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICAgICAgICAgICAgICAgIGljb24gPSAncGkgcGktY2hlY2snO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnaW5mbyc6XG4gICAgICAgICAgICAgICAgICAgIGljb24gPSAncGkgcGktaW5mby1jaXJjbGUnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICAgICAgICAgICAgICBpY29uID0gJ3BpIHBpLXRpbWVzJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3dhcm4nOlxuICAgICAgICAgICAgICAgICAgICBpY29uID0gJ3BpIHBpLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGljb24gPSAncGkgcGktaW5mby1jaXJjbGUnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGljb247XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtVSU1lc3NhZ2VdLFxuICAgIGRlY2xhcmF0aW9uczogW1VJTWVzc2FnZV1cbn0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZU1vZHVsZSB7IH1cbiJdfQ==