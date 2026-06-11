// ============ PRODUCT CARD TAG ANIMATION =============





// console.log("Custom.jss");
setTimeout(function(){
  var recommendationF = document.querySelector('.alsoLike');
  var flktyRecommend = new Flickity( recommendationF, {
    cellAlign: 'left',
    groupCells: "100%",
    pageDots: false,
    selectedAttraction: 0.1,
    friction: 1,
    freeScroll: true
  });
}, 2000);

function scrollUpHeaderShow(mobileMedia) {
  if (mobileMedia.matches) {
    const headerHeight = document.getElementById("SiteHeader");
    var prevScrollpos = window.pageYOffset;
    window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
      if (prevScrollpos > currentScrollPos ) {
        document.querySelector("#SiteHeader").style.top = "0";
      } else {
        document.querySelector("#SiteHeader.site-header--stuck").style.top = "-" + headerHeight.offsetHeight + "px";
      }
      prevScrollpos = currentScrollPos;
    }

    // Homepage quick link slider 
    var quickLinkSlider = document.querySelector('.customLogoSlider .logo-bar.logo-bar-slider');
    var quickLinkFlkty = new Flickity( quickLinkSlider, {
      cellAlign: 'left',
      groupCells: 2,
      pageDots: false,
      prevNextButtons: false,
      selectedAttraction: 0.2,
      friction: 0.8,
    });
    quickLinkFlkty.on('dragStart', () => quickLinkFlkty.slider.style.pointerEvents = 'none');
    quickLinkFlkty.on('dragEnd', () => quickLinkFlkty.slider.style.pointerEvents = 'auto');   
  }
}
var mobileMedia = window.matchMedia("(max-width: 768px)");
scrollUpHeaderShow(mobileMedia);
mobileMedia.addEventListener("change", function() {
  scrollUpHeaderShow(mobileMedia);
});

function desktopSlider(DesktopMedia) {
  if (DesktopMedia.matches) {
    var collectionMeta = document.querySelector('.collectionMeta');
    var flkty = new Flickity( collectionMeta, {
      cellAlign: 'left',
      groupCells: "95%",
      pageDots: false,
      selectedAttraction: 0.1,
      friction: 1,
      freeScroll: true
    });
    flkty.on('dragStart', () => flkty.slider.style.pointerEvents = 'none');
    flkty.on('dragEnd', () => flkty.slider.style.pointerEvents = 'auto');
  }
}

var DesktopMedia = window.matchMedia("(min-width: 769px)");
desktopSlider(DesktopMedia);
DesktopMedia.addEventListener("change", function() {
  desktopSlider(DesktopMedia);
});

// If product page handle is there
if(location.pathname.includes("/products/")){
// Sticky add to cart variant change js
const addToCartButton = document.querySelector('.stickyCart .add-to-cart');
const variantSelector = document.getElementsByClassName('variant-input-wrap');
const selectElement = document.querySelector('.stickyCart .product-single__variants');
const selectedIndex = selectElement?.selectedIndex;
const selectedOption = selectElement?.options[selectedIndex];
const selectElements = document.querySelectorAll('.stickyCart .product-single__variants option');

let variantRadios = document.querySelectorAll('.variant-input-wrap input[type="radio"][name="Color"]');
  variantRadios.forEach((radio, index) => {
    radio.addEventListener('click', function(){
      let disabledButton = radio.classList.contains('disabled');
      let buttonText = document.querySelector('.stickyCart .add-to-cart span');
      let buyNowButton = document.querySelector('.product-single__form .shiprocket-headless');
      let indexOfHidden = "";
      const selectedValue = radio.value.toLowerCase();
      
      selectElements.forEach((otherSelect, index) => {
        if (otherSelect.dataset.title.toLowerCase() === selectedValue) {
          indexOfHidden = index ;
        }
      });
      
      if(disabledButton){
        buttonText.textContent = "Sold Out" ;
        document.querySelector('.stickyCart .add-to-cart').setAttribute('disabled', true);
        buyNowButton.style.display = "none";
      }else{
        buttonText.textContent = "Add to cart" ;
        document.querySelector('.stickyCart .add-to-cart').removeAttribute("disabled");
        buyNowButton.style.display = "block";
      }
      
      let selectedVariantId = radio.value;
      selectElement.selectedIndex = indexOfHidden;
      const stickyVariantIdInput = document.getElementById('sticky-variant-id');
      stickyVariantIdInput.value = selectedVariantId;
    });
  });
}

