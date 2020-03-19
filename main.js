window.cElem = (tagName, className = "") => {
    const element = document.createElement(tagName)
    element.className = className;
    return element
}

let newArrPizzaList = [];

let newCompositionList = [...compositionList];

// modal
const pizzaCardContainer = document.querySelector('.modal');
const card = document.querySelector('.modal-card');

// close modal
function hendlerClose(e) {
    const elemClassName = e.target.className;
    if (
        elemClassName === 'modal-create' ||
        elemClassName === 'btn hide' ||
        elemClassName === 'btn close' ||
        elemClassName == 'modal'
    ) {
        this.style.display = 'none';
        // body.classList.remove('open-modal');
    }
}
pizzaCardContainer.addEventListener('click', hendlerClose);

// render modal 
const renderPizzaCard = (pizza) => {
    const template = `
            <div class="header">
                <h3>${pizza.name}</h3>
            </div>
            <div class="row body">
                <div class="col-6">
                    <span>Состав: </span>
                    <div class="composition">
                        <ul>
                            ${
        pizza.composition.map(composition => {
            return `<li class="d-inline-flex">${composition}, </li>`
        }).join('')
        }
                        </ul>
                    </div>
                    <p>Каллории: ${pizza.caloricity}</p>
                    <p class="price">Цена: ${pizza.price} грн.</p>
                </div>
                <div class="col-6">
                    <img src="img/${pizza.img}" alt="icon">
                </div>
            </div>
            <div class="footer">
                <button class="btn hide">Hide</button>
            </div>
    `
    card.innerHTML = template;
}
// ---------------------------------------------------


// modal create
const createPizza = document.getElementById('create-pizza');
createPizza.addEventListener('click', hendlerClose);

// new properties isChecked
let createPizzaIds = newCompositionList.map(item => {
    return {
        id: item.id,
        isChecked: false
    }
})

