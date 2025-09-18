document.addEventListener("DOMContentLoaded", function () {

  // Typing animation (Roles)
  const typingEl = document.getElementById("typing");
  const text = "Data Analyst • Excel Automation • Power BI • SQL • Python • AI Modules";
  let idx = 0,
    direction = 1;
  setInterval(() => {
    typingEl.textContent = text.slice(0, idx);
    if (direction > 0 && idx < text.length) {
      idx++;
    } else if (direction < 0 && idx > 0) {
      idx--;
    } else {
      direction = -direction;
    }
  }, 110);

  // Lazy loading images (Intersection Observer)
  const lazyImages = document.querySelectorAll("img[data-src]");
  if ("IntersectionObserver" in window) {
    let lazyImageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          lazyImageObserver.unobserve(img);
        }
      });
    });
    lazyImages.forEach(function (img) {
      lazyImageObserver.observe(img);
    });
  } else {
    // Fallback: Load all images immediately
    lazyImages.forEach((img) => {
      img.src = img.dataset.src;
      img.removeAttribute("data-src");
    });
  }

  // Modal utility (for confirmation popup)
  const popup = document.getElementById("contactPopup");
  window.openModal = function () {
    popup.style.display = "block";
  };
  window.closeModal = function () {
    popup.style.display = "none";
  };

  // AJAX form submit with user feedback for Formspree
  const form = document.getElementById("contactForm");
  const statusSpan = document.getElementById("contactStatus");

  if(form){
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      statusSpan.textContent = "";
      statusSpan.style.color = "#19c37d";

      const formData = new FormData(form);

      fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            statusSpan.textContent = "Message sent successfully! Thank you.";
            form.reset();
            openModal();
          } else {
            statusSpan.style.color = "#c44d4d";
            response.json().then((data) => {
              statusSpan.textContent =
                data.errors
                  ? data.errors.map((err) => err.message).join(", ")
                  : "Oops! Submission failed.";
            });
          }
        })
        .catch(() => {
          statusSpan.textContent = "Network error. Please try again later.";
          statusSpan.style.color = "#c44d4d";
        });
    });
  }

  // Scroll debounce to highlight nav based on sections (for UI enhancement)
  let lastActiveLink = null;
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");
  function debounce(fn, delay) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(fn, delay);
    };
  }
  function onScroll() {
    let scrollPosition = window.scrollY + window.innerHeight / 3;
    let current = null;

    sections.forEach((section) => {
      if (scrollPosition >= section.offsetTop) current = section.id;
    });

    if (current && lastActiveLink !== current) {
      lastActiveLink = current;
      navLinks.forEach((link) => {
        link.classList.toggle(
          "active",
          link.getAttribute("href") === "#" + current
        );
      });
    }
  }
  window.addEventListener("scroll", debounce(onScroll, 100));
  
});
