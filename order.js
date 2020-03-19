const cartArr = JSON.parse(localStorage.getItem('cart')) || [];
console.log(cartArr);

let amount = document.querySelector('.amount');
amount.innerHTML = cartArr.totalPrice + ' грн';

let sumPizzas = document.querySelector('.sumPizzas');
sumPizzas.innerHTML = cartArr.totalCount;


let numOrder = document.querySelector('.numOrder');

const random = ()=> {
    with (Math) {
        return floor(random() * pow(10, 10))
    }
}

//  numOrder()
numOrder.innerHTML = random();


//------FORM-------
let name = document.querySelector('.name');
let surname = document.querySelector('.surname');
let tel = document.querySelector('.tel');
let street = document.querySelector('.street');

const formFromLS = JSON.parse(localStorage.getItem('form')) || [];
console.log(formFromLS.name);

name.innerText = 'На имя: ' + formFromLS.name + ' ';
surname.innerText = formFromLS.surname;
tel.innerText = 'Телефон для связи: ' + formFromLS.tel;
street.innerText = 'Адресс: ' + formFromLS.street;
