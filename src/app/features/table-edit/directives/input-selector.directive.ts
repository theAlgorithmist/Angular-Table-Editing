/**
 * Copyright 2019 Jim Armstrong (www.algorithmist.net)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Selector directive for input fields in the table editor, so the Directive's selector is the {editable} class.
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
import {
  Directive,
  ElementRef,
  OnInit,
  EventEmitter,
  Output,
  HostBinding,
  HostListener
} from '@angular/core';

import { Validation } from "../../../libs/Validation";

import { IEditedData } from '../../../models/models';

@Directive({
  selector: '.editable'
})
export class InputSelectorDirective implements OnInit
{
  /**
   * Indicate that an input field changed
   *
   * @type {number} New number
   */
  @Output('inputChanged')
  protected _changed: EventEmitter<IEditedData>;  // output event for this directive

  /**
   * Bind the border-color style to an internal variable
   */
  @HostBinding('style.border-color')
  public borderColor: string = '#cccccc';

  public hasError: boolean;                  // is there an error in the input field?

  protected _input: HTMLInputElement;        // direct reference to the <input>
  protected _currentValue: number;           // current (valid) input value
  protected _currentID: number;              // current id value

  /**
   * Construct a new InputSelectorDirective
   *
   * @param {ElementRef} _elementRef Injected {ElementRef}
   *
   * @returns {nothing}
   */
  constructor(protected _elementRef: ElementRef)
  {
    this.hasError = false;
    this._changed = new EventEmitter<IEditedData>();
  }

  /**
   * Angular lifecycle method - on int
   *
   * @returns {nothing}
   */
  public ngOnInit(): void
  {
    this._input = this._elementRef.nativeElement;
  }

  /**
   * Execute on input field focus
   *
   * @returns {nothing}
   * @private
   */
  @HostListener('focus') onFocus(): void
  {
    if (!isNaN(+this._input.value))
    {
      this._currentValue = +this._input.value;
      this._currentID    = +this._input.id;

      console.log( "current id: ", this._currentID );
    }
  }

  /**
   * Execute on key up
   *
   * @param {KeyboardEvent} evt
   *
   * @returns {boolean}
   * @private
   */
  @HostListener('keyup', ['$event']) onKeyUp(evt: KeyboardEvent): boolean
  {
    // test for singleton leading negative sign as first character
    const v: string = this._input.value;
    const n: number = v.length;

    // for now, allow a blank field as it is possible that the entire number could be deleted by backspace before
    // entering a new number
    if (n == 0) {
      return true;
    }

    // physical quantities may not be negative and a decimal is currently not allowed
    if ( (n == 1 && v == "-") || (evt.key == ".") )
    {
      this.hasError     = true;
      this._input.value = this._currentValue.toString();

      return true;
    }

    // check for most recent keystroke being an enter, which is currently the only way to indicate an edit
    const code: string = evt.code.toLowerCase();
    if (code == 'enter' || code == 'return')
    {
      if (!isNaN(+v) && isFinite(+v))
      {
        this.hasError      = false;
        this._currentValue = +v;

        // set 'edited' border color and emit the changed event
        this.borderColor = '#66CD00';

        this._changed.emit({id: this._currentID, value: +v});
      }
      else
      {
        this.hasError     = true;
        this._input.value = this._currentValue.toString();
      }

      return true;
    }

    this.hasError = !Validation.checkNumber(evt);

    if (this.hasError)
    {
      console.log( "error: ", this._currentValue );
      // indicate an error by replacing the bad input with the 'current' or last-known good value
      // this may be altered in a future release
      this._input.value = this._currentValue.toString();
    }

    return true;
  }
}
