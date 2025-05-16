# Bem vindo ao backend do EPIA

## Iniciando
Siga os passos abaixo para rodar o projeto em sua máquina.

### Lista de dependências
- BunJs
- Docker
- MongoDb e suas dependências.

### Inicializando o Docker
Para rodar o projeto, certifique-se de ter o docker rodando no seu pc.
Certifique-se de ter as envs necessárias: 
- /.env
- /docker/.env

Navegue até a pasta docker e rode o comando:
```bash
docker compose up -d
```
Com esse comando, o docker vai rodar a imagem do mongoDB, permitindo o funcionamento da API.

### Inicializando a API
Para rodar a api do projeto basta usar o comando:
```bash
bun run dev
```
A API vai rodar no http://localhost:3000/
