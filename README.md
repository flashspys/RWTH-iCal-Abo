#RWTH-iCal-Abo


Das ist ein kleines Skript, um den Kalender, der in CampusOffice als Datei exportiert werden kann, abonnementfähig zu machen. So kann dein Kalender mögliche Änderungen direkt übernehmen.

##Installation

Benötigt ist ein NodeJS-Server. Zudem erfordert es das Plugin 'needle' welches über npm heruntergeladen werden kann. Zudem ist ein Dienst wie 'forever' (ebenfalls im npm erhältlich) sinnvoll.
Einfach das Skript starten. Danach kann in einem beliebigen Kalender (bisher nur getestet im OS X Kalender) folgender Link genutzt werden:

> ht<span></span>tp://example.org:2014?username=MATRIKELNUMMMER&password=PASSWORT

Dein Kalenderprogramm wird nun immer den aktuellsten Stand deiner Termine anzeigen.
