# server

## Project Title:
**Legal Advice**

## Description :
Website about legal advice with many lawyer that have more experience and the user you can ask the lawyer about any question about law

## User Stories:

- **Signup:**  I can sign up to website to complete register information 
- **Login:**  I can login to website so that I can select what I want from this website 
- **Add Case** As a user I can add case and select lawyer
- **Edit case** As a user I can edit any case from my profile 
- **Ask lawyer** As a user I can ask about any case 
- **show case** As a user I can the most important case without ask lawyer

### Admin Stories:
- **Add User** As a Admin I can add new user and give permation 
- **Add lawyer** As a Admin I can add new lawyer give permation  
- **show  all case** As a Admin I can show all case

### Lawyer Stories: 
- **Signup:**  I can sign up to website to complete register information 
- **Login:**  I can login to website so that I can select what I want from this website 
- **show case** As a lawyer I can show all information that user ask about us 

## Models:

* Role modele

| key        | type            | options          | default value |
| ---------- | --------------- | ---------------- | ------------- |
| role       | String          | required, unique | n/a           |


* Uesrs Model

| key        | type            | options          | default value |
| ---------- | --------------- | ---------------- | ------------- |
| name       | String          | required, unique | n/a           |
| email      | String          | required, unique | n/a           |
| password   | String          | required         | n/a           |
| roles      | Schema <roles>  | required         | n/a           |
| isDelete   | Boolean         | n/a              | false         |
| Filed of Expertise| String   | required         | n/a           |
| States     | String          | n/a              | Pending       |

* Cases model 

| key        | type            | options          | default value |
| ---------- | --------------- | ---------------- | ------------- |
| title      | String          | required         | n/a           |
| description| String          | required         | n/a           |
| state      | String          | required         |pending        |


* Tab model 

| key        | type            | options          | default value |
| ---------- | --------------- | ---------------- | ------------- |
| title      | String          | required         | n/a           |
| description| String          | required         | n/a           |
| image      | String          | required         | n/a           |


## Routes:
|Method         |Path           |Request                        |Success status| Error status|
| ------------- | ------------- |-------------------------------|--------------|-------------|
| POST          | /singup       | {name,email,password,role}    | 201          | 404         |
| POST          | /auth/login   | {email,password}              | 201          | 404         | 
| POST          | /auth/logout  | (empty)                       | 204          | 400         |         
| POST          | /createrole   | {role,permissions}            |
| GET           | /showuser     |                               |
| DELETE        | /auth/deluse/:id|                             |
| POST          | /auth/addcase | {title,descraption,state}     |
| GET           | /auth/showcase|                               |
| PUT           | /auth/updatcase|                              | 
| DELETE        | /auth/delcase/:id|                            |
| POST          | /auth/adddetils|{title,descraption,img,comment}|
| GET           | /auth/showdetils|                             |
| PUT           | /auth/updatedetils/:id|                       |
| DELETE        | /auth/deldetils/:id|                          |

![UML Diagram](https://github.com/MP-Project-Mohammed-Ali/server/blob/main/diagram/UML%20Diagram%20(1).png)

![ER Diagram](https://github.com/MP-Project-Mohammed-Ali/server/blob/main/diagram/ER%20Diagram.png)


## Links:
## Trello link 

[Trello website](https://trello.com/b/wgen9s3X/mp-project-mohammed-ali)

## Cline repositories
[cline repositories](https://github.com/MP-Project-Mohammed-Ali/client)


