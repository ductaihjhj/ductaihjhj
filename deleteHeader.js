/***********************************************
> deleteHeader by ducwtaif
***********************************************/

const version = 'V1.0.2';

function setHeaderValue(headers, key, value) {
  headers[key.toLowerCase()] = value;
}

var modifiedHeaders = $request.headers;
setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");
$done({ headers: modifiedHeaders });
