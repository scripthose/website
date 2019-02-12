const paypal = require("paypal-rest-sdk");

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AQJGmCL8pAFYULu5kwXcyy9Hjj93dqTY3Z18-s0voTH5W7d7jHnN8Gfp70K1Qv8kjP6QwuGtGm6EULV5",
  client_secret:
    "EE0-uPa0P8cd9jR-x2CGDeB3GP4mrSRoTOOfHpgIJSj_1Sqr-S1tCXZquM-ZCg6zMo1INjz6ceV92tye"
});

module.exports = paypal;