// Recently Viewed section slider
var recentlyViewed = document.querySelector('.recentlyViewed');
var flktyRecent = new Flickity( recentlyViewed, {
  cellAlign: 'left',
  groupCells: "100%",
  pageDots: false,
  selectedAttraction: 0.1,
  friction: 1,
  freeScroll: true
});

// Announcement bar slider

document.addEventListener("DOMContentLoaded", function () {
  let spans = document.querySelectorAll(".topToBottomSlider span");
  let wrapper = document.querySelector(".topToBottomSlider");
  let index = 0;
  let spanHeight = spans[0].offsetHeight; // Get the height of the first span

  function updateActiveClass() {
    spans.forEach(span => span.classList.remove("active"));
    spans[index].classList.add("active");
    wrapper.style.transform = `translateY(${-index * spanHeight}px)`;
    index = (index + 1) % spans.length;
  }

  updateActiveClass(); // Initialize with the first span
  setInterval(updateActiveClass, 3000); // Update every 3 seconds
});





// $(document).ready(function() {
//   let $spans = $('.topToBottomSlider span');
//   let $wrapper = $('.topToBottomSlider');
//   let index = 0;
//   let spanHeight = $spans.outerHeight(true);

//   function updateActiveClass() {
//     $spans.removeClass('active');
//     $spans.eq(index).addClass('active');
//     $wrapper.css('transform', `translateY(${-index * spanHeight}px)`);
//     index = (index + 1) % $spans.length;
//   }  
//   updateActiveClass();  // Initialize with the first span
//   setInterval(updateActiveClass, 3000);  // Update every 2 seconds
// });










function triggerPartyPopper() {
  const canvas = document.getElementById('partyCanvas');
  const ctx = canvas.getContext('2d');

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const originX = canvas.width / 2;
  const originY = canvas.height - 100;

  const emojis = ['🎉', '🎊', '💥', '❤️', '🤩'];
  const shapes = ['rect', 'triangle', 'emoji'];

  const particles = [];
  const totalParticles = 100;

  for (let i = 0; i < totalParticles; i++) {
    const angle = Math.random() * Math.PI - Math.PI;
    const speed = Math.random() * 8 + 1;
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    particles.push({
      x: originX,
      y: originY,
      size: Math.random() * 6 + 4,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      velocityX: Math.cos(angle) * speed,
      velocityY: Math.sin(angle) * speed - 8,
      opacity: 1,
      gravity: 0.25,
      fade: Math.random() * 0.02 + 0.005,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      shape: shape,
      emoji: emojis[Math.floor(Math.random() * emojis.length)]
    });
  }

  let lastTime = performance.now();
  const frameRate = 1000 / 60; // target ~60 FPS
  let animationFrameId;

  function drawFrame(currentTime) {
    const delta = currentTime - lastTime;

    if (delta >= frameRate) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;

        if (p.shape === 'circle') {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'rect') {
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else if (p.shape === 'triangle') {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.moveTo(0, -p.size / 2);
          ctx.lineTo(-p.size / 2, p.size / 2);
          ctx.lineTo(p.size / 2, p.size / 2);
          ctx.closePath();
          ctx.fill();
        } else if (p.shape === 'emoji') {
          ctx.shadowBlur = 0;
          ctx.font = `${p.size * 2}px serif`;
          ctx.fillText(p.emoji, -p.size / 2, p.size / 2);
        }

        ctx.restore();
      });

      updateParticles();
      lastTime = currentTime;
    }

    animationFrameId = requestAnimationFrame(drawFrame);
  }

  function updateParticles() {
    particles.forEach(p => {
      p.x += p.velocityX;
      p.y += p.velocityY;
      p.velocityY += p.gravity;
      p.opacity -= p.fade;
      p.rotation += p.rotationSpeed;
    });
  }

  animationFrameId = requestAnimationFrame(drawFrame);

  // Stop after 4 seconds
  setTimeout(() => {
    cancelAnimationFrame(animationFrameId);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 4000);
}


