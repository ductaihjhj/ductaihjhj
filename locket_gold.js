const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"],
    obj = JSON.parse($response.body);

obj.Attention = "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

var locket = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2006-09-25T01:04:18Z",
  purchase_date: "2006-09-25T01:04:17Z",
  store: "app_store"
};

const match = Object.keys(mapping).find(e => ua.includes(e));
let entitlements = {
  grace_period_expires_date: null,
  purchase_date: "2006-09-25T01:04:17Z",
  product_identifier: "com.locket02.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z"
};

if (match) {
  let [e, s] = mapping[match];
  if (s) {
    entitlements.product_identifier = s;
    obj.subscriber.subscriptions[s] = locket;
  } else {
    obj.subscriber.subscriptions["com.locket02.premium.yearly"] = locket;
  }
  obj.subscriber.entitlements[e] = entitlements;
} else {
  obj.subscriber.subscriptions["com.locket02.premium.yearly"] = locket;
  obj.subscriber.entitlements.pro = entitlements;
}

$done({ body: JSON.stringify(obj) });
