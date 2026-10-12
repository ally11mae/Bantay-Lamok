// Mobile nav toggle
const burger = document.querySelector('.burger');
const links = document.querySelector('.nav-links');
if (burger && links) {
  burger.addEventListener('click', () => links.classList.toggle('open'));
}

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

// Contact form (demo only: opens the visitor's email app)
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const d = new FormData(form);
    const subject = encodeURIComponent('Bantay-Lamok inquiry: ' + d.get('interest'));
    const body = encodeURIComponent(
      'Name: ' + d.get('name') + '\nPhone: ' + d.get('phone') + '\n\n' + d.get('message')
    );
    window.location.href = 'mailto:hello@bantay-lamok.example?subject=' + subject + '&body=' + body;
  });
}
