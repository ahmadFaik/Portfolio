// Toggle icon navbar
const menuIcon = document.querySelector("#menu-icon")
const navbar = document.querySelector(".navbar")

if (menuIcon && navbar) {
  menuIcon.onclick = () => {
    menuIcon.classList.toggle("bx-x")
    navbar.classList.toggle("active")
  }
}

// Theme Toggle Functionality
const themeToggle = document.querySelector("#themeToggle")
const themeIcon = document.querySelector("#themeIcon")
const body = document.body

// Load saved theme or detect system preference
const savedTheme = localStorage.getItem("theme")
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

if (savedTheme === "light" || (!savedTheme && !systemPrefersDark)) {
  body.classList.add("light-mode")
  if (themeIcon) {
    themeIcon.classList.replace("bx-sun", "bx-moon")
  }
}

// Theme toggle event
if (themeToggle && themeIcon) {
  themeToggle.addEventListener("click", () => {
    body.classList.toggle("light-mode")

    if (body.classList.contains("light-mode")) {
      themeIcon.classList.replace("bx-sun", "bx-moon")
      localStorage.setItem("theme", "light")
    } else {
      themeIcon.classList.replace("bx-moon", "bx-sun")
      localStorage.setItem("theme", "dark")
    }
  })
}

// Sections active link
const sections = document.querySelectorAll("section")
const navlinks = document.querySelectorAll("header nav a")

function updateActiveLink() {
  sections.forEach((sec) => {
    const top = window.scrollY
    const offset = sec.offsetTop - 150
    const height = sec.offsetHeight
    const id = sec.getAttribute("id")

    if (top >= offset && top < offset + height) {
      navlinks.forEach((links) => {
        links.classList.remove("active")
      })
      const activeLink = document.querySelector("header nav a[href*=" + id + "]")
      if (activeLink) activeLink.classList.add("active")
    }
  })
}

window.onscroll = () => {
  updateActiveLink()

  // Sticky header
  const header = document.querySelector("header")
  if (header) {
    header.classList.toggle("sticky", window.scrollY > 100)
  }

  // Remove toggle icon and navbar when scrolling
  if (menuIcon && navbar) {
    menuIcon.classList.remove("bx-x")
    navbar.classList.remove("active")
  }
}

// Scroll reveal
const ScrollReveal = window.ScrollReveal
if (ScrollReveal) {
  ScrollReveal({
    reset: true,
    distance: "80px",
    duration: 2000,
    delay: 200,
  })

  ScrollReveal().reveal(".home-content, .heading", { origin: "top" })
  ScrollReveal().reveal(".home-img, .services-container, .portfolio-box, .contact form", { origin: "bottom" })
  ScrollReveal().reveal(".home-content h1, .about-img", { origin: "left" })
  ScrollReveal().reveal(".home-content p, .about-content", { origin: "right" })

  // Add skills section to scroll reveal
  ScrollReveal().reveal(".skills-category, .expertise-card", {
    origin: "bottom",
    distance: "50px",
    duration: 1000,
    delay: 200,
    interval: 200,
  })
}

// Typed.js animation - Initialize after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Wait a bit for libraries to load
  setTimeout(() => {
    const Typed = window.Typed
    if (Typed) {
      const multipleTextElement = document.querySelector(".multiple-text")
      if (multipleTextElement) {
        const typed = new Typed(".multiple-text", {
          strings: ["Data Scientist", "Data Analyst", "ML Engineer", "BI Specialist"],
          typeSpeed: 100,
          backSpeed: 100,
          backDelay: 1000,
          loop: true,
        })
      }
    } else {
      // Fallback if Typed.js fails to load
      const element = document.querySelector(".multiple-text")
      if (element) {
        const strings = ["Data Scientist", "Data Analyst", "ML Engineer", "BI Specialist"]
        let currentIndex = 0

        function typeText() {
          element.textContent = strings[currentIndex]
          currentIndex = (currentIndex + 1) % strings.length
        }

        typeText() // Initial text
        setInterval(typeText, 3000) // Change every 3 seconds
      }
    }
  }, 1000)
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Contact form submission
const contactForm = document.querySelector("#contactForm")
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Get form data
    const formData = new FormData(this)
    const formObject = {}
    formData.forEach((value, key) => {
      formObject[key] = value
    })

    // Validate form
    const requiredFields = ["fullName", "email", "subject", "message"]
    let isValid = true

    requiredFields.forEach((field) => {
      if (!formObject[field] || formObject[field].trim() === "") {
        isValid = false
      }
    })

    if (!isValid) {
      showNotification("Please fill in all required fields.", "error")
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formObject.email)) {
      showNotification("Please enter a valid email address.", "error")
      return
    }

    // Show success message
    showNotification("Thank you for your message! I will get back to you soon.", "success")

    // Reset form
    this.reset()

    // In a real application, you would send the data to a server
    console.log("Form submitted:", formObject)
  })
}

// Enhanced Notification System
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification")
  existingNotifications.forEach((notification) => notification.remove())

  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `

  // Add notification styles
  const bgColor = type === "success" ? "#4CAF50" : type === "error" ? "#f44336" : "#2196F3"
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${bgColor};
    color: white;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    animation: slideIn 0.3s ease;
    max-width: 400px;
    word-wrap: break-word;
  `

  document.body.appendChild(notification)

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close")
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      notification.remove()
    })
  }

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove()
    }
  }, 5000)
}

// Add CSS for notification animation
const style = document.createElement("style")
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  .notification-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
  }
  
  .notification-close {
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
document.head.appendChild(style)

// Intersection Observer for Fade-in Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show")
    }
  })
}, observerOptions)

