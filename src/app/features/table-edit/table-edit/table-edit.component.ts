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
 * Table Edit Component
 *
 * @author Jim Armstrong (www.algorithmist.net)
 */

// platform imports
import {
  Component,
  OnInit,
  AfterViewInit,
  Input,
  SimpleChanges,
  SimpleChange,
  OnChanges,
  ViewChild,
  ViewChildren,
  QueryList
} from '@angular/core';

// directives
import { InputSelectorDirective } from '../directives/input-selector.directive';

// Material
import {
  MatPaginator,
  MatSort,
  MatTableDataSource
} from '@angular/material';

import { PageEvent } from '@angular/material/typings/paginator';

// models
import {
  ICarData,
  CarData
} from '../../../models/models';

// libs
import { Validation } from '../../../libs/Validation';

import {IEditedData} from '../../../models/models';

@Component({
  selector: 'app-table-edit',

  templateUrl: './table-edit.component.html',

  styleUrls: ['./table-edit.component.scss']
})
export class TableEditComponent implements OnInit, AfterViewInit, OnChanges
{
  // Direct reference to the Material Paginator and sorting
  @ViewChild(MatPaginator)
  protected _paginator: MatPaginator;

  @ViewChild(MatSort)
  protected _sort: MatSort;

  // direct reference to input selectors in table-edit component
  @ViewChildren(InputSelectorDirective)
  protected _inputs: QueryList<InputSelectorDirective>;   // reference to QueryList returned by Angular
  protected _inputsArr: Array<InputSelectorDirective>;    // Array of Directive references

  /**
   * @type {Array<string>} Table headers
   */
  @Input('header')
  public header: Array<string>;

  /**
   * @type {Array<CarData>} Table rows
   */
  @Input('data')
  protected _data: Array<ICarData>;

  // edited data and row 'touches'
  protected _edited: Record<string, number>;
  protected _touches: Record<string, number>;

  // Display order is based on defined keys in CarData
  public displayOrder: Array<string>;

  // (Material) Datasource for the table display
  public dataSource: MatTableDataSource<ICarData>;

  /**
   * Construct a new table-edit component
   *
   * @returns {nothing}
   */
  constructor()
  {
    this.header   = [];
    this._data    = [];
    this._edited  = {};
    this._touches = {};

    // ownKeys returns string | number | Symbol
    this.displayOrder = <Array<string>> Reflect.ownKeys(CarData);

    // take advantage of advance knowledge that the 'carid' is the first property and we don't want to display a carid column
    this.displayOrder.shift();
  }

  /**
   * Angular lifecycle method - on init
   *
   * @returns {nothing}
   */
  public ngOnInit(): void
  {
    // reserved for future use
  }

  /**
   * Angular lifecylde method - after view init
   *
   * @returns {nothing}
   */
  public ngAfterViewInit(): void
  {
    // subscribe to changes in the query list
    this._inputs.changes.subscribe( () => this.__onInputsChanged() );
  }

  /**
   * Angular lifecycle - on changes
   *
   * @param {SimpleChanges} changes Changes in databound properties
   *
   * @returns {nothing}
   */
  public ngOnChanges(changes: SimpleChanges): void
  {
    let prop: string;
    let change: SimpleChange;

    for (prop in changes)
    {
      change = changes[prop];

      switch (prop)
      {
        case 'header':
          if (change.currentValue !== undefined)
          {
            // perform any desired checks on integrity of header data here ...
            console.log( "header len:", this.header.length );
          }
        break;

        case '_data':
          if (change.currentValue !== undefined)
          {
            // apply any desired checks on input data here - left as an exercise ...

            // set the data source
            this.dataSource = new MatTableDataSource<ICarData>(this._data);

            // assign the paginator and sorting
            this.dataSource.paginator = this._paginator;
            this.dataSource.sort      = this._sort;
          }
        break;
      }
    }
  }

  /**
   * Handler for {inputChanged} event; a mileage value has been marked as edited
   *
   * @param {IEditedData} evt Event object containing the edited row id and new mileage value
   *
   * @returns {nothing}
   */
  public onEdited(evt: IEditedData): void
  {
    // extra check since this is a public method
    if (evt !== undefined && evt != null)
    {
      if (evt.id >= 0)
      {
        // store the id and the edited value; presume contract is that edit directive checks input values for validity
        this._edited[evt.id.toString()] = evt.value;
      }
    }
  }

  /**
   * Execute whenever a user clicks on a row, considered to be an indication of interest in a mileage value even if that value
   * is not actually edited
   *
   * @param {ICarData} row
   *
   * @returns {nothing}
   */
  public onTouched(row: ICarData): void
  {
    if (row)
    {
      const id: string  = row.carid.toString();
      let value: number = this._touches[id];

      this._touches[id] = value === undefined ? 0 : ++value;
    }
  }

  /**
   * Execute whenever the user clicks on the 'Save' button
   *
   * @returns {nothing}
   */
  public onSave(): void
  {
    Reflect.ownKeys(this._edited).map ( (key: string): void => {
      console.log( "  carid and edited value: ", key, this._edited[key]);
    });

    // this is where edited data would be sent to a service to be persisted on the back end
  }

  /**
   * Execute whenever the user moves from one page in the table to another
   *
   * @param {PageEvent} evt
   *
   * @returns {nothing}
   */
  public onPage(evt: PageEvent): void
  {
    console.log( "page: ", evt );

    // placeholder for future action taken when the user moves to another page
  }

  /**
   * Check a number for validity while typing
   *
   * @returns {boolean}
   * @internal
   */
  public __checkNumber(evt: any): boolean
  {
    return Validation.checkNumber(evt);
  }

  /**
   * Execute whenever input fields in the table change (which happens on paging)
   *
   * @returns {nothing}
   * @private
   */
  protected __onInputsChanged(): void
  {
    // input query list changed (which happens on profile selection)
    this._inputsArr = this._inputs.toArray();

    // set default border color on everything
    if (this._inputsArr && this._inputsArr.length > 0) {
      this._inputsArr.forEach( (input: InputSelectorDirective): void => {input.borderColor = '#cccccc'});
    }
  }
}
