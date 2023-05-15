---
timestamp: 2023-05-14T22:41:29-3:00
title: Socorro, meu endpoint GraphQL só retorna 200
id: 20230514224129
tags:
    - graphql
---
Um mal entendido bastante comum quando trabalhamos com GraphQL é se incomodar com o fato de o endpoint retornar 200 praticamente em qualquer cenário, diferente do padrão REST que utiliza códigos específicos para diveras anormalidades.

<!--more-->

Exemplo, considere a seguinte query:

~~~graphql
query {
    customerGet(id: 1234) {
        id
        name
        status
    }
}
~~~

O equivalente REST seria algo como GET /api/customer/1234 que retornaria um 404 caso não existisse um customer com este identificador, enquanto um endpoint graphql retornará 200 o recurso existindo ou não.

Para entender isso, vamos recorrer à [spec do GraphQL de outubro/2021](https://spec.graphql.org/October2021/) que é a mais recente enquanto redijo este post.

Uma simples busca por "http" ou "transport" não retornará nada, e o motivo disso é muito simples: GraphQL não depende de HTTP, falando em linhas gerais o GraphQL é agnostico em relação ao transporte, onde ainda que o HTTP tenha se tornado um padrão de facto para transporte, ele não é e nunca foi mandatório.

Agora que estabelecemos que um protocolo não depende formalmente do outro, podemos naturalmente concluir que não devemos dar grande atenção aos verbos e status codes HTTP por que, convenhamos, o HTTP poderia nem sequer estar ali.

Voltando à spec, na [sessão 7.1.2](https://spec.graphql.org/October2021/#sec-Errors) temos a forma correta de retornar erros em uma API GraphQL que é através de um campo "errors" no response. Por exemplo, considere a seguinte query:

~~~graphql
{
  hero(episode: $episode) {
    name
    heroFriends: friends {
      id
      name
    }
  }
}
~~~

Hipoteticamente ela poderia retornar um erro desta forma:
~~~json
{
  "errors": [
    {
      "message": "Name for character with ID 1002 could not be fetched.",
      "locations": [{ "line": 6, "column": 7 }],
      "path": ["hero", "heroFriends", 1, "name"]
    }
  ],
  "data": {
    "hero": {
      "name": "R2-D2",
      "heroFriends": [
        {
          "id": "1000",
          "name": "Luke Skywalker"
        },
        {
          "id": "1002",
          "name": null
        },
        {
          "id": "1003",
          "name": "Leia Organa"
        }
      ]
    }
  }
}
~~~

(sim, é possível retornar um response parcial acompanhado de erros em um ou mais campos)

