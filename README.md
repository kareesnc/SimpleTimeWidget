## SimpleTimeWidget
Simple entry for time portion of date/time attributes.

## Features
![Sample screenshot](https://raw.githubusercontent.com/kareesnc/SimpleTimeWidget/master/demo.png)  
This widget's purpose is to provide a time input that is both easy and fast to use. 
Provides an input for the time portion only of a date/time Mendix attribute. 
Can be used alone, or paired with a calendar-style date picker. 

## Usage
Property descriptions:  
* Show label
  * Enables default Mendix label behavior  
* Label caption
  * Custom text for the label  
* Date/time attribute (required)  
  * The attribute for this widget
* Editable
  * Control whether the widget is editable, using default Mendix behavior  
* Read-only style
  * Controls how the widget displays when not editable  
* Visible
  * Control whether the widget is visible, using default Mendix behavior  
* Input style
  * Select between the standard text and special number input boxes.
    On mobile devices, number style inputs will bring up the number keyboard.  
* 12 or 24-hour mode
  * Switches time format to 12 or 24 hour format.
* Invalid time message
  * An error message to display when the time cannot be parsed. 
    This message does NOT prevent saving, executing microflows, etc. 
    While this message is present, the attribute will be the last valid value.  
* Required
  * When yes, causes Mendix validation to fail when the date attribute is empty.  
* Required message
  * The error message to show when the required validation fails.  
* OnChange action
  * Enables Mendix on change behavior. Will trigger when a new, valid value is input.  

Notes on empty value:  
When all inputs are cleared, the whole date/time attribute will be set to empty. 
If a new time is set before the object is committed, the last known date will be used. 

## Demo project
[Demo project live](https://simpletimewidget-s-sandbox.mxapps.io/index.html)  
[Demo project ZIP](https://github.com/kareesnc/SimpleTimeWidget/releases/download/1.1.0/SimpleTimeWidget-Sample.zip)  

## Issues, suggestions and feature requests
https://github.com/kareesnc/SimpleTimeWidget  

## Development and contribution
Widget created by Kathryn Rees @ NCSU
