(function(){

	let postTitle = $('#title');
	let appendPostComments = $('.append-post-comments');
	let commentName = $('#comment-name');
	let commentEmail = $('#comment-email');
	let commentMsg = $('#comment-msg');
	let commentBtn = $('#comment-btn');
	// let commentsCount = $('.comments-count');

	let postHeader = postTitle.context.URL.split('=')[1];	

    commentBtn.on('click', function(){
    	if(commentName.val() === ''){
    		alert('Please fill in all fields')
    	}else{
				let comment = {
					postHeader: postHeader,
						commentName: commentName.val(),
						commentMsg: commentMsg.val(),
						commentEmail: commentMsg.val(),
						commentDate: new Date(Date.now()),
				}
				app.socket.emit('post comment', comment);
				comment.commentDate = comment.commentDate.toJSON();
				appendPostComments.append(app.markups.commentMarkup(comment))

				commentName.val('')
    		commentEmail.val('')
    		commentMsg.val('')
    	}
    });

}());