// Observe elements for fade-in animation
document.addEventListener("DOMContentLoaded", () => {
  const elementsToAnimate = document.querySelectorAll(
    ".services-box, .portfolio-box, .education-content, .experience-content, .info-box, .skills-category, .expertise-card",
  )
  elementsToAnimate.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })
})

// Particle Background Effect
function createParticles() {
  const particlesContainer = document.createElement("div")
  particlesContainer.className = "particles"
  particlesContainer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: -1;
  `

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div")
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: rgba(0, 238, 255, 0.5);
      border-radius: 50%;
      animation: float ${Math.random() * 3 + 2}s ease-in-out infinite;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 2}s;
    `
    particlesContainer.appendChild(particle)
  }

  document.body.appendChild(particlesContainer)
}

// Add particle animation CSS
const particleStyle = document.createElement("style")
particleStyle.textContent = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
      opacity: 0.5;
    }
    50% {
      transform: translateY(-20px);
      opacity: 1;
    }
  }
`
document.head.appendChild(particleStyle)

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply throttling to scroll event
const throttledScroll = throttle(() => {
  updateActiveLink()

  const header = document.querySelector("header")
  if (header) {
    header.classList.toggle("sticky", window.scrollY > 100)
  }

  if (menuIcon && navbar) {
    menuIcon.classList.remove("bx-x")
    navbar.classList.remove("active")
  }
}, 16) // ~60fps

window.addEventListener("scroll", throttledScroll)

// Enhanced Loading Screen with Progress Animation
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen")
  const loadingPercentage = document.getElementById("loadingPercentage")

  if (loadingScreen && loadingPercentage) {
    // Simulate loading progress
    let progress = 0
    const progressInterval = setInterval(() => {
      progress += Math.random() * 15 + 5 // Random increment between 5-20
      if (progress > 100) progress = 100

      loadingPercentage.textContent = Math.floor(progress) + "%"

      if (progress >= 100) {
        clearInterval(progressInterval)

        // Wait a moment then fade out
        setTimeout(() => {
          loadingScreen.classList.add("fade-out")

          // Remove from DOM after transition
          setTimeout(() => {
            loadingScreen.style.display = "none"
          }, 800)
        }, 500)
      }
    }, 100)
  }
})

// Portfolio Filter Functionality
document.addEventListener("DOMContentLoaded", () => {
  const filterBtns = document.querySelectorAll(".filter-btn")
  const portfolioCards = document.querySelectorAll(".portfolio-card")

  // Initialize filter functionality
  if (filterBtns.length > 0 && portfolioCards.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Remove active class from all buttons
        filterBtns.forEach((b) => b.classList.remove("active"))
        // Add active class to clicked button
        btn.classList.add("active")

        const filterValue = btn.getAttribute("data-filter")

        portfolioCards.forEach((card) => {
          const cardCategories = card.getAttribute("data-category")

          if (filterValue === "all" || cardCategories.includes(filterValue)) {
            card.style.display = "block"
            card.style.opacity = "0"
            card.style.transform = "translateY(20px)"

            // Animate card appearance
            setTimeout(() => {
              card.style.transition = "all 0.5s ease"
              card.style.opacity = "1"
              card.style.transform = "translateY(0)"
            }, 100)
          } else {
            card.style.transition = "all 0.3s ease"
            card.style.opacity = "0"
            card.style.transform = "translateY(-20px)"

            setTimeout(() => {
              card.style.display = "none"
            }, 300)
          }
        })
      })
    })

    // Initialize with "All" filter active
    const allBtn = document.querySelector('.filter-btn[data-filter="all"]')
    if (allBtn) {
      allBtn.click()
    }
  }
})

// Initialize particles on load
window.addEventListener("load", createParticles)

// Skills Section Hover Effects
document.addEventListener("DOMContentLoaded", () => {
  const skillTags = document.querySelectorAll(".skill-tag")

  skillTags.forEach((tag) => {
    tag.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px) scale(1.05)"
    })

    tag.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })
})

// Preloader for images
function preloadImages() {
  const images = [
    "assets/images/profile.png",
    "assets/images/about.png",
    "assets/images/projects/Stock-CLI.jpg",
    "assets/images/projects/Unilever_Forecasting.gif",
    "assets/images/projects/nyc_tlc.gif",
    "assets/images/projects/The Look.gif",
  ]

  images.forEach((src) => {
    const img = new Image()
    img.src = src
    img.onerror = () => {
      console.warn(`Failed to load image: ${src}`)
    }
  })
}

// Initialize image preloading
document.addEventListener("DOMContentLoaded", preloadImages)

// Footer animations
document.addEventListener("DOMContentLoaded", () => {
  const footerElements = document.querySelectorAll(".footer-brand, .footer-column")

  const footerObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = "1"
            entry.target.style.transform = "translateY(0)"
          }, index * 200)
        }
      })
    },
    { threshold: 0.1 },
  )

  footerElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "all 0.6s ease"
    footerObserver.observe(el)
  })
})

// Error handling for external libraries
window.addEventListener("error", (e) => {
  console.warn("External library error:", e.message)
})

// Handle system theme changes
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    if (e.matches) {
      body.classList.remove("light-mode")
      if (themeIcon) {
        themeIcon.classList.replace("bx-moon", "bx-sun")
      }
    } else {
      body.classList.add("light-mode")
      if (themeIcon) {
        themeIcon.classList.replace("bx-sun", "bx-moon")
      }
    }
  }
})
