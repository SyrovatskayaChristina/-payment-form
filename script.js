const individual = document.getElementById('individual'),
    legalEntity = document.getElementById('legalEntity'),
    nds = document.getElementById('nds'),
    name = document.getElementById('payer-name'),
    amount = document.getElementById('amount'),
    errorMessage = 'Заполните все обязательные поля',
    окMessage = 'Платеж успешно отправлен',
    form = document.getElementById('form'),
    messageElement = document.getElementById('message'),
    inn = document.getElementById('inn'),
    total = document.getElementById('total'),
    selectedType = document.getElementById('payer-type'),
    selected = document.getElementById('payer-type'),
    ulform = document.getElementById('ulform'),
    checkboxInn = document.getElementById('checkbox-inn'),
    phoneNumber = document.getElementById('phoneNumber');




//валидация введенных данных на имя и инн
const constraints = {
    payerName: {
        presence: true,
        format: {
            pattern: "[а-яА-Я]+",
            message: '^Введены недопустимые символы',
        },
        length: {
            minimum: 3,
            maximum: 15,
            message: '^Имя должно иметь длинну от 3-х до 15-ти символов',
        },

    },
    inn: {
        presence: true,
        format: {
            pattern: "[0-9]+",
            message: '^Введены недопустимые символы',
        }
    },
};


document
    .getElementById('form')
    .addEventListener('submit', (event) => {
        event.preventDefault();
        var result = [];
        result = validate({
                payerName: document.getElementById('payer-name').value,

                inn: document.getElementById('inn').value,
                //todo: сюда вставляю остальные валидаторы
            },
            constraints
        );
        var payerNameMessagesHTML = '';
        if (Array.isArray(result.payerName) === true && result.payerName.length > 0) {
            document.getElementById('payer-name-messages').innerHTML = '';
            for (var i = 0; i < result.payerName.length; i++) {
                if (i < result.payerName.length - 1) {
                    payerNameMessagesHTML += result.payerName[i] + '<br>';
                } else {
                    payerNameMessagesHTML += result.payerName[i];
                }
            }
            document.getElementById('payer-name-messages').innerHTML = payerNameMessagesHTML;
        }
        document.getElementById('payer-name-messages').innerHTML = payerNameMessagesHTML;
        var innMessagesHTML = '';
        if (Array.isArray(result.inn) === true && result.inn.length > 0) {

            document.getElementById('inn-messages').innerHTML = '';
            innMessagesHTML += result.inn + '<br>';
            document.getElementById('inn-messages').innerHTML = innMessagesHTML;
        } else {
            innMessagesHTML += '';
            document.getElementById('inn-messages').innerHTML = innMessagesHTML;
        }

    });


//установка значения в поле ндс
//открывает форму юр лица


selectedType.onchange = function() {


    if (selected.value === '1') {
        nds.value = 'НДС 13%';
        ulform.hidden = true;
        checkboxInn.hidden = true;

    } else {
        nds.value = 'НДС 17%';
        ulform.hidden = false;
        checkboxInn.hidden = false;
    }
};


//ограничивает кол-во вводимых символов в инн

function limit() {
    if (selected.value === '1') {
        if (inn.value.length > 12) {
            inn.value = inn.value.slice(0, 12);
        }
    } else {
        inn.value = inn.value.slice(0, 10);
    }
}



// устанавливает форму телефона


var maskOptions = {
    mask: '+{7}(000)000-00-00'
};
var mask = IMask(phoneNumber, maskOptions);



//сумма
var maskOptions1 = {
    mask: Number,
    scale: 2,
    signed: false,
    thousandsSeparator: '',
    padFractionalZeros: true,
    radix: '.',
    normalizeZeros: true,
    mapToRadix: ['.']
};
var numberMask = IMask(amount, maskOptions1);


//Если установлена галочка, то поле "ИНН" очищается,
//делается необязательным и недоступным для ввода данных.

var check = document.getElementById('checkboxInputInn');
if (check.checked == true) {
    inn.disabled = false;
}
check.onchange = function() {
    if (check.checked == false) {
        inn.disabled = false;

    } else {
        inn.disabled = true;
        inn.value = '';
    }
};


//Итог - текстовое поле, заблокировано. Если в поле "сумма платежа" введено корректное значение,
//то поле "итог" = "Сумма платежа" * (1 + "НДС"/100).

var changeTotal = document.getElementById('amount');
total.disabled = true;
changeTotal.onchange = function() {
    var amountValue = parseFloat(amount.value);
    var nds = document.getElementById('nds');
    var ndsValue = parseFloat((nds.value).match(/\d+/));
    var totalValue = (amountValue * (1 + (ndsValue / 100))).toFixed(2);
    document.getElementById('total').value = totalValue;
};