# Editing Tabular Data In Angular

This is the code base for the Medium article, [Editing Tabular Data Angular](https://medium.com/ngconf/editing-tabular-data-in-angular-ca7d4b86efb2).

 
Author:  Jim Armstrong - [The Algorithmist](http://www.algorithmist.net)

@algorithmist

theAlgorithmist [at] gmail [dot] com

Angular: 7.2.0

SVG.js 2.7.0

Typescript: 3.2.2

Angular CLI: 7.2.2

Version: 1.0

## Introduction

This code distribution is deconstructed in the Medium article.  In short, this application illustrates how to create a Material-based data table containing paging and sorting.  One of the columns is editable.  An entire component is constructed that allows editing of data in that column and numerous other production features.
 
The article is generally target to beginning to intermediate-level Angular developers and covers the following techniques.

- Using Material from a feature module

- Custom Directives (including @HostListener and @HostBinding)

- @ViewChild vs @ViewChildren and subscribing to changes on the latter

- Validate while typing

- Custom Events

Specific requirements of the editable table component include the following.  These are taken from actual applications I've developed for clients in the past, so I hope there is something of use for you in the code deconstruction.

1 – Display the data in a table with headers and data returned from a service.

2 – One and only one column is editable, the car mileage.  This is hardcoded into the application and will not change.

3 – Table is paged and the number of initial rows and allowable rows for padding will be provided.

4 – User may tab between rows, but indicates a value is edited by pressing ‘Return’.  I’ve also had to add a small button to the side of the input in actual projects, but that’s not required for this demo.

5 – User inputs are validated while typing.  Only numerical, integer inputs (with no minus sign) are allowed.  If the user enters an incorrect character, reset the input field value to its value when the user first focused on the field.

6 – Inputs fields have a small, grey border by default (color to be provided and not changeable).  When the user successfully edits a mileage value, replace the border with a green color (to be provided and not changeable).

7 – Whenever the user navigates to a new page, the input borders should be reset to the default value.

8 – Whenever a user clicks on a row, whether they edit a value or not, record that click and prepare a structure that shows the number of clicks on each car id to be returned to the server.  I actually had a client who wanted to do this to capture ‘interest’ in a particular row of data, i.e. they believed the click was indicative of interest in the data whether the user actually edited the data or not.  Okay, well, as long as the money’s there … I don’t care.

9 – Capture whenever the user moves from one page to another so that we can potentially take action in the future.  Yes, folks, that’s a common one … people want to do something, but they won’t know what it is until well into the future.

10 – Add a ‘Save’ button.  Clicking on this button will send a record of all edited data to the server.  For tutorial purposes, the button will be implemented, but the handler will only log the edited data to the console.


Enjoy!!

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


License
----

Apache 2.0

**Free Software? Yeah, Homey plays that**

[//]: # (kudos http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)
