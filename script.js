// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-08-13
// @description  try to take over the world!
// @author       You
// @match        https://cloud-i18n.bytedance.net/*
// @match        https://cloud.bytedance.net/*
// @match        https://cloud-boe.bytedance.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=google.com
// @grant        none
// ==/UserScript==

function keepMsg(text) {
    var lines = text.split(' ');
    var msg = lines.find(line => line.startsWith('_msg:'));
    return msg;
}

function processText(text) {
      var tmpKey = ""
      var res = ""
      var lastCh = ""
      var isInStrong = false
      for (let i = 0; i < text.length; i++) {
            var ch = text[i];
            if (ch == ':') {
                console.log(tmpKey)
                if (isInStrong) {
                    res = res + '</b></br>'
                    isInStrong = false
                }
                if (tmpKey == '_msg') {
                    res = res + '</br><b style="color: red;font-size:24px">'
                    isInStrong = true
                }
            } else if (ch == ' ') {
                tmpKey = ''
            } else {
                tmpKey = tmpKey + ch
            }
            if (ch == ' ' && lastCh == ' ') {
                lastCh = ch
                continue;
            } else {
                lastCh = ch
                res = res + ch
            }
    }
    return res;
}

function removeFields(text) {
  const fieldsToRemove = ['_podname', '_idc', 'host', 'streamlog_version', '__timestamp', '_batchid', '_cluster', '_deploy_stage', '_env', '_env_type', '_flags', '_image_version', '_ipv4', '_ipv6', '_language', '_pod_ip',
                         '_pod_name', '_primary_psm', '_spanid', '_stage', '_tce_physical_cluster', 'flow_cache_flag', 'flow_key', '_is_sidecar', 'request_id', 'slave_tag', 'stress_tag'];
    let result = text;

  fieldsToRemove.forEach(field => {
    const regex = new RegExp(`\\b${field}:.*?(?=\\s|$)`, 'g');
    result = result.replace(regex, '');
  });

  return result;
}

(function() {
    setInterval(function(){
	console.log("test");
        var pres = document.getElementsByTagName('pre');
        for (var i = 0; i < pres.length; i++) {
            pres[i].style.fontSize = '16px';
            pres[i].style.lineHeight = '24px';
            pres[i].innerHTML = processText(removeFields(pres[i].textContent))
        }
},1000);
})();
