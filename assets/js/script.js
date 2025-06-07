// Toggle icon navbar
const menuIcon = document.querySelector("#menu-icon")
const navbar = document.querySelector(".navbar")

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x")
  navbar.classList.toggle("active")
}

// Sections active link
const sections = document.querySelectorAll("section")
const navlinks = document.querySelectorAll("header nav a")

window.onscroll = () => {
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

  // Sticky header
  const header = document.querySelector("header")
  header.classList.toggle("sticky", window.scrollY > 100)

  // Remove toggle icon and navbar when click navbar links (scroll)
  menuIcon.classList.remove("bx-x")
  navbar.classList.remove("active")
}

// Scroll reveal
const ScrollReveal = window.ScrollReveal // Declare ScrollReveal variable
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
}

// Typed.js animation - Initialize after DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Wait a bit for libraries to load
  setTimeout(() => {
    const Typed = window.Typed // Declare Typed variable
    if (Typed) {
      const typed = new Typed(".multiple-text", {
        strings: ["Data Scientist", "Data Analyst", "ML Engineer", "BI Specialist"],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true,
      })
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
const contactForm = document.querySelector(".contact-form")
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()
    // Get form data
    const formData = new FormData(this)
    const formObject = {}
    formData.forEach((value, key) => {
      formObject[key] = value
    })

    // Show success message
    showNotification("Thank you for your message! I will get back to you soon.", "success")

    // Reset form
    this.reset()

    // In a real application, you would send the data to a server
    console.log("Form submitted:", formObject)
  })
}

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      <button class="notification-close">&times;</button>
    </div>
  `

  // Add notification styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === "success" ? "#4CAF50" : "#2196F3"};
    color: white;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `

  document.body.appendChild(notification)

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close")
  closeBtn.addEventListener("click", () => {
    notification.remove()
  })

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
  const elementsToAnimate = document.querySelectorAll(".services-box, .portfolio-box, .education-content, .info-box")
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
window.onscroll = throttle(window.onscroll, 16) // ~60fps

// Enhanced Loading Screen with Progress Animation
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loadingScreen")
  const loadingPercentage = document.getElementById("loadingPercentage")

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
})

// Initialize particles on load
window.addEventListener("load", createParticles)

// Skills Animation
function animateSkills() {
  const skillBars = document.querySelectorAll(".skill-progress")
  skillBars.forEach((bar) => {
    const progress = bar.getAttribute("data-progress")
    bar.style.width = progress + "%"
  })
}

// Initialize skills animation when education section is visible
const educationSection = document.querySelector("#education")
if (educationSection) {
  const educationObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkills()
        educationObserver.unobserve(entry.target)
      }
    })
  })
  educationObserver.observe(educationSection)
}

// Dark mode toggle (optional feature)
function toggleDarkMode() {
  document.body.classList.toggle("light-mode")
  const isDarkMode = !document.body.classList.contains("light-mode")
  localStorage.setItem("darkMode", isDarkMode)
}

// Load saved theme preference
document.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("darkMode")
  if (savedTheme === "false") {
    document.body.classList.add("light-mode")
  }
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
  })
}

// Initialize image preloading
document.addEventListener("DOMContentLoaded", preloadImages)
