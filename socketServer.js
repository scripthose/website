const models = require('./models/models');


function SocketServer(io) {
  
  const connections = [];

  // server sockets broadcaster
  io.sockets.on('connection', function(socket){

    // pushing the active client into array of the connecting peoples
    connections.push(socket);
    
    // testing the sockets length for pushing it onto the array
    console.log(`Connected:There %s sockets connected`, connections.length);

    //disconnected
    socket.on('disconnect', function(data){
        // removing the clients who are disconnected from the array
        connections.splice(connections.indexOf(socket), 1);
        console.log('Disconnected: %s sockets connected', connections.length);
    })

    // getting product info from dashboard
    socket.on('get nubia product from dashboard', function(data){
        new models.nubiaProduct({
            prodName: data.productName,
            prodPic: data.productPic,
            prodPrice: data.productPrice,
            prodDesc: data.productDesc
        }).save()
    })

    // find product data and send it to clients
    models.nubiaProduct.find(function(err, prod){
        if(err) return console.error(err);
        prod.forEach(function(p){
            socket.emit('update client product', {
                prodId: p.id,
                prodName: p.prodName,
                prodPic: p.prodPic,
                prodPrice: p.prodPrice,
                prodDesc: p.prodDesc
            })
        })
    }).limit(4)

    socket.on('getAllProducts', () => {
        models.nubiaProduct.find(function(err, prod){
            if(err) return console.error(err);
            prod.forEach(function(p){
                socket.emit('sendAllProducts', {
                    prodId: p.id,
                    prodName: p.prodName,
                    prodPic: p.prodPic,
                    prodPrice: p.prodPrice,
                    prodDesc: p.prodDesc
                })
            });
        });
    });

  });

}

module.exports = SocketServer;