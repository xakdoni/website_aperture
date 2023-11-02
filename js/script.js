/**************************************************** 
 * Определение с какого устройства открывается сайт
*/

const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i)
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (
            isMobile.Android() ||
            isMobile.BlackBerry() ||
            isMobile.iOS() ||
            isMobile.Opera() ||
            isMobile.Windows()
        );
    }
};

/**************************************************** */

if(isMobile.any()) { // если одна из функций определение мобильного устройства срабатывает, 
    document.body.classList.add('_touch') // пристваиваем для body класс _touch

    let menuArrows = document.querySelectorAll('.menu__arrow'); // получем стрелочку для откртия вложенного меню
    if(menuArrows.length > 0) // если есть хоть одна стрелочка, начинаем работу
        for(let index = 0; index < menuArrows.length; index++) { // перебираем все стрелки
            const menuArrow = menuArrows[index]; // в переменную сохраняем каждую стрелку по очереди
            menuArrow.addEventListener('click', function(e) { // для каждой стрелки присваиваем событие click
                menuArrow.parentElement.classList.toggle('_active'); // при клике добавлем и убираем класс у родителя стрелки
            })
        }
} else {
    document.body.classList.add('_pc') // если ни одна функция определение мобильного устройства не сработала, 
}                                      // присваиваем body класс _pc

// Прокрутка к разделам

const menuLinks = document.querySelectorAll('.menu__link[data-goto]'); // получаем ссылки в меню которые ведут к разделам
if(menuLinks.length > 0) { // проверяем, содержится ли хоть одна ссылка, которая нам нужна
    menuLinks.forEach(menuLink => { // перебираем все элементы
        menuLink.addEventListener('click', onMenuLinkClick); // каждой ссылке добавлем событие клик, по которому срабатывает функция
    });

    function onMenuLinkClick(e) {
        const menuLink = e.target; // получаем ссылку, по которой кликнули 
        if(menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) { // проверка сожержания data атрибутов у ссылки и из верстки атрибут у этой же ссылки
            const gotoBlock = document.querySelector(menuLink.dataset.goto); // если всё верно, получаем сам атрибут
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight; // высчитвается расстояние до блока для прокрутки

            // если у нас открыта мобильная версия сайта и мы кликаем по разделу, то надо закрыть меню и прокрутить к разделу
            if(iconMenu.classList.contains('_active')) { // проверка, если кнопка открытия меню с классом _active
                document.body.classList.remove('_lock') // то разрешаем прокрутку для body
                iconMenu.classList.remove('_active'); // возвращаем кнопку в исходное положение
                menuBody.classList.remove('_active'); // закрываем меню
            }

            // функция прокрутки
            window.scrollTo({
               top: gotoBlockValue, // к какому блоку двигаемся
               behavior: "smooth"  // плавная прокрутка
            });
            e.preventDefault(); // отключение стандартной работы ссылки
        }
    }
}

/********************************************** */
// Меню

const iconMenu = document.querySelector('.menu__icon'); // получение кнопки меню
const menuBody = document.querySelector('.menu__body'); // получения блока с меню
if(iconMenu) { // прверка, существует ли кнопка меню
    iconMenu.addEventListener('click', function(e) { // вешаем событие клик на кнопку меню
        document.body.classList.toggle('_lock') // запрещаем body скролиться
        iconMenu.classList.toggle('_active'); // анимация для кнопки

        
        menuBody.classList.toggle('_active'); // открытие меню
    });
}