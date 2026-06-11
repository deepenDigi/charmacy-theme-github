// custom js
$(document).ready(function () {
  console.log('jjjjjjjjjjjjjjjjjjjjj')
	$(document).on("click", "#mswishlistbutton", function () {
		event.preventDefault();
        $('.toast-oval toast-success').hide();
        toastr.clear();
		var button = this;
		button.disabled = true;
		var shopdomain = $(this).attr("data-storename");
		var store_id = $(this).attr("data-storeid");
		var customerids = $("#ms_customer_id").val();
		var productId = $(this).attr("data-product");
		var variantproductId = $(this).attr("data-variant");
		var uniqueId = $(this).attr("data-unique-id");
		var shopurl = Shopify.shop;

		var _this = this;

		$.ajax({
			type: "POST",
			url: "https://faq.mebiz.app/wishlist_bt",
			data: {
				product_id: productId,
				variant_id: variantproductId,
				shopurl: shopurl,
				customerid: customerids,
				shop_id: store_id,
				shop_name: shopdomain,
			},
			success: function (response) {
                 if (response && response.wl_page_setting_data && response.wl_page_setting_data.toastr_position) {
                    var toastr_position = response.wl_page_setting_data.toastr_position;
                } else {
                    var toastr_position = 'toast-top-right';
                }
				toastr.options = {
					closeButton: false,
					progressBar: false,
					preventDuplicates: true,
					showDuration: "3000",
					hideDuration: "3000",
					timeOut: "3000",
					positionClass: toastr_position,
					toastClass: "toast-oval", // Apply custom style class
				};
                if(response.wl_page_setting_data){
                   var toastr_background_color = response.wl_page_setting_data.toastr_background_color || '#000000';
                   var toastr_text_color = response.wl_page_setting_data.toastr_text_color || '#ffffff';
                   var toastr_width = response.wl_page_setting_data.toastr_width || '200px';
                   var toastr_height = response.wl_page_setting_data.toastr_height || '0px';
                   var toastr_font_size = response.wl_page_setting_data.toastr_font_size || '10px';
                   var toastr_font_family = response.wl_page_setting_data.toastr_font_family || 'serif';
  
                   var style = document.createElement('style');
      				style.type = 'text/css';
      				style.innerHTML = `
      					.toast-oval {
      						background-color: ${toastr_background_color} !important;
      						color: ${toastr_text_color} !important;
      						width: ${toastr_width} !important;
      						height: ${toastr_height} !important;
      						font-size: ${toastr_font_size} !important;
      						border-radius: 50px !important;
      						padding: 20px 40px !important;
                            font-family: ${toastr_font_family}!important;
                            opacity: 1 !important;
      					}
      				`;
    				document.getElementsByTagName('head')[0].appendChild(style);
                 }
				setTimeout(function () {
					toastr.clear();
				}, 300000);
				toastr.success(response.toaster_message);
				var wp_add_icon_color = response.icondata.wishlist_icon_color;
                var wp_icon_hover_color = response.icondata.wishlist_icon_hover_color;
				let wishListIconTag = $(_this).find(".wishlistIcon");
                var wp_icon = response.icondata.wishlist_icon;
                var wp_remove_icon = response.icondata.wishlist_remove_icon;
                var wishlist_icon_text = response.icondata.add_to_wishlist;
                var wishlist_icon_remove_text = response.icondata.remove_from_wishlist;

                $(`.mswishlistbutton[data-product='${productId}'] .wishlistIcon`).each(function () {
                        $(this).removeClass(wp_remove_icon).addClass(wp_icon);
                });
              
				$(".product-details-wishlist-text-change").text(wishlist_icon_text);
                $("#wl_count").css("display", "block");
				$("#wl_count").text(response.addwishdataCount);
              
				if (response.wl_pro_delete == "1") {
                    $("#wl_count").css("display", "none");
                 
                	if (response.addwishdataCount === '0' || response.addwishdataCount === null || response.addwishdataCount === '') {
                       $("#wl_count").css("display", "none");
                    }else{
                       $("#wl_count").css("display", "block");
                       $("#wl_count").text(response.addwishdataCount);
                    }
                    
					var wp_add_icon_color = response.icondata.wishlist_icon_color;
					wishListIconTag.css("color", wp_add_icon_color);
                  
                    $(`.mswishlistbutton[data-product='${productId}'] .wishlistIcon`).each(function () {
                      $(this).removeClass(wp_icon).addClass(wp_remove_icon);
                    });
				}
				setTimeout(function () {
					button.disabled = false;
				}, 1000);
			},
			error: function (error) {
				alert("Failed to add product to wishlistddd.");
				setTimeout(function () {
					button.disabled = false;
				}, 1000);
			},
		});
	});

	$(document).ready(function () {
		function handleAjaxRequest() {
			var productvariantsId = $("#mswishlistbutton").data("variant");
			var productcustomerIds = $("#ms_customer_id").val();
            var store_name = Shopify.shop;

			//   console.log(productcustomerId);
			var uniqueId = $(".mswishlistbutton").data("unique-id");
			var wp_icon_change = "";

			if (productcustomerIds == "0") {
				var productcustomerId = "";
			} else {
				var productcustomerId = productcustomerIds;
			}

			$.ajax({
				url: "https://faq.mebiz.app/geticon_color", // The Laravel route to fetch data
				method: "POST",
				data: {
					productvariantsId: productvariantsId,
					productcustomerId: productcustomerId,
                    store_name: store_name
				},
				success: function (response) {
                  if(response.addwishdataCount == '0'){
                    $("#wl_count").css("display", "none");
                  }else{
                    $("#wl_count").css("display", "block");
                    $("#wl_count").text(response.addwishdataCount);
                  }
					if (response.wishsettingdata.page_custom_css != null) {
						$("head").append("<style>" + response.wishsettingdata.page_custom_css + "</style>");
					}
					fetchAndAppendWishlistIcons();

					if (response.addproductCount > 0) {
						$("#wl_count").text(response.addwishdataCount);
						var wp_remove_icon_color = response.icondata.wishlist_icon_hover_color;
						$("#uniqueidcss" + uniqueId).css("color", wp_remove_icon_color);
					} else {
						if (response.addwishdataCount > 0) {
							$("#wl_count").text(response.addwishdataCount);
						} else {
                           $("#wl_count").css("display", "none");
							// $("#wl_count").text(0);
						}
						var wp_add_icon_color = response.icondata.wishlist_icon_color;
						$("#uniqueidcss" + uniqueId).css("color", wp_add_icon_color);
					}

					
				},
				error: function (error) {
					console.error("Error fetching data:", error);
				},
			});
		}

		handleAjaxRequest();


		function fetchAndAppendWishlistIcons() {
			var store_id = $("#mswishlistbutton").data("storeid");
			var customer_id = $("#ms_customer_id").val();
            var store_name = Shopify.shop;
			$.ajax({
				url: "https://faq.mebiz.app/getWishListProduct",
				method: "POST",
				data: {
					store_id: store_id,
					customer_id: customer_id,
                    store_name: store_name
				},
				success: function (response) {
					var wishlistProducts = response;
					localStorage.setItem("wishlistProducts", JSON.stringify(response));
					appendWishlistIcons();
				},
			});
		}
	});

	//move to wishlist

	$(document).ready(function () {
		$(".wishlist-move").click(function (e) {
			var product_id = $(this).data("product");
			var variant_id = $(this).data("variant");
			var customer_id = $(this).data("customer");
			var store_id = $(this).data("store");
			var shop_name = $(this).data("shop_name");
			console.log("Product ID:", product_id);
			$.ajax({
				url: "https://faq.mebiz.app/moveToWishlistProduct",
				type: "POST",
				data: {
					product_id: product_id,
					variant_id: variant_id,
					customer_id: customer_id,
					store_id: store_id,
					shop_name: shop_name,
				},
				success: function (response) {
					$("#wl_count").text(response.addwishdataCount);
				},
				error: function (xhr, status, error) {
					console.error("AJAX error:", error);
				},
			});
		});
	});


	$(document).ready(function () {
		var loginId = $("#ms_customer_id").val();
        var store_name = Shopify.shop;
        var customerids = $("#ms_customer_id").val();
		if (loginId != 0) {
			$.ajax({
				url: "https://faq.mebiz.app/login_get_Id",
				method: "POST",
				data: {
					loginId: loginId,
                    store_name: store_name,
                    customerids: customerids
				},
				success: function (response) {
					console.log(response.addproductCount);
				},
				error: function (error) {
					console.error("Error fetching data:", error);
				},
			});
		}
	});
});


