const axios = require("axios");

const CASH_FREE_URL = "https://test.cashfree.com/api";

const cashFreePaymentAxios = axios.create({
  baseURL: CASH_FREE_URL, // Replace with your API's base URL
  headers: {
    "Content-Type": "application/json",
    "X-Client-Id": "TEST10198765722e22786988e33cf1e656789101",
    "X-Client-Secret": "cfsk_ma_test_7bcecbd7549a3c54501f7590999ec0d4_9a69659d",
  },
});

const createSub = (payload) => {
  return cashFreePaymentAxios.post(
    "/v2/subscriptions/nonSeamless/subscription",
    payload
  );
};
const pauseSub = (sub_reference_id, payload) => {
  return cashFreePaymentAxios.put(
    `/v2/subscriptions/${sub_reference_id}/pause-subscription`,
    payload
  );
};
const cancelSub = (sub_reference_id) => {
  return cashFreePaymentAxios.post(
    `/v2/subscriptions/${sub_reference_id}/cancel`,
    {}
  );
};
const activateSub = (sub_reference_id, payload) => {
  return cashFreePaymentAxios.post(
    `/v2/subscriptions/${sub_reference_id}/activate`,
    payload
  );
};
const getSubDetails = (sub_reference_id) => {
  return cashFreePaymentAxios.get(`/v2/subscriptions/${sub_reference_id}`, {});
};

module.exports = {
  cashFreePaymentAxios,
  createSub,
  pauseSub,
  cancelSub,
  getSubDetails,
  activateSub,
};
