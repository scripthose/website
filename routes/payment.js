"use strict";
const route = require("express").Router();
const models = require("../models/models");
const paypal = require("paypal-rest-sdk");
// const fs = require("fs");
const clientsID = [] || "5c612495378b2b3234a099cf";

const keys = require("../authentication/payment-auth");

route.get("/checkout/product_id=:id?", (req, res) => {
  models.nubiaProduct.findOne({ _id: req.params.id }).exec((err, callback) => {
    if (err) return console.log(err);

    res.render("checkout", { title: "checkout", callback });
  });
});

route.get("/api/payment/id=:id", (req, res) => {
  // res.send("hello world" + req.params.id);

  clientsID.push(req.params.id);
  new models.clientInfo({
    clientName: "comes from login",
    clientID: req.params.id
  });

  models.nubiaProduct.findOne({ _id: req.params.id }).exec((err, callback) => {
    if (err) return console.log(err);

    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal"
      },
      redirect_urls: {
        return_url: "http://127.0.0.1:2000/success/",
        cancel_url: "http://127.0.0.1:2000/errors/"
      },
      transactions: [
        {
          item_list: {
            items: [
              {
                name: callback.prodName,
                sku: "item",
                price: callback.prodPrice,
                currency: "USD",
                quantity: 1
              }
            ]
          },
          amount: {
            currency: "USD",
            total: callback.prodPrice
          },
          description: callback.prodDesc
        }
      ]
    };

    paypal.payment.create(create_payment_json, function(error, payment) {
      if (error) {
        throw error;
      } else {
        console.log("Create Payment Response");
        console.log(payment);
        for (let i = 0; i < payment.links.length; i++) {
          if (payment.links[i].rel === "approval_url") {
            res.redirect(payment.links[i].href);
          }
        }
      }
    });
  });
});

route.get("/success/", (req, res) => {
  const paymentId = req.query.paymentId;
  const PayerID = req.query.PayerID;

  models.nubiaProduct
    .findOne({ _id: clientsID[clientsID.length - 1] })
    .exec((err, callback) => {
      if (err) return console.log(err);

      const execute_payment_json = {
        payer_id: PayerID,
        transactions: [
          {
            amount: {
              currency: "USD",
              total: callback.prodPrice
            }
          }
        ]
      };
      paypal.payment.execute(paymentId, execute_payment_json, function(
        error,
        payment
      ) {
        if (error) return console.log(error.response);
        // console.log(JSON.stringify(payment));
      });
      res.render("index", { title: "Home" });
    });
});

route.get("/errors/", (req, res) => {
  res.send("index", { title: "Home" });
});

module.exports = route;
