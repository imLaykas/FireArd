function validarSenhaInput(){
    var num = document.getElementById('num');
    var tam = document.getElementById('tam');
    var esp = document.getElementById('esp');
    var mai = document.getElementById('mai');
    var btn = document.getElementById('btn-criar');
    var m = false;
    var n = false;
    var e = false;
    var qtd = false;
    const maiuscula = /[A-Z]/;
    const numeros = /[0-9]/;
    const especiais = /[!|@|#|$|(|)|*|%|_|-|=|:|+|.|,|~|<|>]/;
    var senha = document.getElementById('senha').value;

    if(maiuscula.test(senha)){
        m = true;
        mai.style.color = 'green';
    }else{
        m = false;
        mai.style.color = 'red';
    }
    if(numeros.test(senha)){
        n = true;
        num.style.color = 'green';
    }else{
        n = false;
        num.style.color = 'red';
    }
    if(especiais.test(senha)){
        e = true;
        esp.style.color = 'green';
    }else{
        e = false;
        esp.style.color = 'red';
    }
    if(senha.length >=8){
        qtd = true;
        tam.style.color = 'green';
    }else{
        qtd = false;
        tam.style.color = 'red'
    }

    if(m && n && e && qtd){
        btn.disabled = false;
    }else{
        btn.disabled = true;
    }
}
