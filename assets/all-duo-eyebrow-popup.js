// ======================================
// SHOW UPSELL POPUP ON ANY PRODUCT ADD
// ======================================

document.addEventListener("ajaxProduct:added", function (evt) {
  const item = evt.detail?.product || evt.detail?.item;
  if (!item) return;

  // Check if the popup has already been shown during this session
  if (sessionStorage.getItem("upsellPopupShown") === "true") {
    return; // If it has, don't show it again
  }

  const popup = document.getElementById("foundation-upsell-popup");
  if (!popup) return;

  popup.classList.add("show");

  // Set the flag to indicate the popup has been shown
  sessionStorage.setItem("upsellPopupShown", "true");
});



// ======================================
// TRIGGER DRAWER TITLE CLICK (OPEN / CLOSE)
// ======================================

function triggerDrawerTitleClick() {
  const drawerTitle = document.querySelector(".drawer__title");
  if (drawerTitle) drawerTitle.click();
}

// Prevent clicks inside the upsell popup from bubbling up and
// accidentally toggling other drawer UI (keeps cart-drawer open).
document.addEventListener('click', function (e) {
  if (e.target.closest('.upsell-variant-box')) {
    e.stopPropagation();
  }
}, true);


// ======================================
// CLOSE POPUP (X BUTTON / OVERLAY)
// ======================================

document.addEventListener("click", function (e) {
  const popup = document.getElementById("foundation-upsell-popup");
  if (!popup) return;

  if (
    e.target.classList.contains("upsell-close") ||
    e.target.classList.contains("upsell-overlay")
  ) {
    e.stopPropagation();
    popup.classList.remove("show");
  }
});


// ======================================
// CHANGE MAIN IMAGE ON VARIANT CLICK
// ======================================

document.addEventListener("change", function (e) {

  // Only trigger the drawer toggle when a variant radio is changed
  triggerDrawerTitleClick();

  if (!e.target.classList.contains("variant-radio")) return;

  const variantBox = e.target.closest(".upsell-variant-box");
  if (!variantBox) return;

  const newImage = variantBox.getAttribute("data-image");
  const mainImage = document.querySelector(".popmain-img");

  if (newImage && mainImage) {
    mainImage.src = newImage;
  }
});


// ======================================
// ADD UPSELL VARIANT TO CART
// ======================================

document.addEventListener("click", function (e) {
  if (e.target.id !== "upsellAddBtn") return;

  const selectedVariant = document.querySelector(
    "input[name='upsell_variant']:checked"
  );

  if (!selectedVariant) {
    alert("Please select a variant");
    return;
  }

  fetch("/cart/add.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id: selectedVariant.value,
      quantity: 1
    })
  })
    .then(res => res.json())
    .then(() => {

      // Close popup
      const popup = document.getElementById("foundation-upsell-popup");
      if (popup) popup.classList.remove("show");

      // Refresh cart drawer
      document.dispatchEvent(new CustomEvent("cart:build"));

      // Open cart drawer if exists
      const cartBtn = document.querySelector(".js-drawer-open-cart");
      if (cartBtn) cartBtn.click();
    })
    .catch(err => console.error("Upsell add error:", err));
});
