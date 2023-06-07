function drawProduct(name, amount, isBought) {
    drawProductPanel(name, amount, isBought);
    drawProductCard(name, amount, isBought);
}

function drawProductPanel(name, amount, isBought) {
    // Ліва нанель
    const productContainer = document.createElement('div');
    productContainer.classList.add('inline-container');

    const product = document.createElement('div');
    product.classList.add('product');

    const productNameElement = document.createElement('div');
    productNameElement.classList.add('product-name');
    productNameElement.textContent = name;
    if (isBought) productNameElement.style.textDecoration = 'line-through';
    productNameElement.addEventListener('click', editProductName);

    const amountDiv = document.createElement('div');
    amountDiv.classList.add('amount');

    const minusDiv = document.createElement('div');
    if (isBought) minusDiv.id = 'invisible';

    const minusButton = document.createElement('button');
    if (amount != 1) {
        minusButton.classList.add('minus');
    }
    else {
        minusButton.classList.add('minus-unactive');
    }

    minusButton.setAttribute('data-tooltip', 'Відняти');
    minusButton.textContent = '-';
    minusButton.addEventListener('click', editProductQuantity)

    const productAmount = document.createElement('div');
    productAmount.classList.add('product-amount');
    productAmount.textContent = amount;

    const plusDiv = document.createElement('div');
    if (isBought) plusDiv.id = 'invisible';

    const plusButton = document.createElement('button');
    plusButton.classList.add('plus');
    plusButton.setAttribute('data-tooltip', 'Додати');
    plusButton.textContent = '+';
    plusButton.addEventListener('click', editProductQuantity);

    const acts = document.createElement('div');
    acts.classList.add('acts');

    const boughtButton = document.createElement('button');
    let className;
    if (isBought) className = 'btn-no-bought';
    else className = 'btn-bought';
    boughtButton.classList.add(className);
    let tooltipText;
    if (isBought) tooltipText = 'Не куплено';
    else tooltipText = 'Куплено';
    boughtButton.setAttribute('data-tooltip', tooltipText);
    let text;
    if (isBought) text = 'Не куплено';
    else text = 'Куплено';
    boughtButton.textContent = text;
    let func;
    if (isBought) func = markProductAsUnbought;
    else func = markProductAsBought;
    boughtButton.addEventListener('click', func);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn-x');
    deleteButton.setAttribute('data-tooltip', 'Видалити');
    deleteButton.textContent = 'x';
    deleteButton.addEventListener('click', deleteProduct);
    if (isBought) deleteButton.id = 'none';

    // Додаємо елементи до DOM
    minusDiv.appendChild(minusButton);
    plusDiv.appendChild(plusButton);

    amountDiv.appendChild(minusDiv);
    amountDiv.appendChild(productAmount);
    amountDiv.appendChild(plusDiv);

    acts.appendChild(boughtButton);
    acts.appendChild(deleteButton);

    product.appendChild(productNameElement);
    product.appendChild(amountDiv);
    product.appendChild(acts);

    productContainer.appendChild(product);
    document.querySelector('.products').appendChild(productContainer);


    // Права панель
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.id = name;
    productCard.textContent = name;
    const productCardAmount = document.createElement('div');
    productCardAmount.classList.add('product-card-amount')
    productCardAmount.textContent = amount;

    productCard.appendChild(productCardAmount);

    if (isBought) {
        productCard.style.textDecoration = 'line-through';
        document.querySelector('.product-list-bought').appendChild(productCard);
    }
    else {
        document.querySelector('.product-list-remainder').appendChild(productCard);
    }
}

function drawProductCard(name, amount, isBought) {

}


// Додати
const addButton = document.querySelector('.add');
function addProduct(event) {
    const productNameInput = document.querySelector('.product-search input');
    const productName = productNameInput.value;
    if (productName) {
        // Якщо ім'я коректне
        // Зводим ім'я до стандартного вигляду
        const correctName = productName[0].toUpperCase() + productName.substr(1).toLowerCase();
        const productCard = document.getElementById(correctName);
        if (!productCard) {
            // Якщо таке ім'я ще не існує
            
            drawProduct(correctName, 1, false);
            // Очищуємо поле вводу
            productNameInput.value = '';
        }
    }
    // Перенаправляємо фокус на поле вводу
    productNameInput.focus();
}
addButton.addEventListener('click', addProduct);
document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addProduct();
    }
})


// Функція для відмітки товару як купленого
function markProductAsUnbought(event) {
    const product = event.target.closest('.product');

    product.classList.remove('bought');

    const name = product.querySelector('.product-name');
    name.style.textDecoration = 'none';

    const amountDivs = product.querySelectorAll('.amount > div');
    amountDivs[0].id = null;
    amountDivs[2].id = null;

    const editButton = product.querySelector('.btn-no-bought');
    editButton.classList.remove('btn-no-bought');
    editButton.classList.add('btn-bought');
    editButton.textContent = 'Куплено';
    editButton.setAttribute('data-tooltip', 'Куплено');

    const deleteButton = product.querySelector('.btn-x');
    deleteButton.style.display = 'block';

    editButton.removeEventListener('click', markProductAsUnbought);
    editButton.addEventListener('click', markProductAsBought);

    // права панель
    //console.log(name.textContent);
    const productCard = document.getElementById(name.textContent);
    productCard.remove();
    document.querySelector('.product-list-remainder').appendChild(productCard);
    productCard.style.textDecoration = 'none';
}

