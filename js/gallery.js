// ===== All gallery images are stored here, in one array =====
// Each image is just an object with a src, alt text, and category.

var images = [
    { src: "public/cultural2.jpeg", alt: "Rhythm Night concert", category: "cultural" },
    { src: "public/sports4.jpeg", alt: "Sports Day team", category: "sports" },
    { src: "public/sports3.jpeg", alt: "Sports Day huddle", category: "sports" },
    { src: "public/cultural4.jpeg", alt: "Crowd at concert", category: "cultural" },
    { src: "public/tech1.webp", alt: "Art exhibition visitors", category: "technical" },
    { src: "public/cultural.jpeg", alt: "Stage performance", category: "cultural" },
    { src: "public/tech2.webp", alt: "Code Warriors coding event", category: "technical" },
    { src: "public/sports1.jpeg", alt: "Sports Day trophy", category: "sports" },
    { src: "public/sports2.jpeg", alt: "Sports Day trophy", category: "sports" },
    { src: "public/cultural3.jpeg", alt: "Stage performance", category: "cultural" },

];

var currentCategory = "all";


var currentImages = [];


var currentIndex = 0;


var galleryGrid = document.getElementById("galleryGrid");
var tabButtons = document.querySelectorAll(".tabBtn");

var lightboxOverlay = document.getElementById("lightboxOverlay");
var lightboxImg = document.getElementById("lightboxImg");
var lightboxCounter = document.getElementById("lightboxCounter");
var closeBtn = document.getElementById("closeBtn");
var prevBtn = document.getElementById("prevBtn");
var nextBtn = document.getElementById("nextBtn");




function renderGallery() {
  
    currentImages = [];
    for (var i = 0; i < images.length; i++) {
        if (currentCategory === "all" || images[i].category === currentCategory) {
            currentImages.push(images[i]);
        }
    }

    
    galleryGrid.innerHTML = "";

    for (var j = 0; j < currentImages.length; j++) {
        var image = currentImages[j];

        var item = document.createElement("div");
        item.className = "galleryItem";

        var imgTag = document.createElement("img");
        imgTag.src = image.src;
        imgTag.alt = image.alt;

        item.appendChild(imgTag);
        galleryGrid.appendChild(item);

      
        item.addEventListener("click", (function (index) {
            return function () {
                openLightbox(index);
            };
        })(j));
    }
}




for (var t = 0; t < tabButtons.length; t++) {
    tabButtons[t].addEventListener("click", function () {
        for (var t2 = 0; t2 < tabButtons.length; t2++) {
            tabButtons[t2].classList.remove("active");
        }
        this.classList.add("active");

        currentCategory = this.getAttribute("data-category");
        renderGallery();
    });
}



function openLightbox(index) {
    currentIndex = index;
    showCurrentImage();
    lightboxOverlay.classList.add("show");
}

function showCurrentImage() {
    var image = currentImages[currentIndex];
    lightboxImg.src = image.src;
    lightboxImg.alt = image.alt;
    lightboxCounter.textContent = (currentIndex + 1) + " / " + currentImages.length;
}

function showNextImage() {
    currentIndex = currentIndex + 1;
    if (currentIndex >= currentImages.length) {
        currentIndex = 0; 
    }
    showCurrentImage();
}

function showPrevImage() {
    currentIndex = currentIndex - 1;
    if (currentIndex < 0) {
        currentIndex = currentImages.length - 1;
    }
    showCurrentImage();
}

function closeLightbox() {
    lightboxOverlay.classList.remove("show");
}

nextBtn.addEventListener("click", showNextImage);
prevBtn.addEventListener("click", showPrevImage);
closeBtn.addEventListener("click", closeLightbox);


lightboxOverlay.addEventListener("click", function (e) {
    if (e.target === lightboxOverlay) {
        closeLightbox();
    }
});


document.addEventListener("keydown", function (e) {
    if (lightboxOverlay.classList.contains("show") === false) {
        return;
    }
    if (e.key === "ArrowRight") {
        showNextImage();
    } else if (e.key === "ArrowLeft") {
        showPrevImage();
    } else if (e.key === "Escape") {
        closeLightbox();
    }
});



renderGallery();