// MODAL CREATE
const renderMyPizzaCreateModal = () => {
    const pizzaInfoCard = cElem('div', 'modal-card');

    const pizzaInfoHeader = cElem('div', 'header');

    let h3 = cElem('h3');
    h3.innerText = 'Имя пиццы';

    // Create input name
    const inputPizzaName = cElem('input', 'form-control');
    inputPizzaName.placeholder = 'Введите название';

    const pizzaInfoBody = cElem('div', 'body');
    pizzaInfoBody.innerHTML = `
        <div class="col-12 mb-3">
            <span>Добавить компоненты: </span>
        </div>
    `

    const pizzaInfoComposition = cElem('div', 'col-12 composition');

    const formCheck = cElem('div', 'holder-form');

    // Create checkboxes
    for (let comp of newCompositionList) {
        const checkboxItem = cElem('div', 'checkbox-item');
        // input
        const nameInput = cElem('input', 'input');
        nameInput.id = `exampleCheck${comp.id}`;
        nameInput.type = 'checkbox';
        const p = document.createElement('p');
        p.innerText = comp.name;

        // label
        const labelForNameInput = cElem('label', 'label');
        labelForNameInput.htmlFor = `exampleCheck${comp.id}`;


        nameInput.onchange = function () {
            // массив айди и isChecked

            createPizzaIds = createPizzaIds.map(elem => {
                if (elem.id === comp.id) {
                    return {
                        id: elem.id,
                        isChecked: this.checked
                    }
                }
                return elem
            })

            const ids = createPizzaIds.filter(el => el.isChecked).map(el => el.id);
            let price = 0;
            let cal = 0;
            for (let id of ids) {
                for (let comp of newCompositionList) {
                    if (id == comp.id) {
                        price += comp.price;
                        cal += comp.caloricity;
                    }
                }
            }

            console.log(price);
            p2.innerText = `Цена: ${price} грн. + 50грн. тесто`;
            p1.innerText = `Каллории: ${cal} + 100ккал. тесто `;
        }

        labelForNameInput.append(nameInput);
        labelForNameInput.appendChild(p);
        checkboxItem.append(labelForNameInput);
        formCheck.appendChild(checkboxItem);
    }

    // Create info elems
    const p1 = document.createElement('p');
    p1.id = 'price-info'
    p1.innerText = `Каллории: 0ккал + 100ккал. тесто`;

    const p2 = cElem('p', 'price');

    p2.innerText = `Цена: 0 грн. + 50грн. тесто`;

    const pizzaInfoFooter = cElem('div', 'col-12 d-flex justify-content-between footer');
    const pizzaBtnCreate = cElem('button', 'btn create');
    pizzaBtnCreate.innerText = 'Create';

    // function Pizza
    function Pizza(name, arrOfIds) {
        this.id = newArrPizzaList.length + 1;
        this.name = inputPizzaName.value || 'My Pizza';
        this.caloricity = 100;
        this.price = 50;
        this.composition = [];
        this.img = "19.png";

        for (let id of arrOfIds) {
            for (let comp of newCompositionList) {
                if (id == comp.id) {
                    this.composition.push(comp.name);
                    this.price += comp.price;
                    this.caloricity += comp.caloricity;
                }
            }
        }
        this.isCustom = true;
        newCompositionList.push(this);
    }

    pizzaBtnCreate.onclick = function () {
        const ids = createPizzaIds.filter(el => el.isChecked).map(el => el.id);
        const MyPizza = new Pizza(inputPizzaName.value, ids);
        newArrPizzaList.push(MyPizza);
        // Cart.cartArrLS

        localStorage.setItem('pizzas', JSON.stringify(newArrPizzaList));
        createPizza.style.display = 'none';
        renderHolderPizzasList(newArrPizzaList);
    }


    const pizzaInfoHide = cElem('button', 'btn hide');
    pizzaInfoHide.onclick = hendlerClose;
    pizzaInfoHide.innerText = 'Hide';

    pizzaInfoCard.appendChild(pizzaInfoHeader);
    pizzaInfoHeader.appendChild(h3);
    pizzaInfoHeader.appendChild(inputPizzaName);
    pizzaInfoCard.appendChild(pizzaInfoBody);
    pizzaInfoBody.appendChild(pizzaInfoComposition);
    pizzaInfoComposition.appendChild(formCheck);

    pizzaInfoComposition.appendChild(p2);
    pizzaInfoComposition.appendChild(p1);

    pizzaInfoFooter.appendChild(pizzaBtnCreate);
    pizzaInfoFooter.appendChild(pizzaInfoHide);
    pizzaInfoCard.appendChild(pizzaInfoFooter);

    return pizzaInfoCard
}
createPizza.addEventListener('click', hendlerClose);

// RENDER MODAL CREATE
const createPizzaBox = document.getElementById('create-pizza');

const renderСompositionList = (arrayOfСomposition) => {
    createPizzaBox.innerHTML = '';
    createPizzaBox.style.display = 'flex';

    createPizzaBox.append(renderMyPizzaCreateModal());
}

const createPizzaBtn = document.getElementById('create-pizza-btn');

createPizzaBtn.onclick = function () {
    // body.classList.add('open-modal');
    renderСompositionList(newCompositionList);
}
//-------------------------------------------------------



//---------------------------------------------------------
const body = document.querySelector('body');

// CARD PIZZA
const renderCard = (pizza) => {
    const holdCard = cElem('div', 'hold-card');

    const card = cElem('div', 'card');
    card.id = `pizza${pizza.id}`;
    // show modal
    card.onclick = function () {
        renderPizzaCard(pizza);
        pizzaCardContainer.style.display = 'flex';
        // body.classList.add('open-modal');
    }
    holdCard.appendChild(card);
    // img
    const visual = cElem('div', 'visual');
    visual.innerHTML = `<img src="img/${pizza.img}" alt="icon">`;
    card.appendChild(visual);
    // favor
    const buttonFavorite = cElem('button', 'addToFavor');
    buttonFavorite.innerHTML = `<span class="heart">&#10084;</span>`;
    buttonFavorite.onclick = function (e) {
        e.stopPropagation();
        pizza.isFavourite = true;
    }
    card.appendChild(buttonFavorite);
    // text 
    const text = cElem('div', 'text');
    // h3
    const pizzaName = document.createElement('h3');
    pizzaName.innerHTML = pizza.name;
    text.appendChild(pizzaName);
    // p composition
    const composition = cElem('ul', 'pizza-card__composition');
    composition.innerHTML = 'Состав: ' + pizza.composition.map(c => `<li>${c},</li>`).join(' ');
    text.appendChild(composition);
    // p caloricity
    const caloricity = cElem('p', 'pizza-card__caloricity');
    caloricity.innerText = `Ккал: ${pizza.caloricity}`;
    text.appendChild(caloricity);
    // p price
    const price = cElem('p', 'pizza-card__price');
    price.innerText = `Цена: ${pizza.price} грн.`;
    text.appendChild(price);
    // button
    const buttonOrder = cElem('button', 'pizza-card__button');
    buttonOrder.innerText = 'Заказать';

    buttonOrder.onclick = function (e) {
        e.stopPropagation();

        Cart.setPizza(pizza.id);
    }
    text.appendChild(buttonOrder);
    card.appendChild(text);

    return holdCard;
}
// -----------------------------------------------------

