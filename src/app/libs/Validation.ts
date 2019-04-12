/**
 * Copyright 2016 Jim Armstrong (www.algorithmist.net)
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
 * Simple number validation while typing or after data entry
 *
 * @author Jim Armstrong (www.algorithmist.net)
 *
 * @version 1.0
 */
export class Validation
{
  constructor()
  {
    // empty
  }

  /**
   * Validate a non-negative number that typically corresponds to a physical physical property
   *
   * @param {Event} evt Event whose target value is to be evaluated (parent should be an input element)
   *
   * @returns {boolean} True of the target value is a valid number and zero or greater
   */
  public static checkNumber(evt: Event): boolean
  {
    const value: number = +(<HTMLInputElement> evt.target).value;

    if (isNaN(value) || value < 0 || value.toString() == '')
    {
      (<HTMLInputElement> evt.target).value = "";

      // these aren't the droids you're looking for
      evt.preventDefault();

      return false;
    }
    else
    {
      // move along ... move along ...
      return true
    }
  }
}
