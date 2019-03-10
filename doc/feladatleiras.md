# Projekt Manager App

Az alkalmazás egy hagyományos projekt kezelőt valósít meg. Alapvető funkcióí:
 - Projektek CRUD műveletek
 - Feladat CRUD műveletek, kommentelés lehetősége
 - Üserek CRUD műveletei, projektrészvétel módosítása, feladat hozzárendelés, autentikáció
 
## Projekt

### Attribútumok:
 - Név
 - Leírás
 - Határidő
 - Résztvevők
 
## Feladatok

### Attribútumok
 - Név
 - Leírás
 - Határidő
 - Felelős
 - Projekt
 
## Komment

### Attribútumok
 - User
 - Üzenet
 - Szülő
 - Feladat
 
## User

### Attribútumok
  - Név
  - Email cím
  - Jogkör
  - Jelszó
  
 ## Technikai leírás
 
 Az alkalmazás két fő részből fog állni. Egy Spring Boot alapokra épülő backendből, ami egy REST API-n kereszül fog kommunikálni az
 Angular-ra épülő frontend-el. Az autentikáció JWT-vel fog megtörténni. Implementálásra kerül egy basic ACL is, aminek köszönhetően
 Jogkörökre osztva lehet szabályozni a hozzáférést az alkalmazás különböző funkciójihoz. Az adatokaz Mysql adatbázisban fogja
 tárolni az alkalmazás. A projekthez gradle-t és npm-et fogunk használni a dependenciák megfelelő kezelése érdekében.
 ### Tesztelés
 A tesztelést korlátozzuk a Unit tesztek szintjére (Integrációs teszteléstől eltekintünk). A unit teszteket JUnit segítségével írjuk
 backend oldalon míg Jasmine test framework-el frontend oldalon.
 
