// сделал возможным добавлять неограниченное количество вложенностей меню.

const rootNav = document.querySelector('.root-nav');
const burger = document.querySelector('.burger');
const bodyTag = document.querySelector('body');

burger.addEventListener('click', function(e) {
    rootNav.classList.toggle('open')
    bodyTag.classList.toggle('open')
});


rootNav.addEventListener('click', function(event) {

    if (event.target.nodeName !=='SPAN') return;

    closeAllSubMenu(event.target.nextElementSibling);

    event.target.classList.toggle('sub-menu-active-span');
    event.target.nextElementSibling.classList.toggle('sub-menu-active');
});


// передадим текущую менюху через current, чтобы не закрывались все меню разом
function closeAllSubMenu(current = null) {
    const parents = [];

    if (current) {
        let currentParent = current.parentNode;

        while(currentParent){
            if (currentParent.classList.contains('root-nav')) break;
            if (currentParent.nodeName === 'UL') parents.push(currentParent);
            currentParent = currentParent.parentNode;
        };
    };

    const subMenu = document.querySelectorAll('.root-nav ul');
    Array.from(subMenu).forEach(item => {

        if(item != current && !parents.includes(item)) {

            item.classList.remove('sub-menu-active');

            if(item.previousElementSibling.nodeName === 'SPAN') {
                item.previousElementSibling.classList.remove('sub-menu-active-span');
            };
        };
    });
};


document.addEventListener('mouseup', function(e) {
    if(!rootNav.contains(e.target)) {
        closeAllSubMenu();
        rootNav.classList.remove('open');
        bodyTag.classList.remove('open');
    }
});