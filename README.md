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
  <a href="#rocket-descrição">Objetivo</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#hammer-iniciando-a-aplicação">Iniciando aplicação</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

## :rocket: Descrição

Aplicação Backend desenvolvida no modelo RestFul para Barbearias, o cliente através do aplicativo Mobile busca um horário disponível na agenda do prestador de serviços, no caso, o Barbeiro. O Barbeiro tem acesso a sua agenda através da interface WEB, onde ele visualiza quem ele vai atender em determinado horário - Essa aplicação executa no servidor [NodeJS](https://nodejs.org/en/).

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

- `GET /appointments`: Rota responsável por listar todos os agendamentos para o usuário utilizando um token de sessão válido. O resultado pode ser páginado, passando o parâmetro de query string: `page` : Número da página, começando em 1.

- `POST /appointments`: Rota responsável por criar agendamentos dentro da plataforma. Utilize os seguintes parâmetros: `provider_id` : ID identificador do provedor de serviços, `date` : Data válida para marcar o agendamento. `Exemplo`:

```js
{
	"provider_id" : 3,
	"date" : "2020-02-28T10:00:00"
}
```

- `DELETE /appointments/:id`: Rota responsável por cancelar o usuário dentro da plataforma. Utilize o parâmetro: `id` : ID identificador do agendamento que você deseja cancelar.

- `POST /providers`: Rota responsável por listar todos os provedores de serviços.

- `GET /providers/:providerId/available`: Rota responsável por listar toda a agenda de um determinado provedor, através do ID identificador. Utilize o parâmetro: `providerId` : ID identificador do provedor de serviço.

- `GET /schedules`: Rota responsável por listar todos os horários disponíveis por data. Utilize o parâmetro de query string: `date` : Data da pesquisa. `Exemplo`:

`http://localhost/schedules?date=2019-11-01T00%3A00-03%3A00`

- `GET /notifications`: Rota responsável por listar todas as notificações disponíveis.

- `PUT /notifications/:id`: Rota responsável por marcar uma notificação como lida. Utilize o seguinte parâmetro: `id` : ID identificador da notificação.

## :hammer: Iniciando a aplicação

Para executar a aplicação em ambiente de `DESENVOLVIMENTO` ou `PRODUÇÃO`, primeiro crie um arquivo na raiz do projeto chamado `.env` para fazer a configuração de todas as váriaveis de ambiente. Copie todo o conteúdo do arquivo `.env_example`, Dentro do novo arquivo, altere cada variável de acordo com seu ambiente. E de não esqueça de alterar a váriavel: `NODE_ENV`, `development` ou `production`.

Após alterar as variáveis de ambiente, execute o seguinte comando na raíz do projeto:

```bash
  yarn
```

Se você estiver utilizando o `yarn`.

ou

```bash
  npm install
```

Se você estiver utilizando o `npm`.

Agora, vamos dar um `start` na aplicação, execute o seguinte comando:

```bash
  yarn dev
```

A aplicação principal está funcionando, agora você precisa iniciar a `queue` que realiza o envio de e-mails. Execute esse comando:

```bash
  yarn queue
```

`EXEMPLO DA APLICAÇÃO RODANDO EM PRODUÇÃO` : http://138.197.65.2

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Projeto desenvolvido by Igor Clemente :wave:
