const models = require('./models/models');


function SocketServer(io, app) {
  
  const connections = [];
  let postsCache = [];

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

    models.post.find().populate('comments').sort('-1').exec(function(err, posts){
            if(err) return console.error(err);
            for (let i in posts) {
                let p = posts[i]
                let post = {
                    postId: p.id,
                    postTitle: p.postTitle,
                    postPic: p.postPic,
                    postDate: p.postDate,
                    postEditor: p.postEditor,
                    postTopic: p.postTopic,
                    postSubTitle: p.postSubTitle,
                    subTitleTopic: p.subTitleTopic,
                    comments: p.comments
                }
                postsCache.push(post);
                // fetch all posts and send it to the client
                socket.emit('send new post', post)
            }
    });

    // getting post data from script house dashboard
    socket.on('update post from dashboard', (data) => {
        new models.post({
            postTitle: data.postTitle,
            postDate: data.postDate,
            postEditor: data.postEditor,
            postTopic: data.postTopic,
            postSubTitle: data.postSubTitle,
            subTitleTopic: data.subTitleTopic,
            comments: [],
        }).save().then((newPost) => {
            // send the post from dashboard to clients without refreshing the page
            let p = post
            let post = {
                postId: p.id,
                postTitle: p.postTitle,
                postPic: p.postPic,
                postDate: p.postDate,
                postEditor: p.postEditor,
                postTopic: p.postTopic,
                postSubTitle: p.postSubTitle,
                subTitleTopic: p.subTitleTopic,
                comments: p.comments
            }
            postsCache.push(post);
            postslength = postsCache.length;
            sockets.emit('get the new post', newPost);
            socket.emit('newPost', newPost);
        });
    });

    // send the uploaded post to clients after a while
    socket.on('getHomePagePosts', (limit=3) => {
        // get sub post to views on home page and blog section
        console.log(postsCache.length)
        let j = 0;
        for(let i=postsCache.length - 1; i > 0; i--) {
            if (j >= limit || !postsCache[i]) return;
            socket.emit('home page posts', postsCache[i]);
            j++;
        }
    });

    // send all the posts to the client
    socket.on("getNewPosts", (len=-1) => {
        if (len == postsCache.length) return;
        for (let post of postsCache) {
            // fetch all posts and send it to the client
            socket.emit('send all post', post);
        }
    });

    // send the most recent post to the client
    socket.on('getRecentPosts', (limit=6) => {
        let j = 0;
        for (let i=postsCache.length - 1; i > 0; i--) {
            if (j >= limit || !postsCache[i]) return;
            socket.emit('recent post', postsCache[i]);
            j++;
        }
    })

    // comments system on the uploaded posts pages
    socket.on('post comment', function(data){
        // console.log(data);

        new models.comment({
            postHeader: data.postHeader,
            commentName: data.commentName,
            commentMsg: data.commentMsg,
            commentEmail: data.commentEmail,
            commentDate: data.commentDate
        }).save()
            .then((postComment) => {
                models.post.findOne({_id: postComment.postHeader}, (err, post) => {
                    if (err) console.error(err);
                    console.log(post)
                    if (post.comments) {
                        post.comments.push(postComment._id);
                    } else {
                        post.comments = [postComment._id]
                    }
                    console.log(post.comments);
                    models.post.updateOne({_id: post._id}, post).exec();
                });
            })    
    });

    // getting product info from dashboard
    socket.on('get nubia product from dashboard', function(data){
        new models.nubiaProduct({
            prodName: data.productName,
            prodPic: data.productPic,
            prodPrice: data.productPrice,
            prodDesc: data.productDesc
        }).save().then((product) => {
            console.log(product)
        })

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