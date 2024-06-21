document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });

        setTimeout(() => {
            document.querySelector(this.getAttribute('href')).classList.add('show');
        }, 300);
    });
});

