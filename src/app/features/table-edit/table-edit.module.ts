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
 * (feature) Module for the table editing component
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
import { NgModule     } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../material.module';

import { TableEditComponent     } from '../table-edit/table-edit/table-edit.component';
import { InputSelectorDirective } from './directives/input-selector.directive';

export const TABLE_COMPONENTS: Array<any> = [TableEditComponent, InputSelectorDirective];

@NgModule({
  imports: [MaterialModule, CommonModule],

  exports: TABLE_COMPONENTS,

  declarations: TABLE_COMPONENTS
})
export class TableEditModule { }
