const fromCurrency = document.getElementById('from-currency');
const toCurrency = document.getElementById('to-currency');
const amount = document.getElementById('amount');
const convertBtn = document.getElementById('convert-btn');
const resultText = document.getElementById('result-text');
const exchangeIcon = document.querySelector('.fa-arrow-right-arrow-left');
const fromFlag = document.querySelector('.box1 img');
const toFlag = document.querySelector('.box2 img');

function populateDropdowns() {
    const currencies = Object.keys(countryList);
    fromCurrency.innerHTML = '';
    toCurrency.innerHTML = '';
    
    currencies.forEach(currency => {
        const option1 = document.createElement('option');
        const option2 = document.createElement('option');
        
        option1.value = currency;
        option1.text = currency;
        option2.value = currency;
        option2.text = currency;
        
        fromCurrency.add(option1);
        toCurrency.add(option2);
    });
    
    fromCurrency.value = 'USD';
    toCurrency.value = 'BDT';
}

function updateFlag(element) {
    const currencyCode = element.value;
    const countryCode = countryList[currencyCode];
    const imgElement = element.parentElement.querySelector('img');
    imgElement.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
}

async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurr = fromCurrency.value;
    const toCurr = toCurrency.value;
    
    if (amount === '' || amount <= 0) {
        resultText.textContent = 'Please enter a valid amount';
        return;
    }

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/d1f99478a34669216ae0d241/latest/${fromCurr}`);
        const data = await response.json();
        
        if (data.result === 'success') {
            const rate = data.conversion_rates[toCurr];
            const convertedAmount = (amount * rate).toFixed(2);
            resultText.textContent = `${amount} ${fromCurr} = ${convertedAmount} ${toCurr}`;
            
            const rateInfo = document.querySelector('.container > p');
            rateInfo.textContent = `1 ${fromCurr} = ${rate.toFixed(2)} ${toCurr}`;
        }
    } catch (error) {
        resultText.textContent = 'Error fetching exchange rates';
        console.error(error);
    }
}

function swapCurrencies() {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    
    updateFlag(fromCurrency);
    updateFlag(toCurrency);
}

window.addEventListener('load', () => {
    populateDropdowns();
    updateFlag(fromCurrency);
    updateFlag(toCurrency);
    resultText.textContent = 'Converted Amount: ';
});

fromCurrency.addEventListener('change', (e) => {
    updateFlag(e.target);
});

toCurrency.addEventListener('change', (e) => {
    updateFlag(e.target);
});

convertBtn.addEventListener('click', convertCurrency);
exchangeIcon.addEventListener('click', swapCurrencies);

amount.addEventListener('input', () => {
    resultText.textContent = 'Converted Amount: ';
});