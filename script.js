const bg = document.getElementById('resume');

const commercialBlock = document.querySelector('.resume__extended-commercial');
const portfolioBlock = document.querySelector('.resume__extended-portfolio');
const portfolioItems = document.querySelector('.resume__extended-portfolio-items');

const separableItems = document.querySelectorAll('.resume_separable');

const styleElement = document.head.appendChild(document.createElement("style"));

// отрисовка заднего фона резюме до конца страницы в PDF
const resize = () => {
    if (bg.offsetHeight > window.innerHeight) {
        bg.style.height = '200vh';
    } else {
        bg.style.height = '100vh';
    }
};

// поправляет отступы в случае, если нет блока коммеческого опыта
const fixMargin = () => {
    if (commercialBlock === null && portfolioBlock !== null) {
        portfolioItems.style.marginTop = '-7px';
    }
};

const drawSeparator = () => {
    // переменная для проверки, прошелся ли цикл по первому подблоку в блоке портфолио
    let isFirstPortfolioItemPassed = false;
   
    // переменная для проверка, был ли нарисован сепаратор
    let isSeparatorDrawed = false;

    // границы условной линии разделения страниц (работает для масштаба 180%)
    const bottomPageBreak = 880;
    const topPageBreak = 800;

    separableItems.forEach(
        (item) => {
            
            // Координаты потолка и пола блока item
            let blockBottom = item.getBoundingClientRect().bottom;
            let blockTop = item.getBoundingClientRect().top;
            
            if ((blockBottom > bottomPageBreak && blockTop < topPageBreak ||
                blockBottom > bottomPageBreak && blockTop < bottomPageBreak && blockTop > topPageBreak ||
                blockBottom < bottomPageBreak && blockBottom > topPageBreak && blockTop < topPageBreak) && 
                !isSeparatorDrawed
            ) {
                if (item.classList.contains('portfolio-item') && !isFirstPortfolioItemPassed) {
                    portfolioBlock.insertAdjacentHTML('beforebegin', '<div class="separator"></div>');
                    
                    item.style.paddingTop = '12px';
                    styleElement.innerHTML = '.portfolio-item:nth-child(1) > .portfolio-item__summary::after {top: -28px !important;}';
                } else {
                    item.insertAdjacentHTML('beforebegin', '<div class="separator"></div>');
                    item.style.paddingTop = '0';
                    
                }

                isSeparatorDrawed = true;
            }

            if (item.classList.contains('portfolio-item') && !isFirstPortfolioItemPassed) {
                isFirstPortfolioItemPassed = true;
            }
        }
    );
};

fixMargin();
drawSeparator();

window.matchMedia('print').addEventListener('change', (media) => {
    if (media.matches) {
        
        resize();
        
    }
});

