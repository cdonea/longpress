import {
    Directive,
    Input,
    Output,
    EventEmitter,
    HostBinding,
    HostListener
  } from '@angular/core';
  
  @Directive({ selector: '[ng2-longpress]' })
  export class LongPressDirective {
  
    @Input() duration: number = 700;
  
    @Output() onPressing: EventEmitter<any> = new EventEmitter();
    @Output() onLongPress: EventEmitter<any> = new EventEmitter();
    @Output() onLongPressEnd: EventEmitter<any> = new EventEmitter();
  
    private longPressing: boolean;
    private timeout: any;
  
    constructor() {
      this.longPressing = false;
      this.timeout = null;
    }
  
    @HostBinding('class.longpress')
    get longPress() {
      return this.longPressing;
    }
  
    @HostListener('touchstart', ['$event'])
    onTouchStart(event) {
      this.onMouseTouchDown(event);
    }
  
    @HostListener('touchend', ['$event'])
    onTouchEnd(event) {
      event.preventDefault();
      this.endPress(event);
    }
  
    //Mouse events
    @HostListener('mousedown', ['$event'])
    onMouseDown(event) {
      this.onMouseTouchDown(event);
    }
  
    @HostListener('mouseup', ['$event'])
    onMouseUp(event) {
       this.endPress(event);
    }
  
    endPress(mouseEvent: MouseEvent) {
      if(!this.longPressing && mouseEvent.which <= 1) {
        this.onLongPress.emit(false);
      }
  
      this.reset();
    }
  
    private reset() {
      clearTimeout(this.timeout);
      this.longPressing = false;
    }
  
    private onMouseTouchDown(mouseEvent: MouseEvent) {
      // don't do right/middle clicks
  
      if(mouseEvent.which > 1) {
        return;
      }
  
      this.emittPressValue();
    }
  
    private emittPressValue() {
      this.longPressing = false;
      this.onPressing.emit();
  
      this.timeout = setTimeout(() => {
        this.longPressing = true;
        this.onLongPress.emit(true);
      }, this.duration);
    }
  }
  