//viewSimilar tejas
function appendWishlistIcons() {
	var storedWishlistProducts = localStorage.getItem("wishlistProducts");
	var wishlistProducts = JSON.parse(storedWishlistProducts);
	// var wp_icon_change = "fa-heart-o";
	// var wp_icon = "fa-heart";
	$(".mswishlistbutton").each(function () {
		var response = wishlistProducts;
    
		var icondata = response.icondata;
		var iconcolor = response.iconcolor.wishlist_icon_hover_color;
		var productIds = icondata.map((item) => item.product_id);
		var currentUniqueId = $(this).data("unique-id");
		var customerids = $("#ms_customer_id").val();
        var wp_icon = response.iconcolor.wishlist_icon;
        var wp_icon_change = response.iconcolor.wishlist_remove_icon;
		color = response.iconcolor.wishlist_icon_color;
		if (productIds.includes(currentUniqueId.toString())) {
			var color = iconcolor;
			var code = `<div style="display: flex; align-items: center; gap: 10px; flex-direction: row-reverse; padding-right: 12px;padding-top: 6px;" class="wishlistDiv">
                                    <i class="wishlistIcon fa ${wp_icon} wl_title mswlicon" style="color: ${color}; font-size: 20px;background: #fff!important;padding: 5px !important; border-radius: 50px;!important"></i>
                                </div>`;
		} else {
			var code = `<div style="display: flex; align-items: center; gap: 10px; flex-direction: row-reverse; padding-right: 12px;padding-top: 6px;" class="wishlistDiv">
                                <i class="wishlistIcon fa ${wp_icon_change} wl_title mswlicon" style="color: ${color}; font-size: 20px;background: #fff!important;padding: 5px !important; border-radius: 50px;!important"></i>
                            </div>`;
		}
		if (!$(this).find(".wishlistDiv").length) {
			$(this).append(code);
		}
	});
}
