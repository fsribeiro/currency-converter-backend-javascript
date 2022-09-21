# **TESTE-GRUPOSBF**

## **Descrição**

Conversor de moeda

## **Pré-requisitos**

- NodeJS > 14.17.0
- Docker
- Docker-compose

## **Instalação**

Acesse o caminho app/currency-converter e execute o npm install

```js
npm i;
```

## **Configurando o projeto**

### **Configure o .env**

Na raiz do projeto, crie o arquivo .env conforme o arquivo .env.default

### **Rodando a aplicaçã com o docker**

- Caso seja necessário, dê permissão de execução para os arquivos .sh
- Para o docker, suba o compose

```
# docker aplicação de banco mongodb
docker-compose up
```
## **Testes**

Este projeto está configurado com cobertura de testes que devem respeitar os seguintes critérios:

- 100% das funções
- 80% das linhas (desejado 100%)
- 80% dos statements (desejado 100%)
- 80% dos branchs (desejado 100%)

Para executar os testes:

```
# run tests
- Acesse o caminha app/currency-converter
npm run test

```

## **Conexão com o banco local do docker**

```
- localhost:27017
- Nome do banco = teste
- Nome do usuário = teste
- Senha do banco = teste
- O banco é populado na coleção products com dois registros por padrão
```

## **Exemplo de requisição**

```
curl -X 'GET' \
  'http://localhost:3000/products/632b3eee78df41b229cef41f' \
  -H 'accept: */*'

```
