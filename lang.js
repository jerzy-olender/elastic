const translate = {
    pl: {
        about: 'Oferta',
        contact: 'Kontakt',
        load_offer: 'Trwa ładowanie ofert',
        name: 'Podaj imię',
        surname: 'Podaj nazwisko',
        email: 'Podaj email',
        tel: 'Podaj telefon',
        button1:'Wybierz',
        button2:'Wybierz',
        button3:'Wybierz',
        button4:'Powrót',
        button5:'Dalej',
        button6:'Powrót',
        make_order:'Zamów',
        in_zl:'Płatność w złotówkach',
        in_euro:'Płatność w euro',
        payment_fast:'Szybki przelew',
        payment_normal:'Przelew tradycyjny',
        choosen_product:'Wybrany produkt',
        step3_euro:'Cena w euro',
        step3_zl:'Cena w zł',
    },
    en: {
        about: 'Offer',
        contact: 'Contact',
        load_offer: 'Loading offers',
        name: 'Input name',
        surname: 'Input surname',
        email: 'Input email',
        tel: 'Input phone number',
        button1:'Choose',
        button2:'Choose',
        button3:'Choose',
        button4:'Back',
        button5:'Next',
        button6:'Back',
        make_order:'Order',
        in_zl:'Payment in zloty',
        in_euro:'Payment in euro',
        payment_fast:'Quick transfer',
        payment_normal:'Traditional transfer',
        choosen_product:'Choosen product',
        step3_euro:'Price in euro',
        step3_zl:'Price in zloty',
    }
}

let globalLang = 'pl';

const langSwitch = document.querySelector('#change_lang');
langSwitch.addEventListener('change', switchLang);

function switchLang(){
    const lang = this.value;
    globalLang = lang;
    const keys = Object.keys(translate[lang]);
   
    keys.forEach(function(item){
        document.querySelector(`#${item}`).innerHTML = translate[lang][item];
    }); 

    if(!isNaN(document.querySelector('input[name="offer_id"]').value) && parseFloat(document.querySelector('input[name="offer_id"]').value)){
        let selected_offer = offers.products.filter(function(item){
            return item.id == document.querySelector('input[name="offer_id"]').value;
        });
        selected_offer = selected_offer[0];
        
        document.querySelector('[data-step="3"] h2').innerHTML = selected_offer[`title_${globalLang}`];
    }

    offers.products.forEach(function (offer_item, index) {
        const items = document.querySelectorAll('.our_service_item');
        items[index].querySelector('h2').innerHTML = offer_item[`title_${lang}`];

        const desc_list = items[index].querySelector('ul');
        desc_list.innerHTML = '';
        offer_item[`description_${lang}`].forEach(function (desc_item) {
            const list_item = document.createElement('li');
            list_item.innerHTML = desc_item;
            desc_list.appendChild(list_item);
        });
    });
}