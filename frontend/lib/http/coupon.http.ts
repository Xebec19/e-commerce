import requestAPI from "./request";

export function addCoupon({ code }: { code: string }) {
  const url = "/cart/add-discount";

  return requestAPI.post(url, { code });
}

export function removeCoupon() {
  const url = "/cart/remove-discount";

  return requestAPI.get(url);
}
