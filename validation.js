console.warn('CPF: ', 13870154780);
console.warn('CNPJ: ', '59.541.264/0001-03');
    
    
    function ajuste(valor){
        valor = 11 - (valor % 11);
        if(valor > 9) valor = 0

        return valor;
    }
    

    function sequencia(array) {
        let acrr;
        if(array[0] == array[1] && array[0]  == array[2] && array[0] == array[3]) acrr = false
        else acrr = true;
        return acrr;
    }

    function validaCpf(){
    const cpfInput = document.querySelector('#data');
    const cpfData = cpfInput.value;
    const cpfLimpo = cpfData.replace(/\D+/g, '');
    const cpfArray = Array.from(cpfLimpo);
    const cpfNumber = cpfArray.map((n) => Number(n));
    const cpfValidando = cpfNumber.map((acrr) => acrr).splice(0, 9);
    let cpfValidado = [];

    function estado(){
        const n = cpfLimpo[8];

        const estados = ['Rio grande do Sul',
        'Distrito Federal', 
        'Amazonas, Pará, Roraima, Amapá, Acre ou Rondônia',
        'Ceará, Maranhã ou Piauí',
        'Paraíba, Pernambuco, Alagoas ou Rio Grande do Norte',
        'Bahia ou Sergipe',
        'Minas Gerais',
        'Rio de Janeiro ou Espirito Santo',
        'São Paulo',
        'Paraná ou Santa Catarina'
        ]

        return estados[n]
    }


    function dCheck (){
        
        let n = cpfValidando.length + 1;
        let soma = 0;
        for(let i = 0; i < cpfValidando.length; i++){
            let acr = cpfValidando[i]*n;
            soma += acr;
            n--
        }
        
        soma = ajuste(soma)
        cpfValidando.push(soma)


        return soma
    }

    dCheck()
    dCheck()


    cpfValidado = cpfValidando.map(function(valor){
        return valor.toString()
    });
    cpfValidado = cpfValidado.reduce(function(acrr, valor){
        acrr += valor;
        return acrr;
    })

    const formatandoCpf = (i, f) => cpfValidado.substring(i, f)
    const cpfFormatado = `${formatandoCpf(0, 3)}.${formatandoCpf(3, 6)}.${formatandoCpf(6, 9)}-${formatandoCpf(9, 12)}` 

    const tests = {
        Quantidade: cpfLimpo.length == 11,
        firstD: cpfValidado[9] == cpfLimpo[9],
        firstDValue: cpfValidado[9],
        secondD: cpfValidado[10] == cpfLimpo[10],
        secondDValue: cpfValidado[10],
        estado: estado(),
        Dado: cpfLimpo,
        Gerado: cpfValidado,
        Formatado: cpfFormatado,
        sequencia: sequencia(cpfNumber),
        isValid: sequencia(cpfNumber) && cpfValidado == cpfLimpo
    }

    return tests

}

function validaCnpj(){
    
    const cnpjInput = document.querySelector('#data');
    const cnpjData = cnpjInput.value;
    const cnpjLimpo = cnpjData.replace(/\D+/g, '');
    const cnpjArray = Array.from(cnpjLimpo);
    const cnpjNumber = cnpjArray.map((n) => Number(n));
    const cnpjValidando = cnpjNumber.map((acrr) => acrr).splice(0, 12).reverse();
    let cnpjValidado = cnpjValidando.map((acrr) => acrr).reverse();
    
    
    
    function DCheck(){
        let acrr = [];
        let n = 2;
        let a;
        cnpjValidado.map((acrr) => acrr).reverse().forEach(number => {
            a = number * n;
            acrr.push(a);
            n++
            if(n > 9) n=2
            
        })
        acrr = acrr.map((n) => n).reduce((acr, n) => {
            acr = Number(acr);
            acr += Number(n);
            return acr
        })
        acrr = ajuste(acrr);
        cnpjValidado.push(acrr);
        
        
        
        return acrr
        
    }
    DCheck()
    DCheck()
    
    
    cnpjValidado = cnpjValidado.map((n) => n.toString())
    cnpjValidado = cnpjValidado.reduce((acrr, valor) =>{
        acrr +=valor;
        return acrr
    })
    
    if(cnpjValidado === cnpjLimpo) console.log(true);
    if(cnpjValidado !== cnpjLimpo) console.error(false);
    
    const formatando = (i, f) => cnpjValidado.substring(i, f)
    const cnpjFormatando = `${formatando(0,2)}.${formatando(2,5)}.${formatando(5,8)}/${formatando(8,12)}-${formatando(12,14)}`
    
    const tests = {
        Quantidade: cnpjLimpo.length == 14,
        firstD: cnpjValidado[12] == cnpjLimpo[12],
        firstDValue: cnpjValidado[9],
        secondD: cnpjValidado[13] == cnpjLimpo[13],
        secondDValue: cnpjValidado[13],
        estado: null,
        Dado: cnpjLimpo,
        Formatado:cnpjFormatando,
        Gerado: cnpjValidado,
        sequencia: sequencia(cnpjLimpo),
        isValid: sequencia(cnpjLimpo) && cnpjValidado === cnpjLimpo
    }
    
    return tests
}


function imprimir(dados){
    const mode = document.querySelector('#mode').value;
    
        function checar() {
            
            
            for(let i = 0; i < fields.length; i++){
                
            if(fields[i].innerHTML === 'true') {
                fields[i].classList.remove('invalid');
                fields[i].classList.add('valid');
                fields[i].innerHTML = 'Válido';
                
            }   
             if(fields[i].innerHTML === 'false') {
                fields[i].classList.remove('valid');
                fields[i].classList.add('invalid');
                fields[i].innerHTML = 'Inválido'
            }
             if(tests.isValid == false){
                fields[8].parentElement.classList.add("disapear");
                fields[3].innerHTML = tests.Dado;
                fields[3].classList.remove("valid")

            }
             if(tests.isValid != false){
                fields[8].parentElement.classList.remove("disapear");
                fields[3].innerHTML = tests.Formatado;
                fields[3].classList.add("valid")

            }
            if(mode === 'CNPJ'){                
                fields[8].parentElement.classList.add("disapear");
            }
             if(mode != 'CNPJ'){                
                fields[8].parentElement.classList.remove("disapear");
            }
            
            
            }
        }

        
    const tests = dados;
    const result = document.querySelector('#result');
    result.classList.add("show");
    const fields = document.querySelectorAll('span');
    
        checar()

    fields[0].innerHTML = mode;
    fields[1].innerHTML = mode;
    fields[2].innerHTML = tests.isValid;
    fields[3].innerHTML = tests.Dado;
    fields[4].innerHTML = tests.sequencia;
    fields[5].innerHTML = tests.Quantidade;
    fields[6].innerHTML = tests.firstD;
    fields[7].innerHTML = tests.secondD;
    fields[8].innerHTML = tests.estado;
    fields[8].classList.add("valid");
    
    checar()

        
    
    
    
}
document.addEventListener('click', function(e){
    if (e.target.id == "validation") {
        if(document.querySelector("#mode").value == 'CPF') imprimir(validaCpf())
        else if(document.querySelector("#mode").value == 'CNPJ') imprimir(validaCnpj())
    }
    
    
})