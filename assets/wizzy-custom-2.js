document.addEventListener("DOMContentLoaded", function () {
    console.log('jjjjjjjjjjjjjjjjjjjjj');
    
    document.addEventListener("click", function (event) {
        if (event.target.closest("#mswishlistbutton")) {
            event.preventDefault();
            
            let button = event.target.closest("#mswishlistbutton");
            button.disabled = true;
            
            let shopdomain = button.getAttribute("data-storename");
            let store_id = button.getAttribute("data-storeid");
            let customerids = document.querySelector("#ms_customer_id").value;
            let productId = button.getAttribute("data-product");
            let variantproductId = button.getAttribute("data-variant");
            let shopurl = Shopify.shop;
            
            fetch("https://faq.mebiz.app/wishlist_bt", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    product_id: productId,
                    variant_id: variantproductId,
                    shopurl: shopurl,
                    customerid: customerids,
                    shop_id: store_id,
                    shop_name: shopdomain,
                })
            })
            .then(response => response.json())
            .then(data => {
                let toastr_position = data?.wl_page_setting_data?.toastr_position || 'toast-top-right';
                let style = document.createElement('style');
                style.innerHTML = `
                    .toast-oval {
                        background-color: ${data?.wl_page_setting_data?.toastr_background_color || '#000000'} !important;
                        color: ${data?.wl_page_setting_data?.toastr_text_color || '#ffffff'} !important;
                        width: ${data?.wl_page_setting_data?.toastr_width || '200px'} !important;
                        height: ${data?.wl_page_setting_data?.toastr_height || '0px'} !important;
                        font-size: ${data?.wl_page_setting_data?.toastr_font_size || '10px'} !important;
                        border-radius: 50px !important;
                        padding: 20px 40px !important;
                        font-family: ${data?.wl_page_setting_data?.toastr_font_family || 'serif'} !important;
                        opacity: 1 !important;
                    }`;
                document.head.appendChild(style);
                
                setTimeout(() => { button.disabled = false; }, 1000);
            })
            .catch(error => {
                alert("Failed to add product to wishlist.");
                setTimeout(() => { button.disabled = false; }, 1000);
            });
        }
    });
    
    function fetchWishlistIcons() {
        let store_id = document.querySelector("#mswishlistbutton").getAttribute("data-storeid");
        let customer_id = document.querySelector("#ms_customer_id") ? document.querySelector("#ms_customer_id").value : "";
        let store_name = Shopify.shop;
        
        fetch("https://faq.mebiz.app/getWishListProduct", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                store_id: store_id,
                customer_id: customer_id,
                store_name: store_name
            })
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("wishlistProducts", JSON.stringify(data));
            appendWishlistIcons();
        });
    }
    
    function appendWishlistIcons() {
        let storedWishlistProducts = localStorage.getItem("wishlistProducts");
        if (!storedWishlistProducts) return;
        
        let wishlistProducts = JSON.parse(storedWishlistProducts);
        document.querySelectorAll(".mswishlistbutton").forEach(button => {
            let productIds = wishlistProducts.icondata.map(item => item.product_id);
            let currentUniqueId = button.getAttribute("data-unique-id");
            let iconClass = productIds.includes(currentUniqueId.toString()) ? wishlistProducts.iconcolor.wishlist_remove_icon : wishlistProducts.iconcolor.wishlist_icon;
            
            let iconHTML = `<div class="wishlistDiv" style="display: flex; align-items: center; gap: 10px; flex-direction: row-reverse; padding-right: 12px; padding-top: 6px;">
                                <i class="wishlistIcon fa ${iconClass} wl_title mswlicon" style="color: ${wishlistProducts.iconcolor.wishlist_icon_color}; font-size: 20px; background: #fff!important; padding: 5px !important; border-radius: 50px;!important"></i>
                            </div>`;
            
            if (!button.querySelector(".wishlistDiv")) {
                button.insertAdjacentHTML("beforeend", iconHTML);
            }
        });
    }
    
    fetchWishlistIcons();
});
