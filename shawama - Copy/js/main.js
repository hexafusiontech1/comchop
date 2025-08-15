
        // Booking form submission
        function handleBooking(event) {
            event.preventDefault();
            
            const name = event.target.querySelector('input[placeholder="Your Name"]').value;
            const phone = event.target.querySelector('input[placeholder="Your Phone Number"]').value;
            const location = event.target.querySelector('select').value;
            const specialNeeds = event.target.querySelector('textarea').value;
            
            if (name && phone && location) {
                alert(`Booking submitted successfully!\n\nName: ${name}\nPhone: ${phone}\nLocation: ${location}\nSpecial Needs: ${specialNeeds || 'None'}`);
                event.target.reset();
            }
        }

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Add interactive effects
        document.addEventListener('DOMContentLoaded', function() {
            // const buttons = document.querySelectorAll('button');
            // buttons.forEach(button => {
            //     button.addEventListener('mouseenter', function() {
            //         this.style.transform = 'translateY(-2px)';
            //         this.style.transition = 'transform 0.3s ease';
            //     });
                
            //     button.addEventListener('mouseleave', function() {
            //         this.style.transform = 'translateY(0)';
            //     });
            // });

            const form = document.getElementById('bookingForm');
            const submitBtn = form.querySelector('.submit-btn');
            
            form.addEventListener('submit', function() {
                submitBtn.innerHTML = 'Submitting...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.innerHTML = 'Submit';
                    submitBtn.disabled = false;
                }, 2000);
            });
        });

        // Load dynamic content simulation
        function loadDynamicContent() {
            setTimeout(() => {
                console.log('Latest shawarma offers loaded');
            }, 1000);
        }

        loadDynamicContent();


// NOT NEEDED FOR NOW 


function shopNow() {
    document.querySelector('#all-shawama').scrollIntoView({ behavior: 'smooth' });
}




// carousel

  $(document).ready(function(){
    $("#shawarma-carousel").owlCarousel({
      loop: true,
      margin: 5,
      nav: true,
      dots: false,
      autoplay: true,
      smartSpeed: 800,
      responsive: {
        0: { items: 1 },
        576: { items: 2 },
        768: { items: 3 },
        992: { items: 4 }
      },
      navText: [
        '<button class="btn btn-outline-secondary fs-4">❮</button>',
        '<button class="btn btn-outline-secondary fs-4">❯</button>'
      ]
    });
  });

  
// end