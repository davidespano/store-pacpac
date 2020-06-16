###Prerequisiti:

- Installare node.js 
- installare il pacchetto "react-router-dom".

###Set up:

- Creare un progetto strapi: npx create-strapi-app my-project --quickstart

- Una volta installato creare un utente amministratore.

- Andare su content-types builder e creare il content-type Gioco.
  - Gioco deve contenere i seguenti campi: nome (testo), descrizione (rich text), url (testo), codiceGioco(testo), anteprima(media).

- Creare il content-type Genere.
  - Genere deve avere il campo tipologia(testo).

- Creare il content-type Sviluppatore.
  - Sviluppatore deve avere i campi nome(testo), uuid(testo).

- Andare sul conllection type Gioco 
   - aggiungere il campo genere di tipo "relazione" nel seguente modo:
   
        <img src="https://scontent-fco1-1.xx.fbcdn.net/v/t1.15752-9/104233610_692927291506720_8335634051392451950_n.png?_nc_cat=106&_nc_sid=b96e70&_nc_ohc=TjR1cStSQVsAX-ggZ5S&_nc_ht=scontent-fco1-1.xx&oh=021c459f62cb62d44955c5cc5cd05d46&oe=5F0E8625" width="500" alt="relazione-genere-giochi">
  
   - aggiungere il campo sviluppatore di tipo "relazione" nel seguente modo:
   
        <img src="https://scontent-fco1-1.xx.fbcdn.net/v/t1.15752-9/104241645_266915991391025_5844857991833724937_n.png?_nc_cat=104&_nc_sid=b96e70&_nc_ohc=idnJV21P7HwAX-HOYDR&_nc_ht=scontent-fco1-1.xx&oh=2f274c4ff323f034acddc1a85ca2347d&oe=5F0DD56C" width="500" alt="relazione-svilupatore-giochi">
     

- Andare nella sezione Ruoli e Permessi successivamente su public.
  - In gioco ci devono essere i permessi attivi per create, find, findone, update.
  - Genere deve avere il permesso solamente in find.
  - Sviluppatore deve avere il permesso per create, find, findone.
  - Andare in upload e dare il permesso "upload".

- Creare i generi dei futuri giochi andando in "Genere" e succcessivamente su "Aggiungi nuovo genere".

###Esecuzione:

- Aprire il terminale nella cartella contente il progetto scaricato da questo repository e lanciare il comando: npm start.
- Aprire il terminale nella cartella contenente il progetto creato con strapi e lanciare il comando: npm run develop.


In caso di eventuali problemi con la creazione del progetto strapi consultare la seguente guida [strapi](https://strapi.io/documentation/v3.x/getting-started/quick-start.html#_1-install-strapi-and-create-a-new-project)


