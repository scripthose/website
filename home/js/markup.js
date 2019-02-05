const app = window.app || {};

app.markups = {
  //   commentMarkup: function(comment) {
  //     return (
  //       `<li class="single_comment_area"><div class="comment-wrapper d-flex">
  //                     <div class="comment-author"><span>${
  //                       comment.commentName[0]
  //                     }<span></div>
  //                     <div class="comment-content">\
  //                         <div class="d-flex align-items-center justify-content-between">
  //                         <h5>${
  //                           comment.commentName
  //                         }</h5><span class="comment-date">
  //                             ${comment.commentDate.split("-")[1]}/` +
  //       `${
  //         comment.commentDate
  //           .split(":")[0]
  //           .split("-")[2]
  //           .split("T")[0]
  //       }/` +
  //       `${comment.commentDate.split("-")[0]}` +
  //       `
  //                         </span>
  //                     </div>
  //                     <p>${comment.commentMsg}</p>
  //                     <a class="active" href="#">Reply</a></div></div>
  //                 </li>`
  //     );
  //   },

  postMarkup: function(post) {
    return `
			<div class="col-12 col-lg-6">
				<div class="single-blog-post mb-50">
					<div class="post-thumbnail mb-30"><a href="/blog/post_number=${post.postId}">
						<img src="http://127.0.0.1:2000/img/bg-img/2.jpg" alt=""></a>
					</div>
					<div class="post-content">
						<a href="/blog/post_number=${post.postId}" class="post-title">
							<h5>${post.postTitle}</h5>
						</a>
						<div class="post-meta">
							<a href="#">
								<i class="fa fa-clock-o" aria-hidden="true"></i>${post.postDate}
							</a>
							<a href="#">
								<i class="fa fa-user" aria-hidden="true">\</i> ${post.postEditor}
							</a>
						</div>
					<p class="post-excerpt">${post.postSubTitle}\</p>
					</div>
				</div>
			</div>`;
  },

  lastPostMarkup: function(post) {
    return `
            <div class="single-latest-post d-flex align-items-center">
                <div class="post-thumb">
                    <img src="http://127.0.0.1:2000/img/bg-img/1.jpg" alt="">
                </div>
                <div class="post-content">
                    <a href="/blog/post_number=${
                      post.postId
                    }" class="post-title">
                        <h6>${post.postTitle}</h6>
                    </a>
                    <a href="/blog/post_number=${
                      post.postId
                    }" class="post-date">${post.postDate}</a>
                </div>
            </div>`;
  },

  prodMarkup: function(prod) {
    return `
            <div class="col-12 col-sm-6 col-lg-4">
                <div class="single-product-area mb-50">
                    <div class="product-img">
                        <img src="${prod.prodPic}" alt=""></a>
                        <div class="product-meta d-flex">
                            <a href="#" class="wishlist-btn" style="visibility: hidden;">
                                <i class="icon_heart_alt"></i>
                            </a>
                            <a href="#" class="add-to-cart-btn">Add to cart</a>
                            <a href="#" class="compare-btn" style="visibility: hidden;>
                                <i class="arrow_left-right_alt"></i>
                            </a>
                        </div>
                    </div>
                    <div class="product-info mt-15 text-center">
                        <a href="http://127.0.0.1:2000/nubia/products/product_number=${
                          prod.prodId
                        }">
                            <p>${prod.prodName}</p>
                        </a>
                        <h6>$${prod.prodPrice}</h6>
                    </div>
                </div>
            </div>`;
  },

  sellProdMarkup: function(prod) {
    return `
            <div class="col-12 col-sm-6 col-lg-4">
                <div class="single-product-area mb-50 wow fadeInUp" data-wow-delay="300ms">
                    <div class="product-img">
                        <img src="${prod.prodPic}" alt=""></a>
                        <div class="product-meta d-flex">
                            <a href="#" class="wishlist-btn">
                                <i class="icon_heart_alt"></i>
                            </a>
                            <a href="#" class="add-to-cart-btn">Add to cart</a>
                            <a href="#" class="compare-btn" onclick="alert('hello world')">
                                <i class="arrow_left-right_alt"></i>
                            </a>
                        </div>
                    </div>
                    <div class="product-info mt-15 text-center">
                        <a href="http://127.0.0.1:2000/nubia/products/product_number=${
                          prod.prodId
                        }">
                            <p>${prod.prodName}</p>
                        </a>
                        <h6>$${prod.prodPrice}</h6>
                    </div>
                </div>
            </div>`;
  },
  prodCount: function(prodCount) {
    return `
      <p>Showing 1-1 of ${prodCount.length} results</p>`;
  }
};
