
# SanaZoo API



## Indices

* [Affluence](#affluence)

  * [Daily](#1-daily)
  * [Daily by enclosure](#2-daily-by-enclosure)
  * [Live enclosure affluence](#3-live-enclosure-affluence)
  * [Monthly](#4-monthly)
  * [Monthly by enclosure](#5-monthly-by-enclosure)
  * [Total](#6-total)
  * [Total by enclosure](#7-total-by-enclosure)
  * [Weekly](#8-weekly)
  * [Weekly by enclosure](#9-weekly-by-enclosure)
  * [Yearly](#10-yearly)
  * [Yearly by enclosure](#11-yearly-by-enclosure)

* [Animal](#animal)

  * [Create](#1-create)
  * [Delete](#2-delete)
  * [Get all](#3-get-all)
  * [Get by id](#4-get-by-id)
  * [Update](#5-update)
  * [[to fix]Move Enclosure](#6-[to-fix]move-enclosure)

* [Animal Health Book](#animal-health-book)

  * [Create entry](#1-create-entry)
  * [Delete](#2-delete-1)
  * [Get All](#3-get-all-1)
  * [Get One](#4-get-one)
  * [Update](#5-update-1)
  * [[to fix] Get All By Animal](#6-[to-fix]-get-all-by-animal)

* [Enclosure](#enclosure)

  * [Get All Animals In An Enclosure](#1-get-all-animals-in-an-enclosure)

* [Entry](#entry)

  * [Add entry](#1-add-entry)
  * [Get all](#2-get-all)
  * [Get by enclosure](#3-get-by-enclosure)
  * [Get by pass](#4-get-by-pass)
  * [Get by user](#5-get-by-user)
  * [Remove entry](#6-remove-entry)

* [Pass](#pass)

  * [Add enclosure access](#1-add-enclosure-access)
  * [Create](#2-create)
  * [Delete pass](#3-delete-pass)
  * [Get all](#4-get-all)
  * [Get all by user id](#5-get-all-by-user-id)
  * [Get by id](#6-get-by-id)
  * [Remove enclosure access](#7-remove-enclosure-access)
  * [Update pass](#8-update-pass)

* [Pass Night](#pass-night)

  * [Add availability](#1-add-availability)
  * [Delete passnight](#2-delete-passnight)
  * [Get all](#3-get-all-2)
  * [Get all valid](#4-get-all-valid)
  * [Update  passnight](#5-update--passnight)

* [Pass Type](#pass-type)

  * [Add pass to pass type](#1-add-pass-to-pass-type)
  * [Create](#2-create-1)
  * [Delete](#3-delete)
  * [Get all](#4-get-all-1)
  * [Get by id](#5-get-by-id)
  * [Update](#6-update)

* [Specie](#specie)

  * [Create](#1-create-1)
  * [Delete](#2-delete-2)
  * [Get All](#3-get-all-3)
  * [Get By Id](#4-get-by-id-1)
  * [Update](#5-update-2)

* [Statistics](#statistics)

  * [Count all pass](#1-count-all-pass)
  * [Count all pass by types](#2-count-all-pass-by-types)
  * [Count animal](#3-count-animal)
  * [Count animal by enclosure](#4-count-animal-by-enclosure)
  * [Count enclosure](#5-count-enclosure)
  * [Count expired pass](#6-count-expired-pass)
  * [Count user](#7-count-user)
  * [Count valid pass](#8-count-valid-pass)
  * [Count valid pass by types](#9-count-valid-pass-by-types)

* [User](#user)

  * [Change Password](#1-change-password)
  * [Create](#2-create-2)
  * [Delete](#3-delete-1)
  * [Force Delete](#4-force-delete)
  * [Get By Id](#5-get-by-id-1)
  * [Login](#6-login)
  * [Logout](#7-logout)
  * [ME](#8-me)
  * [Register](#9-register)
  * [Restaure User](#10-restaure-user)
  * [[to fix] Get All](#11-[to-fix]-get-all)
  * [[to fix] Update by admin](#12-[to-fix]-update-by-admin)
  * [[to fix] Update client only by employee](#13-[to-fix]-update-client-only-by-employee)

* [User Role](#user-role)

  * [Create](#1-create-2)
  * [Delete](#2-delete-3)
  * [Get All](#3-get-all-4)
  * [Get by Id](#4-get-by-id-2)
  * [Update](#5-update-3)
  * [affect User](#6-affect-user)


--------


## Affluence
Concern affluence (entries) in the zoo



### 1. Daily


Get for given day daily affluence


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/affluence/daily
```



***Body:***

```js        
{
    "date":"2021-12-31"
}
```



### 2. Daily by enclosure


Get for given day and enclosure daily affluence


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/affluence/daily/:enclosureId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| enclosureId |  | Enclosure ID |



***Body:***

```js        
{
    "date":"2021-12-31"
}
```



### 3. Live enclosure affluence


Get live enclosure affluence


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/affluence/live/:enclosureId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| enclosureId |  | Enclosure ID |



### 4. Monthly


Get given month total affluence

If month parameter invalid or empty, it will return for current month


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/affluence/monthly/:month
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| month | 4 | Month number (1-12) |



### 5. Monthly by enclosure


Get given month enclosure's total affluence

If month parameter invalid or empty, it will return for current month


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/affluence/monthly-enclosure/:enclosureId/:month
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| enclosureId |  | Enclosure ID |
| month |  | Month number (1-12) |



### 6. Total


Get total affluence of the ZOO since it's creation


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/affluence/total
```



### 7. Total by enclosure


Get total enclosure's affluence of the ZOO since it's creation


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/affluence/total/:enclosureId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| enclosureId |  | Enclosure ID |



### 8. Weekly


Get current week total affluence


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/affluence/weekly
```



### 9. Weekly by enclosure


Get current week enclosure total affluence


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/affluence/weekly/:enclosureId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| enclosureId |  | Enclosure ID |



### 10. Yearly


Get yearly affluence with details per month.

If year invalid or empty, return for current year


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/affluence/yearly/:year
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| year |  | Year |



### 11. Yearly by enclosure


Get yearly enclosure's affluence with details per month.

If year invalid or empty, return for current year


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/affluence/yearly-enclosure/:enclosureId/:year
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| enclosureId | 1 | Enclosure ID |
| year |  | Year |



## Animal



### 1. Create


Add new animal to the zoo with given body properties


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/animal
```



***Body:***

```js        
{
    "name": "rihanna",
    "enclosureId": 1,
    "specieId": 2,
    "birthdate": "2016-08-10 14:00:54"
}
```



### 2. Delete


Delete animal by id


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{BASE_URL}}/animal/:animalId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| animalId |  |  |



### 3. Get all


Get all animals with optional
- limit
- offset


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{BASE_URL}}/animal
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| limit | 20 |  |
| offset | 1 |  |



### 4. Get by id


Get one specific animal by id


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{BASE_URL}}/animal/:animalId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| animalId |  | Animal ID |



### 5. Update


Update animal with given body parameters


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{BASE_URL}}/animal/:animalId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| animalId |  | Animal ID |



***Body:***

```js        
{
    "name": "chô7",
    "enclosureId": 1,
    "specieId": 1,
    "birthdate": "2016-08-10 14:00:54"
}
```



### 6. [to fix]Move Enclosure


Move animal to another enclosure


***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: {{BASE_URL}}/animal/:animalId/move-enclosure/
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| animalId |  | Animal ID |



***Body:***

```js        
{
    "animalId": 3,
    "enclosureId": 2
}
```



## Animal Health Book



### 1. Create entry


Add to an animal, a healthbook entry


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/animal/health
```



***Body:***

```js        
{
    "userId": 2,
    "animalId": 3,
    "date": "2021-04-04 22:58:21",
    "description": "tout vas plus que bien"
}
```



### 2. Delete


Remove an animal's health book entry


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{BASE_URL}}/animal/health/:healthBookId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| healthBookId |  | Animal health book ID |



### 3. Get All


Get all animal health book entries with optional
- limit
- offset


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{BASE_URL}}/animal/health
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| limit | 20 |  |
| offset | 1 |  |



### 4. Get One


Get one animal health book entry by id


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{baseURL}}/animal/health/:healthBookId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| healthBookId |  | Animal health book id |



### 5. Update


Update a health book entry


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{BASE_URL}}/animal/health/:healthBookId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| healthBookId |  | Animal health book ID |



***Body:***

```js        
{
    "userId": 2,
    "animalId": 3,
    "date": "2021-04-04 22:58:21",
    "description": "il est mort"
}
```



### 6. [to fix] Get All By Animal


Get all specific animal health book entries


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{BASE_URL}}/animal/health/animal/:animalId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| animalId | 3 |  |



## Enclosure



### 1. Get All Animals In An Enclosure


Retrieve all animals in specified enclosure


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{baseURL}}/enclosure/:enclosureId/animals
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| enclosureId |  | Enclosure ID |



## Entry
You can here manage pass entries



### 1. Add entry


Add new entry between existing Pass and Enclosure


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/pass/entry/
```



***Body:***

```js        
{
    "passId":0,
    "enclosureId":0
}
```



### 2. Get all


Get all entries with optional
- limit
- offset


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{BASE_URL}}/pass/entry/
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| limit | 10 |  |
| offset | 20 |  |



### 3. Get by enclosure


Get all enclosure's entries with optional 
- limit
- offset


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{BASE_URL}}/pass/entry/enclosure/:enclosureId
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| limit | 20 |  |
| offset | 1 |  |



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| enclosureId |  |  |



### 4. Get by pass


Get all entries on a Pass with optional 
- limit
- offset


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{BASE_URL}}/pass/entry/pass/:passId
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| limit | 20 |  |
| offset | 1 |  |



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| passId |  | Pass ID |



### 5. Get by user


Get all user entries with optional 
- limit
- offset


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{BASE_URL}}/pass/entry/user/:userId
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| limit |  |  |
| offset |  |  |



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| userId |  | User ID |



### 6. Remove entry


Remove entry between existing Pass and Enclosure


***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: {{BASE_URL}}/pass/entry/:entryId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| entryId |  |  |



## Pass



### 1. Add enclosure access


Add to an existing pass enclosure access


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/pass/enclosure-access
```



***Body:***

```js        
{
    "enclosureId":0,
    "passId":0
}
```



### 2. Create


Create a new pass with enclosure access list


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/pass/
```



***Body:***

```js        
{
    "validDate":"2021-12-31",
    "userId":0,
    "passTypeId":0,
    "enclosureAccessList":[
        0
    ]
}
```



### 3. Delete pass


Delete a pass


***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: {{BASE_URL}}/pass/:passId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| passId |  | Pass ID |



### 4. Get all


Get all pass with optional 
- limit
- offset


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/pass
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| limit | 20 |  |
| offset | 1 |  |



### 5. Get all by user id


Get all user pass


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/pass/user/:userId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| userId |  | User ID |



### 6. Get by id


Get a specific pass by given ID with 
- all it's enclosure access
- all it's enclosure entries


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/pass/:passId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| passId |  | Pass ID |



### 7. Remove enclosure access


Remove to an existing pass an enclosure access


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{BASE_URL}}/pass/enclosure-access/:passId/:enclosureId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| passId |  | Pass ID |
| enclosureId |  | Enclosure ID |



### 8. Update pass


Update a pass

Only Type is updatable by this endpoint.


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{BASE_URL}}/pass/:passId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| passId |  | Pass ID
 |



***Body:***

```js        
{
    "passTypeId":4
}
```



## Pass Night
You can here manage pass night availabilities



### 1. Add availability


Add new pass night availability


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/pass/night/
```



***Body:***

```js        
{
 "date":"2021-12-31"
}
```



### 2. Delete passnight


Remove a Pass Night availability


***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: {{BASE_URL}}/pass/night/:passNightAvailabilityId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| passNightAvailabilityId |  | Pass Night Availability ID |



### 3. Get all


Get all pass night with optional 
- limit
- offset


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/pass/night/
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| limit | 20 |  |
| offset | 1 |  |



### 4. Get all valid


Get all available pass night with optional
- limit
- offset


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/pass/night/available
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| limit | 20 |  |
| offset | 1 |  |



### 5. Update  passnight


Update a availability date for pass night


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{BASE_URL}}/pass/night/:passNightAvailabilityId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| passNightAvailabilityId |  | Pass Night Availability ID |



***Body:***

```js        
{
    "date":"2021-04-18"
}
```



## Pass Type
You can here manage pass type



### 1. Add pass to pass type


Assign a Pass to an existing Pass Type


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/pass/type/add-pass
```



***Body:***

```js        
{
    "passId": 0,
    "passTypeId": 0
}
```



### 2. Create


Add a new pass type


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}pass/type/
```



***Body:***

```js        
{
    "name":"string",
    "price":0
}
```



### 3. Delete


Delete an existing Pass Type


***Endpoint:***

```bash
Method: DELETE
Type: RAW
URL: {{BASE_URL}}/pass/type/:passTypeId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| passTypeId |  | Pass Type Id |



### 4. Get all


Get all passType


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/pass/type/
```



### 5. Get by id


Get one pass type by id


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/pass/type/:passTypeId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| passTypeId |  | Pass Type Id |



### 6. Update


Update an existing Pass Type with given body values


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{BASE_URL}}/pass/type/
```



***Body:***

```js        
{
    "id": 0,
    "name":"new name",
    "price":0
    }
```



## Specie



### 1. Create


Create new specie with given parameters


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/animal/specie
```



***Body:***

```js        
{
    "origin": "numerique",
    "name": "Hoglip",
    "description": "le tem de max evo"
}
```



### 2. Delete


Soft remove specie (don't delete concerned animals)


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{baseURL}}/animal/specie/:specieId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| specieId |  | Specie ID |



### 3. Get All


Get all species with optional
- limit
- offset


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{BASE_URL}}/animal/specie
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| limit | 20 |  |
| offset | 1 |  |



### 4. Get By Id


Get one specie by ID


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{BASE_URL}}/animal/specie/:specieId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| specieId |  | Specie ID |



### 5. Update


Update specie with given parameters in body


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{BASE_URL}}/animal/specie/:specieId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| specieId |  | Specie ID |



***Body:***

```js        
{
    "origin": "numerique",
    "name": "oree",
    "description": "Le tem de max no evo"
}
```



## Statistics
Concern global stats



### 1. Count all pass


Count total of both valid or expired pass


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/statistic/count/pass/
```



### 2. Count all pass by types


Count total of both valid or expired pass by types


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/statistic/count/pass/types
```



### 3. Count animal


Count total of animals


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/statistic/count/animal/
```



### 4. Count animal by enclosure


Count total of enclosure's animals


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/statistic/count/animal/:enclosureId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| enclosureId |  | Enclosure ID |



### 5. Count enclosure


Count total of enclosures


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/statistic/count/enclosure
```



### 6. Count expired pass


Count total of expired pass


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/statistic/count/pass/expired
```



### 7. Count user


Count total of active users


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/statistic/count/user
```



### 8. Count valid pass


Count total of valid pass


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/statistic/count/pass/valid/
```



### 9. Count valid pass by types


Count total of valid pass by types


***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/statistic/count/pass/valid/types
```



## User



### 1. Change Password


Update connected user password


***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: {{BASE_URL}}/user/change-password
```



***Body:***

```js        
{
    "actualPassword": "tytyty",
    "newPassword": "azerty",
    "newPasswordConfirm": "azerty"
}
```



### 2. Create


Create new user with required parameters in body


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/user
```



***Body:***

```js        
{
    "email": "testSinge@jungle.lol",
    "firstName": "Singe",
    "lastName": "Poilu",
    "userRoleId": 2,
    "password": "ggirigizol"
}
```



### 3. Delete


Soft remove user


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{BASE_URL}}/user/:userId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| userId |  | User ID |



### 4. Force Delete


### Admin Middleware
Remove user from db (hard delete)


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{BASE_URL}}/user/force-delete/:userId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| userId |  | User ID |



### 5. Get By Id


Get one user by id


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{BASE_URL}}/user/:userId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| userId |  |  |



### 6. Login


Login with email and password, return bearer token if successful


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/user/login
```



***Body:***

```js        
{
    "email": "EMPLOYEE@EMPLOYEE.com",
    "password": "azerty"
}
```



### 7. Logout


Logout to release token session


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{BASE_URL}}/user/logout
```



### 8. ME


Retrieve current connected user with beaver token given in header


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{BASE_URL}}/user/me
```



### 9. Register


Register to create account with simple user role


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/user/register
```



***Body:***

```js        
{
    "email": "capsule3@gmail.com",
    "password": "azerty",
    "firstName": "capsule",
    "lastName": "herrera"
}
```



### 10. Restaure User


### Admin middleware
Restaure soft deleted user


***Endpoint:***

```bash
Method: PATCH
Type: 
URL: {{baseURL}}/user/restaure/:userId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| userId |  | User ID |



### 11. [to fix] Get All


Get all users with optional 
- limit
- offset


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{BASE_URL}}/user
```



***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| limit | 20 |  |
| offset | 1 |  |



### 12. [to fix] Update by admin


### ADMIN ROUTE

Can update any user


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{BASE_URL}}/user/:userId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| userId |  | User ID |



***Body:***

```js        
{
    "id": 11,
    "firstName": "Capsule",
    "lastName": "Herrera",
    "email": "capsule3@gmail.com",
    "birthdate": "2021-01-01 12:21:51",
    "password": "briatvmhr",
    "userRoleId": 3
}
```



### 13. [to fix] Update client only by employee


### Employee route

Can only update client


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{BASE_URL}}/user/update-client/:userId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| userId |  | User ID |



***Body:***

```js        
{
    "id": 11,
    "firstName": "Capsule",
    "lastName": "Herrera",
    "email": "capsule3@gmail.com",
    "birthdate": "2021-01-01 12:21:51",
    "password": "shadolebest",
    "userRoleId": 3
}
```



## User Role



### 1. Create


Create new user role


***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{baseURL}}/user/role
```



***Body:***

```js        
{
    "name": "SINGE"
}
```



### 2. Delete


Remove user role (keeps users with this role)


***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{baseURL}}/user/role/:userRoleId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| userRoleId |  | User Role ID |



### 3. Get All


Get all user roles


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{BASE_URL}}/user/role
```



### 4. Get by Id


Get one user role by id


***Endpoint:***

```bash
Method: GET
Type: 
URL: {{BASE_URL}}/user/role/:userRoleId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| userRoleId |  | User Role ID |



### 5. Update


Update existing user role


***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{baseURL}}/user/role/:userRoleId
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| userRoleId |  | User Role ID |



***Body:***

```js        
{
    "name": "Grand signe"
}
```



### 6. affect User



***Endpoint:***

```bash
Method: PATCH
Type: 
URL: {{baseURL}}/user/role/:role-id/affect-user/:user-id
```



***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| role-id | 3 |  |
| user-id | 1 |  |



---
[Back to top](#sanazoo-api)
> Made with &#9829; by [thedevsaddam](https://github.com/thedevsaddam) | Generated at: 2021-04-21 23:17:12 by [docgen](https://github.com/thedevsaddam/docgen)
