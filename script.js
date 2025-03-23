document.addEventListener("DOMContentLoaded", function () {
    fetch("products.json")
        .then(response => response.json())
        .then(products => {
            const productList = document.querySelector(".product-list");
            productList.innerHTML = ""; // Clear existing content

            products.forEach((product, index) => {
                let productHTML = `
                    <div class="product-item">
                        <div class="product-slider slideshow-container" id="slider-${index}">
                            ${product.images.map((img, imgIndex) => `<img src="images/${img}" alt="${product.name} Image" class="slide-${index}" style="display: ${imgIndex === 0 ? 'block' : 'none'};">`).join('')}
                            <button class="prev" onclick="changeSlide(${index}, -1)">&#10094;</button>
                            <button class="next" onclick="changeSlide(${index}, 1)">&#10095;</button>
                        </div>
                        <h3>${product.name}</h3>
                        <p><strong>Wattage:</strong> ${product.wattage}</p>
                        <p><strong>Light Color:</strong> ${product.lightColor}</p>
                        <p><strong>Frequency:</strong> ${product.frequency}</p>
                        <p><strong>Voltage:</strong> ${product.voltage}</p>
                        <p><strong>Lumens:</strong> ${product.lumens}</p>
                        <p><strong>Warranty:</strong> ${product.warranty}</p>
                        <p><strong>Country of Origin:</strong> ${product.origin}</p>
                    </div>
                `;
                productList.innerHTML += productHTML;
            });

            window.changeSlide = function(sliderIndex, n) {
                const slides = document.querySelectorAll(`.slide-${sliderIndex}`);
                let currentIndex = Array.from(slides).findIndex(slide => slide.style.display === 'block');
                slides[currentIndex].style.display = 'none';
                currentIndex = (currentIndex + n + slides.length) % slides.length;
                slides[currentIndex].style.display = 'block';
            };
        })
        .catch(error => console.error("Error loading products:", error));

    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
            .then(function() {
                alert('Email sent successfully!');
            }, function(error) {
                alert('Failed to send email. Please try again later.');
            });
    });

    // GSAP animations with Intersection Observer
    const sections = document.querySelectorAll("section");
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                if (id === "home") {
                    gsap.from("#home", { duration: 1, x: "-100%", opacity: 0 });
                } else if (id === "about") {
                    gsap.from("#about", { duration: 1, x: "100%", opacity: 0 });
                } else if (id === "products") {
                    gsap.from("#products", { duration: 1, x: "-100%", opacity: 0 });
                } else if (id === "quality") {
                    gsap.from("#quality", { duration: 1, x: "100%", opacity: 0 });
                } else if (id === "whyus") {
                    gsap.from("#whyus", { duration: 1, x: "-100%", opacity: 0 });
                } else if (id === "contact") {
                    gsap.from("#contact", { duration: 1, x: "100%", opacity: 0 });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
});
