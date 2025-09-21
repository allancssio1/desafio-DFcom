# Projeto DFCOM - Aplicação Completa (Full-Stack)

Este repositório contém o código-fonte para a aplicação completa da DFCOM, dividida em um back-end e um front-end.

## Estrutura do Projeto

- `back-end-dfcom/`: Contém a API RESTful construída com NestJS.
- `front-end-dfcom/`: Contém a aplicação de interface do usuário.
- `docker-compose.yml`: Arquivo para orquestrar os contêineres do back-end, front-end e banco de dados.

## Tecnologias Utilizadas

### Back-end

- **Framework**: NestJS - Um framework Node.js progressivo para construir aplicações do lado do servidor eficientes e escaláveis.
- **Linguagem**: TypeScript - Um superconjunto de JavaScript que adiciona tipagem estática.
- **Banco de Dados**: MongoDB - Um banco de dados NoSQL orientado a documentos.
- **ODM**: Mongoose - Uma biblioteca de modelagem de dados de objetos (ODM) para MongoDB e Node.js.
- **Validação**: `class-validator` e `class-transformer` para validação de DTOs.
- **Containerização**: Docker

### Front-end

> **Nota:** As informações detalhadas sobre o front-end não foram fornecidas. Esta seção deve ser preenchida com as tecnologias e comandos correspondentes.
>
> - **Framework/Biblioteca**: (Ex: React, Angular, Vue.js)
> - **Linguagem**: (Ex: TypeScript, JavaScript)
> - **Estilização**: (Ex: CSS Modules, Styled-components, Tailwind CSS)
> - **Containerização**: Docker

## Como Executar o Projeto

Existem duas maneiras principais de executar a aplicação: usando Docker Compose (recomendado para um ambiente de produção simulado) ou executando cada serviço individualmente (ideal para desenvolvimento).

### 1. Usando Docker Compose (Recomendado)

Este método irá construir e executar os contêineres para o back-end, front-end e o banco de dados MongoDB.

1.  **Pré-requisitos**:

    - Docker
    - Docker Compose

2.  **Execução**:
    Na raiz do projeto (onde o arquivo `docker-compose.yml` está localizado), execute o seguinte comando:

    ```bash
    docker-compose up --build
    ```

    A aplicação estará acessível em `http://localhost:3001` e a API em `http://localhost:3000`. Verifique as portas no arquivo `docker-compose.yml` para confirmar.

### 2. Executando os Serviços Individualmente

#### Back-end

1.  Navegue até o diretório do back-end:

    ```bash
    cd back-end-dfcom
    ```

2.  Instale as dependências:

    ```bash
    npm install
    ```

3.  Crie um arquivo `.env` na raiz do `back-end-dfcom` com a URL de conexão do MongoDB:

    ```env
    # Exemplo para um MongoDB rodando localmente ou via Docker
    DATABASE_URL=mongodb://localhost:27017/dfcom
    ```

4.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run start:dev
    ```
    A API estará disponível em `http://localhost:3000`.

#### Front-end

> **Nota:** Os comandos abaixo são um exemplo. Adapte-os conforme a configuração real do seu projeto front-end.

1.  Navegue até o diretório do front-end:

    ```bash
    cd front-end-dfcom
    ```

2.  Instale as dependências:

    ```bash
    npm install
    ```

3.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run start # ou o comando equivalente do seu projeto
    ```
    A aplicação estará disponível em `http://localhost:<PORTA_CONFIGURADA>`.