const mainElement = document.querySelector('.holder-pizzas-list');

// RENDER PIZZAS
const renderHolderPizzasList = (arrayOfPizza) => {
    mainElement.innerHTML = '';

    for (let pizza of arrayOfPizza) {
        const card = renderCard(pizza);
        mainElement.appendChild(card);
    }
    localStorage.setItem('pizzas', JSON.stringify(arrayOfPizza));
}

// from localStorage or pizzaList
const getArrFronmStorage = () => {
    const arrParse = JSON.parse(localStorage.getItem('pizzas'));
    newArrPizzaList = arrParse || [...pizzaList];
    return newArrPizzaList
}
renderHolderPizzasList(getArrFronmStorage());

// SELECT asc desc price
const select = document.getElementById('select');

select.onchange = function () {
    let newSortArr = [...newArrPizzaList].sort((a, b) => {
        if (a.price < b.price) return this.value === '1' ? -1 : 1
        if (a.price > b.price) return this.value === '1' ? 1 : -1
        if (a.price === b.price) return 0
    })
    renderHolderPizzasList(newSortArr);
    if(select.selectedIndex == '0') {
        renderHolderPizzasList(newArrPizzaList);
    }
}


// LIVE SEARCH
const input = document.getElementById('inputFind');

input.addEventListener('input', function (e) {
    let newArr = newArrPizzaList.filter(pizza => {
        let eTargetValue = e.target.value.toLowerCase();
        let pizzaNameIncludes = pizza.name.toLowerCase().includes(eTargetValue);
        let pizzaCompositionIncludes = pizza.composition.join(' ').toLowerCase().includes(eTargetValue);
        return pizzaNameIncludes || pizzaCompositionIncludes
    });
    newArr = newArr.map(pizza => {
        let composition = pizza.composition.map(comp => {
            if (e.target.value.length && comp.includes(e.target.value)) {
                return `<span class="pink">${comp}</span>`;
            }
            return comp
        })
        return { ...pizza, composition }
    })
    renderHolderPizzasList(newArr);
})
// ----------------------------------------


// Filter by price or caloricity
let inputFrom = document.getElementById('inputFrom');
let inputTo = document.getElementById('inputTo');
let btnFind = document.getElementById('btn-find');
const selectFilter = document.getElementById('select-filter');

let sortPizzasByCaloricity = () => {
    const valueOfFilterFrom = inputFrom.value
    const valueOfFilterTo = inputTo.value
    const newArrCaloricity = newArrPizzaList.filter((pizza) => {
        if (pizza.caloricity > valueOfFilterFrom && pizza.caloricity < valueOfFilterTo) {
            return true
        }
        return false
    })
    renderHolderPizzasList(newArrCaloricity);
}

let sortPizzasByPrice = () => {
    const valueOfFilterFrom = inputFrom.value
    const valueOfFilterTo = inputTo.value
    const newArrPrice = newArrPizzaList.filter((pizza) => {
        if (pizza.price > valueOfFilterFrom && pizza.price < valueOfFilterTo) {
            return true
        }
        return false
    })
    renderHolderPizzasList(newArrPrice);
}

// apply filter
btnFind.onclick = function () {
    if (selectFilter.value == '1') {
        sortPizzasByCaloricity();
    }
    if (selectFilter.value == '2') {
        sortPizzasByPrice();
    }
}
//------------------------------------------------------


// throw off filter
let btnReset = document.getElementById('btn-reset');

