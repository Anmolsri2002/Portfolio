// Theme switcher functionality
const themeSwitch = document.querySelector('.theme-switch');
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.classList.add(savedTheme);
}

themeSwitch.addEventListener('click', () => {
    body.classList.toggle('light-mode');
    // Save theme preference
    localStorage.setItem('theme', body.classList.contains('light-mode') ? 'light-mode' : '');
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});

// Active navigation link update on scroll
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const formProps = Object.fromEntries(formData);

        // Show sending state
        const submitButton = contactForm.querySelector('button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        try {
            // Here you would typically send the data to your backend
            // For now, we'll just simulate a delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            alert('Message sent successfully!');
            contactForm.reset();
        } catch (error) {
            alert('Failed to send message. Please try again.');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// Animate elements when they come into view
const observerOptions = {
    threshold: 0.2
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Add animation to sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add this CSS to your style.css file for animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }

    section.animate {
        opacity: 1;
        transform: translateY(0);
    }

    .light-mode {
        background-color: #ffffff;
        color: #333333;
    }

    .light-mode .dark-nav {
        background-color: #f8f8f8;
    }

    .light-mode .nav-content ul li a {
        color: #333333;
    }

    .light-mode .dark-section {
        background-color: #f8f8f8;
    }

    .light-mode #contact-form input,
    .light-mode #contact-form textarea {
        background-color: #ffffff;
        border: 1px solid #dddddd;
        color: #333333;
    }
`;
document.head.appendChild(styleSheet);