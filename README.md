# SanaZoo API



SanaZoo is a very popular zoo !

First created in C with XML files, it is now developped with nodejs and swagger, for your eyes only

## Table of contents

<!-- toc -->

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
    * [Move Enclosure](#5-move-enclosure)
    * [Update](#6-update)

* [Animal Health Book](#animal-health-book)

    * [Create entry](#1-create-entry)
    * [Delete](#2-delete-1)
    * [Get All](#3-get-all-1)
    * [Get All By Animal](#4-get-all-by-animal)
    * [Get One](#5-get-one)
    * [Update](#6-update-1)

* [Enclosure](#enclosure)

    * [Add One](#1-add-one)
    * [Delete One](#2-delete-one)
    * [Edit One](#3-edit-one)
    * [Get All](#4-get-all)
    * [Get All Animals In Enclosure](#5-get-all-animals-in-enclosure)
    * [Get All By Type](#6-get-all-by-type)
    * [Get One](#7-get-one)

* [Enclosure Images](#enclosure-images)

    * [Add](#1-add)
    * [Delete One](#2-delete-one-1)
    * [Edit One](#3-edit-one-1)
    * [Gell All From Enclosure](#4-gell-all-from-enclosure)
    * [Get All](#5-get-all)
    * [Get One](#6-get-one)

* [Enclosure Service-book](#enclosure-service-book)

    * [Create service-book](#1-create-service-book)
    * [Delete service-book](#2-delete-service-book)
    * [Edit service-book](#3-edit-service-book)
    * [Gell All From Employee](#4-gell-all-from-employee)
    * [Get All](#5-get-all-1)
    * [Get All From Enclosure](#6-get-all-from-enclosure)
    * [Get One](#7-get-one-1)

* [Enclosure Type](#enclosure-type)

    * [Create](#1-create-1)
    * [Delete](#2-delete-2)
    * [Get All](#3-get-all-2)
    * [Get One](#4-get-one)
    * [Update](#5-update)

* [Entry](#entry)

    * [Add entry](#1-add-entry)
    * [Get all](#2-get-all)
    * [Get by enclosure](#3-get-by-enclosure)
    * [Get by pass](#4-get-by-pass)
    * [Get by user](#5-get-by-user)
    * [Remove entry](#6-remove-entry)

* [Maintenance](#maintenance)

    * [Get All by State](#1-get-all-by-state)
    * [Get Best Month](#2-get-best-month)
    * [Update Maintenance State](#3-update-maintenance-state)

* [Pass](#pass)

    * [Add enclosure access](#1-add-enclosure-access)
    * [Create](#2-create)
    * [Delete pass](#3-delete-pass)
    * [Get all](#4-get-all-1)
    * [Get all by user id](#5-get-all-by-user-id)
    * [Get by id](#6-get-by-id)
    * [Remove enclosure access](#7-remove-enclosure-access)
    * [Update pass](#8-update-pass)

* [Pass Night](#pass-night)

    * [Add availability](#1-add-availability)
    * [Delete passnight](#2-delete-passnight)
    * [Get all](#3-get-all-3)
    * [Get all valid](#4-get-all-valid)
    * [Update  passnight](#5-update--passnight)

* [Pass Type](#pass-type)

    * [Add pass to pass type](#1-add-pass-to-pass-type)
    * [Create](#2-create-1)
    * [Delete](#3-delete)
    * [Get all](#4-get-all-2)
    * [Get by id](#5-get-by-id)
    * [Update](#6-update-2)

* [Planning](#planning)

    * [Add](#1-add-1)
    * [Delete](#2-delete-3)
    * [Get All](#3-get-all-4)
    * [Get Calendar](#4-get-calendar)
    * [Get One](#5-get-one-1)
    * [Get Open Date](#6-get-open-date)
    * [Update](#7-update)

* [Specie](#specie)

    * [Create](#1-create-2)
    * [Delete](#2-delete-4)
    * [Get All](#3-get-all-5)
    * [Get By Id](#4-get-by-id-1)
    * [Update](#5-update-1)

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
    * [Get All](#5-get-all-2)
    * [Get By Id](#6-get-by-id-1)
    * [Login](#7-login)
    * [Logout](#8-logout)
    * [ME](#9-me)
    * [Register](#10-register)
    * [Restaure User](#11-restaure-user)
    * [Update by admin](#12-update-by-admin)
    * [Update client only by employee](#13-update-client-only-by-employee)

* [User Role](#user-role)

    * [Affect User](#1-affect-user)
    * [Create](#2-create-3)
    * [Delete](#3-delete-2)
    * [Get All](#4-get-all-3)
    * [Get by Id](#5-get-by-id-1)
    * [Update](#6-update-3)

<!-- tocstop -->
--------

# Our project

In this school project, we have to realize a complete API to manage a zoo, using Express and Sequelize as a base.

This project has been tested and integrated both on heroku, but also thanks to docker whose image is detailed below

## Gantt chart

## Data model used for DB

## Contributions

|                                                  |                                                              |
| ------------------------------------------------ | ------------------------------------------------------------ |
| [Noé LARRIEU-LACOSTE](https://github.com/Nouuu)  | [![followers](https://img.shields.io/github/followers/nouuu)]((https://github.com/Nouuu)) |
| [Swann HERRERA](https://github.com/SwannHERRERA) | [![followers](https://img.shields.io/github/followers/SwannHERRERA)](https://github.com/SwannHERRERA) |
| [Clément BOSSARD](https://github.com/Huriumari)  | [![followers](https://img.shields.io/github/followers/Huriumari)](https://github.com/Huriumari) |

# Docker integration


# API Endpoints

## Postman Environment

You can check our endpoints with postman directly on this URL:
[https://documenter.getpostman.com/view/11568150/TzJvdwNA](https://documenter.getpostman.com/view/11568150/TzJvdwNA)

## Affluence

Concern affluence (entries) in the zoo

### 1. Daily

#### Client permission minimum required

Get for given day daily affluence

***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/affluence/daily
```

***Body:***

```json
{
  "date": "2021-12-31"
}
```

### 2. Daily by enclosure

#### Client permission minimum required

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

```json        
{
    "date":"2021-12-31"
}
```

### 3. Live enclosure affluence

#### Client permission minimum required

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

#### Client permission minimum required

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

#### Client permission minimum required

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

#### Client permission minimum required

Get total affluence of the ZOO since it's creation

***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/affluence/total
```

### 7. Total by enclosure

#### Client permission minimum required

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

#### Client permission minimum required

Get current week total affluence

***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/affluence/weekly
```

### 9. Weekly by enclosure

#### Client permission minimum required

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

#### Client permission minimum required

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

#### Client permission minimum required

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

You can manage all animals in our zoo from theses endpoints

### 1. Create

#### Employee permission minimum required

Add new animal to the zoo with given body properties

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/animal
```

***Body:***

```json        
{
    "name": "rihanna",
    "enclosureId": 1,
    "specieId": 2,
    "birthdate": "2016-08-10 14:00:54"
}
```

### 2. Delete

#### Employee permission minimum required

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

#### Client permission minimum required

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

#### Client permission minimum required

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

### 5. Move Enclosure

#### Employee permission minimum required

Move animal to another enclosure

***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: {{BASE_URL}}/animal/move-enclosure/
```

***Body:***

```json        
{
    "animalId": 3,
    "enclosureId": 2
}
```

### 6. Update

#### Employee permission minimum required

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

```json        
{
    "name": "chô7",
    "enclosureId": 1,
    "specieId": 1,
    "birthdate": "2016-08-10 14:00:54"
}
```

## Animal Health Book

Theses entries points allows veterinaries to manage animal health and employees to see it

### 1. Create entry

#### Veterinary permission minimum required

Add to an animal, a healthbook entry

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/animal/health
```

***Body:***

```json        
{
    "userId": 2,
    "animalId": 3,
    "date": "2021-04-04 22:58:21",
    "description": "tout vas plus que bien"
}
```

### 2. Delete

#### Admin permission minimum required

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

#### Employee permission minimum required

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

### 4. Get All By Animal

#### Employee permission minimum required

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

### 5. Get One

#### Employee permission minimum required

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

### 6. Update

#### Veterinary permission minimum required

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

```json        
{
    "userId": 2,
    "animalId": 3,
    "date": "2021-04-04 22:58:21",
    "description": "il est mort"
}
```

## Enclosure

This is where we can access and manage the differents enclosure in the zoo. We cn have different species in one
enclosure

### 1. Add One

#### Admin permission minimum required

Create a new enclosure.

- optional : images

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/enclosure
```

***Body:***

```json        
{
    "name": "Le grand enclos a...",
    "capacity": "7",
    "description": "Le grand enclos a Ricardo Milos",
    "visitDuration": 999999999,
    "handicapAccess": true,
    "maintenance": false,
    "openHour": "01:00",
    "closeHour": "23:58",
    "enclosureTypeId": 1,
    "images": [
        {
            "title": "Une image chocante",
            "path": "https://media.tenor.com/images/78896a158781e5da8bd3a795d8431b09/tenor.gif"
        }
    ]
}
```

### 2. Delete One

#### Admin permission minimum required

Delete one enclosure by Id.

***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{BASE_URL}}/enclosure/:enclosureId
```

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| enclosureId | 1 | Enclosure ID |

### 3. Edit One

#### Employee permission minimum required

Update one enclosure by Id.

Body params are optional, only give what needs to be updated

***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{BASE_URL}}/enclosure/:enclosureId
```

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| enclosureId | 1 | Enclosure ID |

***Body:***

```json        
 {
    "name": "Le grand enclos a...",
    "capacity": "7",
    "description": "Le grand enclos a Ricardo Milos. Attention à la sensibilité des plus jeunes",
    "visitDuration": 999999999,
    "handicapAccess": true,
    "maintenance": false,
    "openHour": "01:00",
    "closeHour": "23:58",
    "enclosureTypeId": 1
}
 

```

### 4. Get All

#### Client permission minimum required

Get all enclosure  
params optional :

- offset
- limit

***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/enclosure
```

***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| limit | 10 |  |
| offset | 1 |  |

### 5. Get All Animals In Enclosure

#### Client permission minimum required

Retrieve all animals in specified enclosure

***Endpoint:***

```bash
Method: GET
Type: 
URL: {{BASE_URL}}/enclosure/:enclosureId/animals
```

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| enclosureId |  | Enclosure ID |

### 6. Get All By Type

#### Client permission minimum required

Get all enclosure by type params optional :

- offset
- limit

***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/enclosure/type/:enclosureTypeId
```

***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| limit | 10 |  |
| offset | 1 |  |

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| enclosureTypeId |  |  |

### 7. Get One

#### Client permission minimum required

Get one enclosure by ID

***Endpoint:***

```bash
Method: GET
Type: 
URL: {{BASE_URL}}/enclosure/:enclosureId
```

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| enclosureId | 1 | Enclosure ID |

## Enclosure Images

Each enclosure can have some images

### 1. Add

#### Employee permission minimum required

Add new image url with a name to specified anclosure

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/enclosure/image/
```

***Body:***

```json        
{
    "title": "On ne s'y attend pas",
    "path": "https://i.redd.it/2pa8ffkyl3t41.jpg",
    "enclosureId": 1
}
```

### 2. Delete One

#### Admin permission minimum required

Delete one image by Id.

***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{BASE_URL}}/enclosure/image/:imageId
```

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| imageId | 1 | Image ID |

### 3. Edit One

#### Employee permission minimum required

edit one image by Id.  
Params are optional

***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{BASE_URL}}/enclosure/image/:imageId
```

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| imageId | 1 | Image ID |

***Body:***

```json        
{
    "title": "Et celui la encore moins",
    "path": "https://i.pinimg.com/originals/88/82/bc/8882bcf327896ab79fb97e85ae63a002.gif",
    "enclosureId": 1
}
```

### 4. Gell All From Enclosure

#### Client permission minimum required

Get all image from a enclosure.

***Endpoint:***

```bash
Method: GET
Type: 
URL: {{BASE_URL}}/enclosure/image/enclosure/:enclosureId
```

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| enclosureId | 1 | Enclosure ID |

### 5. Get All

#### Client permission minimum required

Get all images params optional :

- offset
- limit

***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/enclosure/image/
```

***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| limit | 20 | Optionnel |
| offset | 1 | Optionnel |

***Body:***

```json        
{
    "offset": 42,
    "limit": 1337
}
```

### 6. Get One

#### Client permission minimum required

Get one image by ID

***Endpoint:***

```bash
Method: GET
Type: 
URL: {{BASE_URL}}/enclosure/image/:imageId
```

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| imageId | 1 | Image ID |

## Enclosure Service-book

Employee service book help employees too manage enclosure's health

### 1. Create service-book

#### Employee permission minimum required

Create a service-book's entry.

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/enclosure/service-book
```

***Body:***

```json        
{
    "date": "2012-12-21",
    "description": "La fin du monde est arrivé sur l'enclos numero 1. Il n'y a aucun dégat",
    "enclosureId": 1,
    "userId": 1
}
```

### 2. Delete service-book

#### Admin permission minimum required

Delete a service-book entry

***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{BASE_URL}}/enclosure/service-book/:serviceBookId
```

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| serviceBookId | 1 | Service Book ID |

### 3. Edit service-book

#### Employee permission minimum required

Edit a existing service-book entry

***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{BASE_URL}}/enclosure/service-book/:serviceBookId
```

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| serviceBookId | 1 | Service Book ID |

***Body:***

```json        
{
    "date": "2021-12-21",
    "description": "Finalement il n'y a pas eu la fin du monde",
    "enclosureId": 1,
    "userId": 1
}
```

### 4. Gell All From Employee

#### Employee permission minimum required

Get All service-book from a employee

***Endpoint:***

```bash
Method: GET
Type: 
URL: {{BASE_URL}}/enclosure/service-book/enclosure/:employeeId
```

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| employeeId | 1 | Employee ID |

### 5. Get All

#### Employee permission minimum required

Get all service book instance.  
Optional params:

- offset
- limit

***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/enclosure/service-book
```

***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| limit | 10 |  |
| offset | 1 |  |

### 6. Get All From Enclosure

#### Employee permission minimum required

Get all service-book from a enclosure

***Endpoint:***

```bash
Method: GET
Type: 
URL: {{BASE_URL}}/enclosure/service-book/enclosure/:enclosureId
```

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| enclosureId | 1 | Enclosure ID |

### 7. Get One

#### Employee permission minimum required

Get a specific service-book

***Endpoint:***

```bash
Method: GET
Type: 
URL: {{BASE_URL}}/enclosure/service-book/:serviceBookId
```

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| serviceBookId | 1 | Service Book ID |

## Enclosure Type

Enclosure type help to categories the enclosures and help to manages animals inside (water enclosure will be unplaisant
to host lions...)

### 1. Create

#### Admin permission minimum required

Create a enclosure type

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/enclosure/type
```

***Body:***

```json        
{
    "Name": "Un enclos pour les gouverner tous"
}
```

### 2. Delete

#### Admin permission minimum required

Soft delete a enclosure type (keeps enclosure associated)

***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{BASE_URL}}/enclosure/type/:enclosureTypeId
```

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| enclosureTypeId | 1 | Enclosure Type ID |

### 3. Get All

#### Client permission minimum required

Get all enclosure type

***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/enclosure/type
```

***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| limit | 20 |  |
| offset | 1 |  |

### 4. Get One

#### Client permission minimum required

Get one enclosure type

***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/enclosure/type/id/:enclosureTypeId
```

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| enclosureTypeId |  |  |

### 5. Update

#### Admin permission minimum required

Edit a enclosure type

***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{BASE_URL}}enclosure/type/:enclosureTypeId
```

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| enclosureTypeId | 1 | Enclosure Type ID |

***Body:***

```json        
{
    "Name": "Un enclos pour les laisser tous tranquille"
}
```

## Entry

You can here manage pass entries

### 1. Add entry

#### Employee permission minimum required

Add new entry between existing Pass and Enclosure

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/pass/entry/
```

***Body:***

```json        
{
    "passId":1,
    "enclosureId":1
}
```

### 2. Get all

#### Employee permission minimum required

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

#### Employee permission minimum required

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

#### Employee permission minimum required

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

#### Employee permission minimum required

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

#### Admin permission minimum required

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

## Maintenance

Help to manage enclosure maintenance when needed

### 1. Get All by State

#### Employee permission minimum required

Get all enclosure by state with optional

- limit
- offset

***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/enclosure/maintenance/:state
```

***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| limit |  |  |
| offset |  |  |

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| state | true | True: in maintenance
False : not in maintenance |

### 2. Get Best Month

#### Admin permission minimum required

Get the best month to maintain a enclosure (based on affluence)

***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/enclosure/maintenance/month/:enclosureId
```

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| enclosureId | 1 | Enclosure ID |

### 3. Update Maintenance State

#### Admin permission minimum required

Change the maintenance state of a enclosure

***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{BASE_URL}}/enclosure/maintenance/:enclosureId
```

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| enclosureId |  | Enclosure ID |

***Body:***

```json        
{
    "maintenance": true
}
```

## Pass

Pass is one main feature. I help to access on enclosures

### 1. Add enclosure access

#### Employee permission minimum required

Add to an existing pass enclosure access

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/pass/enclosure-access
```

***Body:***

```json        
{
    "enclosureId":0,
    "passId":0
}
```

### 2. Create

#### Employee permission minimum required

Create a new pass with enclosure access list

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/pass/
```

***Body:***

```json        
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

#### Employee permission minimum required

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

#### Employee permission minimum required

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

#### Client permission minimum required

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

#### Client permission minimum required

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

#### Employee permission minimum required

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

#### Employee permission minimum required

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

```json        
{
    "passTypeId":4
}
```

## Pass Night

You can here manage pass night availabilities

### 1. Add availability

#### Admin permission minimum required

Add new pass night availability

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/pass/night/
```

***Body:***

```json        
{
 "date":"2021-12-31"
}
```

### 2. Delete passnight

#### Admin permission minimum required

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

#### Client permission minimum required

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

#### Client permission minimum required

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

#### Admin permission minimum required

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

```json        
{
    "date":"2021-04-18"
}
```

## Pass Type

You can here manage pass type

### 1. Add pass to pass type

#### Employee permission minimum required

Assign a Pass to an existing Pass Type

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/pass/type/add-pass
```

***Body:***

```json        
{
    "passId": 0,
    "passTypeId": 0
}
```

### 2. Create

#### Admin permission minimum required

Add a new pass type

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}pass/type/
```

***Body:***

```json        
{
    "name":"string",
    "price":0
}
```

### 3. Delete

#### Admin permission minimum required

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

#### Client permission minimum required

Get all passType

***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/pass/type/
```

### 5. Get by id

#### Client permission minimum required

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

#### Admin permission minimum required

Update an existing Pass Type with given body values

***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{BASE_URL}}/pass/type/
```

***Body:***

```json        
{
    "id": 0,
    "name":"new name",
    "price":0
    }
```

## Planning

Theses routes are for employees and help to manage planning and zoo opening days

### 1. Add

#### Employee permission minimum required

Create a new planning entry.

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/planning
```

***Body:***

```json        
{
    "day_of_week": "Sunday",
    "start_time": "2021-05-01T08:00:00",
    "end_time": "2021-05-01T19:00:00",
    "userId": 1
}
```

### 2. Delete

#### Admin permission minimum required

Delete one planning by Id.

***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{BASE_URL}}planning/:planningId
```

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| planningId | 1 |  |

### 3. Get All

#### Employee permission minimum required

Get all planning params optional :

- offset
- limit

***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/planning
```

***Query params:***

| Key | Value | Description |
| --- | ------|-------------|
| limit | 1337 |  |
| offset | 42 |  |

### 4. Get Calendar

#### Employee permission minimum required

Get Zoo's open date from a period

***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/planning/openDate
```

***Body:***

```json        
{
    "start_time": "1337-09-22",
    "number_of_day": 5598
}
```

### 5. Get One

#### Employee permission minimum required

Get one planning entry by ID

***Endpoint:***

```bash
Method: GET
Type: 
URL: {{BASE_URL}}/planning/:planningId
```

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| planningId | 1 | Planning entry ID |

### 6. Get Open Date

#### Employee permission minimum required

Get Zoo's planning from a period group by days

***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}planning/openDate
```

***Body:***

```json        
{
    "start_time": "1337-09-22"
}
```

### 7. Update

#### Employee permission minimum required

Edit one planning by Id.

***Endpoint:***

```bash
Method: PUT
Type: RAW
URL: {{BASE_URL}}planning/:planningId
```

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| planningId | 1 |  |

***Body:***

```json        
{
    "day_of_week": "Saturday",
    "start_time": "2021-05-01T08:00:00",
    "end_time": "2021-05-01T19:00:00",
    "userId": 1
}

```

## Specie

Here is to manage animal's species in zoo

### 1. Create

#### Employee permission minimum required

Create new specie with given parameters

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/animal/specie
```

***Body:***

```json        
{
    "origin": "numerique",
    "name": "Hoglip",
    "description": "le tem de max evo"
}
```

### 2. Delete

#### Admin permission minimum required

Soft remove specie (don't delete concerned animals)

***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{BASE_URL}}/animal/specie/:specieId
```

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| specieId |  | Specie ID |

### 3. Get All

#### Client permission minimum required

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

#### Client permission minimum required

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

#### Employee permission minimum required

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

```json        
{
    "origin": "numerique",
    "name": "oree",
    "description": "Le tem de max no evo"
}
```

## Statistics

Concern global stats

### 1. Count all pass

#### Client permission minimum required

Count total of both valid or expired pass

***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/statistic/count/pass/
```

### 2. Count all pass by types

#### Client permission minimum required

Count total of both valid or expired pass by types

***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/statistic/count/pass/types
```

### 3. Count animal

#### Client permission minimum required

Count total of animals

***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/statistic/count/animal/
```

### 4. Count animal by enclosure

#### Client permission minimum required

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

#### Client permission minimum required

Count total of enclosures

***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/statistic/count/enclosure
```

### 6. Count expired pass

#### Client permission minimum required

Count total of expired pass

***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/statistic/count/pass/expired
```

### 7. Count user

#### Client permission minimum required

Count total of active users

***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/statistic/count/user
```

### 8. Count valid pass

#### Client permission minimum required

Count total of valid pass

***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/statistic/count/pass/valid/
```

### 9. Count valid pass by types

#### Client permission minimum required

Count total of valid pass by types

***Endpoint:***

```bash
Method: GET
Type: RAW
URL: {{BASE_URL}}/monitoring/statistic/count/pass/valid/types
```

## User

Theses routes are both for client and employees and help manage everything concerning user account

### 1. Change Password

#### Client permission minimum required

Update connected user password

***Endpoint:***

```bash
Method: PATCH
Type: RAW
URL: {{BASE_URL}}/user/change-password
```

***Body:***

```json        
{
    "actualPassword": "tytyty",
    "newPassword": "azerty",
    "newPasswordConfirm": "azerty"
}
```

### 2. Create

#### Admin permission minimum required

Create new user with required parameters in body

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/user
```

***Body:***

```json        
{
    "email": "testSinge@jungle.lol",
    "firstName": "Singe",
    "lastName": "Poilu",
    "userRoleId": 2,
    "password": "ggirigizol"
}
```

### 3. Delete

#### Admin permission minimum required

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

#### Admin permission minimum required

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

### 5. Get All

#### Employee permission minimum required

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

### 6. Get By Id

#### Employee permission minimum required

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

### 7. Login

Login with email and password, return bearer token if successful

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/user/login
```

***Body:***

```json        
{
    "email": "EMPLOYEE@EMPLOYEE.com",
    "password": "azerty"
}
```

### 8. Logout

#### Client permission minimum required

Logout to release token session

***Endpoint:***

```bash
Method: DELETE
Type: 
URL: {{BASE_URL}}/user/logout
```

### 9. ME

#### Client permission minimum required

Retrieve current connected user with beaver token given in header

***Endpoint:***

```bash
Method: GET
Type: 
URL: {{BASE_URL}}/user/me
```

### 10. Register

Register to create account with simple user role

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{BASE_URL}}/user/register
```

***Body:***

```json        
{
    "email": "capsule3@gmail.com",
    "password": "azerty",
    "firstName": "capsule",
    "lastName": "herrera"
}
```

### 11. Restaure User

#### Admin permission minimum required

Restaure soft deleted user

***Endpoint:***

```bash
Method: PATCH
Type: 
URL: {{BASE_URL}}/user/restore/:userId
```

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| userId |  | User ID |

### 12. Update by admin

#### Admin permission minimum required

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

```json        
{
    "firstName": "Capsule",
    "lastName": "Herrera",
    "email": "capsule3@gmail.com",
    "birthdate": "2021-01-01 12:21:51",
    "password": "briatvmhr",
    "userRoleId": 3
}
```

### 13. Update client only by employee

#### Employee permission minimum required

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

```json        
{
    "firstName": "Capsule",
    "lastName": "Herrera",
    "email": "capsule3@gmail.com",
    "birthdate": "2021-01-01 12:21:51",
    "password": "shadolebest",
    "userRoleId": 3
}
```

## User Role

User roles are very importannt to determine rights on API

### 1. Affect User

***Endpoint:***

```bash
Method: PATCH
Type: 
URL: {{baseURL}}/user/role/:roleId/affect-user/:userId
```

***URL variables:***

| Key | Value | Description |
| --- | ------|-------------|
| roleId |  |  |
| userId |  |  |

### 2. Create

#### Admin permission minimum required

Create new user role

***Endpoint:***

```bash
Method: POST
Type: RAW
URL: {{baseURL}}/user/role
```

***Body:***

```json        
{
    "name": "SINGE"
}
```

### 3. Delete

#### Admin permission minimum required

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

### 4. Get All

#### Employee permission minimum required

Get all user roles

***Endpoint:***

```bash
Method: GET
Type: 
URL: {{BASE_URL}}/user/role
```

### 5. Get by Id

#### Employee permission minimum required

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

### 6. Update

#### Admin permission minimum required

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

```json        
{
    "name": "Grand signe"
}
```

---

## Swagger

This project contain a complete swagger test environment to use API, you can access it on `https://domain.example/swagger`

It look FABULOUS :

![image-20210424161611857](images/README/image-20210424161611857.png)