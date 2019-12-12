/* ARQUIVO JS, ONDE ACONTECE TODA A INTERAÇÃO DO SITE
 @author Sávio Cardoso
 @author Guilda FrontEnd dti */

//Utiliza-se o pacote node-fetch para simular a API Fetch, que já vem nos browsers.
//Portanto, num browser, a linha a seguir é desnecessária!
//const fetch = require('node-fetch');
//const{ URLSearchParams } = require('url');

//DECLARAÇÃO DAS VARIÁVEIS QUE SERÃO UTILIZADAS
var tipo = document.getElementById('senhaLogin');
const btnVisibilidadeSenha = document.getElementById('btnVisibilidadeSenha');
const btnAutenticar = document.getElementById('btnAutenticar');
const verificaLogin = document.getElementById('verificaLogin');
const divLogin = document.getElementById('divLogin');
const divCV = document.getElementById('cv');
const log = document.getElementById('log');
const client_id = '682aac27-6b4b-4f13-a4f9-21f8b0f30f08';
const client_secret = '.C=T8S7[XpPu0qY-HTPcUgVObr4=bHUF';
const scope = 'https://graph.microsoft.com/.default';

//FUNÇÃO DE AUTENTICAÇÃO DE LOGIN
btnAutenticar.addEventListener("click", function() {
    //RECUPERA O VALOR DOS CAMPOS email E senha
    var email = document.getElementById('nomeLogin').value;
    var senha = document.getElementById('senhaLogin').value;
    //DEFINE O LINK DA API UTILIZADA
    const apiUrl = 'https://login.microsoftonline.com/be87ed09-e753-468f-8244-e2f3811ceacc/oauth2/v2.0/token';
    //PARÂMETROS DE CABEÇALHO QUE SERÃO PASSADOS PARA A API
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'SdkVersion': 'postman-graph/vl.0'
    };
    //PARÂMETROS DE CORPO QUE SERÃO PASSADOS PARA A API
    const body = new URLSearchParams();
        body.append('grant_type', 'password');
        body.append('client_id', client_id);
        body.append('client_secret', client_secret);
        body.append('scope', scope);
        body.append('userName', email);
        body.append('password', senha);
    //DEFINE AS CONFIGURAÇÕES E OS PARÂMETROS QUE SERÃO PASSADOS PARA A API
    const config = {method: 'post', body, headers};

    //PASSA OS PARÂMETROS PARA A API
    fetch(apiUrl, config)
        //RECUPERA UM JSON DA RESPOSTA DA API
        .then(res => res.json())
        //FUNÇÃO QUE TRATA A RESPOSTA DA API
        .then(function(res){
            //CASO O USUÁRIO NÃO PREENCHA TODOS OS CAMPOS E TENTE AUTENTICAR
            if (res.error == "invalid_request") {
                verificaLogin.style.display = "block";
            }
            //CASO O USUÁRIO PREENCHA OS CAMPOS COM VALORES INVÁLIDOS E TENTE AUTENTICAR
            else if(res.error == "invalid_grant"){
                verificaLogin.style.display = "block";
            }
            //CASO NENHUMA DAS DUAS SITUAÇÕES ANTERIORES ACONTEÇA E ELE TENTE AUTENTICAR (CASO O USUÁRIO PREENCHA TODOS OS CAMPOS COM VALORES VÁLIDOS E TENTE AUTENTICAR)
            else{
                verificaLogin.style.display = "none";
                divLogin.style.display = "none";
                divCV.style.display = "block";
                log.innerHTML = "Sair";
                log.classList.remove('active');
            }
        })
});


//FUNÇÃO QUE CONVERTE O CAMPO DA SENHA PARA TIPO TEXTO E VICE-VERSA
btnVisibilidadeSenha.addEventListener("click", function() {
    //CASO O CAMPO DE SENHA ESTEJA PROTEGIDO
    if (tipo.type =="password") {
        //DESPROTEGE O CAMPO DE SENHA
        tipo.type = "text";
        //MUDA A IMAGEM DO btnVisibilidadeSenha E A ESTILIZA
        btnVisibilidadeSenha.src = "imagens/showPassword.png";
        btnVisibilidadeSenha.style.width = "54px";
        btnVisibilidadeSenha.style.height = "65px";
        btnVisibilidadeSenha.style.marginTop = "1.17%";
        btnVisibilidadeSenha.style.marginLeft = "24.6%";
    }
    //CASO O CAMPO DE SENHA ESTEJA DESPROTEGIDO
    else{
        //PROTEGE O CAMPO DE SENHA
        tipo.type = "password";
        //MUDA A IMAGEM DO btnVisibilidadeSenha E A ESTILIZA
        btnVisibilidadeSenha.src = "imagens/defaultPassword.png";
        btnVisibilidadeSenha.style.width = "40px";
        btnVisibilidadeSenha.style.height = "34px";
        btnVisibilidadeSenha.style.marginTop = "2%";
        btnVisibilidadeSenha.style.marginLeft = "25%";
    }
});
