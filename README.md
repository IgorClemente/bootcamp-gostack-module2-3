<h1 align="center">
    <img alt="GoStack" src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/bootcamp-header.png" width="200px" />
</h1>

<h3 align="center">
  Módulo 2-3: Aplicação GoBarber - API NodeJS
</h3>

<p align="center">“Não espere para plantar, apenas tenha paciência para colher”!</blockquote>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/IgorClemente/bootcamp-gostack-module2-3?color=%2304D361">

  <a href="https://rocketseat.com.br">
    <img alt="Made by Igor Clemente" src="https://img.shields.io/badge/made%20by-Igor Clemente-%2304D361">
  </a>

  <img alt="Issues" src="https://img.shields.io/github/issues/IgorClemente/bootcamp-gostack-module2-3">

  <img alt="Forks" src="https://img.shields.io/github/forks/IgorClemente/bootcamp-gostack-module2-3">

  <a href="https://github.com/IgorClemente/bootcamp-gostack-module2-3/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/IgorClemente/bootcamp-gostack-module2-3">
  </a>

  <img alt="License" src="https://img.shields.io/github/license/IgorClemente/bootcamp-gostack-module2-3">
</p>

<p align="center">
  <a href="#rocket-objetivo">Sobre o desafio</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#starter-iniciando-aplicação">Iniciando aplicação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## :rocket: Objetivo

Aplicação Backend desenvolvida no modelo RestFul - Epara rodar no servidor NodeJS [Express](https://expressjs.com/pt-br/).

### Rotas

- `POST /users`: Rota responsável por criar o usuário dentro da plataforma, utilize os seguintes parâmetros: `name` : Nome Completo, `email` : E-mail no formato `example@example.com`, `password` : Senha com 6 digítos, alfanumérica, `provider` : `true` ou `false` indicando se o usuário criado é provedor de serviço ou não. `Exemplo`:

```js
{
	"name" : "Nome Completo",
	"email" : "teste@teste.com",
	"password" : "123456",
	"provider": true
}
```

- `POST /sessions`: Rota responsável por criar a sessão de um usuário já cadastrado e obter o token de sessão. Utilize os seguintes parâmetros: `name` : Nome Completo, `email` : E-mail no formato `example@example.com`, `password` : Senha com 6 digítos, alfanumérica. `Exemplo`:

```js
{
	"name" : "Nome Completo",
	"email" : "teste@teste.com",
	"password" : "123456"
}
```

- `PUT /users`: Rota responsável por atualizar o perfil de um usuário dentro da plataforma. Utilize os seguintes parâmetros: `name` : Nome Completo, `email` : E-mail no formato `example@example.com`, `password` : Senha com 6 digítos, alfanumérica, `oldPassword` : Senha com 6 digítos, alfanumérica, `confirmPassword` : Senha com 6 digítos, alfanumérica. `Exemplo`:

```js
{
	"name" : "Nome Completo",
	"email" : "teste@teste.com",
	"oldPassword" : "123456",
	"password" : "123456",
	"confirmPassword" : "123456"
}
```

- `POST /files`: Rota responsável por realizar o envio de imagens via multpart-form. Utilize o seguinte parâmetro no multpart: `file` : Data do arquivo de imagem.

- `GET /appointments`: Rota responsável por listar todos os agendamentos para o usuário com um token de sessão válido.

- `POST /appointments`: Rota responsável por criar agendamentos dentro da plataforma.

- `DELETE /appointments/:id`: Rota responsável por cancelar o usuário dentro da plataforma;

- `POST /providers`: Rota responsável por listar todos os provedores de serviços;

- `GET /providers/:providerId/available`: Rota responsável por listar toda a agenda de uma determinado provedor, através do ID identificador;

- `GET /schedules`: A rota deve deletar o projeto com o `id` presente nos parâmetros da rota;

- `GET /notifications`: A rota deve deletar o projeto com o `id` presente nos parâmetros da rota;

- `PUT /notifications/:id`: A rota deve deletar o projeto com o `id` presente nos parâmetros da rota;

### :starter: Iniciando aplicação

Se eu chamar a rota `POST /projects` repassando `{ id: 1, title: 'Novo projeto' }` e a rota `POST /projects/1/tasks` com `{ title: 'Nova tarefa' }`, meu array de projetos deve ficar assim:

```js
[
  {
    id: '1',
    title: 'Novo projeto',
    tasks: ['Nova tarefa']
  }
];
```

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Projeto desenvolvido by Igor Clemente :wave:
