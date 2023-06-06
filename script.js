// Отримуємо необхідні елементи з DOM
const productNameInput = document.querySelector('.product-search input');
const addButton = document.querySelector('.add');
const productsList = document.querySelector('.products');

// Функція для додавання товару до списку
function addProduct() {
    // Отримуємо назву товару з поля вводу
    const productName = productNameInput.value;

    if (productName) { // Перевіряємо, чи не порожнє поле вводу
        // Створюємо елементи для нового товару
        const productContainer = document.createElement('div');
        productContainer.classList.add('inline-container');

        const product = document.createElement('div');
        product.classList.add('product');

        const productNameElement = document.createElement('div');
        productNameElement.classList.add('product-name');
        productNameElement.textContent = productName;

        const amount = document.createElement('div');
        amount.classList.add('amount');

        const minusDiv = document.createElement('div');

        const minusButton = document.createElement('button');
        minusButton.classList.add('minus');
        minusButton.setAttribute('data-tooltip', 'Відняти');
        minusButton.textContent = '-';

        const productAmount = document.createElement('div');
        productAmount.classList.add('product-amount');
        productAmount.textContent = '1';

        const plusDiv = document.createElement('div');

        const plusButton = document.createElement('button');
        plusButton.classList.add('plus');
        plusButton.setAttribute('data-tooltip', 'Додати');
        plusButton.textContent = '+';

        const acts = document.createElement('div');
        acts.classList.add('acts');

        const boughtButton = document.createElement('button');
        boughtButton.classList.add('btn-bought');
        boughtButton.setAttribute('data-tooltip', 'Куплено');
        boughtButton.textContent = 'Куплено';
        boughtButton.addEventListener('click', markProductAsUnbought);

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn-x');
        deleteButton.setAttribute('data-tooltip', 'Видалити');
        deleteButton.textContent = 'x';
        deleteButton.addEventListener('click', deleteProduct);

        // Додаємо елементи до DOM
        minusDiv.appendChild(minusButton);
        plusDiv.appendChild(plusButton);

        amount.appendChild(minusDiv);
        amount.appendChild(productAmount);
        amount.appendChild(plusDiv);

        acts.appendChild(boughtButton);
        acts.appendChild(deleteButton);

        product.appendChild(productNameElement);
        product.appendChild(amount);
        product.appendChild(acts);

        productContainer.appendChild(product);
        productsList.appendChild(productContainer);

        // Очищуємо поле вводу
        productNameInput.value = '';

        // Перенаправляємо фокус на поле вводу
        productNameInput.focus();
    }
}

// Налаштування функціональності кнопки Додати
addButton.addEventListener('click', addProduct);


// Функція для видалення товару зі списку
function deleteProduct(event) {
    const product = event.target.closest('.inline-container');

    if (product) {
        product.remove();
    }
}

//
// кнопка Видалити
function deleteProduct(event) {
    const product = event.closest('.product');
    const isBought = product.classList.contains('bought');

    if (!isBought) {
        deleteProduct(event);
    }

}



//
// Куплено/НеКуплено
const boughtButtons = document.querySelectorAll('.btn-bought');
const noBoughtButtons = document.querySelectorAll('.btn-no-bought');

// Функція для відмітки товару як купленого
function markProductAsBought(event) {
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

    editButton.removeEventListener('click', markProductAsBought);
    editButton.addEventListener('click', markProductAsUnbought);
}

// Функція для відміни відмітки товару як НЕ купленого
function markProductAsUnbought(event) {
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

    editButton.removeEventListener('click', markProductAsUnbought);
    editButton.addEventListener('click', markProductAsBought);
}



// Налаштування функціональності кнопки "Куплено"
for (let button of boughtButtons) {
    button.addEventListener('click', markProductAsUnbought);
}

// Налаштування функціональності кнопки "Не куплено"
for (let button of noBoughtButtons) {
    button.addEventListener('click', markProductAsBought);
}
