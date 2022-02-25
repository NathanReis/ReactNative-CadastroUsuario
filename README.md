# React Native - Cadastro de Usuário

Um app de cadastro de usuário.

Permite você salvar código, nome, e-mail, e senha no próprio dispositivo.

Foram aplicadas algumas validações:

- Código maior que 0 (zero);
- Nome obrigatório;
- E-mail obrigatório;
- E-mail no formato correto;
- Senha obrigatória;
- Senha com no mínimo 5 caracteres;
- Senha com no mínimo 1 (uma) letra maiúscula;
- Senha com no mínimo 1 número;
- Comfirmação de senha.

Caso você não queira saber de instalar Node, Yarn, Expo e tudo mais que é
preciso, siga as instruções de como executar [via Docker](#usando-docker).

![Amostras](https://user-images.githubusercontent.com/53984490/155630903-4bc26f34-cadb-4210-9a67-fe8192edf7af.png)

# Usando Docker

## Construindo a imagem

```bash
docker build -t expo .
```
Esta imagem é baseada no Node 16, versão LTS mais recente do momento, com o SO
Alpine para ser o mais leve possível.

## Executando o container

```bash
docker run --rm -d --name cadastro_usuario -v $(pwd):/app -p 19000:19000 expo sh ./start.sh
```

## Acessando o app

Primeiro descubra o IP da sua máquina, após isso mande o seguinte conteúdo para
o clipboard do dispositivo:

```txt
exp://<seu-ip>:19000
```

> Lembre-se que deve substituir `<seu-ip>` pelo IP de sua máquina.

Agora basta acessar o app do Expo que irá ver a opção `Open from clipboard`,
ou algo do tipo.
