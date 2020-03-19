window.cElem = (tagName, className = "") => {
    const element = document.createElement(tagName)
    element.className = className;
    return element
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

const cartObj = JSON.parse(localStorage.getItem('cart')) || initialCartObj();
const { cartArr } = cartObj;

const sumItem = document.querySelector('.sumItem');
const sumUah = document.querySelector('.sumUah');

class CartComponent {
    static renderBasketCart(pizza) {
        const item = cElem('div', 'hold-cart');
        const itemCart = cElem('div', 'cart');
        const itemImg = cElem('div', 'visual');
        itemImg.id = pizza.id;
        const img = document.createElement('img');
        img.src = 'img/' + pizza.img;
        img.alt = 'pizza';
        itemImg.appendChild(img);

        const itemText = cElem('div', 'text');
        const h5 = document.createElement('h5');
        h5.innerHTML = `Пицца <br>"${pizza.name}"`
        itemText.appendChild(h5);

        const input = cElem('input', 'inputValue');
        input.type = 'number';
        input.value = pizza.count;

        const result = cElem('input', 'result price');
        result.readOnly = true;
        result.value = pizza.totalPrice;

        const pValut = cElem('span', 'valut price');
        pValut.innerText = 'грн.';

        // add / del pizza
        input.oninput = function () {
            if (input.value >= 0) {
                const sum = pizza.price * input.value;
                result.value = sum;
                const pizzaInCart = cartArr.find(p => p.id === pizza.id);
                pizzaInCart.count = +input.value;
                pizzaInCart.totalPrice = sum;
                cartObj.totalCount = cartArr.reduce((a,b) => {
                    return a + b.count 
                }, 0)
                cartObj.totalPrice = cartArr.reduce((a,b) => {
                    return a + b.totalPrice
                }, 0)
                CartComponent.renderTotalInfo();
                localStorage.setItem('cart', JSON.stringify(cartObj))
            }
            if (input.value <= 0) {
                result.value = 0;
                input.value = 0
            }
        };

        CartComponent.renderTotalInfo()

        itemText.appendChild(input);
        itemText.appendChild(result);
        itemText.appendChild(pValut);
        itemCart.appendChild(itemImg);
        itemCart.appendChild(itemText);
        item.appendChild(itemCart);
        return item
    }

    static renderTotalInfo() {
        sumItem.innerText = cartObj.totalCount
        sumUah.innerText = cartObj.totalPrice
    }

    // render pizza
    static renderHolderItem() {
        const pizzaElement = document.querySelector('.holder-item');

        pizzaElement.innerHTML = '';
        if (cartArr) {
            cartArr.filter(item => item.count).map(item => {
                const card = CartComponent.renderBasketCart(item);
                pizzaElement.appendChild(card);
            })
        }
        console.log(cartArr);
    }
}

CartComponent.renderHolderItem();


///---------------- FORM ----------------------
// const name = document.getElementById('inputName').value;
// const surname = document.getElementById('inputSurname').value;
// const telephone = document.getElementById('telephone').value;
// const telephone = document.getElementById('#telephone');
const btnOrder = document.querySelector('.order');

class FormCart {
    constructor(name, surname, tel, street, house, float) {
        this.name = name;
        this.surname = surname;
        this.tel = tel;
        this.street = street || 'street';
        this.house = house || 'house';;
        this.float = float || 'float';;
    }
    render(x) {
        let out = '';
        out += `<div class="container">
                    <p>${this.name}</p>
                    <p>${this.surname}</p>
                    <p>${this.tel}</p>
                    <p>${this.street}</p>
                    <p>${this.house}</p>
                    <p>${this.float}</p>
                </div>`;
        document.getElementById(x).innerHTML = out;
    }
}

const name = document.getElementById('inputName');
const surname = document.getElementById('inputSurname');
const telephone = document.getElementById('telephone');

btnOrder.onclick = function() {
    // let nameValue = name.value;
    // let surnameValue = surname.value;
    // let telephoneValue = telephone.value;

    // let nameValue = document.getElementById('inputName').value;
    // let surnameValue = document.getElementById('inputSurname').value;
    // let telephoneValue = document.getElementById('telephone').value;

    let form = new FormCart('Eva', 'Iokina', '+380333333333');
    localStorage.setItem('form', JSON.stringify(form))
    console.log(form);
}




