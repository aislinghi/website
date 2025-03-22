document.addEventListener('DOMContentLoaded', function() {
    // Handle form submission
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = {
                name: this.querySelector('input[placeholder="Full Name"]').value,
                email: this.querySelector('input[placeholder="Email"]').value,
                phone: this.querySelector('input[placeholder="Phone"]').value,
                message: this.querySelector('textarea').value
            };

            try {
                const response = await fetch('/api/appointment', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();
                
                if (result.success) {
                    alert('Thank you! Your appointment request has been received. We will contact you shortly.');
                    this.reset();
                } else {
                    alert('There was an error submitting your request. Please try again.');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('There was an error submitting your request. Please try again.');
            }
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add active class to nav links on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-container a');

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Special case for home link when at the top
        if (scrollPosition < sections[0].offsetTop) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLinks[0].classList.add('active');
        }
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}); 