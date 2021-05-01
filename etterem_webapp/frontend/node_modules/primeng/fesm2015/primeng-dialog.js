import { EventEmitter, ElementRef, Renderer2, NgZone, Input, ContentChildren, ViewChild, Output, Component, NgModule } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { DomHandler } from 'primeng/dom';
import { Header, Footer, SharedModule } from 'primeng/api';

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
let idx = 0;
let Dialog = class Dialog {
    constructor(el, renderer, zone) {
        this.el = el;
        this.renderer = renderer;
        this.zone = zone;
        this.draggable = true;
        this.resizable = true;
        this.closeOnEscape = true;
        this.closable = true;
        this.responsive = true;
        this.showHeader = true;
        this.breakpoint = 640;
        this.blockScroll = false;
        this.autoZIndex = true;
        this.baseZIndex = 0;
        this.minX = 0;
        this.minY = 0;
        this.focusOnShow = true;
        this.focusTrap = true;
        this.transitionOptions = '150ms cubic-bezier(0, 0, 0.2, 1)';
        this.closeIcon = 'pi pi-times';
        this.minimizeIcon = 'pi pi-window-minimize';
        this.maximizeIcon = 'pi pi-window-maximize';
        this.onShow = new EventEmitter();
        this.onHide = new EventEmitter();
        this.visibleChange = new EventEmitter();
        this.id = `ui-dialog-${idx++}`;
    }
    get style() {
        return this._style;
    }
    set style(value) {
        if (value) {
            this._style = Object.assign({}, value);
            this.originalStyle = value;
        }
    }
    focus() {
        let focusable = DomHandler.findSingle(this.container, 'button');
        if (focusable) {
            this.zone.runOutsideAngular(() => {
                setTimeout(() => focusable.focus(), 5);
            });
        }
    }
    positionOverlay() {
        let viewport = DomHandler.getViewport();
        if (DomHandler.getOuterHeight(this.container) + this.contentViewChild.nativeElement.scrollHeight - this.contentViewChild.nativeElement.clientHeight > viewport.height) {
            this.contentViewChild.nativeElement.style.height = (viewport.height * .75) + 'px';
            this._style.height = 'auto';
        }
        else {
            this.contentViewChild.nativeElement.style.height = null;
        }
        if (this.positionLeft >= 0 && this.positionTop >= 0) {
            this._style.left = this.positionLeft + 'px';
            this._style.top = this.positionTop + 'px';
        }
        else if (this.positionTop >= 0) {
            this.center();
            this._style.top = this.positionTop + 'px';
        }
        else {
            this.center();
        }
    }
    close(event) {
        this.visibleChange.emit(false);
        event.preventDefault();
    }
    center() {
        let elementWidth = DomHandler.getOuterWidth(this.container);
        let elementHeight = DomHandler.getOuterHeight(this.container);
        if (elementWidth == 0 && elementHeight == 0) {
            this.container.style.visibility = 'hidden';
            this.container.style.display = 'block';
            elementWidth = DomHandler.getOuterWidth(this.container);
            elementHeight = DomHandler.getOuterHeight(this.container);
            this.container.style.display = 'none';
            this.container.style.visibility = 'visible';
        }
        let viewport = DomHandler.getViewport();
        let x = Math.max(Math.floor((viewport.width - elementWidth) / 2), 0);
        let y = Math.max(Math.floor((viewport.height - elementHeight) / 2), 0);
        this._style.left = x + 'px';
        this._style.top = y + 'px';
    }
    enableModality() {
        if (!this.mask) {
            this.mask = document.createElement('div');
            this.mask.style.zIndex = String(parseInt(this.container.style.zIndex) - 1);
            let maskStyleClass = 'ui-widget-overlay ui-dialog-mask';
            if (this.blockScroll) {
                maskStyleClass += ' ui-dialog-mask-scrollblocker';
            }
            DomHandler.addMultipleClasses(this.mask, maskStyleClass);
            if (this.closable && this.dismissableMask) {
                this.maskClickListener = this.renderer.listen(this.mask, 'click', (event) => {
                    this.close(event);
                });
            }
            document.body.appendChild(this.mask);
            if (this.blockScroll) {
                DomHandler.addClass(document.body, 'ui-overflow-hidden');
            }
        }
    }
    disableModality() {
        if (this.mask) {
            this.unbindMaskClickListener();
            document.body.removeChild(this.mask);
            if (this.blockScroll) {
                let bodyChildren = document.body.children;
                let hasBlockerMasks;
                for (let i = 0; i < bodyChildren.length; i++) {
                    let bodyChild = bodyChildren[i];
                    if (DomHandler.hasClass(bodyChild, 'ui-dialog-mask-scrollblocker')) {
                        hasBlockerMasks = true;
                        break;
                    }
                }
                if (!hasBlockerMasks) {
                    DomHandler.removeClass(document.body, 'ui-overflow-hidden');
                }
            }
            this.mask = null;
        }
    }
    toggleMaximize(event) {
        if (this.maximized)
            this.revertMaximize();
        else
            this.maximize();
        event.preventDefault();
    }
    maximize() {
        this.preMaximizePageX = parseFloat(this.container.style.top);
        this.preMaximizePageY = parseFloat(this.container.style.left);
        this.preMaximizeContainerWidth = DomHandler.getOuterWidth(this.container);
        this.preMaximizeContainerHeight = DomHandler.getOuterHeight(this.container);
        this.preMaximizeContentHeight = DomHandler.getOuterHeight(this.contentViewChild.nativeElement);
        this._style.top = '0px';
        this._style.left = '0px';
        this._style.width = '100vw';
        this._style.height = '100vh';
        let diffHeight = 0;
        if (this.headerViewChild && this.headerViewChild.nativeElement) {
            diffHeight += DomHandler.getOuterHeight(this.headerViewChild.nativeElement);
        }
        if (this.footerViewChild && this.footerViewChild.nativeElement) {
            diffHeight += DomHandler.getOuterHeight(this.footerViewChild.nativeElement);
        }
        this.contentViewChild.nativeElement.style.height = 'calc(100vh - ' + diffHeight + 'px)';
        DomHandler.addClass(this.container, 'ui-dialog-maximized');
        if (!this.blockScroll) {
            DomHandler.addClass(document.body, 'ui-overflow-hidden');
        }
        this.moveOnTop();
        this.maximized = true;
    }
    revertMaximize() {
        this._style.top = this.preMaximizePageX + 'px';
        this._style.left = this.preMaximizePageY + 'px';
        this._style.width = this.preMaximizeContainerWidth + 'px';
        this._style.height = this.preMaximizeContainerHeight + 'px';
        this.contentViewChild.nativeElement.style.height = this.preMaximizeContentHeight + 'px';
        if (!this.blockScroll) {
            DomHandler.removeClass(document.body, 'ui-overflow-hidden');
        }
        this.maximized = false;
        this.zone.runOutsideAngular(() => {
            setTimeout(() => DomHandler.removeClass(this.container, 'ui-dialog-maximized'), 300);
        });
    }
    unbindMaskClickListener() {
        if (this.maskClickListener) {
            this.maskClickListener();
            this.maskClickListener = null;
        }
    }
    moveOnTop() {
        if (this.autoZIndex) {
            this.container.style.zIndex = String(this.baseZIndex + (++DomHandler.zindex));
        }
    }
    onCloseMouseDown(event) {
        this.closeIconMouseDown = true;
    }
    initDrag(event) {
        if (this.closeIconMouseDown) {
            this.closeIconMouseDown = false;
            return;
        }
        if (this.draggable) {
            this.dragging = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
            DomHandler.addClass(document.body, 'ui-unselectable-text');
        }
    }
    onKeydown(event) {
        if (this.focusTrap) {
            if (event.which === 9) {
                event.preventDefault();
                let focusableElements = DomHandler.getFocusableElements(this.container);
                if (focusableElements && focusableElements.length > 0) {
                    if (!document.activeElement) {
                        focusableElements[0].focus();
                    }
                    else {
                        let focusedIndex = focusableElements.indexOf(document.activeElement);
                        if (event.shiftKey) {
                            if (focusedIndex == -1 || focusedIndex === 0)
                                focusableElements[focusableElements.length - 1].focus();
                            else
                                focusableElements[focusedIndex - 1].focus();
                        }
                        else {
                            if (focusedIndex == -1 || focusedIndex === (focusableElements.length - 1))
                                focusableElements[0].focus();
                            else
                                focusableElements[focusedIndex + 1].focus();
                        }
                    }
                }
            }
        }
    }
    onDrag(event) {
        if (this.dragging) {
            let containerWidth = DomHandler.getOuterWidth(this.container);
            let containerHeight = DomHandler.getOuterHeight(this.container);
            let deltaX = event.pageX - this.lastPageX;
            let deltaY = event.pageY - this.lastPageY;
            let offset = DomHandler.getOffset(this.container);
            let leftPos = offset.left + deltaX;
            let topPos = offset.top + deltaY;
            let viewport = DomHandler.getViewport();
            if (leftPos >= this.minX && (leftPos + containerWidth) < viewport.width) {
                this._style.left = leftPos + 'px';
            }
            if (topPos >= this.minY && (topPos + containerHeight) < viewport.height) {
                this._style.top = topPos + 'px';
            }
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
            this.container.style.left = leftPos + 'px';
            this.container.style.top = topPos + 'px';
        }
    }
    endDrag(event) {
        if (this.draggable) {
            this.dragging = false;
            DomHandler.removeClass(document.body, 'ui-unselectable-text');
        }
    }
    initResize(event) {
        if (this.resizable) {
            this.preWidth = null;
            this.resizing = true;
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
            DomHandler.addClass(document.body, 'ui-unselectable-text');
        }
    }
    onResize(event) {
        if (this.resizing) {
            let deltaX = event.pageX - this.lastPageX;
            let deltaY = event.pageY - this.lastPageY;
            let containerWidth = DomHandler.getOuterWidth(this.container);
            let containerHeight = DomHandler.getOuterHeight(this.container);
            let contentHeight = DomHandler.getOuterHeight(this.contentViewChild.nativeElement);
            let newWidth = containerWidth + deltaX;
            let newHeight = containerHeight + deltaY;
            let minWidth = this.container.style.minWidth;
            let minHeight = this.container.style.minHeight;
            let offset = DomHandler.getOffset(this.container);
            let viewport = DomHandler.getViewport();
            if ((!minWidth || newWidth > parseInt(minWidth)) && (offset.left + newWidth) < viewport.width) {
                this._style.width = newWidth + 'px';
                this.container.style.width = this._style.width;
            }
            if ((!minHeight || newHeight > parseInt(minHeight)) && (offset.top + newHeight) < viewport.height) {
                this._style.height = newHeight + 'px';
                this.contentViewChild.nativeElement.style.height = contentHeight + deltaY + 'px';
            }
            this.lastPageX = event.pageX;
            this.lastPageY = event.pageY;
        }
    }
    onResizeEnd() {
        if (this.resizing) {
            this.resizing = false;
            DomHandler.removeClass(document.body, 'ui-unselectable-text');
        }
    }
    bindGlobalListeners() {
        if (this.focusTrap) {
            this.bindDocumentKeydownListener();
        }
        if (this.draggable) {
            this.bindDocumentDragListener();
            this.bindDocumentDragEndListener();
        }
        if (this.resizable) {
            this.bindDocumentResizeListeners();
        }
        if (this.responsive) {
            this.bindDocumentResponsiveListener();
        }
        if (this.closeOnEscape && this.closable) {
            this.bindDocumentEscapeListener();
        }
    }
    unbindGlobalListeners() {
        this.unbindDocumentDragListener();
        this.unbindDocumentKeydownListener();
        this.unbindDocumentDragEndListener();
        this.unbindDocumentResizeListeners();
        this.unbindDocumentResponsiveListener();
        this.unbindDocumentEscapeListener();
    }
    bindDocumentKeydownListener() {
        this.zone.runOutsideAngular(() => {
            this.documentKeydownListener = this.onKeydown.bind(this);
            window.document.addEventListener('keydown', this.documentKeydownListener);
        });
    }
    unbindDocumentKeydownListener() {
        if (this.documentKeydownListener) {
            window.document.removeEventListener('keydown', this.documentKeydownListener);
            this.documentKeydownListener = null;
        }
    }
    bindDocumentDragListener() {
        this.zone.runOutsideAngular(() => {
            this.documentDragListener = this.onDrag.bind(this);
            window.document.addEventListener('mousemove', this.documentDragListener);
        });
    }
    unbindDocumentDragListener() {
        if (this.documentDragListener) {
            window.document.removeEventListener('mousemove', this.documentDragListener);
            this.documentDragListener = null;
        }
    }
    bindDocumentDragEndListener() {
        this.zone.runOutsideAngular(() => {
            this.documentDragEndListener = this.endDrag.bind(this);
            window.document.addEventListener('mouseup', this.documentDragEndListener);
        });
    }
    unbindDocumentDragEndListener() {
        if (this.documentDragEndListener) {
            window.document.removeEventListener('mouseup', this.documentDragEndListener);
            this.documentDragEndListener = null;
        }
    }
    bindDocumentResizeListeners() {
        this.zone.runOutsideAngular(() => {
            this.documentResizeListener = this.onResize.bind(this);
            this.documentResizeEndListener = this.onResizeEnd.bind(this);
            window.document.addEventListener('mousemove', this.documentResizeListener);
            window.document.addEventListener('mouseup', this.documentResizeEndListener);
        });
    }
    unbindDocumentResizeListeners() {
        if (this.documentResizeListener && this.documentResizeEndListener) {
            window.document.removeEventListener('mouseup', this.documentResizeListener);
            window.document.removeEventListener('mouseup', this.documentResizeEndListener);
            this.documentResizeListener = null;
            this.documentResizeEndListener = null;
        }
    }
    bindDocumentResponsiveListener() {
        this.zone.runOutsideAngular(() => {
            this.documentResponsiveListener = this.onWindowResize.bind(this);
            window.addEventListener('resize', this.documentResponsiveListener);
        });
    }
    unbindDocumentResponsiveListener() {
        if (this.documentResponsiveListener) {
            window.removeEventListener('resize', this.documentResponsiveListener);
            this.documentResponsiveListener = null;
        }
    }
    onWindowResize() {
        if (this.maximized) {
            return;
        }
        let viewport = DomHandler.getViewport();
        if (viewport.width <= this.breakpoint) {
            if (!this.preWidth) {
                this.preWidth = this._style.width;
            }
            this._style.left = '0px';
            this._style.width = '100%';
            //outside zone
            this.container.style.left = this._style.left;
            this.container.style.width = this._style.width;
        }
        else {
            if (this.preWidth) {
                this._style.width = this.preWidth;
            }
            //outside zone
            this.container.style.left = this._style.left;
            this.container.style.top = this._style.top;
            this.container.style.width = this._style.width;
            this.positionOverlay();
        }
    }
    bindDocumentEscapeListener() {
        this.documentEscapeListener = this.renderer.listen('document', 'keydown', (event) => {
            if (event.which == 27) {
                if (parseInt(this.container.style.zIndex) === (DomHandler.zindex + this.baseZIndex)) {
                    this.close(event);
                }
            }
        });
    }
    unbindDocumentEscapeListener() {
        if (this.documentEscapeListener) {
            this.documentEscapeListener();
            this.documentEscapeListener = null;
        }
    }
    appendContainer() {
        if (this.appendTo) {
            if (this.appendTo === 'body')
                document.body.appendChild(this.container);
            else
                DomHandler.appendChild(this.container, this.appendTo);
        }
    }
    restoreAppend() {
        if (this.container && this.appendTo) {
            this.el.nativeElement.appendChild(this.container);
        }
    }
    onAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.container = event.element;
                this.onShow.emit({});
                this.appendContainer();
                this.moveOnTop();
                this.positionOverlay();
                this.bindGlobalListeners();
                if (this.maximized) {
                    DomHandler.addClass(document.body, 'ui-overflow-hidden');
                }
                if (this.modal) {
                    this.enableModality();
                }
                if (this.focusOnShow) {
                    this.focus();
                }
                if (this.responsive) {
                    this.onWindowResize();
                }
                break;
            case 'void':
                this.onContainerDestroy();
                this.onHide.emit({});
                break;
        }
    }
    onContainerDestroy() {
        this.unbindGlobalListeners();
        this.dragging = false;
        if (this.maximized) {
            DomHandler.removeClass(document.body, 'ui-overflow-hidden');
            this.maximized = false;
        }
        if (this.modal) {
            this.disableModality();
        }
        this.container = null;
        this._style = this.originalStyle ? Object.assign({}, this.originalStyle) : null;
    }
    ngOnDestroy() {
        if (this.container) {
            this.restoreAppend();
            this.onContainerDestroy();
        }
    }
};
Dialog.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgZone }
];
__decorate([
    Input()
], Dialog.prototype, "visible", void 0);
__decorate([
    Input()
], Dialog.prototype, "header", void 0);
__decorate([
    Input()
], Dialog.prototype, "draggable", void 0);
__decorate([
    Input()
], Dialog.prototype, "resizable", void 0);
__decorate([
    Input()
], Dialog.prototype, "positionLeft", void 0);
__decorate([
    Input()
], Dialog.prototype, "positionTop", void 0);
__decorate([
    Input()
], Dialog.prototype, "contentStyle", void 0);
__decorate([
    Input()
], Dialog.prototype, "modal", void 0);
__decorate([
    Input()
], Dialog.prototype, "closeOnEscape", void 0);
__decorate([
    Input()
], Dialog.prototype, "dismissableMask", void 0);
__decorate([
    Input()
], Dialog.prototype, "rtl", void 0);
__decorate([
    Input()
], Dialog.prototype, "closable", void 0);
__decorate([
    Input()
], Dialog.prototype, "responsive", void 0);
__decorate([
    Input()
], Dialog.prototype, "appendTo", void 0);
__decorate([
    Input()
], Dialog.prototype, "styleClass", void 0);
__decorate([
    Input()
], Dialog.prototype, "showHeader", void 0);
__decorate([
    Input()
], Dialog.prototype, "breakpoint", void 0);
__decorate([
    Input()
], Dialog.prototype, "blockScroll", void 0);
__decorate([
    Input()
], Dialog.prototype, "autoZIndex", void 0);
__decorate([
    Input()
], Dialog.prototype, "baseZIndex", void 0);
__decorate([
    Input()
], Dialog.prototype, "minX", void 0);
__decorate([
    Input()
], Dialog.prototype, "minY", void 0);
__decorate([
    Input()
], Dialog.prototype, "focusOnShow", void 0);
__decorate([
    Input()
], Dialog.prototype, "maximizable", void 0);
__decorate([
    Input()
], Dialog.prototype, "focusTrap", void 0);
__decorate([
    Input()
], Dialog.prototype, "transitionOptions", void 0);
__decorate([
    Input()
], Dialog.prototype, "closeIcon", void 0);
__decorate([
    Input()
], Dialog.prototype, "minimizeIcon", void 0);
__decorate([
    Input()
], Dialog.prototype, "maximizeIcon", void 0);
__decorate([
    ContentChildren(Header, { descendants: false })
], Dialog.prototype, "headerFacet", void 0);
__decorate([
    ContentChildren(Footer, { descendants: false })
], Dialog.prototype, "footerFacet", void 0);
__decorate([
    ViewChild('titlebar')
], Dialog.prototype, "headerViewChild", void 0);
__decorate([
    ViewChild('content')
], Dialog.prototype, "contentViewChild", void 0);
__decorate([
    ViewChild('footer')
], Dialog.prototype, "footerViewChild", void 0);
__decorate([
    Output()
], Dialog.prototype, "onShow", void 0);
__decorate([
    Output()
], Dialog.prototype, "onHide", void 0);
__decorate([
    Output()
], Dialog.prototype, "visibleChange", void 0);
__decorate([
    Input()
], Dialog.prototype, "style", null);
Dialog = __decorate([
    Component({
        selector: 'p-dialog',
        template: `
    <div #container [ngClass]="{'ui-dialog ui-widget ui-widget-content ui-corner-all ui-shadow':true, 'ui-dialog-rtl':rtl,'ui-dialog-draggable':draggable,'ui-dialog-resizable':resizable}"
        [ngStyle]="style" [class]="styleClass"
        [@animation]="{value: 'visible', params: {transitionParams: transitionOptions}}" (@animation.start)="onAnimationStart($event)" role="dialog" [attr.aria-labelledby]="id + '-label'" *ngIf="visible">
        <div #titlebar class="ui-dialog-titlebar ui-widget-header ui-helper-clearfix ui-corner-top" (mousedown)="initDrag($event)" *ngIf="showHeader">
            <span [attr.id]="id + '-label'" class="ui-dialog-title" *ngIf="header">{{header}}</span>
            <span [attr.id]="id + '-label'" class="ui-dialog-title" *ngIf="headerFacet && headerFacet.first">
                <ng-content select="p-header"></ng-content>
            </span>
            <a *ngIf="closable" [ngClass]="{'ui-dialog-titlebar-icon ui-dialog-titlebar-close ui-corner-all':true}" tabindex="0" role="button" (click)="close($event)" (keydown.enter)="close($event)" (mousedown)="onCloseMouseDown($event)">
                <span [class]="closeIcon"></span>
            </a>
            <a *ngIf="maximizable" [ngClass]="{'ui-dialog-titlebar-icon ui-dialog-titlebar-maximize ui-corner-all':true}" tabindex="0" role="button" (click)="toggleMaximize($event)" (keydown.enter)="toggleMaximize($event)">
                <span [ngClass]="maximized ? minimizeIcon : maximizeIcon"></span>
            </a>
        </div>
        <div #content class="ui-dialog-content ui-widget-content" [ngStyle]="contentStyle">
            <ng-content></ng-content>
        </div>
        <div #footer class="ui-dialog-footer ui-widget-content" *ngIf="footerFacet && footerFacet.first">
            <ng-content select="p-footer"></ng-content>
        </div>
        <div *ngIf="resizable" class="ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se" style="z-index: 90;" (mousedown)="initResize($event)"></div>
    </div>
`,
        animations: [
            trigger('animation', [
                state('void', style({
                    transform: 'scale(0.7)',
                    opacity: 0
                })),
                state('visible', style({
                    transform: 'none',
                    opacity: 1
                })),
                transition('* => *', animate('{{transitionParams}}'))
            ])
        ]
    })
], Dialog);
let DialogModule = class DialogModule {
};
DialogModule = __decorate([
    NgModule({
        imports: [CommonModule],
        exports: [Dialog, SharedModule],
        declarations: [Dialog]
    })
], DialogModule);

/**
 * Generated bundle index. Do not edit.
 */

export { Dialog, DialogModule };
//# sourceMappingURL=primeng-dialog.js.map
