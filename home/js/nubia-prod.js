// let appendProdOnHome = $("#handle-products");
let appendProdAll = $("#handle-all-prod");
let appendProdCount = $(".shop-page-count");

// app.socket.on("update client product", data => {
//   appendProdOnHome.append(app.markups.sellProdMarkup(data));
// });

app.socket.on("sendAllProducts", data => {
  appendProdAll.append(app.markups.prodMarkup(data));
});

app.socket.on("getProdLength", data => {
  appendProdCount.append(app.markups.prodCount(data));
});

app.socket.emit("getAllProducts");
app.socket.emit("getProdLength");
