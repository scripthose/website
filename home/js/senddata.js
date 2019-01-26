(function(){

	let postTitle = $('#title');
	let appendPostOnBlog = $('.append-post-on-blog');
	let appendPostOnResent = $('.append-post-on-resent');
	let appendPostOnHomePage = $('.append-post-on-home-page');

	let postHeader = postTitle.context.URL.split('=')[1];

	app.socket.on('send all post', (data) => {
		appendPostOnBlog.append(app.markups.postMarkup(data));
		app.postsLength++;
		// console.log(postsLenth);
	});
    
	app.socket.on('recent post', (data) => {
		// check if the ids isn't matching so that 
		// it wouldn't show the same post in the recent area.
		if (data.postId !== postHeader) {
			appendPostOnResent.append(app.markups.lastPostMarkup(data));
		}
	});

	app.socket.on('home page posts', (data) => {
		appendPostOnHomePage.append(app.markups.postMarkup(data));
	});
	
	app.socket.on('newPost', (data) => {
		appendPostOnBlog.append(app.markups.postMarkup(data));
		appendPostOnResent.append(app.markups.lastPostMarkup(data));
		appendPostOnHomePage.append(app.markups.postMarkup(data));
	});

	if (/blog$/.test(location.pathname)) {
		console.log(app.postsLength);
		app.socket.emit('getNewPosts', app.postsLength);
	}

	if (location.pathname.includes('blog')) {
		app.socket.emit('getRecentPosts');
	}
	
	if (location.pathname === "/") {
		app.socket.emit('getHomePagePosts', 2);
	}
	

}());
