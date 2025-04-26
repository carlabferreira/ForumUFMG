# Instruções de Instalação

1. Clone o repositório
2. Entre na pasta /server (`cd server`)
3. Crie um arquivo *.env* na pasta server e insira as informações abaixo:
   <br>
   `db_user="root"`<br>
   `db_pass="senha"`<br>
   `db_schema="banco"`<br>
   *Obs:*  mude apenas o que está entre parênteses, conforme seus dados no MySQL
5. Instale as dependências (`yarn install`)
6. Inicie a aplicação (`yarn start` ou `npm rum devStart`)


# Intruções para testar somente o backend (sem o front conectado)
1. Baixe o aplicativo Postman em https://www.postman.com/downloads/
2. Execute e abra o aplicativo
3. Clique no '+' para criar uma nova coleção e em 'Blank collection'
   
  <p align="center">
    <img src="https://github.com/user-attachments/assets/0d0c5c97-06ec-4e9e-b4c0-ebdaf07a6cd8">
  </p>

4. Dê um nome para a coleção criada (exemplo: ES-Forum)

  <p align="center">
    <img src="https://github.com/user-attachments/assets/20c8df16-6398-497d-ba99-9fdf0a6958ab">
  </p>
 
5. Na coleção criada, clique em '...' e em 'Add request'

  <p align="center">
    <img src="https://github.com/user-attachments/assets/a6d2e4bd-5b58-4aad-8e89-691852330e5e">
  </p>

6. Crie uma requisição para cada método do backend, conforme mostrado nos itens abaixo

7. Cadastro:

  <p align="center">
    <img src="https://github.com/user-attachments/assets/90270d42-0f62-4d8c-b03d-8a66a4c8f107" width=80%>
  </p>
  <p align="center">Obs: os tipos suportados são apenas: 'Aluno', 'Professor' e 'Técnico-Administrativo'</p>
  
8. Login:

  <p align="center">
    <img src="https://github.com/user-attachments/assets/bbb11810-cfc5-4e40-9972-a40ddd237de4" width=80%>
  </p>   

9. Logout:

  <p align="center">
    <img src="https://github.com/user-attachments/assets/001a8a54-7d2c-4990-9cd4-bf0676e48d6f" width=80%>
  </p>   

10. Consultar tópicos:

  <p align="center">
    <img src="https://github.com/user-attachments/assets/4c08a9dc-a5d2-42b9-9ca8-2cac8b061db3" width=80%>
  </p>
  
11. Adicionar tópico:

  <p align="center">
    <img src="https://github.com/user-attachments/assets/4338a11a-de27-48b7-a3e4-640836efb5d2" width=80%>
  </p>
  <p align="center">Obs: para criar um tópico, o usuário deve estar logado e as tags inseridas já devem estar no banco de dados</p>

12. Deletar tópico:

  <p align="center">
    <img src="https://github.com/user-attachments/assets/71d8d48d-d4de-4cf1-815d-d386286a4edc" width=80%>
  </p>
  <p align="center">Obs: o usuário pode apenas deletar os tópicos criados por ele mesmo</p>
