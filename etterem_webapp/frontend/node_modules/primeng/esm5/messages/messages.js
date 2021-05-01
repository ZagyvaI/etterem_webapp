var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { NgModule, Component, Input, Output, EventEmitter, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MessageService } from 'primeng/api';
var Messages = /** @class */ (function () {
    function Messages(messageService) {
        this.messageService = messageService;
        this.closable = true;
        this.enableService = true;
        this.showTransitionOptions = '300ms ease-out';
        this.hideTransitionOptions = '250ms ease-in';
        this.valueChange = new EventEmitter();
    }
    Messages.prototype.ngOnInit = function () {
        var _this = this;
        if (this.messageService && this.enableService) {
            this.messageSubscription = this.messageService.messageObserver.subscribe(function (messages) {
                if (messages) {
                    if (messages instanceof Array) {
                        var filteredMessages = messages.filter(function (m) { return _this.key === m.key; });
                        _this.value = _this.value ? __spread(_this.value, filteredMessages) : __spread(filteredMessages);
                    }
                    else if (_this.key === messages.key) {
                        _this.value = _this.value ? __spread(_this.value, [messages]) : [messages];
                    }
                }
            });
            this.clearSubscription = this.messageService.clearObserver.subscribe(function (key) {
                if (key) {
                    if (_this.key === key) {
                        _this.value = null;
                    }
                }
                else {
                    _this.value = null;
                }
            });
        }
    };
    Messages.prototype.hasMessages = function () {
        return this.value && this.value.length > 0;
    };
    Messages.prototype.getSeverityClass = function () {
        return this.value[0].severity;
    };
    Messages.prototype.clear = function (event) {
        this.value = [];
        this.valueChange.emit(this.value);
        event.preventDefault();
    };
    Object.defineProperty(Messages.prototype, "icon", {
        get: function () {
            var icon = null;
            if (this.hasMessages()) {
                var msg = this.value[0];
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
        },
        enumerable: true,
        configurable: true
    });
    Messages.prototype.ngOnDestroy = function () {
        if (this.messageSubscription) {
            this.messageSubscription.unsubscribe();
        }
        if (this.clearSubscription) {
            this.clearSubscription.unsubscribe();
        }
    };
    Messages.ctorParameters = function () { return [
        { type: MessageService, decorators: [{ type: Optional }] }
    ]; };
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
            template: "\n        <div *ngIf=\"hasMessages()\" class=\"ui-messages ui-widget ui-corner-all\"\n                    [ngClass]=\"{'ui-messages-info':(value[0].severity === 'info'),\n                    'ui-messages-warn':(value[0].severity === 'warn'),\n                    'ui-messages-error':(value[0].severity === 'error'),\n                    'ui-messages-success':(value[0].severity === 'success')}\"\n                    [ngStyle]=\"style\" [class]=\"styleClass\" [@messageAnimation]=\"{value: 'visible', params: {showTransitionParams: showTransitionOptions, hideTransitionParams: hideTransitionOptions}}\">\n            <a tabindex=\"0\" class=\"ui-messages-close\" (click)=\"clear($event)\" (keydown.enter)=\"clear($event)\" *ngIf=\"closable\">\n                <i class=\"pi pi-times\"></i>\n            </a>\n            <span class=\"ui-messages-icon pi\" [ngClass]=\"icon\"></span>\n            <ul>\n                <li *ngFor=\"let msg of value\">\n                    <span *ngIf=\"msg.summary\" class=\"ui-messages-summary\" [innerHTML]=\"msg.summary\"></span>\n                    <span *ngIf=\"msg.detail\" class=\"ui-messages-detail\" [innerHTML]=\"msg.detail\"></span>\n                </li>\n            </ul>\n        </div>\n    ",
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
    return Messages;
}());
export { Messages };
var MessagesModule = /** @class */ (function () {
    function MessagesModule() {
    }
    MessagesModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Messages],
            declarations: [Messages]
        })
    ], MessagesModule);
    return MessagesModule;
}());
export { MessagesModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9wcmltZW5nL21lc3NhZ2VzLyIsInNvdXJjZXMiOlsibWVzc2FnZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxPQUFPLEVBQUMsUUFBUSxFQUFDLFNBQVMsRUFBa0IsS0FBSyxFQUFDLE1BQU0sRUFBQyxZQUFZLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3JHLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsVUFBVSxFQUFDLE9BQU8sRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRTNFLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxhQUFhLENBQUM7QUEyQzNDO0lBd0JJLGtCQUErQixjQUE4QjtRQUE5QixtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFwQnBELGFBQVEsR0FBWSxJQUFJLENBQUM7UUFNekIsa0JBQWEsR0FBWSxJQUFJLENBQUM7UUFJOUIsMEJBQXFCLEdBQVcsZ0JBQWdCLENBQUM7UUFFakQsMEJBQXFCLEdBQVcsZUFBZSxDQUFDO1FBRS9DLGdCQUFXLEdBQTRCLElBQUksWUFBWSxFQUFhLENBQUM7SUFNZixDQUFDO0lBRWpFLDJCQUFRLEdBQVI7UUFBQSxpQkF5QkM7UUF4QkcsSUFBRyxJQUFJLENBQUMsY0FBYyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDMUMsSUFBSSxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxVQUFDLFFBQWE7Z0JBQ25GLElBQUcsUUFBUSxFQUFFO29CQUNULElBQUcsUUFBUSxZQUFZLEtBQUssRUFBRTt3QkFDMUIsSUFBSSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsS0FB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UUFBUSxDQUFDO1NBQzNCLENBQUM7T0FDVyxjQUFjLENBQUk7SUFBRCxxQkFBQztDQUFBLEFBQS9CLElBQStCO1NBQWxCLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxPbkluaXQsT25EZXN0cm95LElucHV0LE91dHB1dCxFdmVudEVtaXR0ZXIsT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb21tb25Nb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge3RyaWdnZXIsc3RhdGUsc3R5bGUsdHJhbnNpdGlvbixhbmltYXRlfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7TWVzc2FnZX0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHtNZXNzYWdlU2VydmljZX0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtbWVzc2FnZXMnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgKm5nSWY9XCJoYXNNZXNzYWdlcygpXCIgY2xhc3M9XCJ1aS1tZXNzYWdlcyB1aS13aWRnZXQgdWktY29ybmVyLWFsbFwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktbWVzc2FnZXMtaW5mbyc6KHZhbHVlWzBdLnNldmVyaXR5ID09PSAnaW5mbycpLFxuICAgICAgICAgICAgICAgICAgICAndWktbWVzc2FnZXMtd2Fybic6KHZhbHVlWzBdLnNldmVyaXR5ID09PSAnd2FybicpLFxuICAgICAgICAgICAgICAgICAgICAndWktbWVzc2FnZXMtZXJyb3InOih2YWx1ZVswXS5zZXZlcml0eSA9PT0gJ2Vycm9yJyksXG4gICAgICAgICAgICAgICAgICAgICd1aS1tZXNzYWdlcy1zdWNjZXNzJzoodmFsdWVbMF0uc2V2ZXJpdHkgPT09ICdzdWNjZXNzJyl9XCJcbiAgICAgICAgICAgICAgICAgICAgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFtAbWVzc2FnZUFuaW1hdGlvbl09XCJ7dmFsdWU6ICd2aXNpYmxlJywgcGFyYW1zOiB7c2hvd1RyYW5zaXRpb25QYXJhbXM6IHNob3dUcmFuc2l0aW9uT3B0aW9ucywgaGlkZVRyYW5zaXRpb25QYXJhbXM6IGhpZGVUcmFuc2l0aW9uT3B0aW9uc319XCI+XG4gICAgICAgICAgICA8YSB0YWJpbmRleD1cIjBcIiBjbGFzcz1cInVpLW1lc3NhZ2VzLWNsb3NlXCIgKGNsaWNrKT1cImNsZWFyKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJjbGVhcigkZXZlbnQpXCIgKm5nSWY9XCJjbG9zYWJsZVwiPlxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwicGkgcGktdGltZXNcIj48L2k+XG4gICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cInVpLW1lc3NhZ2VzLWljb24gcGlcIiBbbmdDbGFzc109XCJpY29uXCI+PC9zcGFuPlxuICAgICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgbXNnIG9mIHZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwibXNnLnN1bW1hcnlcIiBjbGFzcz1cInVpLW1lc3NhZ2VzLXN1bW1hcnlcIiBbaW5uZXJIVE1MXT1cIm1zZy5zdW1tYXJ5XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIm1zZy5kZXRhaWxcIiBjbGFzcz1cInVpLW1lc3NhZ2VzLWRldGFpbFwiIFtpbm5lckhUTUxdPVwibXNnLmRldGFpbFwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgPC91bD5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ21lc3NhZ2VBbmltYXRpb24nLCBbXG4gICAgICAgICAgICBzdGF0ZSgndmlzaWJsZScsIHN0eWxlKHtcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICB9KSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IConLCBbXG4gICAgICAgICAgICAgICAgc3R5bGUoe3RyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTI1JSknLCBvcGFjaXR5OiAwfSksXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSgne3tzaG93VHJhbnNpdGlvblBhcmFtc319JylcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgdHJhbnNpdGlvbignKiA9PiB2b2lkJywgW1xuICAgICAgICAgICAgICAgIGFuaW1hdGUoKCd7e2hpZGVUcmFuc2l0aW9uUGFyYW1zfX0nKSwgc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC0yNSUpJ1xuICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VzIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgdmFsdWU6IE1lc3NhZ2VbXTtcblxuICAgIEBJbnB1dCgpIGNsb3NhYmxlOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG4gICAgXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nO1xuXG4gICAgQElucHV0KCkgZW5hYmxlU2VydmljZTogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBrZXk6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIHNob3dUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzMwMG1zIGVhc2Utb3V0JztcblxuICAgIEBJbnB1dCgpIGhpZGVUcmFuc2l0aW9uT3B0aW9uczogc3RyaW5nID0gJzI1MG1zIGVhc2UtaW4nO1xuXG4gICAgQE91dHB1dCgpIHZhbHVlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8TWVzc2FnZVtdPiA9IG5ldyBFdmVudEVtaXR0ZXI8TWVzc2FnZVtdPigpO1xuICAgIFxuICAgIG1lc3NhZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIGNsZWFyU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBwdWJsaWMgbWVzc2FnZVNlcnZpY2U6IE1lc3NhZ2VTZXJ2aWNlKSB7fVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmKHRoaXMubWVzc2FnZVNlcnZpY2UgJiYgdGhpcy5lbmFibGVTZXJ2aWNlKSB7XG4gICAgICAgICAgICB0aGlzLm1lc3NhZ2VTdWJzY3JpcHRpb24gPSB0aGlzLm1lc3NhZ2VTZXJ2aWNlLm1lc3NhZ2VPYnNlcnZlci5zdWJzY3JpYmUoKG1lc3NhZ2VzOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZihtZXNzYWdlcykge1xuICAgICAgICAgICAgICAgICAgICBpZihtZXNzYWdlcyBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyZWRNZXNzYWdlcyA9IG1lc3NhZ2VzLmZpbHRlcihtID0+IHRoaXMua2V5ID09PSBtLmtleSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZSA/IFsuLi50aGlzLnZhbHVlLCAuLi5maWx0ZXJlZE1lc3NhZ2VzXSA6IFsuLi5maWx0ZXJlZE1lc3NhZ2VzXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0aGlzLmtleSA9PT0gbWVzc2FnZXMua2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZSA/IFsuLi50aGlzLnZhbHVlLCAuLi5bbWVzc2FnZXNdXSA6IFttZXNzYWdlc107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5jbGVhclN1YnNjcmlwdGlvbiA9IHRoaXMubWVzc2FnZVNlcnZpY2UuY2xlYXJPYnNlcnZlci5zdWJzY3JpYmUoa2V5ID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmtleSA9PT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNNZXNzYWdlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIGdldFNldmVyaXR5Q2xhc3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlWzBdLnNldmVyaXR5O1xuICAgIH1cblxuICAgIGNsZWFyKGV2ZW50KSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSBbXTtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZS5lbWl0KHRoaXMudmFsdWUpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgZ2V0IGljb24oKTogc3RyaW5nIHtcbiAgICAgICAgbGV0IGljb246IHN0cmluZyA9IG51bGw7XG4gICAgICAgIGlmKHRoaXMuaGFzTWVzc2FnZXMoKSkge1xuICAgICAgICAgICAgbGV0IG1zZyA9IHRoaXMudmFsdWVbMF07XG4gICAgICAgICAgICBzd2l0Y2gobXNnLnNldmVyaXR5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICAgICAgICAgICAgICAgIGljb24gPSAncGktY2hlY2snO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnaW5mbyc6XG4gICAgICAgICAgICAgICAgICAgIGljb24gPSAncGktaW5mby1jaXJjbGUnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZXJyb3InOlxuICAgICAgICAgICAgICAgICAgICBpY29uID0gJ3BpLXRpbWVzJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3dhcm4nOlxuICAgICAgICAgICAgICAgICAgICBpY29uID0gJ3BpLWV4Y2xhbWF0aW9uLXRyaWFuZ2xlJztcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIGljb24gPSAncGktaW5mby1jaXJjbGUnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGljb247XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLm1lc3NhZ2VTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5jbGVhclN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5jbGVhclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICAgIGV4cG9ydHM6IFtNZXNzYWdlc10sXG4gICAgZGVjbGFyYXRpb25zOiBbTWVzc2FnZXNdXG59KVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VzTW9kdWxlIHsgfVxuIl19