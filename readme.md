# Initiator 1.0

Initiator is a JavaScript plugin that helps you define **CSS and JavaScript** to target any browser & its versions, device (phone, tablet, desktop), and platform (iPhone, Android, iPad).

This kind of detection lets you quickly deal with bugs. 


### Usage

**CSS Examples**

```css
/* Internet Explorer */
.ie element { property: value; }

/* Internet Explorer version less than 8 */
.lt_ie8 element { property: value;}

/* Internet Explorer version greater than 6 */
.gt_ie6 element { property: value;}

/* Target a version of browser */
.moz3_6 element { property: value;}

/* Mac OS */
.mac { property: value; }

/* Linux Machine */
.linux { property: value;}

/* For Android */
.android { property: value;}

/* Phones */
.phone { property: value; }

/* Tablets */
.tab { property: value;}

/* Desktop and Laptop */
.desktop { property: value;}
```

*Note: To define a browser version have decimal ('.') we have to replace it with underscore ('_')*


**CSS Prefix**

```
// Browsers
Internet Explorer : ie // We can also use 'lt' and 'gt' to make it work on condition base
mozila            : moz
chrome            : chrome
safari            : safari
opera             : opera

// Platforms
winOS      :  winOS
iPod       :  iPod
iPhone     :  iPhone
iPad       :  iPad
android    :  android
blackBerry :  blackBerry
playBook   :  playbook

// Devices
mac     : macOS
windows : windows
linux   : linux
tablet  : tab
phone   : phone
desktop : desktop
```


**javaScript Examples**

```javascript
if(isDesktop) {
  // Scripts for desktop goes here
}

else if(isTab) {
  // Scripts for tablets goes here
}

else if (isPhone) {
  // Scripts for phones goes here
}


// Other Options
browser.name     // Will return browser name
browser.version  // Will return browser version
device.name      // Will return device name
device.type      // Will return device type
```


### Where can I get help?

For any queries and problems, please mail at tarunsharma20@gmail.com