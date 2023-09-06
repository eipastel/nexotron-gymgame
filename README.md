# Gym Game

## Descrição do Projeto

Este projeto é um aplicativo gameficado de tarefas/desafios focado em exercício físico/academia. O objetivo é ajudar os usuários a superarem a procrastinação, incentivando-os a atingir seus objetivos de maneira divertida e engajante.

## Funcionalidades

1. **Registro de Usuários**: Permite que os usuários criem suas contas, fornecendo informações básicas como nome, username, email e senha.
2. **Autenticação de Usuários**: Facilita o login seguro dos usuários através da verificação de credenciais.
3. **Gestão de Tarefas**: Permite aos usuários criar, visualizar e deletar suas próprias tarefas e desafios.
4. **Sistema de Autorização**: Garante que as operações nas tarefas sejam realizadas apenas pelos usuários que as criaram, através da utilização de tokens JWT.

## Tecnologias Utilizadas

### Back-end
- Node.js
- Express.js
- MySQL (com mysql2)
- JWT para autenticação
- bcrypt para hash de senha

### Front-end
- HTML
- CSS
- Bootstrap
- JavaScript

## Instalação e Configuração

1. Clone o repositório para o seu sistema local:
git clone https://github.com/eipastel/nexotron/gymgame

2. Navegue até o diretório do projeto:
cd gymgame

3. Instale as dependências necessárias com npm:
npm install

4. Configure o arquivo `.env` com as suas credenciais de banco de dados e chave JWT (Veja o arquivo `.env.example` para um exemplo).

5. Execute o servidor:
npm start

6. O aplicativo agora deve estar rodando em [http://localhost:3000](http://localhost:3000).

## Contribuição

Por enquanto, este projeto não é de código aberto. Por favor, fique atento para futuras atualizações.

## Licença

Este projeto não está licenciado no momento.