// ₹899 – ₹1099 → Free Beauty Blender
// ₹1100 – ₹1999 → Free Face Massager
// ₹2000 – ₹2999 → Free Hair Straightener
// ₹3000 & above → Free Blow Brush

// ########################## VS: Cart Progressbar script ##########################
let totalCartValue = 0;
let ch_progress = document.querySelector('#progresss');
let placement_free_msg = document.querySelector('.drawer__footer');


function fetchCartData() {
  return fetch('/cart.js')
    .then(response => response.json())
    .then(cart => {
      totalCartValue = cart.total_price / 100; 
      console.log("💰 Total Cart Value:", totalCartValue);

      updateProgressBar(totalCartValue);
      return cart;
    })
    .catch(error => console.error("❌ Cart fetch failed:", error));
}


// function updateProgressBar(value) {
//   let width = '0%';
//   let message = '';
//   let message1 = '';

//   document.querySelectorAll('.freeProMsg').forEach(el => el.remove());

//   if (value >= 3000) {
//     width = '100%';
//     message = '🎉 Free Blow Brush will be added at checkout!';
//     message1 = '🎉 Congrats! You got a Free Blow Brush';

//   } else if (value >= 2000 && value < 3000) {
//     width = '75%';
//     message = '✨ Free Hair Straightener will be added at checkout!';
//     message1 = '🎉 Congrats! You got a Free Hair Straightener';
//   } else if (value >= 1100 && value < 2000) {
//     width = '50%';
//     message = '💆 Free Face Massager will be added at checkout!';
//     message1 = '🎉 Congrats! You got a Free Face Massager';
//   } else if (value >= 899 && value < 1100) {
//     width = '25%';
//     message = '💄 Free Beauty Blender will be added at checkout!';
//     message1 = '🎉 Congrats! You got a Free Beauty Blender';
//   } else {
//     width = '0%';
//     message = '🛍️ Add products to unlock free gifts!';
//     message1 = 'Add products to unlock free gifts';
//   }


//   if (ch_progress) {
//     ch_progress.style.width = width;
//     console.log("📏 Progress bar width:", width);
//   }


//   if (placement_free_msg) {
//     placement_free_msg.insertAdjacentHTML(
//       'beforebegin',
//       `<div class="freeProMsg" style="padding:8px 0;font-size:14px;text-align:center;color:#333;">
//         ${message} 🎁
//       </div>`
//     );
//   }


//   const progressSubHeading = document.querySelector('.progress-bar-sub-heading');
//   if (progressSubHeading) {
//     progressSubHeading.innerHTML = message1;
//   }
// }


// document.addEventListener('cart:updated', () =>{ 
//   fetchCartData();
// // triggerPartyPopper();
// });

// document.addEventListener('ajaxProduct:added', evt => {
//   console.log("🆕 Product Added:", evt.detail?.product);
//   fetchCartData();
//   triggerPartyPopper();
// });

// document.querySelectorAll('form[action="/cart/add"]').forEach(form => {
//   form.addEventListener('submit', async e => {
//     e.preventDefault();
//     const formData = new FormData(form);

//     await fetch('/cart/add.js', {
//       method: 'POST',
//       body: formData
//     });

//     document.dispatchEvent(new CustomEvent('cart:updated'));
    
//   });
// });
// ########################## vs: Cart Progressbar script ##########################


// function rerefresh() {
  
//   document.addEventListener('ajaxProduct:added', function(evt) {
//         setTimeout(function() {
//               document.dispatchEvent(new CustomEvent('cart:build'));
//                   }, 2000);
//                     });
//   })
    

  
// }