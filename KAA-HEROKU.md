# Heroku lietošana

## Konta un app izveide

1. Izveido Heroku kontu
1. Apstiprina konta izveidi no reģistrētā e-pasta
1. [Heroku dashboardā](https://dashboard.heroku.com/apps) izvēlas "Create new app"
1. Izveido nosaukumu - šis nosaukums būs webadreses sastāvdaļa, izvēlieties kaut ko atbilstošu projektam, piemēram "mans-chats"
1. Izvēlas reģionu - Europe
1. Nospiez "Create App"

## App savienošana ar GitHub

1. Jaunizveidotās aplikācijas tabā "Deploy" atrod sadaļu "Deployment method" un izvēlas GitHub (Connect to GitHub).
1. Pievieno savu GitHub repozitoriju, pārbauda, ka pareizais repozitorijs rādās sadaļā "App connected to GitHub"
1. Sadaļā "Automatic deploys" pārbauda, ka ir izvēlēts zars "master" un nospiez "Enable Automatic deploys" - tagad pēc katrs commit vai merge uz *master* zaru tiks automātiski palaists uz Heroku servera (paiet apmēram 30-60 sekundes)

## Kā pārbaudīt darbību

1. Tabā "Deploy" sadaļā "Manual deploy" nospiezam "Deploy" un pagaidām
1. Ja parādās ziņa "Your app was successfully deployed.", nospiezam pogu "Open App" labajā augšējā stūrī.
1. Ja viss strādā - urā!
1. Ja rāda kļūdu, Heroku lapā nospiezam labajā augšējā stūrī uz pogas "More" un izvēlamies "View Logs".
