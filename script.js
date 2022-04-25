const apiBaseUrl = 'https://api.exchangerate.host';
const toInput = document.querySelector('#input2');
const form = document.querySelector('#getDatas');
const rates = document.querySelectorAll('.money-text');

form.addEventListener('input', e => {
    initData();
});

async function initData() {
    const formData = new FormData(form);

    const data = {};
    formData.forEach((v, k) => data[k] = v);

    const response = await Promise.all([
        convert(data.btnradio.toUpperCase(), data.btnradio2.toUpperCase(), data.frm),
        getRates(data.btnradio2.toUpperCase(), data.btnradio.toUpperCase())
    ]);

    input2.value = response[0].result;


    rates[0].innerHTML = `1 ${data.btnradio} = ${response[0].info.rate} ${data.btnradio2}`;
    
    rates[1].innerHTML = `1 ${data.btnradio2} = ${response[1].rates[data.btnradio.toUpperCase()]} ${data.btnradio}`;
}

async function convert(from, to, amount) {
    const url = new URL('/convert', apiBaseUrl);
    url.searchParams.set('from', from);
    url.searchParams.set('to', to);
    if (amount) url.searchParams.set('amount', amount);

    return await fetch(url).then(r => r.json());
}

async function getRates(from, to) {
    const url = new URL('/latest', apiBaseUrl);
    url.searchParams.set('base', from);
    url.searchParams.set('symbols', to);

    return await fetch(url).then(r => r.json());
}


// const inp1 = document.getElementById('input1');

// const inp2 = document.getElementById('input2');

// let frm = document.getElementsByName('btnradio');

// let to = document.getElementsByName('btnradio2');
// console.log(frm);
// console.log(to);

// async function currency(frm, to){
//     const api_url = `https://api.exchangerate.host/latest?base=${frm}&symbols=${to}&amount=${inp1.value} `;
    
//     const response = await fetch(api_url );
 
//     const data = await response.json(); console.log(data);
    
   
//     inp1.addEventListener('input', ()=>{
//     inp2.value = inp1.value;
//     console.log(inp1.value)
//     console.log(inp2.value)
//     })

//  return data.rates[to];

 
// };
// currency();





   




