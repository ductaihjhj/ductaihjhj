/***********************************************
> deleteHeader by ducwtaif
***********************************************/

const version = 'V1.0.2';

function setHeaderValue(headers, key, value) {
    var lowerCaseKey = key.toLowerCase();
    if (lowerCaseKey in headers) {
        headers[lowerCaseKey] = value;
    } else {
        headers[key] = value;
    }
}

var modifiedHeaders = $request.headers;
setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");
$done({ headers: modifiedHeaders });
