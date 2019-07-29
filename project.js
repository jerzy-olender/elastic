function getOffersData(){
    return {
        'products': [{
            'id': 1,
            'title_pl': 'Opcja standardowa',
            'title_en': 'Standard option',
            'price': 20,
            'description_pl': ['3 TB miejsca do bezpiecznego przechowywania', 'Łatwe w użyciu narzędzia udostępniania i współpracy'],
            'description_en': ['3 TB safe space', 'Easy to use sharing and collaboration tools']
        }, {
            'id': 2,
            'title_pl': 'Opcja zaawansowana',
            'title_en': 'Advanced option',
            'price': 40,
            'description_pl': ['Tyle przestrzeni, ile Twój zespół potrzebuje', 'Zaawansowane funkcje kontroli i bezpieczeństwa'],
            'description_en': ['As much space as your team needs', 'Advanced control and security functions']
        }, {
            'id': 3,
            'title_pl': 'Opcja klasy Enterprise',
            'title_en': 'Enterprise option',
            'price': 60,
            'description_pl': ['Konfigurowalne rozwiązania', 'Spersonalizowana pomoc techniczna ułatwiająca administratorom zarządzanie na dużą skalę'],
            'description_en': ['Configurable solutions', 'Personalized technical support that helps administrators manage on a large scale']
        }],
    };
}

//Zakładam, że dane które zwraca funckja getOffersData zostały zwrócone przez API
const offers = getOffersData();
let euro_currency = 0;

document.addEventListener('DOMContentLoaded', function () {
   
    const euro_currency_request = getEuroCurrency();
    euro_currency_request.then(response => {
        document.querySelector('#offer_loader').style.display = "none";

        offers.products.forEach(function (item, index) {
            euro_currency = response;

            const items = document.querySelectorAll('.our_service_item');

            items[index].querySelector('h2').innerHTML = item.title_pl;
            items[index].querySelector('span.price').innerHTML = item.price;
            items[index].querySelector('span.euro_price').innerHTML = Math.round(item.price / euro_currency * 100) / 100;
            items[index].querySelector('button').setAttribute('data-offer-id', item.id);

            const desc_list = items[index].querySelector('ul');
            item.description_pl.forEach(function (desc_item) {
                const list_item = document.createElement('li');
                list_item.innerHTML = desc_item;
                desc_list.appendChild(list_item);
            });
            items[index].style.display = "block";
        });
    });
});

function getEuroCurrency(){
    return fetch('http://api.nbp.pl/api/exchangerates/rates/a/eur')
        .then(response => response.json())
        .then(response => {
            return response.rates[0].mid;
        })
}


function showStep(elem, step){

    if(elem.getAttribute('data-offer-id')){
        if(document.querySelector('.our_service_item button.active')){
            document.querySelector('.our_service_item button.active').classList.remove('active');
        }
        elem.classList.add('active');
        document.querySelector('input[name="offer_id"]').value = elem.getAttribute('data-offer-id');
        console.log(elem.getAttribute('data-offer-id'));
    }

    
    if(step == 3){
        if(!validateInputs()){
            return 0;
        }

        let selected_offer = offers.products.filter(function(item){
            return item.id == document.querySelector('input[name="offer_id"]').value;
        });
        selected_offer = selected_offer[0];
        
        document.querySelector('[data-step="3"] h2').innerHTML = selected_offer[`title_${globalLang}`];
        document.querySelector('[data-step="3"] .price').innerHTML = selected_offer.price;
        document.querySelector('[data-step="3"] .price_euro').innerHTML = Math.round(selected_offer.price / euro_currency * 100) / 100;
        
    }

    const step_to_show = document.querySelector(`[data-step="${step}"]`);

    const all_steps = document.querySelectorAll('.step');
    all_steps.forEach(function(item){
        item.style.display = 'none';
    });

    step_to_show.style.display = 'block';
}

function validateInputs(){
    const inputs = document.querySelectorAll('input');
    let checkInput = 1;
    inputs.forEach(function(item){
       if(item.name == 'lname' || item.name == 'fname'){
            checkInput = lenghtValidator(item, 3);
       }
       if(item.name == 'email'){
            checkInput = validateEmail(item);
       }
       if(item.name == 'phone'){
            checkInput = validatePhone(item);
       }
    });

    return checkInput;
}

function lenghtValidator(elem, length){
    if(elem.value.length < length){
        elem.classList.add('error');
        return 0;
    }
    return 1;
}

function validateEmail(elem){
    if(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(elem.value)){
        return 1;
    }
    elem.classList.add('error');
    return 0;
}

function validatePhone(elem){
    if(!isNaN(parseFloat(elem.value)) && elem.value.length == 9){
        return 1;
    }
    elem.classList.add('error');
    return 0;
}

const make_order = document.querySelector('#make_order');
make_order.addEventListener('click', makeOrder);

function makeOrder(){
    const data = new FormData();
    data.append('product_id', document.querySelector('input[name="offer_id"]').value);
    data.append('fname', document.querySelector('input[name="fname"]').value);
    data.append('lname', document.querySelector('input[name="lname"]').value);
    data.append('phone', document.querySelector('input[name="phone"]').value);
    data.append('email', document.querySelector('input[name="email"]').value);
    data.append('currency', document.querySelector('input[name="currency"]').value);
    data.append('payment_type', document.querySelector('input[name="payment_type"]').value);
    const processing = 'Przetwarzanie zamówienia'
    alert(processing);

    //W tym miejscu wywołane zostało by zapytanie AJAX mające na celu przysłanie danych do odpowiedniego serwera na przykład do bramki płatnicznej.

}


