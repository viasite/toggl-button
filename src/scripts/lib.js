/*jslint indent: 2, unparam: true, plusplus: true, nomen: true */
/*global console: false, window: false, navigator: false, chrome: false, localStorage:false */
"use strict";

var report,
  debug = false,
  entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  },
  escapeHtml = function (string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  },
  secToHHMM;

report = function (e) {
  if (debug) {
    console.log(e);
  }
};

secToHHMM = function (sum) {
  var hours = Math.floor(sum / 3600),
    minutes = Math.floor((sum % 3600) / 60);

  return hours + "h " + minutes + "m";
};

chrome.webRequest.onBeforeSendHeaders.addListener(
  function (info) {
    var headers = info.requestHeaders,
      isTogglButton = false,
      uaIndex = -1;

    headers.forEach(function (header, i) {
      if (header.name.toLowerCase() === 'user-agent') {
        uaIndex = i;
      }
      if (header.name === 'IsTogglButton') {
        isTogglButton = true;
      }
    });

    if (!isTogglButton && uaIndex !== -1) {
      headers[uaIndex].value = "TogglButton/" + chrome.runtime.getManifest().version;
    }
    return {requestHeaders: headers};
  },
  {
    urls: [ "https://www.toggl.com/*", "https://toggl.com/*" ],
    types: ["xmlhttprequest"]
  },
  ["blocking", "requestHeaders"]
);
