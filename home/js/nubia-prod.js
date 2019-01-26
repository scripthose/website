let appendProdOnHome = $('#handle-products');
let appendProdAll = $('#handle-all-prod');

app.socket.on('update client product', (data) => {
  appendProdOnHome.append(app.markups.sellProdMarkup(data));
});

// app.socket.on('sendAllProducts', (data) => {
//   appendProdAll.append(app.markups.prodMarkup(data));
// });

app.socket.emit('getAllProducts');




