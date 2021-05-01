var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { NgModule, Component, Input, Output, EventEmitter, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MessageService } from 'primeng/api';
let Messages = class Messages {
    constructor(messageService) {
        this.messageService = messageService;
        this.closable = true;
        this.enableService = true;
        this.showTransitionOptions = '300ms ease-out';
        this.hideTransitionOptions = '250ms ease-in';
        this.valueChange = new EventEmitter();
    }
    ngOnInit() {
        if (this.messageService && this.enableService) {
            this.messageSubscription = this.messageService.messageObserver.subscribe((messages) => {
                if (messages) {
                    if (messages instanceof Array) {
                        let filteredMessages = messages.filter(m => this.key === m.key);
                        this.value = this.value ? [...this.value, ...filteredMessages] : [...filteredMessages];
                    }
                    else if (this.key === messages.key) {
                        this.value = this.value ? [...this.value, ...[messages]] : [messages];
                    }
                }
            });
            this.clearSubscription = this.messageService.clearObserver.subscribe(key => {
                if (key) {
                    if (this.key === key) {
                        this.value = null;
                    }
                }
                else {
                    this.value = null;
                }
            });
        }
    }
    hasMessages() {
        return this.value && this.value.length > 0;
    }
    getSeverityClass() {
        return this.value[0].severity;
    }
    clear(event) {
        this.value = [];
        this.valueChange.emit(this.value);
        event.preventDefault();
    }
    get icon() {
        let icon = null;
        if (this.hasMessages()) {
            let msg = this.value[0];
            switch (msg.severity) {
                case 'success':
                    icon = 'pi-check';
                    break;
                case 'info':
                    icon = 'pi-info-circle';
                    break;
                case 'error':
                    icon = 'pi-times';
                    break;
                case 'warn':
                    icon = 'pi-exclamation-triangle';
                    break;
                default:
                    icon = 'pi-info-circle';
                    break;
            }
        }
        return icon;
    }
    ngOnDestroy() {
        if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
        }
        if (this.clearSubscription) {
            this.clearSubscription.unsubscribe();
        }
    }
};
Messages.ctorParameters = () => [
    { type: MessageService, decorators: [{ type: Optional }] }
];
__decorate([
    Input()
], Messages.prototype, "value", void 0);
__decorate([
    Input()
], Messages.prototype, "closable", void 0);
__decorate([
    Input()
], Messages.prototype, "style", void 0);
__decorate([
    Input()
], Messages.prototype, "styleClass", void 0);
__decorate([
    Input()
], Messages.prototype, "enableService", void 0);
__decorate([
    Input()
], Messages.prototype, "key", void 0);
__decorate([
    Input()
], Messages.prototype, "showTransitionOptions", void 0);
__decorate([
    Input()
], Messages.prototype, "hideTransitionOptions", void 0);
__decorate([
    Output()
], Messages.prototype, "valueChange", void 0);
Messages = __decorate([
    Component({
        selector: 'p-messages',
        template: `
        <div *ngIf="hasMessages()" class="ui-messages ui-widget ui-corner-all"
                    [ngClass]="{'ui-messages-info':(value[0].severity === 'info'),
                    'ui-messages-warn':(value[0].severity === 'warn'),
                    'ui-messages-error':(value[0].severity === 'error'),
                    'ui-messages-success':(value[0].severity === 'success')}"
                    [ngStyle]="style" [class]="styleClass" [@messageAnimation]="{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}">
            <a tabindex="0" class="ui-messages-close" (click)="clear($event)" (keydown.enter)="clear($event)" *ngIf="closable">
                <i class="pi pi-times"></i>
            </a>
            <span class="ui-messages-icon pi" [ngClass]="icon"></span>
            <ul>
                <li *ngFor="let msg of value">
                    <span *ngIf="msg.summary" class="ui-messages-summary" [innerHTML]="msg.summary"></span>
                    <span *ngIf="msg.detail" class="ui-messages-detail" [innerHTML]="msg.detail"></span>
                </li>
            </ul>
        </div>
    `,
        animations: [
            trigger('messageAnimation', [
                state('visible', style({
                    transform: 'translateY(0)',
                    opacity: 1
                })),
                transition('void => *', [
                    style({ transform: 'translateY(-25%)', opacity: 0 }),
                    animate('{{showTransitionParams}}')
                ]),
                transition('* => void', [
                    animate(('{{hideTransitionParams}}'), style({
                        opacity: 0,
                        transform: 'translateY(-25%)'
                    }))
                ])
            ])
        ]
    }),
    __param(0, Optional())
], Messages);
export { Messages };
let MessagesModule = class MessagesModule {
};
MessagesModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Messages],
        declarations: [Messages]
    })
], MessagesModule);
export { MessagesModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL21lc3NhZ2VzLyIsInNvdXJjZXMiOlsibWVzc2FnZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQWtCLEtBQUssRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUNyRyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLE9BQU8sRUFBQyxLQUFLLEVBQUMsS0FBSyxFQUFDLFVBQVUsRUFBQyxPQUFPLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUUzRSxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBMkMzQyxJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFRO0lBd0JqQixZQUErQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFwQnBELGFBQVEsR0FBWSxJQUFJLENBQUM7UUFNekIsa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFJOUIsMEJBQXFCLEdBQVcsZ0JBQWdCLENBQUM7UUFFakQsMEJBQXFCLEdBQVcsZUFBZSxDQUFDO1FBRS9DLGdCQUFXLEdBQTRCLElBQUksWUFBWSxFQUFhLENBQUM7SUFNZixDQUFDO0lBRWpFLFFBQVE7UUFDSixJQUFHLElBQUksQ0FBQyxjQUFjLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUMxQyxJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsUUFBYSxFQUFFLEVBQUU7Z0JBQ3ZGLElBQUcsUUFBUSxFQUFFO29CQUNULElBQUcsUUFBUSxZQUFZLEtBQUssRUFBRTt3QkFDMUIsSUFBSSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxD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QUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7S0FDM0IsQ0FBQztHQUNXLGNBQWMsQ0FBSTtTQUFsQixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtOZ01vZHVsZSxDb21wb25lbnQsT25Jbml0LE9uRGVzdHJveSxJbnB1dCxPdXRwdXQsRXZlbnRFbWl0dGVyLE9wdGlvbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHt0cmlnZ2VyLHN0YXRlLHN0eWxlLHRyYW5zaXRpb24sYW5pbWF0ZX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge01lc3NhZ2V9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7TWVzc2FnZVNlcnZpY2V9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLW1lc3NhZ2VzJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2ICpuZ0lmPVwiaGFzTWVzc2FnZXMoKVwiIGNsYXNzPVwidWktbWVzc2FnZXMgdWktd2lkZ2V0IHVpLWNvcm5lci1hbGxcIlxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLW1lc3NhZ2VzLWluZm8nOih2YWx1ZVswXS5zZXZlcml0eSA9PT0gJ2luZm8nKSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLW1lc3NhZ2VzLXdhcm4nOih2YWx1ZVswXS5zZXZlcml0eSA9PT0gJ3dhcm4nKSxcbiAgICAgICAgICAgICAgICAgICAgJ3VpLW1lc3NhZ2VzLWVycm9yJzoodmFsdWVbMF0uc2V2ZXJpdHkgPT09ICdlcnJvcicpLFxuICAgICAgICAgICAgICAgICAgICAndWktbWVzc2FnZXMtc3VjY2Vzcyc6KHZhbHVlWzBdLnNldmVyaXR5ID09PSAnc3VjY2VzcycpfVwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiBbQG1lc3NhZ2VBbmltYXRpb25dPVwie3ZhbHVlOiAndmlzaWJsZScsIHBhcmFtczoge3Nob3dUcmFuc2l0aW9uUGFyYW1zOiBzaG93VHJhbnNpdGlvbk9wdGlvbnMsIGhpZGVUcmFuc2l0aW9uUGFyYW1zOiBoaWRlVHJhbnNpdGlvbk9wdGlvbnN9fVwiPlxuICAgICAgICAgICAgPGEgdGFiaW5kZXg9XCIwXCIgY2xhc3M9XCJ1aS1tZXNzYWdlcy1jbG9zZVwiIChjbGljayk9XCJjbGVhcigkZXZlbnQpXCIgKGtleWRvd24uZW50ZXIpPVwiY2xlYXIoJGV2ZW50KVwiICpuZ0lmPVwiY2xvc2FibGVcIj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cInBpIHBpLXRpbWVzXCI+PC9pPlxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1tZXNzYWdlcy1pY29uIHBpXCIgW25nQ2xhc3NdPVwiaWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IG1zZyBvZiB2YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIm1zZy5zdW1tYXJ5XCIgY2xhc3M9XCJ1aS1tZXNzYWdlcy1zdW1tYXJ5XCIgW2lubmVySFRNTF09XCJtc2cuc3VtbWFyeVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJtc2cuZGV0YWlsXCIgY2xhc3M9XCJ1aS1tZXNzYWdlcy1kZXRhaWxcIiBbaW5uZXJIVE1MXT1cIm1zZy5kZXRhaWxcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdtZXNzYWdlQW5pbWF0aW9uJywgW1xuICAgICAgICAgICAgc3RhdGUoJ3Zpc2libGUnLCBzdHlsZSh7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgfSkpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiAqJywgW1xuICAgICAgICAgICAgICAgIHN0eWxlKHt0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC0yNSUpJywgb3BhY2l0eTogMH0pLFxuICAgICAgICAgICAgICAgIGFuaW1hdGUoJ3t7c2hvd1RyYW5zaXRpb25QYXJhbXN9fScpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJyogPT4gdm9pZCcsIFtcbiAgICAgICAgICAgICAgICBhbmltYXRlKCgne3toaWRlVHJhbnNpdGlvblBhcmFtc319JyksIHN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtMjUlKSdcbiAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBNZXNzYWdlcyBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHZhbHVlOiBNZXNzYWdlW107XG5cbiAgICBASW5wdXQoKSBjbG9zYWJsZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBzdHlsZTogYW55O1xuICAgIFxuICAgIEBJbnB1dCgpIHN0eWxlQ2xhc3M6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGVuYWJsZVNlcnZpY2U6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQElucHV0KCkga2V5OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzaG93VHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICczMDBtcyBlYXNlLW91dCc7XG5cbiAgICBASW5wdXQoKSBoaWRlVHJhbnNpdGlvbk9wdGlvbnM6IHN0cmluZyA9ICcyNTBtcyBlYXNlLWluJztcblxuICAgIEBPdXRwdXQoKSB2YWx1ZUNoYW5nZTogRXZlbnRFbWl0dGVyPE1lc3NhZ2VbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1lc3NhZ2VbXT4oKTtcbiAgICBcbiAgICBtZXNzYWdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjbGVhclN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgcHVibGljIG1lc3NhZ2VTZXJ2aWNlOiBNZXNzYWdlU2VydmljZSkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZih0aGlzLm1lc3NhZ2VTZXJ2aWNlICYmIHRoaXMuZW5hYmxlU2VydmljZSkge1xuICAgICAgICAgICAgdGhpcy5tZXNzYWdlU3Vic2NyaXB0aW9uID0gdGhpcy5tZXNzYWdlU2VydmljZS5tZXNzYWdlT2JzZXJ2ZXIuc3Vic2NyaWJlKChtZXNzYWdlczogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYobWVzc2FnZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYobWVzc2FnZXMgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbHRlcmVkTWVzc2FnZXMgPSBtZXNzYWdlcy5maWx0ZXIobSA9PiB0aGlzLmtleSA9PT0gbS5rZXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUgPyBbLi4udGhpcy52YWx1ZSwgLi4uZmlsdGVyZWRNZXNzYWdlc10gOiBbLi4uZmlsdGVyZWRNZXNzYWdlc107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5rZXkgPT09IG1lc3NhZ2VzLmtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWUgPyBbLi4udGhpcy52YWx1ZSwgLi4uW21lc3NhZ2VzXV0gOiBbbWVzc2FnZXNdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuY2xlYXJTdWJzY3JpcHRpb24gPSB0aGlzLm1lc3NhZ2VTZXJ2aWNlLmNsZWFyT2JzZXJ2ZXIuc3Vic2NyaWJlKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5rZXkgPT09IGtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFzTWVzc2FnZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlICYmIHRoaXMudmFsdWUubGVuZ3RoID4gMDtcbiAgICB9XG5cbiAgICBnZXRTZXZlcml0eUNsYXNzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZVswXS5zZXZlcml0eTtcbiAgICB9XG5cbiAgICBjbGVhcihldmVudCkge1xuICAgICAgICB0aGlzLnZhbHVlID0gW107XG4gICAgICAgIHRoaXMudmFsdWVDaGFuZ2UuZW1pdCh0aGlzLnZhbHVlKTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGdldCBpY29uKCk6IHN0cmluZyB7XG4gICAgICAgIGxldCBpY29uOiBzdHJpbmcgPSBudWxsO1xuICAgICAgICBpZih0aGlzLmhhc01lc3NhZ2VzKCkpIHtcbiAgICAgICAgICAgIGxldCBtc2cgPSB0aGlzLnZhbHVlWzBdO1xuICAgICAgICAgICAgc3dpdGNoKG1zZy5zZXZlcml0eSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3N1Y2Nlc3MnOlxuICAgICAgICAgICAgICAgICAgICBpY29uID0gJ3BpLWNoZWNrJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2luZm8nOlxuICAgICAgICAgICAgICAgICAgICBpY29uID0gJ3BpLWluZm8tY2lyY2xlJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Vycm9yJzpcbiAgICAgICAgICAgICAgICAgICAgaWNvbiA9ICdwaS10aW1lcyc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICd3YXJuJzpcbiAgICAgICAgICAgICAgICAgICAgaWNvbiA9ICdwaS1leGNsYW1hdGlvbi10cmlhbmdsZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpY29uID0gJ3BpLWluZm8tY2lyY2xlJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpY29uO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5tZXNzYWdlU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuY2xlYXJTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbTWVzc2FnZXNdLFxuICAgIGRlY2xhcmF0aW9uczogW01lc3NhZ2VzXVxufSlcbmV4cG9ydCBjbGFzcyBNZXNzYWdlc01vZHVsZSB7IH1cbiJdfQ==