// Функція для відміни відмітки товару як НЕ купленого
function markProductAsBought(event) {
    const product = event.target.closest('.product');

    product.classList.add('bought');

    const name = product.querySelector('.product-name');
    name.style.textDecoration = 'line-through';

    const amountDivs = product.querySelectorAll('.amount > div');
    amountDivs[0].id = 'invisible';
    amountDivs[2].id = 'invisible';

    const editButton = product.querySelector('.btn-bought');
    editButton.classList.remove('btn-bought');
    editButton.classList.add('btn-no-bought');
    editButton.textContent = 'Не куплено';
    editButton.setAttribute('data-tooltip', 'Не куплено');

    const deleteButton = product.querySelector('.btn-x');
    deleteButton.style.display = 'none';

    editButton.removeEventListener('click', markProductAsBought);
    editButton.addEventListener('click', markProductAsUnbought);

    // права панель
    //console.log(name.textContent);
    const productCard = document.getElementById(name.textContent);
    productCard.remove();
    document.querySelector('.product-list-bought').appendChild(productCard);
    productCard.style.textDecoration = 'line-through';
}

// Функція для видалення товару зі списку
function deleteProduct(event) {
    const product = event.target.closest('.inline-container');
    product.remove();
    // права панель
    //console.log(name.textContent);
    const name = product.querySelector('.product-name');
    const productCard = document.getElementById(name.textContent);
    productCard.remove();
}

// Функція для редагування назви товару
function editProductName(event) {
    const product = event.target.closest('.product');
    const nameElement = product.querySelector('.product-name');
    const inputElement = document.createElement('input');
    const nameStr = nameElement.textContent
    inputElement.value = nameStr;
    inputElement.classList.add('editing');

    nameElement.textContent = null;
    nameElement.appendChild(inputElement);
    inputElement.focus();

    inputElement.addEventListener('blur', () => {
        let newNameStr = inputElement.value;
        let correctNewNameStr;
        console.log(newNameStr);
        if (!newNameStr) {
            correctNewNameStr = nameStr[0];
        }
        else {
            correctNewNameStr = newNameStr[0].toUpperCase() + newNameStr.substr(1).toLowerCase();
        }

        const productCard = document.getElementById(nameStr);
        const amountDiv = productCard.getElementsByTagName('div')[0];
        productCard.textContent = correctNewNameStr;
        productCard.appendChild(amountDiv);
        productCard.id = correctNewNameStr;

        nameElement.textContent = correctNewNameStr;
        inputElement.remove();
    });
}

// Функція для редагування кількості товару
function editProductQuantity(event) {
    const product = event.target.closest('.product');
    const countElement = product.querySelector('.product-amount');
    const minusButton = product.querySelector('.minus');
    const plusButton = product.querySelector('.plus');
    let count = parseInt(countElement.textContent);

    if (event.target.classList.contains('minus')) {
        count--;
        if (count === 1) {
            minusButton.classList.remove('minus');
            minusButton.classList.add('minus-unactive');
        }
    } else if (event.target.classList.contains('plus')) {
        count++;
        const unactiveMinusButoon = product.querySelector('.minus-unactive');
        if (count === 2) {
            unactiveMinusButoon.classList.remove('minus-unactive');
            unactiveMinusButoon.classList.add('minus');
        }
    }

    countElement.textContent = count;

    // права панель
    const name = product.querySelector('.product-name');
    const productCard = document.getElementById(name.textContent);
    const amountDiv = productCard.getElementsByTagName('div')[0];
    amountDiv.textContent = count;
}


// Функція для оновлення статистики
function updateStatistics() {
    const toBuyList = document.querySelector('.to-buy-list');
    const purchasedList = document.querySelector('.purchased-list');
    let toBuyHTML = '';
    let purchasedHTML = '';

    // Очистка списків
    toBuyList.innerHTML = '';
    purchasedList.innerHTML = '';

    // Отримання всіх товарів
    const products = document.querySelectorAll('.product');

    // Перебір товарів
    products.forEach((product) => {
        const name = product.querySelector('.name').textContent;
        const count = parseInt(product.querySelector('.count').textContent);
        const isPurchased = product.classList.contains('purchased');

        const listItem = `<li>${name} (${count})</li>`;

        if (isPurchased) {
            purchasedHTML += listItem;
        } else {
            toBuyHTML += listItem;
        }
    });

    // Відображення статистики
    toBuyList.innerHTML = toBuyHTML;
    purchasedList.innerHTML = purchasedHTML;
}

// ресет даних
function reset(){
    let productArray = [['Помідори', 2, true], ['Печиво', 2, false], ['Сир', 1, false]]

    for (let product of productArray) {
        drawProduct(product[0], product[1], product[2]);
    }
    localStorage.setItem("array", productArray);
}

// загрузка старих данних
function loading(){
    let productArray = localStorage.getItem("array").split(',');
    //console.log(productArray);
    let i = 0;
    while (i < productArray.length){
        drawProduct(productArray[i],productArray[i+1],productArray[i+2]==='true'?true:false)
        i+=3;
    }
}

function resetLocalStorage(){
    localStorage.removeItem('array');
}

let productsDictionaty;
loading();