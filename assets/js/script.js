'use strict';
// Создать проект асинхронной загрузки карточек пользователей в виде
//  userList (id, имя, фамилия, imageSrc). 
//  застилить. использовать формат данных JSON и метод fetch

//данные сгенерировал на https://mockaroo.com/, 
// есть данные на 10, 100, 1000 и 2000  юзеров о_О
// ----------------------------------
const menuBtn = document.querySelector('#menu button')
menuBtn.addEventListener('click', e => {
    let value;
    menu.querySelectorAll('input').forEach(i => {
        if (i.checked) value = +i.value
    });
    console.log(value);
    userCardCollection.innerHTML = '';
    getUsers(value);
});

// ----------------------------------
function getUsers(value) {
    return new Promise((resolve, reject) => {
        fetch(`./assets/data/USER_DATA_${value}.json`)
            .then(response => response.json())
            .then(cbFunc)
            .catch(console.error);
    })
}

//-----------------------------------
const options = {
     // margin: '200px',
    threshold: 0.9         //for visible loading effect
}
const lazyLoadImg = new IntersectionObserver(imgHandler, options)

function imgHandler(avatarImg, observer) {
    avatarImg.forEach(img => {
        if (img.intersectionRatio > 0) {
            console.log(img.target)
            img.target.src = img.target.getAttribute('alt')
            lazyLoadImg.unobserve(img.target)
        }
    })
}

// ----------------------------------
const userCardCollection = document.getElementById('userCardCollection')

function cbFunc(data) {


    data.forEach(userData => renderUsers(userData))

};

function renderUsers(user) {
    const userList = createUserLi();
    userList.append(createUserAvatar(user));
    userList.append(createUserName(user));
    userCardCollection.append(userList)
}

function createUserLi() {
    const userLi = document.createElement('ul');
    userLi.classList.add('userList');
    return userLi
}

function createUserAvatar(user) {
    const userAvatar = document.createElement('img');
    userAvatar.classList.add('userAvatar');
    userAvatar.setAttribute('alt', `${user.avatar}`)
    lazyLoadImg.observe(userAvatar)
    return userAvatar;
}

function createUserName(user) {
    const userName = document.createElement('h2');
    userName.classList.add('userName');
    userName.textContent = `${user.firstName} ${user.lastName}`;
    return userName;
}
