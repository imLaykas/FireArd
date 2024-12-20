# Projeto FireArd


## Descrição
Esse site, foi criado para agir em conjunto com um arduíno para monitorar temperaturas altas, gases tóxicos e fumaça.
Também, é possivel utiliza-lo sem o arduíno, mas sem o monitoramento real. Neste site, temos o crud completo de usuário
e feedback. Sendo possível navegar entre páginas de Informações, Monitoramento, Contato, Sobre nós.

# Tecnologias
Esse site foi construído com as seguintes tecnologias:
- HTML
- CSS
- JavaScript
- JQuery
- NodeJS
- MySQL

## Pré-requisitos

Softwares que são essencias para rodar o projeto.

- [Node.js](https://nodejs.org/) (certifique-se de instalar a versão LTS)
- [Laragon](https://github.com/leokhoa/laragon/releases/download/6.0.0/laragon-wamp.exe).

## Executar o projeto

### 1. Baixar o Repositório

Você pode escolher entre **clonar o repositório** ou **baixá-lo como um arquivo ZIP**.

#### Opção 1: Clonar o repositório

Clone o repositório do GitHub para a sua máquina com o comando:

git clone https://github.com/imLaykas/FireArd.git

Depois que o repositório estiver baixado, entre na pasta que foi clonada:

```
  cd fireard
```


#### Opção 2: Baixar via ZIP
Acesse o repositório no GitHub.
Clique no botão `Code` (localizado na parte superior direita).
Clique em `Download zip`.
Extraia o conteúdo do arquivo ZIP em um diretório de sua escolha.

Depois é só extrair o zip e navegar pela linha de comando até a pasta que você baixou


```
  cd fireard
```

## Instalação

Dentro da pasta, faça a instalação das dependências do projeto:

```
  npm install
```
## Rodar o projeto

- Baixe o banco de dados `att-bd-fireard.sql`.
- Em seguida clique no `Laragon` e aperte em `Iniciar Tudo`. Logo em seguida, aperte `Banco de Dados`.
- Vai abrir uma janela e você só precisa apertar em `Abrir`.
- No canto superior esquerdo, clica em `Arquivo` e aperta em `Carregar arquivo SQL`, selecione o banco de dados `att-bd-fireard.sql`.
- Aperte na tecla `F9`.

### Após isso, retorne ao cmd local ou da IDE

Rode o seguinte comando
```
  node app.js
```
No navegador, coloque assim:
```
  localhost:3050 
```
Pronto.