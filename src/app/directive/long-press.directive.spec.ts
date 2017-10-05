import {
    fakeAsync,
    tick 
} from '@angular/core/testing';
import { LongPressDirective } from './long-press.directive';

describe('LongPressDirective', () => {
    let directive = new LongPressDirective();
    
    it('(onMouseDown) should discart other events and emitt pressed value', () => {
        let test = {
            which: 2,
        };
        expect(directive.onTouchStart(test)).toBe(undefined);
    })

    it('(onTap) should emitt a value', () => {
        let test = {
            which: 0,
            preventDefault: () => {}
        };
        spyOn(directive.onLongPress, 'emit');
        directive.onTouchStart(test);
        directive.onTouchEnd(test);
        expect(directive.onLongPress.emit).toHaveBeenCalledWith(false);
    })

    it('(onMouseDown) should emitt a value', () => {
        let test = {
            which: 1
        };
        spyOn(directive.onLongPress, 'emit');
        directive.onMouseDown(test);
        directive.onMouseUp(test);
        expect(directive.onLongPress.emit).toHaveBeenCalledWith(false);
    })



    it('(onLongPress) should emitt true', fakeAsync(() => {
        let test = {
            which: 1
        };
        spyOn(directive.onLongPress, 'emit');
        directive.onMouseDown(test);
        tick(699);
        directive.onMouseUp(test);
        expect(directive.onLongPress.emit).toHaveBeenCalledWith(false);
    }))

    it('(onLongPress) should emitt true', fakeAsync(() => {
        let test = {
            which: 1
        };
        spyOn(directive.onLongPress, 'emit');
        directive.onMouseDown(test);
        tick(701);
        directive.onMouseUp(test);
        expect(directive.onLongPress.emit).toHaveBeenCalledWith(true);
    }))

});