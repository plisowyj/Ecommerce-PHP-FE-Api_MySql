function loadScriptSync (src) {
    var s = document.createElement('script');
    s.src = src;
    s.type = "text/javascript";
    s.async = false;                                 
    document.getElementsByTagName('head')[0].appendChild(s);
}

$(document).ready(function() { 
    loadScriptSync("js/spec/screencompose.js");  
} );
