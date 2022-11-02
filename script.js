const bg = document.getElementById('resume');

const resize = () => {
    if (bg.offsetHeight > window.innerHeight) {
        bg.style.height = '200vh';
        bg.innerHTML+='<div class="separator"></div>'
    } else {
        bg.style.height = '100vh';
    }
};


window.matchMedia('print').addEventListener('change', (media) => {
    if (media.matches) {
        
        resize();
        
    }
});

