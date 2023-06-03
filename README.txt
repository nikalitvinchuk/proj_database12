1)Skopiuj link do repozytorium z aktualnymi zmianami
2)W programie VisualStudio po otwarciu programu wybierz opcję "Klonuj repozytorium". Wklej skopiowany link i wybierz lokalizacje gdzie lokalnie zapiszesz projekt.
3)Po pobraniu repozytorium w terminalu visualStudio wejdź do katalogu projektu poprzez polecenie cd:/Twoja lokalizacja. Następnie wejdź do folderu api (polecenie cd api) i wpisz polecenie inicjalizujące - npm install
4)Otwórz drugi terminal visualStudio, wejdź do folderu client (cd Lolakizacja_projektu/client) i również uruchom polecenie npm install.
5)Jeśli w trakcie wyskoczą jakieś błędy, zastosuj polecane komendy do instalowania odpowiednuch paczek, które zostaną wymienione w terminalu.
6)Po prawidłowej inicjalizacji projektu z poziomu folderu api wpisz polecenie npm run dev, a z poziomu folderu client - npm run start.
7)W efekcie - w domyślnej przeglądarce otworzy się strona do logowania z możliwością rejestracji.
8)Aby podłączyć bazę danych umożliwiającą poruszanie się po stronie należy pobrać najnowszą wersje xampp, w pliku konfiguravyjnym xamppa my.ini pod # The MySQL server i # The following options will be passed to all MySQL clients zmienić wartość port=3306
9)Pobierz plik pztz.sql z repozytorium. 
10)Po uruchomieniu serewra mysql za pomocą xamppa zaloguj się za pomocą przeglądarki na stronei http://localhost/phpmyadmin/. Następnie utwórz nową bazę danych o nazwie pztz. Importuj pobrany plik pztz.sql. Dla danej bazy dla użytkownik root na localhost należy ustawić hasło 12345678. 
11)Po tym możesz nie mieć dostępu do strony localhos/phpmyadmin. Wtedy należy w folderze xampp odnaleźć plik config.inc.php i zmienić linijkę dopisując hasło 12345678 -  $cfg['Servers'][$i]['password'] = '12345678';
12)Po dokonanych czynnościach można zatrzymać serwer i klient wpisać polecenie npm run dev i npm run start z poziomu tych samych katalogów co wcześniej.
13)Jeśli wszystko zostało wykonane zgodnie z instrukcją możęmy zarejestrować się oraz zalogować się na stronę
14)Aby uzyskać dostęp do funkcjonalności admina bezpośrednio w bazie należy zmienić wartość kolumny isAdmin w tabeli users na True.
