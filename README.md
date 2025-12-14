# Backend – Sistema de Biblioteca

Este projeto é um backend responsável pelo gerenciamento de **Autores** e **Livros**, expondo uma API REST para operações de CRUD.
O banco de dados é executado via **Docker Compose** utilizando **MySQL**.

---

## Tecnologias Utilizadas

- JavaScript
- Node.js
- Express
- MySQL
- Docker
- Docker Compose

---

## Configuração do Banco de Dados

### 1. Subir o banco com Docker Compose

Certifique-se de ter **Docker** e **Docker Compose** instalados.

Na raiz do projeto, execute:

```bash
docker-compose up -d
```

Isso irá subir o container do MySQL conforme definido no arquivo `docker-compose.yml`.

---

### 2. Acessar o banco de dados

Após o container estar rodando, acesse o MySQL:

```bash
docker exec -it mysql-db mysql -u root -p
```

Digite a senha configurada no `docker-compose.yml`.

---

### 3. Criar o banco de dados

Execute os comandos abaixo no MySQL:

```sql
CREATE DATABASE IF NOT EXISTS biblioteca_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE biblioteca_db;
```

---

### 4. Criar as tabelas

#### Tabela de Autores (Obrigatória)

```sql
CREATE TABLE authors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  nationality VARCHAR(100),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

#### Tabela de Livros (Obrigatória)

```sql
CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  year INT,
  category VARCHAR(100),
  author_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_books_author
    FOREIGN KEY (author_id)
    REFERENCES authors(id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## Como Rodar o Backend

### 1. Instalar dependências

```bash
npm install
```

---

### 2. Iniciar o servidor

```bash
npm run dev
```

---

### 3. Backend em execução

O backend ficará disponível em `http://localhost:3000`

---

## Rotas Principais da API

### Autores

- `GET /authors` – Listar autores
- `GET /authors/:id` – Pegar um autor
- `POST /authors` – Criar autor
- `PUT /authors/:id` – Atualizar autor
- `DELETE /authors/:id` – Excluir autor

### Livros

- `GET /books` – Listar livros
- `GET /books/:id` – Pegar um livro
- `POST /books` – Criar livro
- `PUT /books/:id` – Atualizar livro
- `DELETE /books/:id` – Excluir livro

---

## Observações Importantes

- O container do banco deve estar rodando antes de iniciar o backend
- As tabelas devem ser criadas manualmente usando os comandos SQL acima
- Todas as respostas da API utilizam JSON

---

## Autor

Projeto desenvolvido por Douglas Phelipe para fins acadêmicos.
