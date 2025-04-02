# AppWeb

Este projeto é uma aplicação cliente SPA (Single Page Application) desenvolvida com Angular e Bootstrap 4, que consome uma API REST denominada `app-api` (https://github.com/williammian/app-api). A autenticação é realizada utilizando JWT (JSON Web Token).

## Funcionalidades Principais

- **Interface Responsiva**: Utilização do Bootstrap 4 para garantir uma experiência consistente em diferentes dispositivos.
- **Autenticação JWT**: Implementação de autenticação segura utilizando tokens JWT.
- **Consumo de API REST**: Integração com a API `app-api` para operações de CRUD e outras funcionalidades.

## Tecnologias Utilizadas

- **Angular**: Framework principal para o desenvolvimento da aplicação SPA.
- **Bootstrap 4**: Biblioteca para estilização e componentes responsivos.
- **JWT (JSON Web Token)**: Mecanismo de autenticação e autorização.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

- **src/**: Contém o código-fonte principal da aplicação.
- **others/**: Outros arquivos e recursos utilizados no projeto.
- **Dockerfile**: Arquivo para criação da imagem Docker da aplicação.
- **docker-compose.yml**: Arquivo de configuração para orquestração de contêineres Docker.

## Pré-requisitos

Antes de executar o projeto, certifique-se de que os seguintes requisitos estão atendidos:

- **Node.js**: Ambiente de execução JavaScript necessário para o Angular.
- **Angular CLI**: Ferramenta de linha de comando para gerenciamento de projetos Angular.
- **API `app-api`**: A API deve estar em execução e acessível para que o cliente funcione corretamente.

## Como Executar o Projeto

1. **Instalar as Dependências**:
   ```bash
   npm install
   ```

2. **Executar o Servidor de Desenvolvimento**:
   ```bash
   ng serve
   ```
   A aplicação estará disponível em `http://localhost:4200/`.

## Docker

Para executar a aplicação utilizando Docker:

1. **Construir a Imagem Docker**:
   ```bash
   docker build -t app-web .
   ```

2. **Executar o Contêiner**:
   ```bash
   docker run -p 4200:80 app-web
   ```
   A aplicação estará disponível em `http://localhost:4200/`.

## Licença

Este projeto está licenciado sob a licença MIT.

