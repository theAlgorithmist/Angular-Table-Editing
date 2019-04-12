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
 * All models used in the editable table demo
 *
 * @author Jim Armstrong (www.algorithmist.net)
 */

// types of transmission
export enum TransmissionEnum
{
  AUTO     = "AUTO",
  STANDARD = 'STANDARD'
}

// individual car data
export interface ICarData
{
  carid: number;
  year: number,
  model: string,
  price: number
  mileage: number;
  color: string;
  transmission: TransmissionEnum;
}

// crutch to get the keys since Interface does not exist at runtime
export const CarData: ICarData =
{
  carid: 0,
  year: 0,
  model: '',
  price: 0,
  mileage: 0,
  color: '',
  transmission: TransmissionEnum.AUTO
};

// complete car data model
export interface ICarDataModel
{
  header: Array<string>;

  data: Array<ICarData>;
}

// edited data model
export interface IEditedData
{
  id: number;

  value: number;
}