btnReset.addEventListener('click', resetFilterValue);

function resetFilterValue() {
    inputFrom.value = null;
    inputTo.value = null;
    renderHolderPizzasList(newArrPizzaList);
}


// add to favor
const addToFavor = document.getElementById('addToFavor');


// banner/slider
const renderSlide = (pizza) => {
    const holderSlider = cElem('div', 'slider-item');
    // img
    const slideImg = cElem('div', 'slide-img');
    const img = cElem('img', 'simg');
    img.alt = 'icon';
    img.src = 'img/' + pizza.img;

    // text
    const slideText = cElem('div', 'slide-text');

    slideText.innerHTML = `
                        <h3>${pizza.name}</h3>
                        <p class="pizza-card__composition">${pizza.composition.join(', ')}<p/>
                        <p class="pizza-card__caloricity">
                            Каллорийность: ${pizza.caloricity}
                        </p>
                        <span class="pizza-card__price">
                            Цена: ${pizza.price} грн.
                        </span>
                        `;

    const buttonOrder = cElem('button', 'pizza-card__button px-3');
    buttonOrder.innerText = 'Заказать';

    buttonOrder.onclick = function () {
        Cart.setPizza(pizza.id);
    }

    const action = cElem('div', 'action');
    action.innerHTML = '<img src="img/act.png" alt="action"/>';
    slideText.appendChild(buttonOrder);
    slideImg.appendChild(img);
    holderSlider.appendChild(action);
    holderSlider.appendChild(slideImg);

    holderSlider.appendChild(slideText);

    return holderSlider
}


// Pizza of priceOfTheDay
let indexOfName = 0;
const pizzaOfTheDay = newArrPizzaList.filter(pizza => {
    if (pizza.priceOfTheDay == true) {
        return true
    }
})

const renderSlideContainer = (pizza) => {
    const sliderContainer = document.querySelector('.slider');
    sliderContainer.innerHTML = '';
    if (pizza.priceOfTheDay == true) {
        const slide = renderSlide(pizza);
        sliderContainer.appendChild(slide);
    }
}
renderSlideContainer(pizzaOfTheDay[indexOfName]); // draw the first, without an interval

setInterval(() => {
    // если индекс = последнему (концу) массива, то индексу снова присваиваем 0, иначе +1
    indexOfName = indexOfName === pizzaOfTheDay.length - 1 ? 0 : indexOfName + 1
    renderSlideContainer(pizzaOfTheDay[indexOfName]); // через каждые 2 сек отрысов по очереди 
}, 3000);


// ---------------------
const setToLocalStorage = () => {
    const obj = {
        cartArr: Cart.cartArrLS,
        totalPrice: Cart.totalPrice,
        totalCount: Cart.totalCount,
    }
    localStorage.setItem('cart', JSON.stringify(obj));
}

const initialCartObj = () => {
    const cartArr = newArrPizzaList.map(item => {
        return {
            id: item.id,
            name: item.name,
            totalCount: 0,
            totalPrice: 0
        }
    })
    return {
        cartArr,
        totalPrice: 0,
        totalCount: 0,
    }
}

const cartObj = JSON.parse(localStorage.getItem('cart'))|| initialCartObj();

const { cartArr, totalPrice, totalCount } = cartObj;

console.log(cartArr)

class Cart {
    static cartArrLS = cartArr.map(pizza => {
        return {
            id: pizza.id,
            img: pizza.img,
            name: pizza.name,
            count: pizza.count || 0,
            price: pizza.price,
            totalPrice: pizza.totalPrice || 0,
        }
    })

    static totalPrice = totalPrice

    static totalCount = totalCount

    static setPizza(idOfCurrentPizza) {
        const pizzaModel = newArrPizzaList.find(p => p.id === idOfCurrentPizza);
        
        for (let pizza of Cart.cartArrLS) {
            if (pizza.id === idOfCurrentPizza) {
                pizza.count += 1;
                pizza.img = pizzaModel.img;
                pizza.price = pizzaModel.price;
                pizza.totalPrice += pizzaModel.price;
                Cart.totalPrice += pizzaModel.price;
                Cart.totalCount++;

                setToLocalStorage();
                break;
            }
        }
    }
}
