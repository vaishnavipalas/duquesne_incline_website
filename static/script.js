// read more / less
$("#readMore").click(function() {
    $("#longIntro").show();
    $("#readLess").show();
    $("#readMore").hide();
})

$("#readLess").click(function() {
    $("#longIntro").hide();
    $("#readLess").hide();
    $("#readMore").show();
})

// carousel
$(document).ready(function () {
    let currentIndex = 0;
    const items = $(".carousel-item");
    const totalItems = items.length;

    function updateCarousel() {
        $(".carousel").css("transform", `translateX(${-currentIndex * 100}%)`);
    }

    $(".carousel-next").click(function () {
        currentIndex = (currentIndex + 1) % totalItems;
        updateCarousel();
    });

});

// form validation
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("mailingListForm");

    if (form) {
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const phoneInput = document.getElementById("phone");
        const zipInput = document.getElementById("zip");

        function createErrorElement(id) {
            let errorElement = document.createElement("div");
            errorElement.className = "error-message";
            errorElement.id = id + "Error";
            errorElement.style.color = "red";
            errorElement.style.fontSize = "0.9em";
            errorElement.style.display = "none";
            return errorElement;
        }

        nameInput.insertAdjacentElement("afterend", createErrorElement("name"));
        emailInput.insertAdjacentElement("afterend", createErrorElement("email"));
        phoneInput.insertAdjacentElement("afterend", createErrorElement("phone"));
        zipInput.insertAdjacentElement("afterend", createErrorElement("zip"));

        function validateField(input, errorElement, customMessage = null) {
            if (!input.checkValidity() || (customMessage && !customMessage(input.value))) {
                errorElement.textContent = customMessage ? customMessage(input.value) : input.validationMessage;
                errorElement.style.display = "block";
            } else {
                errorElement.textContent = "";
                errorElement.style.display = "none";
            }
        }

        form.addEventListener("submit", function (event) {
            validateField(nameInput, document.getElementById("nameError"));
            validateField(emailInput, document.getElementById("emailError"));

            validateField(phoneInput, document.getElementById("phoneError"), function (value) {
                return value === "" || /^[0-9]{10}$/.test(value) ? "" : "Phone must be 10 digits.";
            });

            validateField(zipInput, document.getElementById("zipError"), function (value) {
                return value === "" || /^[0-9]{5}$/.test(value) ? "" : "Zip code must be 5 digits.";
            });

            if (!form.checkValidity()) {
                event.preventDefault();
            }
        });
    }
});

// for gallery
let slideIndex = 0;

function showSlides() {
    let slides = document.querySelectorAll(".slide");

    if (slides.length === 0) return;

    slides.forEach(slide => {
        slide.style.display = "none";
    });

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    slides[slideIndex - 1].style.display = "block";

    setTimeout(showSlides, 3000);
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.querySelector(".slide")) {
        showSlides();
    }
});

// for displaying current weather
document.addEventListener("DOMContentLoaded", getWeather);

async function getWeather() {
    const weatherElement = document.getElementById("weatherText");

    if (!weatherElement) return;

    const apiKey = "47f8cf72106043c28e8153837253003";  // Replace with a valid API key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Pittsburgh&aqi=no`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        let weather = `Temperature: ${data.current.temp_f}°F, ${data.current.condition.text}`;
        weatherElement.innerHTML = weather;
    } catch (error) {
        console.error("Error fetching weather:", error);
        weatherElement.innerHTML = "Failed to load weather.";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    getWeather();
});
