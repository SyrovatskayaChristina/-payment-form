document.addEventListener('DOMContentLoaded', () => {
    var payerTypeValue = document.getElementById('payer-type').value;

    if (payerTypeValue === '2') {
        document.getElementById('ulform').hidden = false;
        document.getElementById('checkbox-inn').hidden = false;
    }

});