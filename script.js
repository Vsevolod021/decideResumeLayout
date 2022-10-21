const bg = document.getElementById('resume');

const commercialBlock = document.querySelector('.resume__extended-commercial');
const portfolioBlock = document.querySelector('.resume__extended-portfolio');
const portfolioItems = document.querySelector('.resume__extended-portfolio-items')

const resize = () => {
    if (bg.offsetHeight > window.innerHeight) {
        bg.style.height = '200vh';
        // bg.innerHTML += '<div class="separator"></div>';
    } else {
        bg.style.height = '100vh';
    }
};

const fixMargin = () => {
    if (commercialBlock === null && portfolioBlock !== null) {
        portfolioItems.style.marginTop = '-7px';
    }
}

fixMargin();

window.matchMedia('print').addEventListener('change', (media) => {
    if (media.matches) {
        resize();
    }
});

