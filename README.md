Prerequisiti:

Installare node.js.

Set up:

Creare un progetto strapi: npx create-strapi-app my-project --quickstart

Una volta installato creare un utente amministratore.

Andare su content-types builder e creare il content-type Gioco.
Gioco deve contenere i seguenti campi: nome (testo), descrizione (rich text), url (testo), codiceGioco(testo), anteprima(media).

Creare il content-type Genere.
Genere deve avere il campo tipologia(testo).

Creare il content-type Sviluppatore.
Sviluppatore deve avere i campi nome(testo), uuid(testo).

Andare sul conllection type Gioco, e aggiungere i campi genere di tipo "relazione" relazione con Genere dove genere ha molti Giochi) e sviluppatore (relazione con Sviluppatore dove Sviluppatore ha molti Giochi).

Andare nella sezione Ruoli e Permessi successivamente su public.
In gioco ci devono essere i permessi attivi per create, find, findone, update.
Genere deve avere il permesso solamente in find.
Sviluppatore deve avere il permesso per create, find, findone.
Andare in upload e dare il permesso "upload".

Creare i generi dei futuri giochi andando in "Genere" e succcessivamente su "Aggiungi nuovo genere".

Esecuzione:

Aprire il terminale nella cartella contente il progetto scaricato da questo repository e lanciare il comando: npm start.
Aprire il terminale nella cartella contenente il progetto creato con strapi e lanciare il comando: npm run develop.


In caso di eventuali problemi con la creazione del progetto strapi consultare la seguente guida:
https://strapi.io/documentation/v3.x/getting-started/quick-start.html#_1-install-strapi-and-create-a-new-project

