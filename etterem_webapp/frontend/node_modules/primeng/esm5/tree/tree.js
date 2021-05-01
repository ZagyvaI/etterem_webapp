var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
import { NgModule, Component, Input, AfterContentInit, OnDestroy, Output, EventEmitter, OnInit, ContentChildren, QueryList, TemplateRef, Inject, ElementRef, forwardRef } from '@angular/core';
import { Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { PrimeTemplate } from 'primeng/api';
import { TreeDragDropService } from 'primeng/api';
import { ObjectUtils } from 'primeng/utils';
import { DomHandler } from 'primeng/dom';
var UITreeNode = /** @class */ (function () {
    function UITreeNode(tree) {
        this.tree = tree;
    }
    UITreeNode_1 = UITreeNode;
    UITreeNode.prototype.ngOnInit = function () {
        this.node.parent = this.parentNode;
        if (this.parentNode) {
            this.tree.syncNodeOption(this.node, this.tree.value, 'parent', this.tree.getNodeWithKey(this.parentNode.key, this.tree.value));
        }
    };
    UITreeNode.prototype.getIcon = function () {
        var icon;
        if (this.node.icon)
            icon = this.node.icon;
        else
            icon = this.node.expanded && this.node.children && this.node.children.length ? this.node.expandedIcon : this.node.collapsedIcon;
        return UITreeNode_1.ICON_CLASS + ' ' + icon;
    };
    UITreeNode.prototype.isLeaf = function () {
        return this.tree.isNodeLeaf(this.node);
    };
    UITreeNode.prototype.toggle = function (event) {
        if (this.node.expanded)
            this.collapse(event);
        else
            this.expand(event);
    };
    UITreeNode.prototype.expand = function (event) {
        this.node.expanded = true;
        this.tree.onNodeExpand.emit({ originalEvent: event, node: this.node });
    };
    UITreeNode.prototype.collapse = function (event) {
        this.node.expanded = false;
        this.tree.onNodeCollapse.emit({ originalEvent: event, node: this.node });
    };
    UITreeNode.prototype.onNodeClick = function (event) {
        this.tree.onNodeClick(event, this.node);
    };
    UITreeNode.prototype.onNodeTouchEnd = function () {
        this.tree.onNodeTouchEnd();
    };
    UITreeNode.prototype.onNodeRightClick = function (event) {
        this.tree.onNodeRightClick(event, this.node);
    };
    UITreeNode.prototype.isSelected = function () {
        return this.tree.isSelected(this.node);
    };
    UITreeNode.prototype.onDropPoint = function (event, position) {
        var _this = this;
        event.preventDefault();
        var dragNode = this.tree.dragNode;
        var dragNodeIndex = this.tree.dragNodeIndex;
        var dragNodeScope = this.tree.dragNodeScope;
        var isValidDropPointIndex = this.tree.dragNodeTree === this.tree ? (position === 1 || dragNodeIndex !== this.index - 1) : true;
        if (this.tree.allowDrop(dragNode, this.node, dragNodeScope) && isValidDropPointIndex) {
            if (this.tree.validateDrop) {
                this.tree.onNodeDrop.emit({
                    originalEvent: event,
                    dragNode: dragNode,
                    dropNode: this.node,
                    dropIndex: this.index,
                    accept: function () {
                        _this.processPointDrop(dragNode, dragNodeIndex, position);
                    }
                });
            }
            else {
                this.processPointDrop(dragNode, dragNodeIndex, position);
                this.tree.onNodeDrop.emit({
                    originalEvent: event,
                    dragNode: dragNode,
                    dropNode: this.node,
                    dropIndex: this.index
                });
            }
        }
        this.draghoverPrev = false;
        this.draghoverNext = false;
    };
    UITreeNode.prototype.processPointDrop = function (dragNode, dragNodeIndex, position) {
        var newNodeList = this.node.parent ? this.node.parent.children : this.tree.value;
        this.tree.dragNodeSubNodes.splice(dragNodeIndex, 1);
        var dropIndex = this.index;
        if (position < 0) {
            dropIndex = (this.tree.dragNodeSubNodes === newNodeList) ? ((this.tree.dragNodeIndex > this.index) ? this.index : this.index - 1) : this.index;
            newNodeList.splice(dropIndex, 0, dragNode);
        }
        else {
            dropIndex = newNodeList.length;
            newNodeList.push(dragNode);
        }
        this.tree.dragDropService.stopDrag({
            node: dragNode,
            subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
            index: dragNodeIndex
        });
    };
    UITreeNode.prototype.onDropPointDragOver = function (event) {
        event.dataTransfer.dropEffect = 'move';
        event.preventDefault();
    };
    UITreeNode.prototype.onDropPointDragEnter = function (event, position) {
        if (this.tree.allowDrop(this.tree.dragNode, this.node, this.tree.dragNodeScope)) {
            if (position < 0)
                this.draghoverPrev = true;
            else
                this.draghoverNext = true;
        }
    };
    UITreeNode.prototype.onDropPointDragLeave = function (event) {
        this.draghoverPrev = false;
        this.draghoverNext = false;
    };
    UITreeNode.prototype.onDragStart = function (event) {
        if (this.tree.draggableNodes && this.node.draggable !== false) {
            event.dataTransfer.setData("text", "data");
            this.tree.dragDropService.startDrag({
                tree: this,
                node: this.node,
                subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
                index: this.index,
                scope: this.tree.draggableScope
            });
        }
        else {
            event.preventDefault();
        }
    };
    UITreeNode.prototype.onDragStop = function (event) {
        this.tree.dragDropService.stopDrag({
            node: this.node,
            subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
            index: this.index
        });
    };
    UITreeNode.prototype.onDropNodeDragOver = function (event) {
        event.dataTransfer.dropEffect = 'move';
        if (this.tree.droppableNodes) {
            event.preventDefault();
            event.stopPropagation();
        }
    };
    UITreeNode.prototype.onDropNode = function (event) {
        var _this = this;
        if (this.tree.droppableNodes && this.node.droppable !== false) {
            event.preventDefault();
            event.stopPropagation();
            var dragNode_1 = this.tree.dragNode;
            if (this.tree.allowDrop(dragNode_1, this.node, this.tree.dragNodeScope)) {
                if (this.tree.validateDrop) {
                    this.tree.onNodeDrop.emit({
                        originalEvent: event,
                        dragNode: dragNode_1,
                        dropNode: this.node,
                        index: this.index,
                        accept: function () {
                            _this.processNodeDrop(dragNode_1);
                        }
                    });
                }
                else {
                    this.processNodeDrop(dragNode_1);
                    this.tree.onNodeDrop.emit({
                        originalEvent: event,
                        dragNode: dragNode_1,
                        dropNode: this.node,
                        index: this.index
                    });
                }
            }
        }
        this.draghoverNode = false;
    };
    UITreeNode.prototype.processNodeDrop = function (dragNode) {
        var dragNodeIndex = this.tree.dragNodeIndex;
        this.tree.dragNodeSubNodes.splice(dragNodeIndex, 1);
        if (this.node.children)
            this.node.children.push(dragNode);
        else
            this.node.children = [dragNode];
        this.tree.dragDropService.stopDrag({
            node: dragNode,
            subNodes: this.node.parent ? this.node.parent.children : this.tree.value,
            index: this.tree.dragNodeIndex
        });
    };
    UITreeNode.prototype.onDropNodeDragEnter = function (event) {
        if (this.tree.droppableNodes && this.node.droppable !== false && this.tree.allowDrop(this.tree.dragNode, this.node, this.tree.dragNodeScope)) {
            this.draghoverNode = true;
        }
    };
    UITreeNode.prototype.onDropNodeDragLeave = function (event) {
        if (this.tree.droppableNodes) {
            var rect = event.currentTarget.getBoundingClientRect();
            if (event.x > rect.left + rect.width || event.x < rect.left || event.y >= Math.floor(rect.top + rect.height) || event.y < rect.top) {
                this.draghoverNode = false;
            }
        }
    };
    UITreeNode.prototype.onKeyDown = function (event) {
        var nodeElement = event.target.parentElement.parentElement;
        if (nodeElement.nodeName !== 'P-TREENODE') {
            return;
        }
        switch (event.which) {
            //down arrow
            case 40:
                var listElement = (this.tree.droppableNodes) ? nodeElement.children[1].children[1] : nodeElement.children[0].children[1];
                if (listElement && listElement.children.length > 0) {
                    this.focusNode(listElement.children[0]);
                }
                else {
                    var nextNodeElement = nodeElement.nextElementSibling;
                    if (nextNodeElement) {
                        this.focusNode(nextNodeElement);
                    }
                    else {
                        var nextSiblingAncestor = this.findNextSiblingOfAncestor(nodeElement);
                        if (nextSiblingAncestor) {
                            this.focusNode(nextSiblingAncestor);
                        }
                    }
                }
                event.preventDefault();
                break;
            //up arrow
            case 38:
                if (nodeElement.previousElementSibling) {
                    this.focusNode(this.findLastVisibleDescendant(nodeElement.previousElementSibling));
                }
                else {
                    var parentNodeElement = this.getParentNodeElement(nodeElement);
                    if (parentNodeElement) {
                        this.focusNode(parentNodeElement);
                    }
                }
                event.preventDefault();
                break;
            //right arrow
            case 39:
                if (!this.node.expanded) {
                    this.expand(event);
                }
                event.preventDefault();
                break;
            //left arrow
            case 37:
                if (this.node.expanded) {
                    this.collapse(event);
                }
                else {
                    var parentNodeElement = this.getParentNodeElement(nodeElement);
                    if (parentNodeElement) {
                        this.focusNode(parentNodeElement);
                    }
                }
                event.preventDefault();
                break;
            //enter
            case 13:
                this.tree.onNodeClick(event, this.node);
                event.preventDefault();
                break;
            default:
                //no op
                break;
        }
    };
    UITreeNode.prototype.findNextSiblingOfAncestor = function (nodeElement) {
        var parentNodeElement = this.getParentNodeElement(nodeElement);
        if (parentNodeElement) {
            if (parentNodeElement.nextElementSibling)
                return parentNodeElement.nextElementSibling;
            else
                return this.findNextSiblingOfAncestor(parentNodeElement);
        }
        else {
            return null;
        }
    };
    UITreeNode.prototype.findLastVisibleDescendant = function (nodeElement) {
        var childrenListElement = nodeElement.children[0].children[1];
        if (childrenListElement && childrenListElement.children.length > 0) {
            var lastChildElement = childrenListElement.children[childrenListElement.children.length - 1];
            return this.findLastVisibleDescendant(lastChildElement);
        }
        else {
            return nodeElement;
        }
    };
    UITreeNode.prototype.getParentNodeElement = function (nodeElement) {
        var parentNodeElement = nodeElement.parentElement.parentElement.parentElement;
        return parentNodeElement.tagName === 'P-TREENODE' ? parentNodeElement : null;
    };
    UITreeNode.prototype.focusNode = function (element) {
        if (this.tree.droppableNodes)
            element.children[1].children[0].focus();
        else
            element.children[0].children[0].focus();
    };
    var UITreeNode_1;
    UITreeNode.ICON_CLASS = 'ui-treenode-icon ';
    UITreeNode.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [forwardRef(function () { return Tree; }),] }] }
    ]; };
    __decorate([
        Input()
    ], UITreeNode.prototype, "node", void 0);
    __decorate([
        Input()
    ], UITreeNode.prototype, "parentNode", void 0);
    __decorate([
        Input()
    ], UITreeNode.prototype, "root", void 0);
    __decorate([
        Input()
    ], UITreeNode.prototype, "index", void 0);
    __decorate([
        Input()
    ], UITreeNode.prototype, "firstChild", void 0);
    __decorate([
        Input()
    ], UITreeNode.prototype, "lastChild", void 0);
    UITreeNode = UITreeNode_1 = __decorate([
        Component({
            selector: 'p-treeNode',
            template: "\n        <ng-template [ngIf]=\"node\">\n            <li *ngIf=\"tree.droppableNodes\" class=\"ui-treenode-droppoint\" [ngClass]=\"{'ui-treenode-droppoint-active ui-state-highlight':draghoverPrev}\"\n            (drop)=\"onDropPoint($event,-1)\" (dragover)=\"onDropPointDragOver($event)\" (dragenter)=\"onDropPointDragEnter($event,-1)\" (dragleave)=\"onDropPointDragLeave($event)\"></li>\n            <li *ngIf=\"!tree.horizontal\" role=\"treeitem\" [ngClass]=\"['ui-treenode',node.styleClass||'', isLeaf() ? 'ui-treenode-leaf': '']\">\n                <div class=\"ui-treenode-content\" (click)=\"onNodeClick($event)\" (contextmenu)=\"onNodeRightClick($event)\" (touchend)=\"onNodeTouchEnd()\"\n                    (drop)=\"onDropNode($event)\" (dragover)=\"onDropNodeDragOver($event)\" (dragenter)=\"onDropNodeDragEnter($event)\" (dragleave)=\"onDropNodeDragLeave($event)\"\n                    [draggable]=\"tree.draggableNodes\" (dragstart)=\"onDragStart($event)\" (dragend)=\"onDragStop($event)\" tabIndex=\"0\"\n                    [ngClass]=\"{'ui-treenode-selectable':tree.selectionMode && node.selectable !== false,'ui-treenode-dragover':draghoverNode, 'ui-treenode-content-selected':isSelected()}\" \n                    (keydown)=\"onKeyDown($event)\" [attr.aria-posinset]=\"this.index + 1\" [attr.aria-expanded]=\"this.node.expanded\" [attr.aria-selected]=\"isSelected()\">\n                    <span class=\"ui-tree-toggler pi pi-fw ui-unselectable-text\" [ngClass]=\"{'pi-caret-right':!node.expanded,'pi-caret-down':node.expanded}\"\n                            (click)=\"toggle($event)\"></span\n                    ><div class=\"ui-chkbox\" *ngIf=\"tree.selectionMode == 'checkbox'\"><div class=\"ui-chkbox-box ui-widget ui-corner-all ui-state-default\" [ngClass]=\"{'ui-state-disabled': node.selectable === false}\">\n                        <span class=\"ui-chkbox-icon ui-clickable pi\"\n                            [ngClass]=\"{'pi-check':isSelected(),'pi-minus':node.partialSelected}\"></span></div></div\n                    ><span [class]=\"getIcon()\" *ngIf=\"node.icon||node.expandedIcon||node.collapsedIcon\"></span\n                    ><span class=\"ui-treenode-label ui-corner-all\"\n                        [ngClass]=\"{'ui-state-highlight':isSelected()}\">\n                            <span *ngIf=\"!tree.getTemplateForNode(node)\">{{node.label}}</span>\n                            <span *ngIf=\"tree.getTemplateForNode(node)\">\n                                <ng-container *ngTemplateOutlet=\"tree.getTemplateForNode(node); context: {$implicit: node}\"></ng-container>\n                            </span>\n                    </span>\n                </div>\n                <ul class=\"ui-treenode-children\" style=\"display: none;\" *ngIf=\"node.children && node.expanded\" [style.display]=\"node.expanded ? 'block' : 'none'\" role=\"group\">\n                    <p-treeNode *ngFor=\"let childNode of node.children;let firstChild=first;let lastChild=last; let index=index; trackBy: tree.nodeTrackBy\" [node]=\"childNode\" [parentNode]=\"node\"\n                        [firstChild]=\"firstChild\" [lastChild]=\"lastChild\" [index]=\"index\"></p-treeNode>\n                </ul>\n            </li>\n            <li *ngIf=\"tree.droppableNodes&&lastChild\" class=\"ui-treenode-droppoint\" [ngClass]=\"{'ui-treenode-droppoint-active ui-state-highlight':draghoverNext}\"\n            (drop)=\"onDropPoint($event,1)\" (dragover)=\"onDropPointDragOver($event)\" (dragenter)=\"onDropPointDragEnter($event,1)\" (dragleave)=\"onDropPointDragLeave($event)\"></li>\n            <table *ngIf=\"tree.horizontal\" [class]=\"node.styleClass\">\n                <tbody>\n                    <tr>\n                        <td class=\"ui-treenode-connector\" *ngIf=\"!root\">\n                            <table class=\"ui-treenode-connector-table\">\n                                <tbody>\n                                    <tr>\n                                        <td [ngClass]=\"{'ui-treenode-connector-line':!firstChild}\"></td>\n                                    </tr>\n                                    <tr>\n                                        <td [ngClass]=\"{'ui-treenode-connector-line':!lastChild}\"></td>\n                                    </tr>\n                                </tbody>\n                            </table>\n                        </td>\n                        <td class=\"ui-treenode\" [ngClass]=\"{'ui-treenode-collapsed':!node.expanded}\">\n                            <div class=\"ui-treenode-content ui-state-default ui-corner-all\"\n                                [ngClass]=\"{'ui-treenode-selectable':tree.selectionMode,'ui-state-highlight':isSelected()}\" (click)=\"onNodeClick($event)\" (contextmenu)=\"onNodeRightClick($event)\"\n                                (touchend)=\"onNodeTouchEnd()\">\n                                <span class=\"ui-tree-toggler pi pi-fw ui-unselectable-text\" [ngClass]=\"{'pi-plus':!node.expanded,'pi-minus':node.expanded}\" *ngIf=\"!isLeaf()\"\n                                        (click)=\"toggle($event)\"></span\n                                ><span [class]=\"getIcon()\" *ngIf=\"node.icon||node.expandedIcon||node.collapsedIcon\"></span\n                                ><span class=\"ui-treenode-label ui-corner-all\">\n                                        <span *ngIf=\"!tree.getTemplateForNode(node)\">{{node.label}}</span>\n                                        <span *ngIf=\"tree.getTemplateForNode(node)\">\n                                        <ng-container *ngTemplateOutlet=\"tree.getTemplateForNode(node); context: {$implicit: node}\"></ng-container>\n                                        </span>\n                                </span>\n                            </div>\n                        </td>\n                        <td class=\"ui-treenode-children-container\" *ngIf=\"node.children && node.expanded\" [style.display]=\"node.expanded ? 'table-cell' : 'none'\">\n                            <div class=\"ui-treenode-children\">\n                                <p-treeNode *ngFor=\"let childNode of node.children;let firstChild=first;let lastChild=last; trackBy: tree.nodeTrackBy\" [node]=\"childNode\"\n                                        [firstChild]=\"firstChild\" [lastChild]=\"lastChild\"></p-treeNode>\n                            </div>\n                        </td>\n                    </tr>\n                </tbody>\n            </table>\n        </ng-template>\n    "
        }),
        __param(0, Inject(forwardRef(function () { return Tree; })))
    ], UITreeNode);
    return UITreeNode;
}());
export { UITreeNode };
var Tree = /** @class */ (function () {
    function Tree(el, dragDropService) {
        this.el = el;
        this.dragDropService = dragDropService;
        this.selectionChange = new EventEmitter();
        this.onNodeSelect = new EventEmitter();
        this.onNodeUnselect = new EventEmitter();
        this.onNodeExpand = new EventEmitter();
        this.onNodeCollapse = new EventEmitter();
        this.onNodeContextMenuSelect = new EventEmitter();
        this.onNodeDrop = new EventEmitter();
        this.layout = 'vertical';
        this.metaKeySelection = true;
        this.propagateSelectionUp = true;
        this.propagateSelectionDown = true;
        this.loadingIcon = 'pi pi-spinner';
        this.emptyMessage = 'No records found';
        this.filterBy = 'label';
        this.filterMode = 'lenient';
        this.nodeTrackBy = function (index, item) { return item; };
    }
    Tree.prototype.ngOnInit = function () {
        var _this = this;
        if (this.droppableNodes) {
            this.dragStartSubscription = this.dragDropService.dragStart$.subscribe(function (event) {
                _this.dragNodeTree = event.tree;
                _this.dragNode = event.node;
                _this.dragNodeSubNodes = event.subNodes;
                _this.dragNodeIndex = event.index;
                _this.dragNodeScope = event.scope;
            });
            this.dragStopSubscription = this.dragDropService.dragStop$.subscribe(function (event) {
                _this.dragNodeTree = null;
                _this.dragNode = null;
                _this.dragNodeSubNodes = null;
                _this.dragNodeIndex = null;
                _this.dragNodeScope = null;
                _this.dragHover = false;
            });
        }
    };
    Object.defineProperty(Tree.prototype, "horizontal", {
        get: function () {
            return this.layout == 'horizontal';
        },
        enumerable: true,
        configurable: true
    });
    Tree.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.templates.length) {
            this.templateMap = {};
        }
        this.templates.forEach(function (item) {
            _this.templateMap[item.name] = item.template;
        });
    };
    Tree.prototype.onNodeClick = function (event, node) {
        var eventTarget = event.target;
        if (DomHandler.hasClass(eventTarget, 'ui-tree-toggler')) {
            return;
        }
        else if (this.selectionMode) {
            if (node.selectable === false) {
                return;
            }
            if (this.hasFilteredNodes()) {
                node = this.getNodeWithKey(node.key, this.value);
                if (!node) {
                    return;
                }
            }
            var index_1 = this.findIndexInSelection(node);
            var selected = (index_1 >= 0);
            if (this.isCheckboxSelectionMode()) {
                if (selected) {
                    if (this.propagateSelectionDown)
                        this.propagateDown(node, false);
                    else
                        this.selection = this.selection.filter(function (val, i) { return i != index_1; });
                    if (this.propagateSelectionUp && node.parent) {
                        this.propagateUp(node.parent, false);
                    }
                    this.selectionChange.emit(this.selection);
                    this.onNodeUnselect.emit({ originalEvent: event, node: node });
                }
                else {
                    if (this.propagateSelectionDown)
                        this.propagateDown(node, true);
                    else
                        this.selection = __spread(this.selection || [], [node]);
                    if (this.propagateSelectionUp && node.parent) {
                        this.propagateUp(node.parent, true);
                    }
                    this.selectionChange.emit(this.selection);
                    this.onNodeSelect.emit({ originalEvent: event, node: node });
                }
            }
            else {
                var metaSelection = this.nodeTouched ? false : this.metaKeySelection;
                if (metaSelection) {
                    var metaKey = (event.metaKey || event.ctrlKey);
                    if (selected && metaKey) {
                        if (this.isSingleSelectionMode()) {
                            this.selectionChange.emit(null);
                        }
                        else {
                            this.selection = this.selection.filter(function (val, i) { return i != index_1; });
                            this.selectionChange.emit(this.selection);
                        }
                        this.onNodeUnselect.emit({ originalEvent: event, node: node });
                    }
                    else {
                        if (this.isSingleSelectionMode()) {
                            this.selectionChange.emit(node);
                        }
                        else if (this.isMultipleSelectionMode()) {
                            this.selection = (!metaKey) ? [] : this.selection || [];
                            this.selection = __spread(this.selection, [node]);
                            this.selectionChange.emit(this.selection);
                        }
                        this.onNodeSelect.emit({ originalEvent: event, node: node });
                    }
                }
                else {
                    if (this.isSingleSelectionMode()) {
                        if (selected) {
                            this.selection = null;
                            this.onNodeUnselect.emit({ originalEvent: event, node: node });
                        }
                        else {
                            this.selection = node;
                            this.onNodeSelect.emit({ originalEvent: event, node: node });
                        }
                    }
                    else {
                        if (selected) {
                            this.selection = this.selection.filter(function (val, i) { return i != index_1; });
                            this.onNodeUnselect.emit({ originalEvent: event, node: node });
                        }
                        else {
                            this.selection = __spread(this.selection || [], [node]);
                            this.onNodeSelect.emit({ originalEvent: event, node: node });
                        }
                    }
                    this.selectionChange.emit(this.selection);
                }
            }
        }
        this.nodeTouched = false;
    };
    Tree.prototype.onNodeTouchEnd = function () {
        this.nodeTouched = true;
    };
    Tree.prototype.onNodeRightClick = function (event, node) {
        if (this.contextMenu) {
            var eventTarget = event.target;
            if (eventTarget.className && eventTarget.className.indexOf('ui-tree-toggler') === 0) {
                return;
            }
            else {
                var index = this.findIndexInSelection(node);
                var selected = (index >= 0);
                if (!selected) {
                    if (this.isSingleSelectionMode())
                        this.selectionChange.emit(node);
                    else
                        this.selectionChange.emit([node]);
                }
                this.contextMenu.show(event);
                this.onNodeContextMenuSelect.emit({ originalEvent: event, node: node });
            }
        }
    };
    Tree.prototype.findIndexInSelection = function (node) {
        var index = -1;
        if (this.selectionMode && this.selection) {
            if (this.isSingleSelectionMode()) {
                var areNodesEqual = (this.selection.key && this.selection.key === node.key) || this.selection == node;
                index = areNodesEqual ? 0 : -1;
            }
            else {
                for (var i = 0; i < this.selection.length; i++) {
                    var selectedNode = this.selection[i];
                    var areNodesEqual = (selectedNode.key && selectedNode.key === node.key) || selectedNode == node;
                    if (areNodesEqual) {
                        index = i;
                        break;
                    }
                }
            }
        }
        return index;
    };
    Tree.prototype.syncNodeOption = function (node, parentNodes, option, value) {
        // to synchronize the node option between the filtered nodes and the original nodes(this.value) 
        var _node = this.hasFilteredNodes() ? this.getNodeWithKey(node.key, parentNodes) : null;
        if (_node) {
            _node[option] = value || node[option];
        }
    };
    Tree.prototype.hasFilteredNodes = function () {
        return this.filter && this.filteredNodes && this.filteredNodes.length;
    };
    Tree.prototype.getNodeWithKey = function (key, nodes) {
        var e_1, _a;
        try {
            for (var nodes_1 = __values(nodes), nodes_1_1 = nodes_1.next(); !nodes_1_1.done; nodes_1_1 = nodes_1.next()) {
                var node = nodes_1_1.value;
                if (node.key === key) {
                    return node;
                }
                if (node.children) {
                    var matchedNode = this.getNodeWithKey(key, node.children);
                    if (matchedNode) {
                        return matchedNode;
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (nodes_1_1 && !nodes_1_1.done && (_a = nodes_1.return)) _a.call(nodes_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    Tree.prototype.propagateUp = function (node, select) {
        var e_2, _a;
        if (node.children && node.children.length) {
            var selectedCount = 0;
            var childPartialSelected = false;
            try {
                for (var _b = __values(node.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
                    if (this.isSelected(child)) {
                        selectedCount++;
                    }
                    else if (child.partialSelected) {
                        childPartialSelected = true;
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            if (select && selectedCount == node.children.length) {
                this.selection = __spread(this.selection || [], [node]);
                node.partialSelected = false;
            }
            else {
                if (!select) {
                    var index_2 = this.findIndexInSelection(node);
                    if (index_2 >= 0) {
                        this.selection = this.selection.filter(function (val, i) { return i != index_2; });
                    }
                }
                if (childPartialSelected || selectedCount > 0 && selectedCount != node.children.length)
                    node.partialSelected = true;
                else
                    node.partialSelected = false;
            }
            this.syncNodeOption(node, this.filteredNodes, 'partialSelected');
        }
        var parent = node.parent;
        if (parent) {
            this.propagateUp(parent, select);
        }
    };
    Tree.prototype.propagateDown = function (node, select) {
        var e_3, _a;
        var index = this.findIndexInSelection(node);
        if (select && index == -1) {
            this.selection = __spread(this.selection || [], [node]);
        }
        else if (!select && index > -1) {
            this.selection = this.selection.filter(function (val, i) { return i != index; });
        }
        node.partialSelected = false;
        this.syncNodeOption(node, this.filteredNodes, 'partialSelected');
        if (node.children && node.children.length) {
            try {
                for (var _b = __values(node.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var child = _c.value;
                    this.propagateDown(child, select);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
    };
    Tree.prototype.isSelected = function (node) {
        return this.findIndexInSelection(node) != -1;
    };
    Tree.prototype.isSingleSelectionMode = function () {
        return this.selectionMode && this.selectionMode == 'single';
    };
    Tree.prototype.isMultipleSelectionMode = function () {
        return this.selectionMode && this.selectionMode == 'multiple';
    };
    Tree.prototype.isCheckboxSelectionMode = function () {
        return this.selectionMode && this.selectionMode == 'checkbox';
    };
    Tree.prototype.isNodeLeaf = function (node) {
        return node.leaf == false ? false : !(node.children && node.children.length);
    };
    Tree.prototype.getRootNode = function () {
        return this.filteredNodes ? this.filteredNodes : this.value;
    };
    Tree.prototype.getTemplateForNode = function (node) {
        if (this.templateMap)
            return node.type ? this.templateMap[node.type] : this.templateMap['default'];
        else
            return null;
    };
    Tree.prototype.onDragOver = function (event) {
        if (this.droppableNodes && (!this.value || this.value.length === 0)) {
            event.dataTransfer.dropEffect = 'move';
            event.preventDefault();
        }
    };
    Tree.prototype.onDrop = function (event) {
        if (this.droppableNodes && (!this.value || this.value.length === 0)) {
            event.preventDefault();
            var dragNode = this.dragNode;
            if (this.allowDrop(dragNode, null, this.dragNodeScope)) {
                var dragNodeIndex = this.dragNodeIndex;
                this.dragNodeSubNodes.splice(dragNodeIndex, 1);
                this.value = this.value || [];
                this.value.push(dragNode);
                this.dragDropService.stopDrag({
                    node: dragNode
                });
            }
        }
    };
    Tree.prototype.onDragEnter = function (event) {
        if (this.droppableNodes && this.allowDrop(this.dragNode, null, this.dragNodeScope)) {
            this.dragHover = true;
        }
    };
    Tree.prototype.onDragLeave = function (event) {
        if (this.droppableNodes) {
            var rect = event.currentTarget.getBoundingClientRect();
            if (event.x > rect.left + rect.width || event.x < rect.left || event.y > rect.top + rect.height || event.y < rect.top) {
                this.dragHover = false;
            }
        }
    };
    Tree.prototype.allowDrop = function (dragNode, dropNode, dragNodeScope) {
        if (!dragNode) {
            //prevent random html elements to be dragged
            return false;
        }
        else if (this.isValidDragScope(dragNodeScope)) {
            var allow = true;
            if (dropNode) {
                if (dragNode === dropNode) {
                    allow = false;
                }
                else {
                    var parent_1 = dropNode.parent;
                    while (parent_1 != null) {
                        if (parent_1 === dragNode) {
                            allow = false;
                            break;
                        }
                        parent_1 = parent_1.parent;
                    }
                }
            }
            return allow;
        }
        else {
            return false;
        }
    };
    Tree.prototype.isValidDragScope = function (dragScope) {
        var e_4, _a, e_5, _b;
        var dropScope = this.droppableScope;
        if (dropScope) {
            if (typeof dropScope === 'string') {
                if (typeof dragScope === 'string')
                    return dropScope === dragScope;
                else if (dragScope instanceof Array)
                    return dragScope.indexOf(dropScope) != -1;
            }
            else if (dropScope instanceof Array) {
                if (typeof dragScope === 'string') {
                    return dropScope.indexOf(dragScope) != -1;
                }
                else if (dragScope instanceof Array) {
                    try {
                        for (var dropScope_1 = __values(dropScope), dropScope_1_1 = dropScope_1.next(); !dropScope_1_1.done; dropScope_1_1 = dropScope_1.next()) {
                            var s = dropScope_1_1.value;
                            try {
                                for (var dragScope_1 = (e_5 = void 0, __values(dragScope)), dragScope_1_1 = dragScope_1.next(); !dragScope_1_1.done; dragScope_1_1 = dragScope_1.next()) {
                                    var ds = dragScope_1_1.value;
                                    if (s === ds) {
                                        return true;
                                    }
                                }
                            }
                            catch (e_5_1) { e_5 = { error: e_5_1 }; }
                            finally {
                                try {
                                    if (dragScope_1_1 && !dragScope_1_1.done && (_b = dragScope_1.return)) _b.call(dragScope_1);
                                }
                                finally { if (e_5) throw e_5.error; }
                            }
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (dropScope_1_1 && !dropScope_1_1.done && (_a = dropScope_1.return)) _a.call(dropScope_1);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                }
            }
            return false;
        }
        else {
            return true;
        }
    };
    Tree.prototype.onFilter = function (event) {
        var e_6, _a;
        var filterValue = event.target.value;
        if (filterValue === '') {
            this.filteredNodes = null;
        }
        else {
            this.filteredNodes = [];
            var searchFields = this.filterBy.split(',');
            var filterText = ObjectUtils.removeAccents(filterValue).toLowerCase();
            var isStrictMode = this.filterMode === 'strict';
            try {
                for (var _b = __values(this.value), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var node = _c.value;
                    var copyNode = __assign({}, node);
                    var paramsWithoutNode = { searchFields: searchFields, filterText: filterText, isStrictMode: isStrictMode };
                    if ((isStrictMode && (this.findFilteredNodes(copyNode, paramsWithoutNode) || this.isFilterMatched(copyNode, paramsWithoutNode))) ||
                        (!isStrictMode && (this.isFilterMatched(copyNode, paramsWithoutNode) || this.findFilteredNodes(copyNode, paramsWithoutNode)))) {
                        this.filteredNodes.push(copyNode);
                    }
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_6) throw e_6.error; }
            }
        }
    };
    Tree.prototype.findFilteredNodes = function (node, paramsWithoutNode) {
        var e_7, _a;
        if (node) {
            var matched = false;
            if (node.children) {
                var childNodes = __spread(node.children);
                node.children = [];
                try {
                    for (var childNodes_1 = __values(childNodes), childNodes_1_1 = childNodes_1.next(); !childNodes_1_1.done; childNodes_1_1 = childNodes_1.next()) {
                        var childNode = childNodes_1_1.value;
                        var copyChildNode = __assign({}, childNode);
                        if (this.isFilterMatched(copyChildNode, paramsWithoutNode)) {
                            matched = true;
                            node.children.push(copyChildNode);
                        }
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (childNodes_1_1 && !childNodes_1_1.done && (_a = childNodes_1.return)) _a.call(childNodes_1);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
            }
            if (matched) {
                node.expanded = true;
                return true;
            }
        }
    };
    Tree.prototype.isFilterMatched = function (node, _a) {
        var e_8, _b;
        var searchFields = _a.searchFields, filterText = _a.filterText, isStrictMode = _a.isStrictMode;
        var matched = false;
        try {
            for (var searchFields_1 = __values(searchFields), searchFields_1_1 = searchFields_1.next(); !searchFields_1_1.done; searchFields_1_1 = searchFields_1.next()) {
                var field = searchFields_1_1.value;
                var fieldValue = ObjectUtils.removeAccents(String(ObjectUtils.resolveFieldData(node, field))).toLowerCase();
                if (fieldValue.indexOf(filterText) > -1) {
                    matched = true;
                }
            }
        }
        catch (e_8_1) { e_8 = { error: e_8_1 }; }
        finally {
            try {
                if (searchFields_1_1 && !searchFields_1_1.done && (_b = searchFields_1.return)) _b.call(searchFields_1);
            }
            finally { if (e_8) throw e_8.error; }
        }
        if (!matched || (isStrictMode && !this.isNodeLeaf(node))) {
            matched = this.findFilteredNodes(node, { searchFields: searchFields, filterText: filterText, isStrictMode: isStrictMode }) || matched;
        }
        return matched;
    };
    Tree.prototype.getBlockableElement = function () {
        return this.el.nativeElement.children[0];
    };
    Tree.prototype.ngOnDestroy = function () {
        if (this.dragStartSubscription) {
            this.dragStartSubscription.unsubscribe();
        }
        if (this.dragStopSubscription) {
            this.dragStopSubscription.unsubscribe();
        }
    };
    Tree.ctorParameters = function () { return [
        { type: ElementRef },
        { type: TreeDragDropService, decorators: [{ type: Optional }] }
    ]; };
    __decorate([
        Input()
    ], Tree.prototype, "value", void 0);
    __decorate([
        Input()
    ], Tree.prototype, "selectionMode", void 0);
    __decorate([
        Input()
    ], Tree.prototype, "selection", void 0);
    __decorate([
        Output()
    ], Tree.prototype, "selectionChange", void 0);
    __decorate([
        Output()
    ], Tree.prototype, "onNodeSelect", void 0);
    __decorate([
        Output()
    ], Tree.prototype, "onNodeUnselect", void 0);
    __decorate([
        Output()
    ], Tree.prototype, "onNodeExpand", void 0);
    __decorate([
        Output()
    ], Tree.prototype, "onNodeCollapse", void 0);
    __decorate([
        Output()
    ], Tree.prototype, "onNodeContextMenuSelect", void 0);
    __decorate([
        Output()
    ], Tree.prototype, "onNodeDrop", void 0);
    __decorate([
        Input()
    ], Tree.prototype, "style", void 0);
    __decorate([
        Input()
    ], Tree.prototype, "styleClass", void 0);
    __decorate([
        Input()
    ], Tree.prototype, "contextMenu", void 0);
    __decorate([
        Input()
    ], Tree.prototype, "layout", void 0);
    __decorate([
        Input()
    ], Tree.prototype, "draggableScope", void 0);
    __decorate([
        Input()
    ], Tree.prototype, "droppableScope", void 0);
    __decorate([
        Input()
    ], Tree.prototype, "draggableNodes", void 0);
    __decorate([
        Input()
    ], Tree.prototype, "droppableNodes", void 0);
    __decorate([
        Input()
    ], Tree.prototype, "metaKeySelection", void 0);
    __decorate([
        Input()
    ], Tree.prototype, "propagateSelectionUp", void 0);
    __decorate([
        Input()
    ], Tree.prototype, "propagateSelectionDown", void 0);
    __decorate([
        Input()
    ], Tree.prototype, "loading", void 0);
    __decorate([
        Input()
    ], Tree.prototype, "loadingIcon", void 0);
    __decorate([
        Input()
    ], Tree.prototype, "emptyMessage", void 0);
    __decorate([
        Input()
    ], Tree.prototype, "ariaLabel", void 0);
    __decorate([
        Input()
    ], Tree.prototype, "ariaLabelledBy", void 0);
    __decorate([
        Input()
    ], Tree.prototype, "validateDrop", void 0);
    __decorate([
        Input()
    ], Tree.prototype, "filter", void 0);
    __decorate([
        Input()
    ], Tree.prototype, "filterBy", void 0);
    __decorate([
        Input()
    ], Tree.prototype, "filterMode", void 0);
    __decorate([
        Input()
    ], Tree.prototype, "filterPlaceholder", void 0);
    __decorate([
        Input()
    ], Tree.prototype, "nodeTrackBy", void 0);
    __decorate([
        ContentChildren(PrimeTemplate)
    ], Tree.prototype, "templates", void 0);
    Tree = __decorate([
        Component({
            selector: 'p-tree',
            template: "\n        <div [ngClass]=\"{'ui-tree ui-widget ui-widget-content ui-corner-all':true,'ui-tree-selectable':selectionMode,'ui-treenode-dragover':dragHover,'ui-tree-loading': loading}\" [ngStyle]=\"style\" [class]=\"styleClass\" *ngIf=\"!horizontal\"\n            (drop)=\"onDrop($event)\" (dragover)=\"onDragOver($event)\" (dragenter)=\"onDragEnter($event)\" (dragleave)=\"onDragLeave($event)\">\n            <div class=\"ui-tree-loading-mask ui-widget-overlay\" *ngIf=\"loading\"></div>\n            <div class=\"ui-tree-loading-content\" *ngIf=\"loading\">\n                <i [class]=\"'ui-tree-loading-icon pi-spin ' + loadingIcon\"></i>\n            </div>\n            <div *ngIf=\"filter\" class=\"ui-tree-filter-container\">\n                <input #filter type=\"text\" autocomplete=\"off\" class=\"ui-tree-filter ui-inputtext ui-widget ui-state-default ui-corner-all\" [attr.placeholder]=\"filterPlaceholder\"\n                    (keydown.enter)=\"$event.preventDefault()\" (input)=\"onFilter($event)\">\n                    <span class=\"ui-tree-filter-icon pi pi-search\"></span>\n            </div>\n            <ul class=\"ui-tree-container\" *ngIf=\"getRootNode()\" role=\"tree\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledBy\">\n                <p-treeNode *ngFor=\"let node of getRootNode(); let firstChild=first;let lastChild=last; let index=index; trackBy: nodeTrackBy\" [node]=\"node\"\n                [firstChild]=\"firstChild\" [lastChild]=\"lastChild\" [index]=\"index\"></p-treeNode>\n            </ul>\n            <div class=\"ui-tree-empty-message\" *ngIf=\"!loading && (value == null || value.length === 0)\">{{emptyMessage}}</div>\n        </div>\n        <div [ngClass]=\"{'ui-tree ui-tree-horizontal ui-widget ui-widget-content ui-corner-all':true,'ui-tree-selectable':selectionMode}\"  [ngStyle]=\"style\" [class]=\"styleClass\" *ngIf=\"horizontal\">\n            <div class=\"ui-tree-loading ui-widget-overlay\" *ngIf=\"loading\"></div>\n            <div class=\"ui-tree-loading-content\" *ngIf=\"loading\">\n                <i [class]=\"'ui-tree-loading-icon pi-spin ' + loadingIcon\"></i>\n            </div>\n            <table *ngIf=\"value&&value[0]\">\n                <p-treeNode [node]=\"value[0]\" [root]=\"true\"></p-treeNode>\n            </table>\n            <div class=\"ui-tree-empty-message\" *ngIf=\"!loading && (value == null || value.length === 0)\">{{emptyMessage}}</div>\n        </div>\n    "
        }),
        __param(1, Optional())
    ], Tree);
    return Tree;
}());
export { Tree };
var TreeModule = /** @class */ (function () {
    function TreeModule() {
    }
    TreeModule = __decorate([
        NgModule({
            imports: [CommonModule],
            exports: [Tree, SharedModule],
            declarations: [Tree, UITreeNode]
        })
    ], TreeModule);
    return TreeModule;
}());
export { TreeModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL3ByaW1lbmcvdHJlZS8iLCJzb3VyY2VzIjpbInRyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsT0FBTyxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsS0FBSyxFQUFDLGdCQUFnQixFQUFDLFNBQVMsRUFBQyxNQUFNLEVBQUMsWUFBWSxFQUFDLE1BQU0sRUFDbEYsZUFBZSxFQUFDLFNBQVMsRUFBQyxXQUFXLEVBQUMsTUFBTSxFQUFDLFVBQVUsRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDN0YsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFN0MsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQzFDLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLGFBQWEsQ0FBQztBQUdoRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxhQUFhLENBQUM7QUE2RXZDO0lBa0JJLG9CQUE0QyxJQUFJO1FBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBWSxDQUFDO0lBQzdCLENBQUM7bUJBcEJRLFVBQVU7SUE0Qm5CLDZCQUFRLEdBQVI7UUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1FBRW5DLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFFB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QUU7d0NBQWlCO0lBRWhCO1FBQVIsS0FBSyxFQUFFOzBDQUE0QjtJQUUzQjtRQUFSLEtBQUssRUFBRTs0Q0FBZ0M7SUFFL0I7UUFBUixLQUFLLEVBQUU7bURBQTJCO0lBRTFCO1FBQVIsS0FBSyxFQUFFOzZDQUE0RDtJQUVwQztRQUEvQixlQUFlLENBQUMsYUFBYSxDQUFDOzJDQUEyQjtJQWxFakQsSUFBSTtRQWhDaEIsU0FBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFFBQVE7WUFDbEIsUUFBUSxFQUFFLDA2RUE0QlQ7U0FDSixDQUFDO1FBMkZzQyxXQUFBLFFBQVEsRUFBRSxDQUFBO09BMUZyQyxJQUFJLENBcWtCaEI7SUFBRCxXQUFDO0NBQUEsQUFya0JELElBcWtCQztTQXJrQlksSUFBSTtBQTJrQmpCO0lBQUE7SUFBMEIsQ0FBQztJQUFkLFVBQVU7UUFMdEIsUUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO1lBQ3ZCLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBQyxZQUFZLENBQUM7WUFDNUIsWUFBWSxFQUFFLENBQUMsSUFBSSxFQUFDLFVBQVUsQ0FBQztTQUNsQyxDQUFDO09BQ1csVUFBVSxDQUFJO0lBQUQsaUJBQUM7Q0FBQSxBQUEzQixJQUEyQjtTQUFkLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge05nTW9kdWxlLENvbXBvbmVudCxJbnB1dCxBZnRlckNvbnRlbnRJbml0LE9uRGVzdHJveSxPdXRwdXQsRXZlbnRFbWl0dGVyLE9uSW5pdCxcbiAgICBDb250ZW50Q2hpbGRyZW4sUXVlcnlMaXN0LFRlbXBsYXRlUmVmLEluamVjdCxFbGVtZW50UmVmLGZvcndhcmRSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPcHRpb25hbH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7VHJlZU5vZGV9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7U2hhcmVkTW9kdWxlfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQge1ByaW1lVGVtcGxhdGV9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7VHJlZURyYWdEcm9wU2VydmljZX0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHtTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtCbG9ja2FibGVVSX0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHtPYmplY3RVdGlsc30gZnJvbSAncHJpbWVuZy91dGlscyc7XG5pbXBvcnQge0RvbUhhbmRsZXJ9IGZyb20gJ3ByaW1lbmcvZG9tJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXRyZWVOb2RlJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctdGVtcGxhdGUgW25nSWZdPVwibm9kZVwiPlxuICAgICAgICAgICAgPGxpICpuZ0lmPVwidHJlZS5kcm9wcGFibGVOb2Rlc1wiIGNsYXNzPVwidWktdHJlZW5vZGUtZHJvcHBvaW50XCIgW25nQ2xhc3NdPVwieyd1aS10cmVlbm9kZS1kcm9wcG9pbnQtYWN0aXZlIHVpLXN0YXRlLWhpZ2hsaWdodCc6ZHJhZ2hvdmVyUHJldn1cIlxuICAgICAgICAgICAgKGRyb3ApPVwib25Ecm9wUG9pbnQoJGV2ZW50LC0xKVwiIChkcmFnb3Zlcik9XCJvbkRyb3BQb2ludERyYWdPdmVyKCRldmVudClcIiAoZHJhZ2VudGVyKT1cIm9uRHJvcFBvaW50RHJhZ0VudGVyKCRldmVudCwtMSlcIiAoZHJhZ2xlYXZlKT1cIm9uRHJvcFBvaW50RHJhZ0xlYXZlKCRldmVudClcIj48L2xpPlxuICAgICAgICAgICAgPGxpICpuZ0lmPVwiIXRyZWUuaG9yaXpvbnRhbFwiIHJvbGU9XCJ0cmVlaXRlbVwiIFtuZ0NsYXNzXT1cIlsndWktdHJlZW5vZGUnLG5vZGUuc3R5bGVDbGFzc3x8JycsIGlzTGVhZigpID8gJ3VpLXRyZWVub2RlLWxlYWYnOiAnJ11cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktdHJlZW5vZGUtY29udGVudFwiIChjbGljayk9XCJvbk5vZGVDbGljaygkZXZlbnQpXCIgKGNvbnRleHRtZW51KT1cIm9uTm9kZVJpZ2h0Q2xpY2soJGV2ZW50KVwiICh0b3VjaGVuZCk9XCJvbk5vZGVUb3VjaEVuZCgpXCJcbiAgICAgICAgICAgICAgICAgICAgKGRyb3ApPVwib25Ecm9wTm9kZSgkZXZlbnQpXCIgKGRyYWdvdmVyKT1cIm9uRHJvcE5vZGVEcmFnT3ZlcigkZXZlbnQpXCIgKGRyYWdlbnRlcik9XCJvbkRyb3BOb2RlRHJhZ0VudGVyKCRldmVudClcIiAoZHJhZ2xlYXZlKT1cIm9uRHJvcE5vZGVEcmFnTGVhdmUoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIFtkcmFnZ2FibGVdPVwidHJlZS5kcmFnZ2FibGVOb2Rlc1wiIChkcmFnc3RhcnQpPVwib25EcmFnU3RhcnQoJGV2ZW50KVwiIChkcmFnZW5kKT1cIm9uRHJhZ1N0b3AoJGV2ZW50KVwiIHRhYkluZGV4PVwiMFwiXG4gICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsndWktdHJlZW5vZGUtc2VsZWN0YWJsZSc6dHJlZS5zZWxlY3Rpb25Nb2RlICYmIG5vZGUuc2VsZWN0YWJsZSAhPT0gZmFsc2UsJ3VpLXRyZWVub2RlLWRyYWdvdmVyJzpkcmFnaG92ZXJOb2RlLCAndWktdHJlZW5vZGUtY29udGVudC1zZWxlY3RlZCc6aXNTZWxlY3RlZCgpfVwiIFxuICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbktleURvd24oJGV2ZW50KVwiIFthdHRyLmFyaWEtcG9zaW5zZXRdPVwidGhpcy5pbmRleCArIDFcIiBbYXR0ci5hcmlhLWV4cGFuZGVkXT1cInRoaXMubm9kZS5leHBhbmRlZFwiIFthdHRyLmFyaWEtc2VsZWN0ZWRdPVwiaXNTZWxlY3RlZCgpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktdHJlZS10b2dnbGVyIHBpIHBpLWZ3IHVpLXVuc2VsZWN0YWJsZS10ZXh0XCIgW25nQ2xhc3NdPVwieydwaS1jYXJldC1yaWdodCc6IW5vZGUuZXhwYW5kZWQsJ3BpLWNhcmV0LWRvd24nOm5vZGUuZXhwYW5kZWR9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwidG9nZ2xlKCRldmVudClcIj48L3NwYW5cbiAgICAgICAgICAgICAgICAgICAgPjxkaXYgY2xhc3M9XCJ1aS1jaGtib3hcIiAqbmdJZj1cInRyZWUuc2VsZWN0aW9uTW9kZSA9PSAnY2hlY2tib3gnXCI+PGRpdiBjbGFzcz1cInVpLWNoa2JveC1ib3ggdWktd2lkZ2V0IHVpLWNvcm5lci1hbGwgdWktc3RhdGUtZGVmYXVsdFwiIFtuZ0NsYXNzXT1cInsndWktc3RhdGUtZGlzYWJsZWQnOiBub2RlLnNlbGVjdGFibGUgPT09IGZhbHNlfVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS1jaGtib3gtaWNvbiB1aS1jbGlja2FibGUgcGlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsncGktY2hlY2snOmlzU2VsZWN0ZWQoKSwncGktbWludXMnOm5vZGUucGFydGlhbFNlbGVjdGVkfVwiPjwvc3Bhbj48L2Rpdj48L2RpdlxuICAgICAgICAgICAgICAgICAgICA+PHNwYW4gW2NsYXNzXT1cImdldEljb24oKVwiICpuZ0lmPVwibm9kZS5pY29ufHxub2RlLmV4cGFuZGVkSWNvbnx8bm9kZS5jb2xsYXBzZWRJY29uXCI+PC9zcGFuXG4gICAgICAgICAgICAgICAgICAgID48c3BhbiBjbGFzcz1cInVpLXRyZWVub2RlLWxhYmVsIHVpLWNvcm5lci1hbGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyd1aS1zdGF0ZS1oaWdobGlnaHQnOmlzU2VsZWN0ZWQoKX1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cIiF0cmVlLmdldFRlbXBsYXRlRm9yTm9kZShub2RlKVwiPnt7bm9kZS5sYWJlbH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwidHJlZS5nZXRUZW1wbGF0ZUZvck5vZGUobm9kZSlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInRyZWUuZ2V0VGVtcGxhdGVGb3JOb2RlKG5vZGUpOyBjb250ZXh0OiB7JGltcGxpY2l0OiBub2RlfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cInVpLXRyZWVub2RlLWNoaWxkcmVuXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiICpuZ0lmPVwibm9kZS5jaGlsZHJlbiAmJiBub2RlLmV4cGFuZGVkXCIgW3N0eWxlLmRpc3BsYXldPVwibm9kZS5leHBhbmRlZCA/ICdibG9jaycgOiAnbm9uZSdcIiByb2xlPVwiZ3JvdXBcIj5cbiAgICAgICAgICAgICAgICAgICAgPHAtdHJlZU5vZGUgKm5nRm9yPVwibGV0IGNoaWxkTm9kZSBvZiBub2RlLmNoaWxkcmVuO2xldCBmaXJzdENoaWxkPWZpcnN0O2xldCBsYXN0Q2hpbGQ9bGFzdDsgbGV0IGluZGV4PWluZGV4OyB0cmFja0J5OiB0cmVlLm5vZGVUcmFja0J5XCIgW25vZGVdPVwiY2hpbGROb2RlXCIgW3BhcmVudE5vZGVdPVwibm9kZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbZmlyc3RDaGlsZF09XCJmaXJzdENoaWxkXCIgW2xhc3RDaGlsZF09XCJsYXN0Q2hpbGRcIiBbaW5kZXhdPVwiaW5kZXhcIj48L3AtdHJlZU5vZGU+XG4gICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICA8bGkgKm5nSWY9XCJ0cmVlLmRyb3BwYWJsZU5vZGVzJiZsYXN0Q2hpbGRcIiBjbGFzcz1cInVpLXRyZWVub2RlLWRyb3Bwb2ludFwiIFtuZ0NsYXNzXT1cInsndWktdHJlZW5vZGUtZHJvcHBvaW50LWFjdGl2ZSB1aS1zdGF0ZS1oaWdobGlnaHQnOmRyYWdob3Zlck5leHR9XCJcbiAgICAgICAgICAgIChkcm9wKT1cIm9uRHJvcFBvaW50KCRldmVudCwxKVwiIChkcmFnb3Zlcik9XCJvbkRyb3BQb2ludERyYWdPdmVyKCRldmVudClcIiAoZHJhZ2VudGVyKT1cIm9uRHJvcFBvaW50RHJhZ0VudGVyKCRldmVudCwxKVwiIChkcmFnbGVhdmUpPVwib25Ecm9wUG9pbnREcmFnTGVhdmUoJGV2ZW50KVwiPjwvbGk+XG4gICAgICAgICAgICA8dGFibGUgKm5nSWY9XCJ0cmVlLmhvcml6b250YWxcIiBbY2xhc3NdPVwibm9kZS5zdHlsZUNsYXNzXCI+XG4gICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ1aS10cmVlbm9kZS1jb25uZWN0b3JcIiAqbmdJZj1cIiFyb290XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzPVwidWktdHJlZW5vZGUtY29ubmVjdG9yLXRhYmxlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGQgW25nQ2xhc3NdPVwieyd1aS10cmVlbm9kZS1jb25uZWN0b3ItbGluZSc6IWZpcnN0Q2hpbGR9XCI+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRkIFtuZ0NsYXNzXT1cInsndWktdHJlZW5vZGUtY29ubmVjdG9yLWxpbmUnOiFsYXN0Q2hpbGR9XCI+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ1aS10cmVlbm9kZVwiIFtuZ0NsYXNzXT1cInsndWktdHJlZW5vZGUtY29sbGFwc2VkJzohbm9kZS5leHBhbmRlZH1cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktdHJlZW5vZGUtY29udGVudCB1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7J3VpLXRyZWVub2RlLXNlbGVjdGFibGUnOnRyZWUuc2VsZWN0aW9uTW9kZSwndWktc3RhdGUtaGlnaGxpZ2h0Jzppc1NlbGVjdGVkKCl9XCIgKGNsaWNrKT1cIm9uTm9kZUNsaWNrKCRldmVudClcIiAoY29udGV4dG1lbnUpPVwib25Ob2RlUmlnaHRDbGljaygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKHRvdWNoZW5kKT1cIm9uTm9kZVRvdWNoRW5kKClcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ1aS10cmVlLXRvZ2dsZXIgcGkgcGktZncgdWktdW5zZWxlY3RhYmxlLXRleHRcIiBbbmdDbGFzc109XCJ7J3BpLXBsdXMnOiFub2RlLmV4cGFuZGVkLCdwaS1taW51cyc6bm9kZS5leHBhbmRlZH1cIiAqbmdJZj1cIiFpc0xlYWYoKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZSgkZXZlbnQpXCI+PC9zcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID48c3BhbiBbY2xhc3NdPVwiZ2V0SWNvbigpXCIgKm5nSWY9XCJub2RlLmljb258fG5vZGUuZXhwYW5kZWRJY29ufHxub2RlLmNvbGxhcHNlZEljb25cIj48L3NwYW5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPjxzcGFuIGNsYXNzPVwidWktdHJlZW5vZGUtbGFiZWwgdWktY29ybmVyLWFsbFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIXRyZWUuZ2V0VGVtcGxhdGVGb3JOb2RlKG5vZGUpXCI+e3tub2RlLmxhYmVsfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJ0cmVlLmdldFRlbXBsYXRlRm9yTm9kZShub2RlKVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0cmVlLmdldFRlbXBsYXRlRm9yTm9kZShub2RlKTsgY29udGV4dDogeyRpbXBsaWNpdDogbm9kZX1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3M9XCJ1aS10cmVlbm9kZS1jaGlsZHJlbi1jb250YWluZXJcIiAqbmdJZj1cIm5vZGUuY2hpbGRyZW4gJiYgbm9kZS5leHBhbmRlZFwiIFtzdHlsZS5kaXNwbGF5XT1cIm5vZGUuZXhwYW5kZWQgPyAndGFibGUtY2VsbCcgOiAnbm9uZSdcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktdHJlZW5vZGUtY2hpbGRyZW5cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAtdHJlZU5vZGUgKm5nRm9yPVwibGV0IGNoaWxkTm9kZSBvZiBub2RlLmNoaWxkcmVuO2xldCBmaXJzdENoaWxkPWZpcnN0O2xldCBsYXN0Q2hpbGQ9bGFzdDsgdHJhY2tCeTogdHJlZS5ub2RlVHJhY2tCeVwiIFtub2RlXT1cImNoaWxkTm9kZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ZpcnN0Q2hpbGRdPVwiZmlyc3RDaGlsZFwiIFtsYXN0Q2hpbGRdPVwibGFzdENoaWxkXCI+PC9wLXRyZWVOb2RlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFVJVHJlZU5vZGUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgc3RhdGljIElDT05fQ0xBU1M6IHN0cmluZyA9ICd1aS10cmVlbm9kZS1pY29uICc7XG5cbiAgICBASW5wdXQoKSBub2RlOiBUcmVlTm9kZTtcblxuICAgIEBJbnB1dCgpIHBhcmVudE5vZGU6IFRyZWVOb2RlO1xuXG4gICAgQElucHV0KCkgcm9vdDogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGluZGV4OiBudW1iZXI7XG5cbiAgICBASW5wdXQoKSBmaXJzdENoaWxkOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgbGFzdENoaWxkOiBib29sZWFuO1xuXG4gICAgdHJlZTogVHJlZTtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoZm9yd2FyZFJlZigoKSA9PiBUcmVlKSkgdHJlZSkge1xuICAgICAgICB0aGlzLnRyZWUgPSB0cmVlIGFzIFRyZWU7XG4gICAgfVxuXG4gICAgZHJhZ2hvdmVyUHJldjogYm9vbGVhbjtcblxuICAgIGRyYWdob3Zlck5leHQ6IGJvb2xlYW47XG5cbiAgICBkcmFnaG92ZXJOb2RlOiBib29sZWFuXG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5ub2RlLnBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcblxuICAgICAgICBpZiAodGhpcy5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICB0aGlzLnRyZWUuc3luY05vZGVPcHRpb24odGhpcy5ub2RlLCB0aGlzLnRyZWUudmFsdWUsICdwYXJlbnQnLCB0aGlzLnRyZWUuZ2V0Tm9kZVdpdGhLZXkodGhpcy5wYXJlbnROb2RlLmtleSwgdGhpcy50cmVlLnZhbHVlKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRJY29uKCkge1xuICAgICAgICBsZXQgaWNvbjogc3RyaW5nO1xuXG4gICAgICAgIGlmKHRoaXMubm9kZS5pY29uKVxuICAgICAgICAgICAgaWNvbiA9IHRoaXMubm9kZS5pY29uO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBpY29uID0gdGhpcy5ub2RlLmV4cGFuZGVkICYmIHRoaXMubm9kZS5jaGlsZHJlbiAmJiB0aGlzLm5vZGUuY2hpbGRyZW4ubGVuZ3RoID8gdGhpcy5ub2RlLmV4cGFuZGVkSWNvbiA6IHRoaXMubm9kZS5jb2xsYXBzZWRJY29uO1xuXG4gICAgICAgIHJldHVybiBVSVRyZWVOb2RlLklDT05fQ0xBU1MgKyAnICcgKyBpY29uO1xuICAgIH1cblxuICAgIGlzTGVhZigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJlZS5pc05vZGVMZWFmKHRoaXMubm9kZSk7XG4gICAgfVxuXG4gICAgdG9nZ2xlKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZih0aGlzLm5vZGUuZXhwYW5kZWQpXG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlKGV2ZW50KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5leHBhbmQoZXZlbnQpO1xuICAgIH1cblxuICAgIGV4cGFuZChldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5ub2RlLmV4cGFuZGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy50cmVlLm9uTm9kZUV4cGFuZC5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgbm9kZTogdGhpcy5ub2RlfSk7XG4gICAgfVxuXG4gICAgY29sbGFwc2UoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMubm9kZS5leHBhbmRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnRyZWUub25Ob2RlQ29sbGFwc2UuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IHRoaXMubm9kZX0pO1xuICAgIH1cblxuICAgIG9uTm9kZUNsaWNrKGV2ZW50OiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMudHJlZS5vbk5vZGVDbGljayhldmVudCwgdGhpcy5ub2RlKTtcbiAgICB9XG5cbiAgICBvbk5vZGVUb3VjaEVuZCgpIHtcbiAgICAgICAgdGhpcy50cmVlLm9uTm9kZVRvdWNoRW5kKCk7XG4gICAgfVxuXG4gICAgb25Ob2RlUmlnaHRDbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICB0aGlzLnRyZWUub25Ob2RlUmlnaHRDbGljayhldmVudCwgdGhpcy5ub2RlKTtcbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50cmVlLmlzU2VsZWN0ZWQodGhpcy5ub2RlKTtcbiAgICB9XG5cbiAgICBvbkRyb3BQb2ludChldmVudDogRXZlbnQsIHBvc2l0aW9uOiBudW1iZXIpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IGRyYWdOb2RlID0gdGhpcy50cmVlLmRyYWdOb2RlO1xuICAgICAgICBsZXQgZHJhZ05vZGVJbmRleCA9IHRoaXMudHJlZS5kcmFnTm9kZUluZGV4O1xuICAgICAgICBsZXQgZHJhZ05vZGVTY29wZSA9IHRoaXMudHJlZS5kcmFnTm9kZVNjb3BlO1xuICAgICAgICBsZXQgaXNWYWxpZERyb3BQb2ludEluZGV4ID0gdGhpcy50cmVlLmRyYWdOb2RlVHJlZSA9PT0gdGhpcy50cmVlID8gKHBvc2l0aW9uID09PSAxIHx8IGRyYWdOb2RlSW5kZXggIT09IHRoaXMuaW5kZXggLSAxKSA6IHRydWU7XG5cbiAgICAgICAgaWYodGhpcy50cmVlLmFsbG93RHJvcChkcmFnTm9kZSwgdGhpcy5ub2RlLCBkcmFnTm9kZVNjb3BlKSAmJiBpc1ZhbGlkRHJvcFBvaW50SW5kZXgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRyZWUudmFsaWRhdGVEcm9wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmVlLm9uTm9kZURyb3AuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBkcmFnTm9kZTogZHJhZ05vZGUsXG4gICAgICAgICAgICAgICAgICAgIGRyb3BOb2RlOiB0aGlzLm5vZGUsXG4gICAgICAgICAgICAgICAgICAgIGRyb3BJbmRleDogdGhpcy5pbmRleCxcbiAgICAgICAgICAgICAgICAgICAgYWNjZXB0OiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NQb2ludERyb3AoZHJhZ05vZGUsIGRyYWdOb2RlSW5kZXgsIHBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzUG9pbnREcm9wKGRyYWdOb2RlLCBkcmFnTm9kZUluZGV4LCBwb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgdGhpcy50cmVlLm9uTm9kZURyb3AuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICBkcmFnTm9kZTogZHJhZ05vZGUsXG4gICAgICAgICAgICAgICAgICAgIGRyb3BOb2RlOiB0aGlzLm5vZGUsXG4gICAgICAgICAgICAgICAgICAgIGRyb3BJbmRleDogdGhpcy5pbmRleFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kcmFnaG92ZXJQcmV2ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZHJhZ2hvdmVyTmV4dCA9IGZhbHNlO1xuICAgIH1cblxuICAgIHByb2Nlc3NQb2ludERyb3AoZHJhZ05vZGUsIGRyYWdOb2RlSW5kZXgsIHBvc2l0aW9uKSB7XG4gICAgICAgIGxldCBuZXdOb2RlTGlzdCA9IHRoaXMubm9kZS5wYXJlbnQgPyB0aGlzLm5vZGUucGFyZW50LmNoaWxkcmVuIDogdGhpcy50cmVlLnZhbHVlO1xuICAgICAgICB0aGlzLnRyZWUuZHJhZ05vZGVTdWJOb2Rlcy5zcGxpY2UoZHJhZ05vZGVJbmRleCwgMSk7XG4gICAgICAgIGxldCBkcm9wSW5kZXggPSB0aGlzLmluZGV4O1xuXG4gICAgICAgIGlmKHBvc2l0aW9uIDwgMCkge1xuICAgICAgICAgICAgZHJvcEluZGV4ID0gKHRoaXMudHJlZS5kcmFnTm9kZVN1Yk5vZGVzID09PSBuZXdOb2RlTGlzdCkgPyAoKHRoaXMudHJlZS5kcmFnTm9kZUluZGV4ID4gdGhpcy5pbmRleCkgPyB0aGlzLmluZGV4IDogdGhpcy5pbmRleCAtIDEpIDogdGhpcy5pbmRleDtcbiAgICAgICAgICAgIG5ld05vZGVMaXN0LnNwbGljZShkcm9wSW5kZXgsIDAsIGRyYWdOb2RlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRyb3BJbmRleCA9IG5ld05vZGVMaXN0Lmxlbmd0aDtcbiAgICAgICAgICAgIG5ld05vZGVMaXN0LnB1c2goZHJhZ05vZGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50cmVlLmRyYWdEcm9wU2VydmljZS5zdG9wRHJhZyh7XG4gICAgICAgICAgICBub2RlOiBkcmFnTm9kZSxcbiAgICAgICAgICAgIHN1Yk5vZGVzOiB0aGlzLm5vZGUucGFyZW50ID8gdGhpcy5ub2RlLnBhcmVudC5jaGlsZHJlbiA6IHRoaXMudHJlZS52YWx1ZSxcbiAgICAgICAgICAgIGluZGV4OiBkcmFnTm9kZUluZGV4XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uRHJvcFBvaW50RHJhZ092ZXIoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25Ecm9wUG9pbnREcmFnRW50ZXIoZXZlbnQ6IEV2ZW50LCBwb3NpdGlvbjogbnVtYmVyKSB7XG4gICAgICAgIGlmKHRoaXMudHJlZS5hbGxvd0Ryb3AodGhpcy50cmVlLmRyYWdOb2RlLCB0aGlzLm5vZGUsIHRoaXMudHJlZS5kcmFnTm9kZVNjb3BlKSkge1xuICAgICAgICAgICAgaWYocG9zaXRpb24gPCAwKVxuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ2hvdmVyUHJldiA9IHRydWU7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnaG92ZXJOZXh0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRHJvcFBvaW50RHJhZ0xlYXZlKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmRyYWdob3ZlclByZXYgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5kcmFnaG92ZXJOZXh0ID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25EcmFnU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgaWYodGhpcy50cmVlLmRyYWdnYWJsZU5vZGVzICYmIHRoaXMubm9kZS5kcmFnZ2FibGUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHRcIiwgXCJkYXRhXCIpO1xuXG4gICAgICAgICAgICB0aGlzLnRyZWUuZHJhZ0Ryb3BTZXJ2aWNlLnN0YXJ0RHJhZyh7XG4gICAgICAgICAgICAgICAgdHJlZTogdGhpcyxcbiAgICAgICAgICAgICAgICBub2RlOiB0aGlzLm5vZGUsXG4gICAgICAgICAgICAgICAgc3ViTm9kZXM6IHRoaXMubm9kZS5wYXJlbnQgPyB0aGlzLm5vZGUucGFyZW50LmNoaWxkcmVuIDogdGhpcy50cmVlLnZhbHVlLFxuICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLmluZGV4LFxuICAgICAgICAgICAgICAgIHNjb3BlOiB0aGlzLnRyZWUuZHJhZ2dhYmxlU2NvcGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRHJhZ1N0b3AoZXZlbnQpIHtcbiAgICAgICAgdGhpcy50cmVlLmRyYWdEcm9wU2VydmljZS5zdG9wRHJhZyh7XG4gICAgICAgICAgICBub2RlOiB0aGlzLm5vZGUsXG4gICAgICAgICAgICBzdWJOb2RlczogdGhpcy5ub2RlLnBhcmVudCA/IHRoaXMubm9kZS5wYXJlbnQuY2hpbGRyZW4gOiB0aGlzLnRyZWUudmFsdWUsXG4gICAgICAgICAgICBpbmRleDogdGhpcy5pbmRleFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkRyb3BOb2RlRHJhZ092ZXIoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XG4gICAgICAgIGlmKHRoaXMudHJlZS5kcm9wcGFibGVOb2Rlcykge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ecm9wTm9kZShldmVudCkge1xuICAgICAgICBpZih0aGlzLnRyZWUuZHJvcHBhYmxlTm9kZXMgJiYgdGhpcy5ub2RlLmRyb3BwYWJsZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGxldCBkcmFnTm9kZSA9IHRoaXMudHJlZS5kcmFnTm9kZTtcbiAgICAgICAgICAgIGlmKHRoaXMudHJlZS5hbGxvd0Ryb3AoZHJhZ05vZGUsIHRoaXMubm9kZSwgdGhpcy50cmVlLmRyYWdOb2RlU2NvcGUpKSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy50cmVlLnZhbGlkYXRlRHJvcCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRyZWUub25Ob2RlRHJvcC5lbWl0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ05vZGU6IGRyYWdOb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZHJvcE5vZGU6IHRoaXMubm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGV4OiB0aGlzLmluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgYWNjZXB0OiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzTm9kZURyb3AoZHJhZ05vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9ICAgXG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvY2Vzc05vZGVEcm9wKGRyYWdOb2RlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50cmVlLm9uTm9kZURyb3AuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyYWdOb2RlOiBkcmFnTm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRyb3BOb2RlOiB0aGlzLm5vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5pbmRleFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kcmFnaG92ZXJOb2RlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcHJvY2Vzc05vZGVEcm9wKGRyYWdOb2RlKSB7XG4gICAgICAgIGxldCBkcmFnTm9kZUluZGV4ID0gdGhpcy50cmVlLmRyYWdOb2RlSW5kZXg7XG4gICAgICAgIHRoaXMudHJlZS5kcmFnTm9kZVN1Yk5vZGVzLnNwbGljZShkcmFnTm9kZUluZGV4LCAxKTtcblxuICAgICAgICBpZih0aGlzLm5vZGUuY2hpbGRyZW4pXG4gICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW4ucHVzaChkcmFnTm9kZSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlbiA9IFtkcmFnTm9kZV07XG5cbiAgICAgICAgdGhpcy50cmVlLmRyYWdEcm9wU2VydmljZS5zdG9wRHJhZyh7XG4gICAgICAgICAgICBub2RlOiBkcmFnTm9kZSxcbiAgICAgICAgICAgIHN1Yk5vZGVzOiB0aGlzLm5vZGUucGFyZW50ID8gdGhpcy5ub2RlLnBhcmVudC5jaGlsZHJlbiA6IHRoaXMudHJlZS52YWx1ZSxcbiAgICAgICAgICAgIGluZGV4OiB0aGlzLnRyZWUuZHJhZ05vZGVJbmRleFxuICAgICAgICB9KTtcblxuICAgICAgICBcbiAgICB9XG5cbiAgICBvbkRyb3BOb2RlRHJhZ0VudGVyKGV2ZW50KSB7XG4gICAgICAgIGlmKHRoaXMudHJlZS5kcm9wcGFibGVOb2RlcyAmJiB0aGlzLm5vZGUuZHJvcHBhYmxlICE9PSBmYWxzZSAmJiB0aGlzLnRyZWUuYWxsb3dEcm9wKHRoaXMudHJlZS5kcmFnTm9kZSwgdGhpcy5ub2RlLCB0aGlzLnRyZWUuZHJhZ05vZGVTY29wZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ2hvdmVyTm9kZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRyb3BOb2RlRHJhZ0xlYXZlKGV2ZW50KSB7XG4gICAgICAgIGlmKHRoaXMudHJlZS5kcm9wcGFibGVOb2Rlcykge1xuICAgICAgICAgICAgbGV0IHJlY3QgPSBldmVudC5jdXJyZW50VGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgaWYoZXZlbnQueCA+IHJlY3QubGVmdCArIHJlY3Qud2lkdGggfHwgZXZlbnQueCA8IHJlY3QubGVmdCB8fCBldmVudC55ID49IE1hdGguZmxvb3IocmVjdC50b3AgKyByZWN0LmhlaWdodCkgfHwgZXZlbnQueSA8IHJlY3QudG9wKSB7XG4gICAgICAgICAgICAgICB0aGlzLmRyYWdob3Zlck5vZGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBjb25zdCBub2RlRWxlbWVudCA9ICg8SFRNTERpdkVsZW1lbnQ+IGV2ZW50LnRhcmdldCkucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50O1xuXG4gICAgICAgIGlmIChub2RlRWxlbWVudC5ub2RlTmFtZSAhPT0gJ1AtVFJFRU5PREUnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XG4gICAgICAgICAgICAvL2Rvd24gYXJyb3dcbiAgICAgICAgICAgIGNhc2UgNDA6XG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdEVsZW1lbnQgPSAodGhpcy50cmVlLmRyb3BwYWJsZU5vZGVzKSA/IG5vZGVFbGVtZW50LmNoaWxkcmVuWzFdLmNoaWxkcmVuWzFdIDogbm9kZUVsZW1lbnQuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV07XG4gICAgICAgICAgICAgICAgaWYgKGxpc3RFbGVtZW50ICYmIGxpc3RFbGVtZW50LmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c05vZGUobGlzdEVsZW1lbnQuY2hpbGRyZW5bMF0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV4dE5vZGVFbGVtZW50ID0gbm9kZUVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dE5vZGVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzTm9kZShuZXh0Tm9kZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG5leHRTaWJsaW5nQW5jZXN0b3IgPSB0aGlzLmZpbmROZXh0U2libGluZ09mQW5jZXN0b3Iobm9kZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRTaWJsaW5nQW5jZXN0b3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzTm9kZShuZXh0U2libGluZ0FuY2VzdG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgLy91cCBhcnJvd1xuICAgICAgICAgICAgY2FzZSAzODpcbiAgICAgICAgICAgICAgICBpZiAobm9kZUVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvY3VzTm9kZSh0aGlzLmZpbmRMYXN0VmlzaWJsZURlc2NlbmRhbnQobm9kZUVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZykpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcmVudE5vZGVFbGVtZW50ID0gdGhpcy5nZXRQYXJlbnROb2RlRWxlbWVudChub2RlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnROb2RlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c05vZGUocGFyZW50Tm9kZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAvL3JpZ2h0IGFycm93XG4gICAgICAgICAgICBjYXNlIDM5OlxuICAgICAgICAgICAgICAgIGlmICghdGhpcy5ub2RlLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIC8vbGVmdCBhcnJvd1xuICAgICAgICAgICAgY2FzZSAzNzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5ub2RlLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sbGFwc2UoZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcmVudE5vZGVFbGVtZW50ID0gdGhpcy5nZXRQYXJlbnROb2RlRWxlbWVudChub2RlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnROb2RlRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb2N1c05vZGUocGFyZW50Tm9kZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICAvL2VudGVyXG4gICAgICAgICAgICBjYXNlIDEzOlxuICAgICAgICAgICAgICAgIHRoaXMudHJlZS5vbk5vZGVDbGljayhldmVudCwgdGhpcy5ub2RlKTtcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgLy9ubyBvcFxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kTmV4dFNpYmxpbmdPZkFuY2VzdG9yKG5vZGVFbGVtZW50KSB7XG4gICAgICAgIGxldCBwYXJlbnROb2RlRWxlbWVudCA9IHRoaXMuZ2V0UGFyZW50Tm9kZUVsZW1lbnQobm9kZUVsZW1lbnQpO1xuICAgICAgICBpZiAocGFyZW50Tm9kZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnROb2RlRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcmVudE5vZGVFbGVtZW50Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maW5kTmV4dFNpYmxpbmdPZkFuY2VzdG9yKHBhcmVudE5vZGVFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluZExhc3RWaXNpYmxlRGVzY2VuZGFudChub2RlRWxlbWVudCkge1xuICAgICAgICBjb25zdCBjaGlsZHJlbkxpc3RFbGVtZW50ID0gbm9kZUVsZW1lbnQuY2hpbGRyZW5bMF0uY2hpbGRyZW5bMV07XG4gICAgICAgIGlmIChjaGlsZHJlbkxpc3RFbGVtZW50ICYmIGNoaWxkcmVuTGlzdEVsZW1lbnQuY2hpbGRyZW4ubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3QgbGFzdENoaWxkRWxlbWVudCA9IGNoaWxkcmVuTGlzdEVsZW1lbnQuY2hpbGRyZW5bY2hpbGRyZW5MaXN0RWxlbWVudC5jaGlsZHJlbi5sZW5ndGggLSAxXTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmluZExhc3RWaXNpYmxlRGVzY2VuZGFudChsYXN0Q2hpbGRFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBub2RlRWxlbWVudDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFBhcmVudE5vZGVFbGVtZW50KG5vZGVFbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IHBhcmVudE5vZGVFbGVtZW50ID0gbm9kZUVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQ7XG5cbiAgICAgICAgcmV0dXJuIHBhcmVudE5vZGVFbGVtZW50LnRhZ05hbWUgPT09ICdQLVRSRUVOT0RFJyA/IHBhcmVudE5vZGVFbGVtZW50IDogbnVsbDtcbiAgICB9XG5cbiAgICBmb2N1c05vZGUoZWxlbWVudCkge1xuICAgICAgICBpZiAodGhpcy50cmVlLmRyb3BwYWJsZU5vZGVzKVxuICAgICAgICAgICAgZWxlbWVudC5jaGlsZHJlblsxXS5jaGlsZHJlblswXS5mb2N1cygpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBlbGVtZW50LmNoaWxkcmVuWzBdLmNoaWxkcmVuWzBdLmZvY3VzKCk7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdHJlZScsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3VpLXRyZWUgdWktd2lkZ2V0IHVpLXdpZGdldC1jb250ZW50IHVpLWNvcm5lci1hbGwnOnRydWUsJ3VpLXRyZWUtc2VsZWN0YWJsZSc6c2VsZWN0aW9uTW9kZSwndWktdHJlZW5vZGUtZHJhZ292ZXInOmRyYWdIb3ZlciwndWktdHJlZS1sb2FkaW5nJzogbG9hZGluZ31cIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgKm5nSWY9XCIhaG9yaXpvbnRhbFwiXG4gICAgICAgICAgICAoZHJvcCk9XCJvbkRyb3AoJGV2ZW50KVwiIChkcmFnb3Zlcik9XCJvbkRyYWdPdmVyKCRldmVudClcIiAoZHJhZ2VudGVyKT1cIm9uRHJhZ0VudGVyKCRldmVudClcIiAoZHJhZ2xlYXZlKT1cIm9uRHJhZ0xlYXZlKCRldmVudClcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS10cmVlLWxvYWRpbmctbWFzayB1aS13aWRnZXQtb3ZlcmxheVwiICpuZ0lmPVwibG9hZGluZ1wiPjwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInVpLXRyZWUtbG9hZGluZy1jb250ZW50XCIgKm5nSWY9XCJsb2FkaW5nXCI+XG4gICAgICAgICAgICAgICAgPGkgW2NsYXNzXT1cIid1aS10cmVlLWxvYWRpbmctaWNvbiBwaS1zcGluICcgKyBsb2FkaW5nSWNvblwiPjwvaT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cImZpbHRlclwiIGNsYXNzPVwidWktdHJlZS1maWx0ZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0ICNmaWx0ZXIgdHlwZT1cInRleHRcIiBhdXRvY29tcGxldGU9XCJvZmZcIiBjbGFzcz1cInVpLXRyZWUtZmlsdGVyIHVpLWlucHV0dGV4dCB1aS13aWRnZXQgdWktc3RhdGUtZGVmYXVsdCB1aS1jb3JuZXItYWxsXCIgW2F0dHIucGxhY2Vob2xkZXJdPVwiZmlsdGVyUGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgICAgICAgICAoa2V5ZG93bi5lbnRlcik9XCIkZXZlbnQucHJldmVudERlZmF1bHQoKVwiIChpbnB1dCk9XCJvbkZpbHRlcigkZXZlbnQpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidWktdHJlZS1maWx0ZXItaWNvbiBwaSBwaS1zZWFyY2hcIj48L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDx1bCBjbGFzcz1cInVpLXRyZWUtY29udGFpbmVyXCIgKm5nSWY9XCJnZXRSb290Tm9kZSgpXCIgcm9sZT1cInRyZWVcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJhcmlhTGFiZWxsZWRCeVwiPlxuICAgICAgICAgICAgICAgIDxwLXRyZWVOb2RlICpuZ0Zvcj1cImxldCBub2RlIG9mIGdldFJvb3ROb2RlKCk7IGxldCBmaXJzdENoaWxkPWZpcnN0O2xldCBsYXN0Q2hpbGQ9bGFzdDsgbGV0IGluZGV4PWluZGV4OyB0cmFja0J5OiBub2RlVHJhY2tCeVwiIFtub2RlXT1cIm5vZGVcIlxuICAgICAgICAgICAgICAgIFtmaXJzdENoaWxkXT1cImZpcnN0Q2hpbGRcIiBbbGFzdENoaWxkXT1cImxhc3RDaGlsZFwiIFtpbmRleF09XCJpbmRleFwiPjwvcC10cmVlTm9kZT5cbiAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktdHJlZS1lbXB0eS1tZXNzYWdlXCIgKm5nSWY9XCIhbG9hZGluZyAmJiAodmFsdWUgPT0gbnVsbCB8fCB2YWx1ZS5sZW5ndGggPT09IDApXCI+e3tlbXB0eU1lc3NhZ2V9fTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBbbmdDbGFzc109XCJ7J3VpLXRyZWUgdWktdHJlZS1ob3Jpem9udGFsIHVpLXdpZGdldCB1aS13aWRnZXQtY29udGVudCB1aS1jb3JuZXItYWxsJzp0cnVlLCd1aS10cmVlLXNlbGVjdGFibGUnOnNlbGVjdGlvbk1vZGV9XCIgIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiAqbmdJZj1cImhvcml6b250YWxcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS10cmVlLWxvYWRpbmcgdWktd2lkZ2V0LW92ZXJsYXlcIiAqbmdJZj1cImxvYWRpbmdcIj48L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ1aS10cmVlLWxvYWRpbmctY29udGVudFwiICpuZ0lmPVwibG9hZGluZ1wiPlxuICAgICAgICAgICAgICAgIDxpIFtjbGFzc109XCIndWktdHJlZS1sb2FkaW5nLWljb24gcGktc3BpbiAnICsgbG9hZGluZ0ljb25cIj48L2k+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDx0YWJsZSAqbmdJZj1cInZhbHVlJiZ2YWx1ZVswXVwiPlxuICAgICAgICAgICAgICAgIDxwLXRyZWVOb2RlIFtub2RlXT1cInZhbHVlWzBdXCIgW3Jvb3RdPVwidHJ1ZVwiPjwvcC10cmVlTm9kZT5cbiAgICAgICAgICAgIDwvdGFibGU+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidWktdHJlZS1lbXB0eS1tZXNzYWdlXCIgKm5nSWY9XCIhbG9hZGluZyAmJiAodmFsdWUgPT0gbnVsbCB8fCB2YWx1ZS5sZW5ndGggPT09IDApXCI+e3tlbXB0eU1lc3NhZ2V9fTwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgXG59KVxuZXhwb3J0IGNsYXNzIFRyZWUgaW1wbGVtZW50cyBPbkluaXQsQWZ0ZXJDb250ZW50SW5pdCxPbkRlc3Ryb3ksQmxvY2thYmxlVUkge1xuXG4gICAgQElucHV0KCkgdmFsdWU6IFRyZWVOb2RlW107XG5cbiAgICBASW5wdXQoKSBzZWxlY3Rpb25Nb2RlOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBzZWxlY3Rpb246IGFueTtcblxuICAgIEBPdXRwdXQoKSBzZWxlY3Rpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uTm9kZVNlbGVjdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Ob2RlVW5zZWxlY3Q6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uTm9kZUV4cGFuZDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgICBAT3V0cHV0KCkgb25Ob2RlQ29sbGFwc2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gICAgQE91dHB1dCgpIG9uTm9kZUNvbnRleHRNZW51U2VsZWN0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBPdXRwdXQoKSBvbk5vZGVEcm9wOiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAgIEBJbnB1dCgpIHN0eWxlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBjb250ZXh0TWVudTogYW55O1xuXG4gICAgQElucHV0KCkgbGF5b3V0OiBzdHJpbmcgPSAndmVydGljYWwnO1xuXG4gICAgQElucHV0KCkgZHJhZ2dhYmxlU2NvcGU6IGFueTtcblxuICAgIEBJbnB1dCgpIGRyb3BwYWJsZVNjb3BlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBkcmFnZ2FibGVOb2RlczogYm9vbGVhbjtcblxuICAgIEBJbnB1dCgpIGRyb3BwYWJsZU5vZGVzOiBib29sZWFuO1xuXG4gICAgQElucHV0KCkgbWV0YUtleVNlbGVjdGlvbjogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBwcm9wYWdhdGVTZWxlY3Rpb25VcDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBwcm9wYWdhdGVTZWxlY3Rpb25Eb3duOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBJbnB1dCgpIGxvYWRpbmc6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBsb2FkaW5nSWNvbjogc3RyaW5nID0gJ3BpIHBpLXNwaW5uZXInO1xuXG4gICAgQElucHV0KCkgZW1wdHlNZXNzYWdlOiBzdHJpbmcgPSAnTm8gcmVjb3JkcyBmb3VuZCc7XG5cbiAgICBASW5wdXQoKSBhcmlhTGFiZWw6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbGxlZEJ5OiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSB2YWxpZGF0ZURyb3A6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBmaWx0ZXI6IGJvb2xlYW47XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJCeTogc3RyaW5nID0gJ2xhYmVsJztcblxuICAgIEBJbnB1dCgpIGZpbHRlck1vZGU6IHN0cmluZyA9ICdsZW5pZW50JztcblxuICAgIEBJbnB1dCgpIGZpbHRlclBsYWNlaG9sZGVyOiBzdHJpbmc7XG5cbiAgICBASW5wdXQoKSBub2RlVHJhY2tCeTogRnVuY3Rpb24gPSAoaW5kZXg6IG51bWJlciwgaXRlbTogYW55KSA9PiBpdGVtO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxhbnk+O1xuXG4gICAgcHVibGljIHRlbXBsYXRlTWFwOiBhbnk7XG5cbiAgICBwdWJsaWMgbm9kZVRvdWNoZWQ6IGJvb2xlYW47XG5cbiAgICBwdWJsaWMgZHJhZ05vZGVUcmVlOiBUcmVlO1xuXG4gICAgcHVibGljIGRyYWdOb2RlOiBUcmVlTm9kZTtcblxuICAgIHB1YmxpYyBkcmFnTm9kZVN1Yk5vZGVzOiBUcmVlTm9kZVtdO1xuXG4gICAgcHVibGljIGRyYWdOb2RlSW5kZXg6IG51bWJlcjtcblxuICAgIHB1YmxpYyBkcmFnTm9kZVNjb3BlOiBhbnk7XG5cbiAgICBwdWJsaWMgZHJhZ0hvdmVyOiBib29sZWFuO1xuXG4gICAgcHVibGljIGRyYWdTdGFydFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgcHVibGljIGRyYWdTdG9wU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBwdWJsaWMgZmlsdGVyZWROb2RlczogVHJlZU5vZGVbXTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZiwgQE9wdGlvbmFsKCkgcHVibGljIGRyYWdEcm9wU2VydmljZTogVHJlZURyYWdEcm9wU2VydmljZSkge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZih0aGlzLmRyb3BwYWJsZU5vZGVzKSB7XG4gICAgICAgICAgICB0aGlzLmRyYWdTdGFydFN1YnNjcmlwdGlvbiA9IHRoaXMuZHJhZ0Ryb3BTZXJ2aWNlLmRyYWdTdGFydCQuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnTm9kZVRyZWUgPSBldmVudC50cmVlO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ05vZGUgPSBldmVudC5ub2RlO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ05vZGVTdWJOb2RlcyA9IGV2ZW50LnN1Yk5vZGVzO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ05vZGVJbmRleCA9IGV2ZW50LmluZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ05vZGVTY29wZSA9IGV2ZW50LnNjb3BlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuZHJhZ1N0b3BTdWJzY3JpcHRpb24gPSB0aGlzLmRyYWdEcm9wU2VydmljZS5kcmFnU3RvcCQuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICBldmVudCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnTm9kZVRyZWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ05vZGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ05vZGVTdWJOb2RlcyA9IG51bGw7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnTm9kZUluZGV4ID0gbnVsbDtcbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdOb2RlU2NvcGUgPSBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ0hvdmVyID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldCBob3Jpem9udGFsKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5sYXlvdXQgPT0gJ2hvcml6b250YWwnO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcbiAgICAgICAgaWYodGhpcy50ZW1wbGF0ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnRlbXBsYXRlTWFwID0ge307XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRlbXBsYXRlcy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRlbXBsYXRlTWFwW2l0ZW0ubmFtZV0gPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbk5vZGVDbGljayhldmVudCwgbm9kZTogVHJlZU5vZGUpIHtcbiAgICAgICAgbGV0IGV2ZW50VGFyZ2V0ID0gKDxFbGVtZW50PiBldmVudC50YXJnZXQpO1xuXG4gICAgICAgIGlmKERvbUhhbmRsZXIuaGFzQ2xhc3MoZXZlbnRUYXJnZXQsICd1aS10cmVlLXRvZ2dsZXInKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodGhpcy5zZWxlY3Rpb25Nb2RlKSB7XG4gICAgICAgICAgICBpZihub2RlLnNlbGVjdGFibGUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNGaWx0ZXJlZE5vZGVzKCkpIHtcbiAgICAgICAgICAgICAgICBub2RlID0gdGhpcy5nZXROb2RlV2l0aEtleShub2RlLmtleSwgdGhpcy52YWx1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIW5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5maW5kSW5kZXhJblNlbGVjdGlvbihub2RlKTtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IChpbmRleCA+PSAwKTtcblxuICAgICAgICAgICAgaWYodGhpcy5pc0NoZWNrYm94U2VsZWN0aW9uTW9kZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5wcm9wYWdhdGVTZWxlY3Rpb25Eb3duKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVEb3duKG5vZGUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbi5maWx0ZXIoKHZhbCxpKSA9PiBpIT1pbmRleCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5wcm9wYWdhdGVTZWxlY3Rpb25VcCAmJiBub2RlLnBhcmVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wYWdhdGVVcChub2RlLnBhcmVudCwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Ob2RlVW5zZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGV9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMucHJvcGFnYXRlU2VsZWN0aW9uRG93bilcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcGFnYXRlRG93bihub2RlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBbLi4udGhpcy5zZWxlY3Rpb258fFtdLG5vZGVdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMucHJvcGFnYXRlU2VsZWN0aW9uVXAgJiYgbm9kZS5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcGFnYXRlVXAobm9kZS5wYXJlbnQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25Ob2RlU2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiBub2RlfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgbGV0IG1ldGFTZWxlY3Rpb24gPSB0aGlzLm5vZGVUb3VjaGVkID8gZmFsc2UgOiB0aGlzLm1ldGFLZXlTZWxlY3Rpb247XG5cbiAgICAgICAgICAgICAgICBpZihtZXRhU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtZXRhS2V5ID0gKGV2ZW50Lm1ldGFLZXl8fGV2ZW50LmN0cmxLZXkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHNlbGVjdGVkICYmIG1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb25Nb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbi5maWx0ZXIoKHZhbCxpKSA9PiBpIT1pbmRleCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Ob2RlVW5zZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGV9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb25Nb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KG5vZGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZih0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb25Nb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9ICghbWV0YUtleSkgPyBbXSA6IHRoaXMuc2VsZWN0aW9ufHxbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IFsuLi50aGlzLnNlbGVjdGlvbixub2RlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk5vZGVTZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGV9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5pc1NpbmdsZVNlbGVjdGlvbk1vZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vbk5vZGVVbnNlbGVjdC5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgbm9kZTogbm9kZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBub2RlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Ob2RlU2VsZWN0LmVtaXQoe29yaWdpbmFsRXZlbnQ6IGV2ZW50LCBub2RlOiBub2RlfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24uZmlsdGVyKCh2YWwsaSkgPT4gaSE9aW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Ob2RlVW5zZWxlY3QuZW1pdCh7b3JpZ2luYWxFdmVudDogZXZlbnQsIG5vZGU6IG5vZGV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gWy4uLnRoaXMuc2VsZWN0aW9ufHxbXSxub2RlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uTm9kZVNlbGVjdC5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgbm9kZTogbm9kZX0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5ub2RlVG91Y2hlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uTm9kZVRvdWNoRW5kKCkge1xuICAgICAgICB0aGlzLm5vZGVUb3VjaGVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbk5vZGVSaWdodENsaWNrKGV2ZW50OiBNb3VzZUV2ZW50LCBub2RlOiBUcmVlTm9kZSkge1xuICAgICAgICBpZih0aGlzLmNvbnRleHRNZW51KSB7XG4gICAgICAgICAgICBsZXQgZXZlbnRUYXJnZXQgPSAoPEVsZW1lbnQ+IGV2ZW50LnRhcmdldCk7XG5cbiAgICAgICAgICAgIGlmKGV2ZW50VGFyZ2V0LmNsYXNzTmFtZSAmJiBldmVudFRhcmdldC5jbGFzc05hbWUuaW5kZXhPZigndWktdHJlZS10b2dnbGVyJykgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKG5vZGUpO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IChpbmRleCA+PSAwKTtcblxuICAgICAgICAgICAgICAgIGlmKCFzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmlzU2luZ2xlU2VsZWN0aW9uTW9kZSgpKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChub2RlKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChbbm9kZV0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dE1lbnUuc2hvdyhldmVudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbk5vZGVDb250ZXh0TWVudVNlbGVjdC5lbWl0KHtvcmlnaW5hbEV2ZW50OiBldmVudCwgbm9kZTogbm9kZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZmluZEluZGV4SW5TZWxlY3Rpb24obm9kZTogVHJlZU5vZGUpIHtcbiAgICAgICAgbGV0IGluZGV4OiBudW1iZXIgPSAtMTtcblxuICAgICAgICBpZih0aGlzLnNlbGVjdGlvbk1vZGUgJiYgdGhpcy5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb25Nb2RlKCkpIHtcbiAgICAgICAgICAgICAgICBsZXQgYXJlTm9kZXNFcXVhbCA9ICh0aGlzLnNlbGVjdGlvbi5rZXkgJiYgdGhpcy5zZWxlY3Rpb24ua2V5ID09PSBub2RlLmtleSkgfHwgdGhpcy5zZWxlY3Rpb24gPT0gbm9kZTtcbiAgICAgICAgICAgICAgICBpbmRleCA9IGFyZU5vZGVzRXF1YWwgPyAwIDogLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yKGxldCBpID0gMDsgaSAgPCB0aGlzLnNlbGVjdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2VsZWN0ZWROb2RlID0gdGhpcy5zZWxlY3Rpb25baV07XG4gICAgICAgICAgICAgICAgICAgIGxldCBhcmVOb2Rlc0VxdWFsID0gKHNlbGVjdGVkTm9kZS5rZXkgJiYgc2VsZWN0ZWROb2RlLmtleSA9PT0gbm9kZS5rZXkpIHx8IHNlbGVjdGVkTm9kZSA9PSBub2RlO1xuICAgICAgICAgICAgICAgICAgICBpZihhcmVOb2Rlc0VxdWFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG5cbiAgICBzeW5jTm9kZU9wdGlvbihub2RlLCBwYXJlbnROb2Rlcywgb3B0aW9uLCB2YWx1ZT86IGFueSkge1xuICAgICAgICAvLyB0byBzeW5jaHJvbml6ZSB0aGUgbm9kZSBvcHRpb24gYmV0d2VlbiB0aGUgZmlsdGVyZWQgbm9kZXMgYW5kIHRoZSBvcmlnaW5hbCBub2Rlcyh0aGlzLnZhbHVlKSBcbiAgICAgICAgY29uc3QgX25vZGUgPSB0aGlzLmhhc0ZpbHRlcmVkTm9kZXMoKSA/IHRoaXMuZ2V0Tm9kZVdpdGhLZXkobm9kZS5rZXksIHBhcmVudE5vZGVzKSA6IG51bGw7XG4gICAgICAgIGlmIChfbm9kZSkge1xuICAgICAgICAgICAgX25vZGVbb3B0aW9uXSA9IHZhbHVlfHxub2RlW29wdGlvbl07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYXNGaWx0ZXJlZE5vZGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5maWx0ZXIgJiYgdGhpcy5maWx0ZXJlZE5vZGVzICYmIHRoaXMuZmlsdGVyZWROb2Rlcy5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0Tm9kZVdpdGhLZXkoa2V5OiBzdHJpbmcsIG5vZGVzOiBUcmVlTm9kZVtdKSB7XG4gICAgICAgIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcbiAgICAgICAgICAgIGlmIChub2RlLmtleSA9PT0ga2V5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1hdGNoZWROb2RlID0gdGhpcy5nZXROb2RlV2l0aEtleShrZXksIG5vZGUuY2hpbGRyZW4pO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaGVkTm9kZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWF0Y2hlZE5vZGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvcGFnYXRlVXAobm9kZTogVHJlZU5vZGUsIHNlbGVjdDogYm9vbGVhbikge1xuICAgICAgICBpZihub2RlLmNoaWxkcmVuICYmIG5vZGUuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0ZWRDb3VudDogbnVtYmVyID0gMDtcbiAgICAgICAgICAgIGxldCBjaGlsZFBhcnRpYWxTZWxlY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yKGxldCBjaGlsZCBvZiBub2RlLmNoaWxkcmVuKSB7XG4gICAgICAgICAgICAgICAgaWYodGhpcy5pc1NlbGVjdGVkKGNoaWxkKSkge1xuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZENvdW50Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYoY2hpbGQucGFydGlhbFNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkUGFydGlhbFNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHNlbGVjdCAmJiBzZWxlY3RlZENvdW50ID09IG5vZGUuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBbLi4udGhpcy5zZWxlY3Rpb258fFtdLG5vZGVdO1xuICAgICAgICAgICAgICAgIG5vZGUucGFydGlhbFNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZighc2VsZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuZmluZEluZGV4SW5TZWxlY3Rpb24obm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24uZmlsdGVyKCh2YWwsaSkgPT4gaSE9aW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoY2hpbGRQYXJ0aWFsU2VsZWN0ZWQgfHwgc2VsZWN0ZWRDb3VudCA+IDAgJiYgc2VsZWN0ZWRDb3VudCAhPSBub2RlLmNoaWxkcmVuLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJ0aWFsU2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5wYXJ0aWFsU2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zeW5jTm9kZU9wdGlvbihub2RlLCB0aGlzLmZpbHRlcmVkTm9kZXMsICdwYXJ0aWFsU2VsZWN0ZWQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXJlbnQgPSBub2RlLnBhcmVudDtcbiAgICAgICAgaWYocGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZVVwKHBhcmVudCwgc2VsZWN0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb3BhZ2F0ZURvd24obm9kZTogVHJlZU5vZGUsIHNlbGVjdDogYm9vbGVhbikge1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKG5vZGUpO1xuXG4gICAgICAgIGlmKHNlbGVjdCAmJiBpbmRleCA9PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBbLi4udGhpcy5zZWxlY3Rpb258fFtdLG5vZGVdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYoIXNlbGVjdCAmJiBpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uLmZpbHRlcigodmFsLGkpID0+IGkhPWluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5vZGUucGFydGlhbFNlbGVjdGVkID0gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5zeW5jTm9kZU9wdGlvbihub2RlLCB0aGlzLmZpbHRlcmVkTm9kZXMsICdwYXJ0aWFsU2VsZWN0ZWQnKTtcblxuICAgICAgICBpZihub2RlLmNoaWxkcmVuICYmIG5vZGUuY2hpbGRyZW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IobGV0IGNoaWxkIG9mIG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BhZ2F0ZURvd24oY2hpbGQsIHNlbGVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKG5vZGU6IFRyZWVOb2RlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKG5vZGUpICE9IC0xO1xuICAgIH1cblxuICAgIGlzU2luZ2xlU2VsZWN0aW9uTW9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uTW9kZSAmJiB0aGlzLnNlbGVjdGlvbk1vZGUgPT0gJ3NpbmdsZSc7XG4gICAgfVxuXG4gICAgaXNNdWx0aXBsZVNlbGVjdGlvbk1vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1vZGUgJiYgdGhpcy5zZWxlY3Rpb25Nb2RlID09ICdtdWx0aXBsZSc7XG4gICAgfVxuXG4gICAgaXNDaGVja2JveFNlbGVjdGlvbk1vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1vZGUgJiYgdGhpcy5zZWxlY3Rpb25Nb2RlID09ICdjaGVja2JveCc7XG4gICAgfVxuXG4gICAgaXNOb2RlTGVhZihub2RlKSB7XG4gICAgICAgIHJldHVybiBub2RlLmxlYWYgPT0gZmFsc2UgPyBmYWxzZSA6ICEobm9kZS5jaGlsZHJlbiAmJiBub2RlLmNoaWxkcmVuLmxlbmd0aCk7XG4gICAgfVxuXG4gICAgZ2V0Um9vdE5vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlcmVkTm9kZXMgPyB0aGlzLmZpbHRlcmVkTm9kZXMgOiB0aGlzLnZhbHVlO1xuICAgIH1cbiAgICBcbiAgICBnZXRUZW1wbGF0ZUZvck5vZGUobm9kZTogVHJlZU5vZGUpOiBUZW1wbGF0ZVJlZjxhbnk+IHtcbiAgICAgICAgaWYodGhpcy50ZW1wbGF0ZU1hcClcbiAgICAgICAgICAgIHJldHVybiBub2RlLnR5cGUgPyB0aGlzLnRlbXBsYXRlTWFwW25vZGUudHlwZV0gOiB0aGlzLnRlbXBsYXRlTWFwWydkZWZhdWx0J107XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgIH0gICAgXG5cbiAgICBvbkRyYWdPdmVyKGV2ZW50KSB7XG4gICAgICAgIGlmKHRoaXMuZHJvcHBhYmxlTm9kZXMgJiYgKCF0aGlzLnZhbHVlIHx8IHRoaXMudmFsdWUubGVuZ3RoID09PSAwKSkge1xuICAgICAgICAgICAgZXZlbnQuZGF0YVRyYW5zZmVyLmRyb3BFZmZlY3QgPSAnbW92ZSc7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Ecm9wKGV2ZW50KSB7XG4gICAgICAgIGlmKHRoaXMuZHJvcHBhYmxlTm9kZXMgJiYgKCF0aGlzLnZhbHVlIHx8IHRoaXMudmFsdWUubGVuZ3RoID09PSAwKSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxldCBkcmFnTm9kZSA9IHRoaXMuZHJhZ05vZGU7XG4gICAgICAgICAgICBpZih0aGlzLmFsbG93RHJvcChkcmFnTm9kZSwgbnVsbCwgdGhpcy5kcmFnTm9kZVNjb3BlKSkge1xuICAgICAgICAgICAgICAgIGxldCBkcmFnTm9kZUluZGV4ID0gdGhpcy5kcmFnTm9kZUluZGV4O1xuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ05vZGVTdWJOb2Rlcy5zcGxpY2UoZHJhZ05vZGVJbmRleCwgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWV8fFtdO1xuICAgICAgICAgICAgICAgIHRoaXMudmFsdWUucHVzaChkcmFnTm9kZSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdEcm9wU2VydmljZS5zdG9wRHJhZyh7XG4gICAgICAgICAgICAgICAgICAgIG5vZGU6IGRyYWdOb2RlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkRyYWdFbnRlcihldmVudCkge1xuICAgICAgICBpZih0aGlzLmRyb3BwYWJsZU5vZGVzICYmIHRoaXMuYWxsb3dEcm9wKHRoaXMuZHJhZ05vZGUsIG51bGwsIHRoaXMuZHJhZ05vZGVTY29wZSkpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ0hvdmVyID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRHJhZ0xlYXZlKGV2ZW50KSB7XG4gICAgICAgIGlmKHRoaXMuZHJvcHBhYmxlTm9kZXMpIHtcbiAgICAgICAgICAgIGxldCByZWN0ID0gZXZlbnQuY3VycmVudFRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGlmKGV2ZW50LnggPiByZWN0LmxlZnQgKyByZWN0LndpZHRoIHx8IGV2ZW50LnggPCByZWN0LmxlZnQgfHwgZXZlbnQueSA+IHJlY3QudG9wICsgcmVjdC5oZWlnaHQgfHwgZXZlbnQueSA8IHJlY3QudG9wKSB7XG4gICAgICAgICAgICAgICB0aGlzLmRyYWdIb3ZlciA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWxsb3dEcm9wKGRyYWdOb2RlOiBUcmVlTm9kZSwgZHJvcE5vZGU6IFRyZWVOb2RlLCBkcmFnTm9kZVNjb3BlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgaWYoIWRyYWdOb2RlKSB7XG4gICAgICAgICAgICAvL3ByZXZlbnQgcmFuZG9tIGh0bWwgZWxlbWVudHMgdG8gYmUgZHJhZ2dlZFxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYodGhpcy5pc1ZhbGlkRHJhZ1Njb3BlKGRyYWdOb2RlU2NvcGUpKSB7XG4gICAgICAgICAgICBsZXQgYWxsb3c6IGJvb2xlYW4gPSB0cnVlO1xuICAgICAgICAgICAgaWYoZHJvcE5vZGUpIHtcbiAgICAgICAgICAgICAgICBpZihkcmFnTm9kZSA9PT0gZHJvcE5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxsb3cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBwYXJlbnQgPSBkcm9wTm9kZS5wYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlKHBhcmVudCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihwYXJlbnQgPT09IGRyYWdOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWxsb3cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBhbGxvdztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzVmFsaWREcmFnU2NvcGUoZHJhZ1Njb3BlOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgbGV0IGRyb3BTY29wZSA9IHRoaXMuZHJvcHBhYmxlU2NvcGU7XG5cbiAgICAgICAgaWYoZHJvcFNjb3BlKSB7XG4gICAgICAgICAgICBpZih0eXBlb2YgZHJvcFNjb3BlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmKHR5cGVvZiBkcmFnU2NvcGUgPT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZHJvcFNjb3BlID09PSBkcmFnU2NvcGU7XG4gICAgICAgICAgICAgICAgZWxzZSBpZihkcmFnU2NvcGUgaW5zdGFuY2VvZiBBcnJheSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICg8QXJyYXk8YW55Pj5kcmFnU2NvcGUpLmluZGV4T2YoZHJvcFNjb3BlKSAhPSAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYoZHJvcFNjb3BlIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YgZHJhZ1Njb3BlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKDxBcnJheTxhbnk+PmRyb3BTY29wZSkuaW5kZXhPZihkcmFnU2NvcGUpICE9IC0xO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmKGRyYWdTY29wZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcihsZXQgcyBvZiBkcm9wU2NvcGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcihsZXQgZHMgb2YgZHJhZ1Njb3BlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocyA9PT0gZHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkZpbHRlcihldmVudCkge1xuICAgICAgICBsZXQgZmlsdGVyVmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XG4gICAgICAgIGlmIChmaWx0ZXJWYWx1ZSA9PT0gJycpIHtcbiAgICAgICAgICAgIHRoaXMuZmlsdGVyZWROb2RlcyA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlcmVkTm9kZXMgPSBbXTtcbiAgICAgICAgICAgIGNvbnN0IHNlYXJjaEZpZWxkczogc3RyaW5nW10gPSB0aGlzLmZpbHRlckJ5LnNwbGl0KCcsJyk7XG4gICAgICAgICAgICBjb25zdCBmaWx0ZXJUZXh0ID0gT2JqZWN0VXRpbHMucmVtb3ZlQWNjZW50cyhmaWx0ZXJWYWx1ZSkudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGNvbnN0IGlzU3RyaWN0TW9kZSA9IHRoaXMuZmlsdGVyTW9kZSA9PT0gJ3N0cmljdCc7XG4gICAgICAgICAgICBmb3IobGV0IG5vZGUgb2YgdGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGxldCBjb3B5Tm9kZSA9IHsuLi5ub2RlfTtcbiAgICAgICAgICAgICAgICBsZXQgcGFyYW1zV2l0aG91dE5vZGUgPSB7c2VhcmNoRmllbGRzLCBmaWx0ZXJUZXh0LCBpc1N0cmljdE1vZGV9O1xuICAgICAgICAgICAgICAgIGlmICgoaXNTdHJpY3RNb2RlICYmICh0aGlzLmZpbmRGaWx0ZXJlZE5vZGVzKGNvcHlOb2RlLCBwYXJhbXNXaXRob3V0Tm9kZSkgfHwgdGhpcy5pc0ZpbHRlck1hdGNoZWQoY29weU5vZGUsIHBhcmFtc1dpdGhvdXROb2RlKSkpIHx8XG4gICAgICAgICAgICAgICAgICAgICghaXNTdHJpY3RNb2RlICYmICh0aGlzLmlzRmlsdGVyTWF0Y2hlZChjb3B5Tm9kZSwgcGFyYW1zV2l0aG91dE5vZGUpIHx8IHRoaXMuZmluZEZpbHRlcmVkTm9kZXMoY29weU5vZGUsIHBhcmFtc1dpdGhvdXROb2RlKSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyZWROb2Rlcy5wdXNoKGNvcHlOb2RlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gIFxuICAgIH1cblxuICAgIGZpbmRGaWx0ZXJlZE5vZGVzKG5vZGUsIHBhcmFtc1dpdGhvdXROb2RlKSB7XG4gICAgICAgIGlmIChub2RlKSB7XG4gICAgICAgICAgICBsZXQgbWF0Y2hlZCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKG5vZGUuY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICBsZXQgY2hpbGROb2RlcyA9IFsuLi5ub2RlLmNoaWxkcmVuXTtcbiAgICAgICAgICAgICAgICBub2RlLmNoaWxkcmVuID0gW107XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgY2hpbGROb2RlIG9mIGNoaWxkTm9kZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNvcHlDaGlsZE5vZGUgPSB7Li4uY2hpbGROb2RlfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNGaWx0ZXJNYXRjaGVkKGNvcHlDaGlsZE5vZGUsIHBhcmFtc1dpdGhvdXROb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmNoaWxkcmVuLnB1c2goY29weUNoaWxkTm9kZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChtYXRjaGVkKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5leHBhbmRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0ZpbHRlck1hdGNoZWQobm9kZSwge3NlYXJjaEZpZWxkcywgZmlsdGVyVGV4dCwgaXNTdHJpY3RNb2RlfSkge1xuICAgICAgICBsZXQgbWF0Y2hlZCA9IGZhbHNlO1xuICAgICAgICBmb3IobGV0IGZpZWxkIG9mIHNlYXJjaEZpZWxkcykge1xuICAgICAgICAgICAgbGV0IGZpZWxkVmFsdWUgPSBPYmplY3RVdGlscy5yZW1vdmVBY2NlbnRzKFN0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKG5vZGUsIGZpZWxkKSkpLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICBpZihmaWVsZFZhbHVlLmluZGV4T2YoZmlsdGVyVGV4dCkgPiAtMSkge1xuICAgICAgICAgICAgICAgIG1hdGNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFtYXRjaGVkIHx8IChpc1N0cmljdE1vZGUgJiYgIXRoaXMuaXNOb2RlTGVhZihub2RlKSkpIHtcbiAgICAgICAgICAgIG1hdGNoZWQgPSB0aGlzLmZpbmRGaWx0ZXJlZE5vZGVzKG5vZGUsIHtzZWFyY2hGaWVsZHMsIGZpbHRlclRleHQsIGlzU3RyaWN0TW9kZX0pIHx8IG1hdGNoZWQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWF0Y2hlZDtcbiAgICB9XG5cbiAgICBnZXRCbG9ja2FibGVFbGVtZW50KCk6IEhUTUxFbGVtZW50wqB7XG4gICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZih0aGlzLmRyYWdTdGFydFN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5kcmFnU3RhcnRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRoaXMuZHJhZ1N0b3BTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1N0b3BTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gICAgZXhwb3J0czogW1RyZWUsU2hhcmVkTW9kdWxlXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtUcmVlLFVJVHJlZU5vZGVdXG59KVxuZXhwb3J0IGNsYXNzIFRyZWVNb2R1bGUgeyB9XG4iXX0=