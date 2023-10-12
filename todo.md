[x] - autenticar um usuario de modo mais seguro
[] - ver os dados gerais do sistema pelo meu usuario em uma tela separada
[] - criar a tela que vai mostrar os dados (admin)
[] - colocar a requisição de login dentro do service
[] - melhorar a mensagem acima dos nomes
[x] - mostrar um modal quando der erro nas requisições
[x] - esconder botão de confirmar presença quando entrar sem um id ou com id inválido
http://localhost:3001/?id=64e7e057aa7b71b86409f421

```TS
interface Schema {
  id: string
  companions: {
    confirmation: boolean,
    name: string
  }[],
  confirmation: boolean,
  name: string,
  cellphone: string,
}
```
