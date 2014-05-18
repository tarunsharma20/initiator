/*
 * Initiator v1.1 - (c) Tarun Sharma
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>
 *
 * 
 * Initiator is a JavaScript plugin that helps you define CSS and JavaScript
 * to target any browser & its versions, device (phone, tablet, desktop),
 * and platform (iPhone, Android, iPad). 
 * 
 */

(function() {

  var usrAgent, isTab, isPhone, isDesktop, isInt, browser, device, vendorize, vendorizeIE, addPrefix, initiator, vendorPrefix;

  usrAgent = navigator.userAgent;

  // Object to create browser dependend API
  browser = {

    name   : false,
    version: false,

    // Method to set properties for browser
    setProperties: function(version, name) {
      this.version = version;
      this.name = name;
    },

    // Method to initialize browser API
    initialize: function() {

      // If browser is Internet Explorer
      if (/MSIE (\d+\.\d+);/.test(usrAgent)) {
        this.setProperties(Number(RegExp.$1), vendorPrefix.ie);
        vendorize(vendorPrefix.ie, this.version, true);
      }

      // If browser is Mozila Firefox
      else if (/Firefox[\/\s](\d+\.\d+)/.test(usrAgent)) {
        this.setProperties(Number(RegExp.$1), vendorPrefix.mozila);
        vendorize(vendorPrefix.mozila, this.version);
      }

      //IF browser is Safari
      else if(/Safari/.test(usrAgent) && (/Version[\/\s](\d+\.\d+)/.test(usrAgent))) {
        this.setProperties(Number(RegExp.$1), vendorPrefix.safari);
        vendorize(vendorPrefix.safari, this.version);
      }

      // If browser is Chrome
      else if(/Chrome[\/\s](\d+\.\d+)/.test(usrAgent)) {
        this.setProperties(Number(RegExp.$1), vendorPrefix.chrome);
        vendorize(vendorPrefix.chrome, this.version);
      }

      // If browser is Opera
      else if (/Opera[\/\s](\d+\.\d+)/.test(usrAgent)) {
        this.setProperties(Number(RegExp.$1), vendorPrefix.opera);
        vendorize(vendorPrefix.opera, this.version);
      }
    }
  };

  // Object to create device dependend API
  device = {

    name: false,
    type: false,

    // Method to set properties for device
    setProperties: function(name, type) {
      this.name = name;
      this.type = type;
      addPrefix(name + ' ' + type);

      // If device is phone
      if(type == vendorPrefix.phone) {
        isPhone = true;
      }

      // If device is tablet
      else if (type == vendorPrefix.tablet) {
        isTab = true;
      }

      // If device is desktop or laptop
      else {
        isDesktop = true;
      }
    },

    // Method to initialize device API
    initialize: function() {

      // If device is iPod
      if (/iPod/i.test(usrAgent)) {
        this.setProperties(vendorPrefix.iPod, vendorPrefix.phone);
      }

      // If device is iPhone
      else if (/iPhone/i.test(usrAgent)) {
        this.setProperties(vendorPrefix.iPhone, vendorPrefix.phone);
      }

      // If device is iPad
      else if(/iPad/i.test(usrAgent)) {
        this.setProperties(vendorPrefix.iPad, vendorPrefix.tablet);
      }

      // If device is Android
      else if(/Android/i.test(usrAgent)) {

        // If device is Mobile
        if(/Mobile/i.test(usrAgent)) {
          this.setProperties(vendorPrefix.android, vendorPrefix.phone);
        }

        else {
          this.setProperties(vendorPrefix.android, vendorPrefix.tablet);
        }
      }

      // If device is BlackBerry
      else if(/BlackBerry/i.test(usrAgent) || (/BB1/i.test(usrAgent) && (/Mobile/i.test(usrAgent)))) {
        this.setProperties(vendorPrefix.blackBerry, vendorPrefix.phone);
      }

      // If device is PlayBook
      else if(/PlayBook/i.test(usrAgent)) {
        this.setProperties(vendorPrefix.playBook, vendorPrefix.tablet);
      }

      // If device is Windows Phone
      else if(/IEMobile/i.test(usrAgent)) {
        this.setProperties(vendorPrefix.winOS, vendorPrefix.phone);
      }

      // If device is Windows's Desktop or Laptop
      else if(/Windows NT/i.test(usrAgent)) {
        this.setProperties(vendorPrefix.windows, vendorPrefix.desktop);
      }

      // If device is Mac's Desktop or Laptop
      else if(/Mac OS/i.test(usrAgent)) {
        this.setProperties(vendorPrefix.mac, vendorPrefix.desktop);
      }

      // If device is Linux's Desktop or Laptop
      else if(/Linux/i.test(usrAgent)) {
        this.setProperties(vendorPrefix.linux, vendorPrefix.desktop);
      }
    }
  }

  // Function to initialize vendor prefix in HTML
  vendorize = function(browser, version, internetExplorer) {

    // If browser version is integer
    if(isInt(version * 1)) {

      // If browser is Internet Explorer
      if(internetExplorer) {
        addPrefix(browser + ' ' + vendorizeIE(version))
      }

      else {
        addPrefix(browser + ' ' + browser + (version));
      }
    }

    // If browser version is floating value
    else {
      /(\d+).(\d+)/.exec(version);
      var decimal = RegExp.$2
      addPrefix(browser + ' ' + browser + parseInt(version) + '-' + decimal);
    }
  }

  // Function to initialize Internet Explorer prefix
  vendorizeIE = function(version) {
    version = parseInt(version);

    switch(version) {
      case 6:
        return vendorPrefix.ie6;
      break;

      case 7:
        return vendorPrefix.ie7;
      break;

      case 8:
        return vendorPrefix.ie8;
      break;

      case 9:
        return vendorPrefix.ie9;
      break;

      case 10:
        return vendorPrefix.ie10;
      break;

      default:
        return false;
    }
  }

  // Function to check number is an integer or not
  isInt = function(number) {
    return typeof number === 'number' && number % 1 == 0;
  }

  // Function to add prefix
  addPrefix = function(targetClass) {
    var element = document.documentElement;
    element.className = element.className == '' ? targetClass : element.className + ' ' + targetClass;
  }

  // Object to create collection of vendor prefixes
  vendorPrefix = {
    ie        : 'ie',
    ie6       : 'ie6 lt-ie10 lt-ie9 lt-ie8 lt-ie7',
    ie7       : 'gt-ie6 ie7 lt-ie10 lt-ie9 lt-ie8',
    ie8       : 'gt-ie6 gt-ie7 ie8 lt-ie10 lt-ie9',
    ie9       : 'gt-ie6 gt-ie7 gt-ie8 ie9 lt-ie10',
    ie10      : 'gt-ie6 gt-ie7 gt-ie8 gt-ie9 ie10',
    mozila    : 'moz',
    chrome    : 'chrome',
    safari    : 'safari',
    opera     : 'opera',
    iPod      : 'iPod',
    iPhone    : 'iPhone',
    iPad      : 'iPad',
    android   : 'android',
    blackBerry: 'blackBerry',
    playBook  : 'playBook',
    winOS     : 'winOS',
    mac       : 'macOS',
    windows   : 'windows',
    linux     : 'linux',
    tablet    : 'tab',
    phone     : 'phone',
    desktop   : 'desktop'

  }

  // Object to initialize initiator
  initiator = function() {
    browser.initialize();
    device.initialize();
    this.browser = browser;
    this.device  = device;
  }

  return initiator();
})();