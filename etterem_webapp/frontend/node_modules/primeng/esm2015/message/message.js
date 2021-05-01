var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
let UIMessage = class UIMessage {
    get icon() {
        let icon = null;
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
    }
};
__decorate([
    Input()
], UIMessage.prototype, "severity", void 0);
__decorate([
    Input()
], UIMessage.prototype, "text", void 0);
UIMessage = __decorate([
    Component({
        selector: 'p-message',
        template: `
        <div aria-live="polite" class="ui-message ui-widget ui-corner-all" *ngIf="severity"
        [ngClass]="{'ui-message-info': (severity === 'info'),
                'ui-message-warn': (severity === 'warn'),
                'ui-message-error': (severity === 'error'),
                'ui-message-success': (severity === 'success')}">
            <span class="ui-message-icon" [ngClass]="icon"></span>
            <span class="ui-message-text" [innerHTML]="text"></span>
        </div>
    `
    })
], UIMessage);
export { UIMessage };
let MessageModule = class MessageModule {
};
MessageModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [UIMessage],
        declarations: [UIMessage]
    })
], MessageModule);
export { MessageModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvbWVzc2FnZS8iLCJzb3VyY2VzIjpbIm1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQWU3QyxJQUFhLFNBQVMsR0FBdEIsTUFBYSxTQUFTO0lBTWxCLElBQUksSUFBSTtRQUNKLElBQUksSUFBSSxHQUFXLElBQUksQ0FBQztRQUV4QixJQUFHLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDZCxRQUFPLElBQUksQ0FBQyxRQUFRLEVBQUU7Z0JBQ2xCLEtBQUssU0FBUztvQkFDVixJQUFJLEdBQUcsYUFBYSxDQUFDO29CQUN6QixNQUFNO2dCQUVOLEtBQUssTUFBTTtvQkFDUCxJQUFJLEdBQUcsbUJBQW1CLENBQUM7b0JBQy9CLE1BQU07Z0JBRU4sS0FBSyxPQUFPO29CQUNSLElBQUksR0FBRyxhQUFhLENBQUM7b0JBQ3pCLE1BQU07Z0JBRU4sS0FBSyxNQUFNO29CQUNQLElBQUksR0FBRyw0QkFBNEIsQ0FBQztvQkFDeEMsTUFBTTtnQkFFTjtvQkFDSSxJQUFJLEdBQUcsbUJBQW1CLENBQUM7b0JBQy9CLE1BQU07YUFDVDtTQUNKO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNKLENBQUE7QUFqQ1k7SUFBUixLQUFLLEVBQUU7MkNBQWtCO0FBRWpCO0lBQVIsS0FBSyxFQUFFO3VDQUFjO0FBSmIsU0FBUztJQWJyQixTQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsV0FBVztRQUNyQixRQUFRLEVBQUU7Ozs7Ozs7OztLQVNUO0tBQ0osQ0FBQztHQUNXLFNBQVMsQ0FtQ3JCO1NBbkNZLFNBQVM7QUEwQ3RCLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWE7Q0FBSSxDQUFBO0FBQWpCLGFBQWE7SUFMekIsUUFBUSxDQUFDO1FBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQztRQUNwQixZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUM7S0FDNUIsQ0FBQztHQUNXLGFBQWEsQ0FBSTtTQUFqQixhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsSW5wdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1tZXNzYWdlJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGFyaWEtbGl2ZT1cInBvbGl0ZVwiIGNsYXNzPVwidWktbWVzc2FnZSB1aS13aWRnZXQgdWktY29ybmVyLWFsbFwiICpuZ0lmPVwic2V2ZXJpdHlcIlxuICAgICAgICBbbmdDbGFzc109XCJ7J3VpLW1lc3NhZ2UtaW5mbyc6IChzZXZlcml0eSA9PT0gJ2luZm8nKSxcbiAgICAgICAgICAgICAgICAndWktbWVzc2FnZS13YXJuJzogKHNldmVyaXR5ID09PSAnd2FybicpLFxuICAgICAgICAgICAgICAgICd1aS1tZXNzYWdlLWVycm9yJzogKHNldmVyaXR5ID09PSAnZXJyb3InKSxcbiAgICAgICAgICAgICAgICAndWktbWVzc2FnZS1zdWNjZXNzJzogKHNldmVyaXR5ID09PSAnc3VjY2VzcycpfVwiPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZXNzYWdlLWljb25cIiBbbmdDbGFzc109XCJpY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZXNzYWdlLXRleHRcIiBbaW5uZXJIVE1MXT1cInRleHRcIj48L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgIGBcbn0pXG5leHBvcnQgY2xhc3MgVUlNZXNzYWdlIHtcblxuICAgIEBJbnB1dCgpIHNldmVyaXR5OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSB0ZXh0OiBzdHJpbmc7XG5cbiAgICBnZXQgaWNvbigpOiBzdHJpbmcge1xuICAgICAgICBsZXQgaWNvbjogc3RyaW5nID0gbnVsbDtcblxuICAgICAgICBpZih0aGlzLnNldmVyaXR5KSB7XG4gICAgICAgICAgICBzd2l0Y2godGhpcy5zZXZlcml0eSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N1Y2Nlc3MnOlxuICAgICAgICAgICAgICAgICAgICBpY29uID0gJ3BpIHBpLWNoZWNrJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2luZm8nOlxuICAgICAgICAgICAgICAgICAgICBpY29uID0gJ3BpIHBpLWluZm8tY2lyY2xlJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICAgICAgICAgICAgaWNvbiA9ICdwaSBwaS10aW1lcyc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICd3YXJuJzpcbiAgICAgICAgICAgICAgICAgICAgaWNvbiA9ICdwaSBwaS1leGNsYW1hdGlvbi10cmlhbmdsZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpY29uID0gJ3BpIHBpLWluZm8tY2lyY2xlJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpY29uO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbVUlNZXNzYWdlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtVSU1lc3NhZ2VdXG59KVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VNb2R1bGUgeyB9XG4iXX0=