let txtResultado = document.getElementById('resultado');
let btnPonto = document.getElementById('btnDecimal');
let opMemoria = "";
let valorMemoria = null;
let continuarDigitacao = false;


function clearAll() {
    console.log(txtResultado.value);
    console.log(valorMemoria);
    console.log(opMemoria);

    txtResultado.value = 0;
    opMemoria = 0;
    valorMemoria = null;
    continuarDigitacao = false;
    
}



function realizaOperacao(operacao, valMemoria, valDigitado) {
    console.log('\nMétodo realizar operacao');

    let result = 0;

    switch (operacao) {
        case "+":
            console.log('entrou na soma');
            
            result = Number(valMemoria) + Number(valDigitado);
            break;
            
        case "-":
            console.log('entrou na subtração');

            if(Number(valMemoria) === 0) {
                result = Number(valDigitado);

            } else {
                result = Number(valMemoria) - Number(valDigitado);

            }

            break;

        case "*":
            console.log('entrou na multiplicação');

            if (valMemoria === null) {
                result = Number(valDigitado);

            } else {
                result = Number(valMemoria) * Number(valDigitado);

            }

            break;

        case "/":
            console.log('entrou na divisão');
            
            if (valMemoria === null) {
                result = Number(valDigitado);

            } else {
                let resultado = Number(valMemoria) / Number(valDigitado);
    
                if (Number(isFinite(resultado))) {
                    result = resultado;
    
                } else {
                    result = 0;
                }

            }

            break;

        case "=":
            console.log('entrou no =');

            result = valMemoria;
            clearAll();
            break;

        default:
            console.log('entrou no default');

            result = valDigitado;

            break;
    }

    console.log('valor retornado: ' + result + '\n\n');

    return Number(result.toFixed(2));
}

function inverterSinal () {
    txtResultado.value *= -1;
}

function digitaNumero(valor) {
    console.log('Function insertValue');
    console.log('valor em memoria: ' + valorMemoria);

    if (valor === ".") {
        btnPonto.removeAttribute("value");
    }
    

    if (continuarDigitacao) {
        console.log('continua a dogitacao');
        
        if (txtResultado.value === "0") {
            console.log('entrou no if');
            txtResultado.value = valor;
            
        } else {
            console.log('entrou no else');
            txtResultado.value += valor;
            
        }
        
    } else {
        console.log('recomeca a digitacao');
        txtResultado.value = valor;
        continuarDigitacao = true;
        
    }

        

    console.log('Valor no visor: ' + txtResultado.value + '\n\n');
}


function setOperation(operation) {
    console.log('Operacao desejada: ' + operation);
    btnPonto.setAttribute("value",".");

    if (operation === "%") {
        console.log('porcentagem');

        let perc = valorMemoria * (txtResultado.value / 100);


        let vlrFinal = realizaOperacao(opMemoria, valorMemoria, perc);
        txtResultado.value = vlrFinal;
        valorMemoria = vlrFinal;
        continuarDigitacao = false;

    } else if (operation === "=") {
        console.log('resultado final');
        txtResultado.value = realizaOperacao(opMemoria, valorMemoria, txtResultado.value);
        opMemoria = "";
        valorMemoria = txtResultado.value;
        // continuarDigitacao = false;

    } else {
        console.log('operacao continua');
        
        if(!continuarDigitacao) {

            valorMemoria = realizaOperacao(operation, valorMemoria, txtResultado.value);

        } else {
            if (opMemoria !== "") {
                valorMemoria = realizaOperacao(opMemoria, valorMemoria, txtResultado.value);

            } else {
                valorMemoria = txtResultado.value;

            }
        }
        
        opMemoria = operation;
        continuarDigitacao = false;
        txtResultado.value = Number(valorMemoria);
        
    }
    
}