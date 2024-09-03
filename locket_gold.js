const mapping = {
  车票票: ["vip+watch_vip"],
  Locket: ["Gold"],
};

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var obj = JSON.parse($response.body);
obj.Attention =
  "Chúc mừng bạn! Vui lòng không bán hoặc chia sẻ cho người khác!";

var ductai = {
  is_sandbox: !1,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-18T01:04:17Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: "2024-07-28T01:04:18Z",
  purchase_date: "2024-07-28T01:04:17Z",
  store: "app_store",
};

var ductai206 = {
  grace_period_expires_date: null,
  purchase_date: "2024-07-28T01:04:17Z",
  product_identifier: "com.ductai.premium.yearly",
  expires_date: "2099-12-18T01:04:17Z",
};

const match = Object.keys(mapping).find((e) => ua.includes(e));

if (match) {
  let [e, s] = mapping[match];
  s
    ? ((ductai206.product_identifier = s),
      (obj.subscriber.subscriptions[s] = ductai))
    : (obj.subscriber.subscriptions["com.ductai.premium.yearly"] = ductai);
  obj.subscriber.entitlements[e] = ductai206;
} else {
  obj.subscriber.subscriptions["com.ductai.premium.yearly"] = ductai;
  obj.subscriber.entitlements.pro = ductai206;
}

$done({ body: JSON.stringify(obj) });
