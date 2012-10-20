/* Edited on GNU Emacs */
function get_xhr() {
    if (typeof XMLHttpRequest != "undefined") {
        return new XMLHttpRequest();
    } else if (typeof ActiveXObject != "undefined") {
        if (typeof arguments.callee.activeXString != "string") {
            var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0","MSXML2.XMLHttp"],i, len;
            for ( i = 0, len = versions.length; i < len; i++) {
                try {
                    new ActiveXObject(versions[i]);
                    arguments.callee.activeXString = versions[i];
                    break;
                } catch (exc) {
                    console.log(exc);
                }
            }
        }
        return new ActiveXObject(arguments.callee.activeXString);
    } else {
        throw new Error("Error: no xhr object available.");
    }
}

/* the var name is space-toskeira because is just to send
   and/or receive data on the protocol space
   (this reason is very poor) */
/* I don't know yet if the best way is to make this stuff static */
var st = {
    sendScore : function(score) {
        var xhr = get_xhr();
        xhr.onreadystatechange = function() {
           if (xhr.readyState == 4) {
               if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                   console.log("score sent.");
                   //document.getElementById("algumaCoisa").innerHTML = xhr.responseText;
               } else {
                   console.log("response error: " + xhr.status);
               }
           }
        };
        xhr.open("post", "ts?o=1&x=" + Math.random(), true);
        xhr.send(null);
    },
    receiveSomething : function() {
        var xhr = get_xhr();
        xhr.onreadystatechange = function() {
           if (xhr.readyState == 4) {
               if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                   console.log(xhr.responseText);
               } else {
                   console.log("response error: " + xhr.status);
               }
           }
        };
        xhr.open("get", "ts?o=3&x=" + Math.random(), true);
        xhr.send(null);
    }
};
