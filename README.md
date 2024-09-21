# BazePodatakaWeb
BazePodatakaWeb

1. Description

This is a Pizza Delivery Shop web application project developed for the "Baze Podataka" (Database) course at the Faculty of Natural Sciences and Mathematics. The main goal of this project was to practice working with MySQL databases, and as a final task, we integrated a Node.js web application that interacts with the database.

The project consists of the following functionalities:

    Form-Based Report Generation:
        A web form allows users to input specific parameters to query the database, which then generates a report based on MySQL stored procedures.

    Product Display Page:
        Displays all available products (pizzas) with their images fetched from the database.

    API Endpoint for Order Status:
        An API that retrieves the status of an order by querying the narudzba (order) and isporuka (delivery) tables. The statuses could be like 'Ordered', 'In Delivery', etc.

    API for Vehicle Management:
        GET, POST, and DELETE API endpoints for managing vehicle assignments (e.g., delivery vehicles) using vozila (vehicle) tables in the database.

Tehnologies:
  Node.js
  EJS
  MySQL database

2. Setup

Clone the repository:

bash

	git clone https://github.com/yourusername/BazePodatakaWeb.git
	cd BazePodatakaWeb

Install dependencies:

bash

    npm install

Create the .env file:

Inside the project root, create a .env file with the following structure:

bash

    DB_HOST=your_database_host
    DB_USER=your_database_user
    DB_PASSWORD=your_database_password
    DB_DATABASE=your_database_name
    DB_PORT=your_database_port

Note: Replace the placeholders with your actual database credentials.

Run the application:

bash

    npm start

Access the web application: After running the application, open your browser and go to http://localhost:3000.

SQL Database Structure

To set up your database, you will need to run SQL queries for creating the necessary tables, triggers, and stored procedures. Below is an example template that you can replace with your specific SQL logic:

sql
	  Iteracija 1:
	  
	  create table proizvodi (
	    
	    proizvod_id int not null auto_increment primary key,
	    
	    naziv_proizvoda varchar(255) not null,
	    
	    opis_proizvoda text not null,
	    
	    slika_proizvoda longblob,
	    
	    cijena_proizvoda decimal(10,2) not null,
	    
	    kategorija_id int not null,
	    
	    foreign key (kategorija_id) references kategorije(kategorija_id)
	
	);
	
	create table kategorije (
	 
	    kategorija_id int not null auto_increment primary key,
	    
	    naziv_kategorije varchar(255) not null,
	    
	    opis_kategorije text not null
	
	);
	
	create table narudzbe (
	
	    narudzba_id int not null auto_increment primary key,
	    
	    datum_vrijeme_narudzbe datetime not null,
	    
	    ime_narucioca varchar(255) not null,
	    
	    prezime_narucioca varchar(255) not null,
	    
	    adresa_narucioca varchar(255) not null,
	    
	    grad_narucioca varchar(255) not null,
	    
	    kontakt_telefon_narudzbe varchar(20) not null
	
	);
	
	create table stavke_narudzbe (
	
	    stavka_narudzbe_id int not null auto_increment primary key,
	    
	    proizvod_id int not null,
	    
	    narudzba_id int not null,
	    
	    redni_broj_proizvoda int not null,
	    
	    kolicina_proizvoda int not null,
	    
	    foreign key (proizvod_id) references proizvodi(proizvod_id),
	    
	    foreign key (narudzba_id) references narudzbe(narudzba_id),
	    
	    unique key(narudzba_id, redni_broj_proizvoda)
	
	);
	
	insert into proizvodi (naziv_proizvoda, opis_proizvoda, cijena_proizvoda, kategorija_id)
	values 
	
	    ('margarita', 'klasična pizza s umakom od rajčice, mozzarellom i origanom.', 10.00, 1),
	    
	    ('quattro formaggi', 'pizza s četiri vrste sira: mozzarella, gorgonzola, ementaler i parmezan.', 12.50, 1),
	    
	    ('nutella palačinka', 'palačinka s nutellom i komadićima banane.', 7.00, 2),
	    
	    ('coca-cola', 'gazirani napitak s okusom cola.', 2.50, 3),
	    
	    ('capricciosa', 'pizza s umakom od rajčice, mozzarellom, šunkom, gljivama i maslinama.', 11.50, 1),
	    
	    ('nutella-banana palačinka', 'palačinka s nutellom, komadićima banane i preljevom od čokolade.', 8.00, 2),
	    
	    ('pepsi', 'gazirani napitak s okusom cola.', 2.50, 3),
	    
	    ('veggie delight', 'pizza bogata povrćem i aromatičnim začinima.', 12.00, 1),
	    
	    ('chicken bbq', 'pizza s pilećim mesom, bbq umakom i crvenim lukom.', 13.00, 1),
	    
	    ('strawberry delight palačinka', 'palačinka s svježim jagodama i šlagom.', 9.00, 2);
	
	alter table proizvodi auto_increment = 1;
	    
	insert into kategorije (naziv_kategorije, opis_kategorije)
	values 
	
	    ('pizze', 'raznovrsne vrste pizza za svaki ukus.'),
	    
	    ('palačinke', 'slatke i slane palačinke za svaku prigodu.'),
	    
	    ('bezalkoholna pića', 'osvježavajući napici koji idu uz vašu omiljenu pizzu.');
	
	insert into narudzbe (datum_vrijeme_narudzbe, ime_narucioca, prezime_narucioca, adresa_narucioca, grad_narucioca, kontakt_telefon_narudzbe)
	values 
	
	    ('2023-10-31 12:00:00', 'ivan', 'ivić', 'adresa 123', 'grad', '1234567890'),
	    
	    ('2023-11-01 18:30:00', 'ana', 'anić', 'adresa 456', 'grad', '0987654321'),
	    
	    ('2023-11-02 20:00:00', 'marko', 'marković', 'adresa 789', 'grad', '0912345678');
	
	insert into stavke_narudzbe (proizvod_id, narudzba_id, redni_broj_proizvoda, kolicina_proizvoda)
	values
	
	    (1, 1, 1, 2),
	    
	    (2, 1, 2, 1),
	    
	    (3, 2, 1, 2),
	    
	    (6, 2, 2, 1),
	    
	    (5, 3, 1, 3),
	    
	    (8, 3, 2, 2),
	    
	    (3, 3, 3, 2);
	
	update narudzbe
	
	set ime_narucioca = "Asmir", prezime_narucioca = "Zukic", adresa_narucioca = "Ferhadija 143", grad_narucioca = "Sarajevo"
	
	where narudzba_id = 1;
	
	update narudzbe
	
	set ime_narucioca = "Bakir", prezime_narucioca = "Musovic", adresa_narucioca = "Prote Bakovića 23", grad_narucioca = "Sarajevo"
	
	where narudzba_id = 2;
	
	update narudzbe
	
	set ime_narucioca = "Amina", prezime_narucioca = "Hodzic", adresa_narucioca = "Vrbovska 4", grad_narucioca = "Sarajevo"
	
	where narudzba_id = 3;
	
	Iteracija 2:
	
	create table vozila (
	
	    vozilo_id int not null auto_increment primary key,
	    
	    naziv_vozila varchar(255) not null,
	    
	    tip_vozila varchar(255) not null
	
	);
	
	create table dostavljaci (
	
	    dostavljac_id int not null auto_increment primary key,
	    
	    ime_dostavljaca varchar(255) not null,
	    
	    prezime_dostavljaca varchar(255) not null
	
	);
	
	/* This table is not in use
	
	create table vozila_dostavljaci (
	
	    vozilo_id int not null,
	    
	    dostavljac_id int not null,
	    
	    primary key(vozilo_id, dostavljac_id),
	    
	    foreign key (vozilo_id) references vozila(vozilo_id),
	    
	    foreign key (dostavljac_id) references dostavljaci(dostavljac_id)
	
	);
	
	*/
	
	create table prijave (
	
	    prijava_id int not null auto_increment primary key,
	    
	    dostavljac_id int not null,
	    
	    datum_vrijeme_prijave datetime not null,
	    
	    prijava_odjava enum('P', 'O') not null,
	    
	    foreign key (dostavljac_id) references dostavljaci(dostavljac_id)
	
	);
	
	create view aktivni_dostavljaci as
	
	select p1.prijava_id, p1.dostavljac_id, p1.datum_vrijeme_prijave, p1.prijava_odjava
	
	from prijave p1
	
	join (
	
	    select dostavljac_id, MAX(datum_vrijeme_prijave) as max_datum_vrijeme
	    
	    from prijave
	    
	    group by dostavljac_id
	
	) p2
	
	on p1.dostavljac_id = p2.dostavljac_id and p1.datum_vrijeme_prijave = p2.max_datum_vrijeme
	
	where p1.prijava_odjava = 'P';
	
	create table zaduzenja_vozila (
	
	    zaduzenje_vozila_id int not null auto_increment primary key,
	    
	    dostavljac_id int not null,
	    
	    vozilo_id int not null,
	    
	    datum_vrijeme_zaduzenja datetime not null,
	    
	    datum_vrijeme_razduzenja datetime,
	    
	    foreign key (dostavljac_id) references dostavljaci(dostavljac_id)
	
	);
	
	create view proizvodi_sa_kategorijom as
	
	select p.*, k.naziv_kategorije
	
	from proizvodi p
	
	inner join kategorije k on p.kategorija_id = k.kategorija_id;
	
	alter table zaduzenja_vozila
	
	add foreign key (vozilo_id) references vozila(vozilo_id);
	
	insert into vozila (naziv_vozila, tip_vozila)
	values 
	
	    ('Bicikl 1', 'bicikl'),
	    
	    ('Automobil 1', 'vozilo'),
	    
	    ('Bicikl 2', 'bicikl'),
	    
	    ('Automobil 2', 'vozilo'),
	    
	    ('Skuter 1', 'vozilo'),
	    
	    ('Bicikl 3', 'bicikl'),
	    
	    ('Automobil 3', 'vozilo');
	
	insert into dostavljaci (ime_dostavljaca, prezime_dostavljaca)
	values 
	
	    ('Dostavljač 1', 'Prezime 1'), 
	    
	    ('Dostavljač 2', 'Prezime 2'),
	    
	    ('Dostavljač 3', 'Prezime 3'),
	    
	    ('Dostavljač 4', 'Prezime 4'),
	    
	    ('Dostavljač 5', 'Prezime 5'),
	    
	    ('Dostavljač 6', 'Prezime 6'),
	    
	    ('Dostavljač 7', 'Prezime 7'),
	    
	    ('Dostavljač 8', 'Prezime 8');
	
	insert into vozila_dostavljaci (vozilo_id, dostavljac_id)
	values 
	
	    (1, 1),
	    
	    (2, 2),
	    
	    (3, 3),
	    
	    (4, 4),
	    
	    (5, 5),
	    
	    (6, 6),
	    
	    (7, 7),
	    
	    (1, 8);
	
	insert into prijave (dostavljac_id, datum_vrijeme_prijave, prijava_odjava)
	values 
	
	    (1, '2023-11-05 08:00:00', 'P'),
	    
	    (2, '2023-11-05 09:30:00', 'P'),
	    
	    (3, '2023-11-05 11:00:00', 'P'),
	    
	    (4, '2023-11-05 12:30:00', 'P'),
	    
	    (5, '2023-11-05 14:00:00', 'P'),
	    
	    (6, '2023-11-05 15:30:00', 'P'),
	    
	    (7, '2023-11-05 17:00:00', 'P'),
	    
	    (8, '2023-11-05 18:30:00', 'P'),
	    
	    (1, '2023-11-05 20:00:00', 'O'), 
	    
	    (2, '2023-11-05 21:30:00', 'O'), 
	    
	    (3, '2023-11-05 21:00:00', 'O'), 
	    
	    (4, '2023-11-05 22:30:00', 'O'), 
	    
	    (5, '2023-11-05 23:45:00', 'O'), 
	    
	    (6, '2023-11-06 00:15:00', 'O');
	
	insert into zaduzenja_vozila (dostavljac_id, vozilo_id, datum_vrijeme_zaduzenja, datum_vrijeme_razduzenja)
	values 
	    (1, 1, '2023-11-05 08:00:00', '2023-11-05 12:00:00'),
	    
	    (2, 2, '2023-11-05 09:30:00', '2023-11-05 14:00:00'),
	    
	    (3, 3, '2023-11-05 11:00:00', '2023-11-05 16:00:00'),
	    
	    (4, 4, '2023-11-05 12:30:00', '2023-11-05 17:00:00'),
	    
	    (5, 5, '2023-11-05 14:00:00', '2023-11-05 18:00:00'),
	    
	    (6, 1, '2023-11-05 15:30:00', '2023-11-05 19:00:00'),
	    
	    (7, 2, '2023-11-05 17:00:00', '2023-11-05 20:30:00'),
	    
	    (8, 3, '2023-11-05 18:30:00', '2023-11-05 22:00:00');
	
	update dostavljaci
	
	set ime_dostavljaca = "Edin", prezime_dostavljaca = "Kalaba"
	
	where dostavljac_id = 1;
	
	update dostavljaci
	
	set ime_dostavljaca = "Ensar", prezime_dostavljaca = "Horozovic"
	
	where dostavljac_id = 2;
	
	update dostavljaci
	
	set ime_dostavljaca = "Hamza", prezime_dostavljaca = "Delic"
	
	where dostavljac_id = 3;
	
	update dostavljaci
	
	set ime_dostavljaca = "Emina", prezime_dostavljaca = "Besic"
	
	where dostavljac_id = 4;
	
	update dostavljaci
	
	set ime_dostavljaca = "Belmin", prezime_dostavljaca = "Muratovic"
	
	where dostavljac_id = 5;
	
	update dostavljaci
	
	set ime_dostavljaca = "Ajla", prezime_dostavljaca = "Mekic"
	
	where dostavljac_id = 6;
	
	update dostavljaci
	
	set ime_dostavljaca = "Amar", prezime_dostavljaca = "Osmanovic"
	
	where dostavljac_id = 7;
	
	update dostavljaci
	
	set ime_dostavljaca = "Denis", prezime_dostavljaca = "Zubovic"
	
	where dostavljac_id = 8;
	
	Iteracija 3:
	
	create table isporuke (
	
	    isporuka_id int not null auto_increment primary key,
	    
	    narudzba_id int not null,
	    
	    dostavljac_id int not null,
	    
	    datum_vrijeme_dodjele datetime not null,
	    
	    datum_vrijeme_zavrsetka datetime,
	    
	    status_isporuke boolean not null,
	    
	    foreign key (narudzba_id) references narudzbe(narudzba_id),
		
	    foreign key (dostavljac_id) references dostavljaci(dostavljac_id)
	
	);
	
	insert into isporuke (narudzba_id, dostavljac_id, datum_vrijeme_dodjele, datum_vrijeme_zavrsetka, isporuceno)
	values
	
	    (1, 1, '2023-11-10 13:30:00', '2023-11-10 14:15:00', true),
	    
	    (2, 2, '2023-11-11 15:45:00', null, false),
	    
	    (3, 3, '2023-11-12 17:30:00', null, false);
	
	alter table prijave
	
	add column datum_vrijeme_odjave datetime after datum_vrijeme_prijave;
	
	update prijave
	
	set datum_vrijeme_odjave = '2023-11-05 09:00:00' where dostavljac_id = 1;
	
	update prijave
	
	set datum_vrijeme_odjave = '2023-11-05 11:00:00' where dostavljac_id = 2;
	
	update prijave
	
	set datum_vrijeme_odjave = '2023-11-05 13:00:00' where dostavljac_id = 3;
	
	update prijave
	
	set datum_vrijeme_odjave = '2023-11-05 15:00:00' where dostavljac_id = 4;
	
	update prijave
	
	set datum_vrijeme_odjave = '2023-11-05 17:00:00' where dostavljac_id = 5;
	
	update prijave
	
	set datum_vrijeme_odjave = '2023-11-05 19:00:00' where dostavljac_id = 6;
	
	update prijave
	
	set datum_vrijeme_odjave = '2023-11-05 21:00:00' where dostavljac_id = 7;
	
	update prijave
	
	set datum_vrijeme_odjave = '2023-11-05 23:00:00' where dostavljac_id = 8;
	
	update prijave
	
	set
	
	  datum_vrijeme_prijave = datum_vrijeme_odjave,
	  
	  datum_vrijeme_odjave = datum_vrijeme_prijave
	
	  where datum_vrijeme_odjave < datum_vrijeme_prijave;
	    
	-- procedura za dostavljače koji nisu bili zaduženi
	
	select * from zaduzenja_vozila;
	
	delete from zaduzenja_vozila where zaduzenje_vozila_id = 8;
	
	show procedure status;
	
	delimiter //
	
	create procedure DostavljaciBezZaduzenjaUPeriodu(in datum_i_vrijeme_pocetak datetime, in datum_i_vrijeme_kraj datetime)
	
	begin
	
	    select d.dostavljac_id, d.ime_dostavljaca, d.prezime_dostavljaca, p.datum_vrijeme_prijave, p.datum_vrijeme_odjave
	    
	    from dostavljaci d
	    
	    left join prijave p on d.dostavljac_id = p.dostavljac_id
	    
	    left join zaduzenja_vozila z on d.dostavljac_id = z.dostavljac_id
	    
	    where p.datum_vrijeme_prijave between datum_i_vrijeme_pocetak and datum_i_vrijeme_kraj
	    
	      and p.datum_vrijeme_odjave is not null
	      
	      and z.dostavljac_id is null;
	
	end //
	
	delimiter ;
	
	call DostavljaciBezZaduzenjaUPeriodu('2023-11-05 00:00:00', '2023-11-06 00:00:00');
	
	-- procedura za dostavljače koji su bili zaduženi
	
	delimiter //
	
	create procedure DostavljaciZaduzeniUPeriodu(in datum_i_vrijeme_pocetak datetime, in datum_i_vrijeme_kraj datetime)
	
	begin
	
	    select distinct d.dostavljac_id, d.ime_dostavljaca, d.prezime_dostavljaca
	    
	    from dostavljaci d
	    
	    inner join zaduzenja_vozila z on d.dostavljac_id = z.dostavljac_id
	    
	    inner join isporuke i on d.dostavljac_id = i.dostavljac_id
	    
	    inner join narudzbe n on i.narudzba_id = n.narudzba_id
	    
	    where i.datum_vrijeme_dodjele between datum_i_vrijeme_pocetak and datum_i_vrijeme_kraj;
	
	end //
	
	delimiter ;
	
	call DostavljaciZaduzeniUPeriodu('2023-11-10 00:00:00', '2023-11-11 16:00:00');
	
	-- procedura za listu dostavljača sa dodatnim podacima
	
	drop procedure ListaDostavljacaSaPodacima;
	
	DELIMITER //
	
	create procedure ListaDostavljacaSaPodacima(in datumVrijeme datetime)
	
	begin
	
	    select
	    
		d.dostavljac_id as 'Šifra dostavljača',
	        
		d.ime_dostavljaca as 'Ime',
	        
		d.prezime_dostavljaca as 'Prezime',
	        
		min(case when p.prijava_odjava = 'P' then p.datum_vrijeme_prijave end) as 'Vrijeme prve prijave',
	        
		max(case when p.prijava_odjava = 'O' then p.datum_vrijeme_odjave end) as 'Vrijeme posljednje odjave',
	        
		count(case when p.prijava_odjava = 'P' then 1 end) as 'Broj prijava',
	        
		count(case when p.prijava_odjava = 'O' then 1 end) as 'Broj odjava',
	        
		timediff(max(case when p.prijava_odjava = 'O' then p.datum_vrijeme_odjave end), min(case when p.prijava_odjava = 'P' then p.datum_vrijeme_prijave end)) as 'Broj aktivnih sati',
	        
		count(distinct i.isporuka_id) as 'Broj zaduženih narudžbi',
	        
		count(distinct case when i.status_isporuke = 1 then i.isporuka_id end) as 'Broj isporučenih narudžbi',
	        
		count(distinct case when i.status_isporuke = 0 then i.isporuka_id end) as 'Broj neisporučenih narudžbi'
	    
	    from
	    
	        dostavljaci d
	    
	    left join
	    
		prijave p on d.dostavljac_id = p.dostavljac_id and date(p.datum_vrijeme_prijave) = p_date
	    
	    left join
	    
		isporuke i on d.dostavljac_id = i.dostavljac_id and date(i.datum_vrijeme_dodjele) = p_date
	    
	    where
	    
		date(p.datum_vrijeme_prijave) = p_date or date(p.datum_vrijeme_odjave) = p_date
	    
	    group by
	    
		d.dostavljac_id;
		
	 
	 end //
	
	delimiter ;
	
	call ListaDostavljacaSaPodacima('2023-11-15 00:00:00');
	
	Iteracija 4:
	
	-- Kreiranje tabele kupci i dodatni unos podataka u sve tabele 
	
	create table kupci (
	
	    kupac_id int not null auto_increment primary key,
	    
	    ime_kupca varchar(255) not null,
	    
	    prezime_kupca varchar(255) not null,
	    
	    adresa_kupca varchar(255) not null,
	    
	    grad_kupca varchar(255) not null,
	    
	    kontakt_telefon_kupca varchar(20) not null
	
	);
	
	insert into kupci (ime_kupca, prezime_kupca, adresa_kupca, grad_kupca, kontakt_telefon_kupca)
	
	select distinct ime_narucioca, prezime_narucioca, adresa_narucioca, grad_narucioca, kontakt_telefon_narudzbe
	
	from narudzbe;
	
	select * from kupci;
	
	alter table narudzbe
	
	add column kupac_id int not null;
	
	update narudzbe n
	
	join kupci k on n.ime_narucioca = k.ime_kupca
	
	and n.prezime_narucioca = k.prezime_kupca
	
	and n.adresa_narucioca = k.adresa_kupca
	
	and n.grad_narucioca = k.grad_kupca
	
	and n.kontakt_telefon_narudzbe = k.kontakt_telefon_kupca
	
	set n.kupac_id = k.kupac_id;
	
	alter table narudzbe
	
	add foreign key (kupac_id) references kupci(kupac_id);



	insert into proizvodi (naziv_proizvoda, opis_proizvoda, cijena_proizvoda, kategorija_id)
	values 
	
	    ('green smoothie', 'zdravi smoothie s voćem i povrćem.', 5.00, 3),
	    
	    ('iced coffee', 'ledena kava s mlijekom.', 3.00, 3),
	    
	    ('spinach and feta pizza', 'pizza s umakom od rajčice, mozzarellom, špinatom i feta sirom.', 11.00, 1),
	    
	    ('chocolate hazelnut palačinka', 'palačinka s čokoladno-lješnjaknim namazom.', 9.00, 2),
	    
	    ('chocolate milkshake', 'čokoladni milkshake s tučenim vrhnjem.', 4.50, 3),
	    
	    ('orange juice', 'svjezi cjedjeni sok od narandze', 3.00, 3),
	    
	     ('lemonade', 'osvjezavajuci sok od limuna', 2.50, 3),
	     
	     ('seafood delight pizza', 'pizza s umakom od bijelog luka, mozzarellom, morskim plodovima i kaparima.', 13.50, 1),
	     
	     ('green tea', 'zeleni caj', 2.50, 3),
	     
	     ('blueberry delight palačinka', 'palačinka s svježim borovnicama i šlagom.', 8.50, 2),
	     
	     ('pesto veggie pizza', 'pizza s umakom od pesto umaka, mozzarellom i raznim povrćem.', 11.50, 1),
	    
	     ('apple cinnamon palačinka', 'palačinka s komadićima jabuke i cimetom.', 7.50, 2),
	     
	     ('pizza funghi', 'pizza s umakom od rajčice, mozzarellom, šampinjonima i origanom.', 11.00, 1),
	    
	    ('hawaiian pizza', 'pizza sa umakom od paradajza, mozzarelom, ćuretinom i anansaom', 12.50, 1),
	    
	    ('banana walnut palačinka', 'palačinka s bananama i orasima.', 8.00, 2),
	    
	     ('iced coffee', 'ledena kava s mlijekom.', 3.00, 3),
	     
	     ('fruit smoothie', 'izblendani smoothie sa voćem i jogurtom', 5.50, 3);
    	
	insert into narudzbe (datum_vrijeme_narudzbe, kupac_id)
	values 
	    
	    ('2023-11-03 14:30:00', 4),
	    
	    ('2023-11-04 17:00:00', 5),
	    
	    ('2023-11-05 19:30:00', 6),
	    
	    ('2023-11-06 12:15:00', 7),
	    
	    ('2023-11-07 08:45:00', 8),
	    
	    ('2023-11-08 21:30:00', 9),
	    
	    ('2023-11-09 15:00:00', 10),
	    
	    ('2023-11-10 18:45:00', 11),
	    
	    ('2023-11-11 20:30:00', 12),
	    
	    ('2023-11-12 11:15:00', 13),
	    
	    ('2023-11-13 07:45:00', 14),
	    
	    ('2023-11-14 19:30:00', 15),
	    
	    ('2023-11-15 14:00:00', 16),
	    
	    ('2023-11-16 16:45:00', 17),
	    
	    ('2023-11-17 10:30:00', 18),
	    
	    ('2023-11-18 22:15:00', 19),
	    
	    ('2023-11-19 11:00:00', 20),
	    
	    ('2023-11-20 13:45:00', 21);

	insert into kupci (ime_kupca, prezime_kupca, adresa_kupca, grad_kupca, kontakt_telefon_kupca)
	values 
	
	    ('Amir', 'Ahmetović', 'Branilaca Sarajeva 12', 'Sarajevo', '0987654321'),
	    
	    ('Lejla', 'Hodžić', 'Marsala Tita 8', 'Zenica', '0912345678'),
	    
	    ('Adnan', 'Mujić', 'Alije Nametka 33', 'Tuzla', '0654321098'),
	    
	    ('Emina', 'Hadžić', 'Zmaja od Bosne 15', 'Sarajevo', '0712345678'),
	    
	    ('Amar', 'Hasić', 'Šehida Đaferovića 42', 'Zenica', '0998765432'),
	    
	    ('Selma', 'Bećirović', 'Titova 25', 'Tuzla', '0678901234'),
	    
	    ('Haris', 'Suljić', 'Mehmeda Spahe 9', 'Sarajevo', '0987654321'),
	    
	    ('Amila', 'Dedić', 'Fra Grge Martića 17', 'Zenica', '0912345678'),
	    
	    ('Adis', 'Delalić', 'Zvornička 8', 'Tuzla', '0654321098'),
	    
	    ('Amina', 'Makić', 'Aleja Bosne Srebrene 33', 'Sarajevo', '0712345678'),
	    
	    ('Adnan', 'Smajlović', 'Sutjeska 15', 'Zenica', '0998765432'),
	    
	    ('Lejla', 'Begić', 'Slatinska 2', 'Tuzla', '0678901234'),
	    
	    ('Faruk', 'Ljubijankić', 'Pehlivanuša 7', 'Sarajevo', '0987654321'),
	    
	    ('Selma', 'Agić', 'Kralja Tomislava 12', 'Zenica', '0912345678'),
	    
	    ('Haris', 'Husagić', 'Brčanska 25', 'Tuzla', '0654321098'),
	    
	    ('Amra', 'Pandžić', 'Titova 7', 'Sarajevo', '0712345678'),
	    
	    ('Adnan', 'Mahmutović', 'Kulin Ban 22', 'Zenica', '0998765432'),
	    
	    ('Lejla', 'Suljić', 'Fra Anđela Zvizdovića 18', 'Tuzla', '0678901234');

	insert into stavke_narudzbe (proizvod_id, narudzba_id, redni_broj_proizvoda, kolicina_proizvoda)
	values
	
	    (12, 4, 1, 2),
	    
	    (24, 4, 2, 1),
	    
	    (7, 4, 3, 2),
	    
	    (15, 4, 4, 1),
	    
	    (19, 5, 1, 3),
	    
	    (26, 5, 2, 2),
	    
	    (3, 5, 3, 2),
	    
	    (6, 6, 1, 2),
	    
	    (9, 6, 2, 1),
	    
	    (1, 7, 1, 3),
	    
	    (4, 7, 2, 1),
	    
	    (23, 7, 3, 1),
	    
	    (13, 8, 1, 2),
	    
	    (11, 9, 1, 1),
	    
	    (19, 9, 2, 1),
	    
	    (18, 10, 1, 2),
	    
	    (6, 10, 2, 1),
	    
	    (2, 10, 3, 3),
	    
	    (7, 11, 1, 1),
	    
	    (14, 11, 2, 2),
	    
	    (21, 12, 1, 2),
	    
	    (12, 12, 2, 2),
	    
	    (5, 12, 3, 1),
	    
	    (22, 12, 4, 3),
	    
	    (25, 13, 1, 1),
	    
	    (27, 13, 2, 1),
	    
	    (13, 14, 1, 2),
	    
	    (12, 15, 1, 1),
	    
	    (4, 15, 2, 1),
	    
	    (7, 15, 3, 2),
	    
	    (3, 15, 4, 1),
	    
	    (23, 15, 5, 3),
	    
	    (15, 16, 1, 1),
	    
	    (16, 16, 2, 2),
	    
	    (18, 17, 1, 2),
	    
	    (10, 17, 2, 2),
	    
	    (14, 17, 3, 1),
	    
	    (12, 18, 1, 3),
	    
	    (15, 18, 2, 1),
	    
	    (11, 18, 3, 1),
	    
	    (25, 19, 1, 2),
	    
	    (12, 19, 2, 1),
	    
	    (14, 20, 1, 1),
	    
	    (16, 20, 2, 2),
	    
	    (1, 20, 3, 1),
	    
	    (4, 20, 4, 3),
	    
	    (22, 21, 1, 1),
	    
	    (19, 21, 2, 2),
	    
	    (3, 21, 3, 2);

	insert into vozila (naziv_vozila, tip_vozila) values
	     ('Skuter 2', 'vozilo');
	
	update vozila set tip_vozila = 'automobil' where vozilo_id in (2, 4, 7);
	
	update vozila set tip_vozila = 'skuter' where vozilo_id in (5, 8);
 
	insert into isporuke (narudzba_id, dostavljac_id, datum_vrijeme_dodjele, datum_vrijeme_zavrsetka, status_isporuke)
	values

	    (4, 4, '2023-11-05 14:00:00', '2023-11-05 16:00:00', true),
	    
	    (5, 5, '2023-11-05 18:45:00', '2023-11-05 18:00:00', true),
	    
	    (6, 6, '2023-11-15 20:30:00', '2023-11-06 12:00:00', true),
	    
	    (7, 7, '2023-11-16 11:15:00', null, false),
	    
	    (8, 8, '2023-11-17 19:00:00', null, false),
	    
	    (9, 1, '2023-11-05 15:30:00', '2023-11-05 19:00:00', true),
	    
	    (10, 2, '2023-11-19 22:00:00', null, false),
	    
	    (11, 3, '2023-11-05 16:45:00', '2023-11-06 12:30:00', true),
	    
	    (12, 4, '2023-11-21 14:30:00', null, false),
	    
	    (13, 5, '2023-11-22 10:15:00', null, false),
	    
	    (14, 6, '2023-11-06 12:00:00', '2023-11-05 14:00:00', true),
	    
	    (15, 7, '2023-11-24 18:30:00', null, false),
	    
	    (16, 8, '2023-11-25 21:00:00', null, false),
	    
	    (17, 1, '2023-11-06 13:45:00', '2023-11-06 15:30:00', true),
	    
	    (18, 2, '2023-11-06 17:30:00', '2023-11-05 09:30:00', true),
	    
	    (19, 3, '2023-11-05 19:15:00', '2023-11-06 10:00:00', true),
	    
	    (20, 4, '2023-11-06 14:45:00', '2023-11-05 14:00:00', true),
	    
	    (21, 7, '2023-11-29 14:45:00', null, false);

-- IV iteracija projekta -> Procedure & Triggeri

-- Procedure: 

-- a) Prodaja proizvoda za period (od datuma - do datuma):

	delimiter //
	
	create procedure ProdajaProizvodaZaPeriod(in od_datuma date, in do_datuma date)
	
	begin
	
	    select sn.proizvod_id, p.naziv_proizvoda, sum(sn.kolicina_proizvoda) as ukupna_kolicina
	    
	    from stavke_narudzbe sn
	    
	    join narudzbe n on sn.narudzba_id = n.narudzba_id
	    
	    join proizvodi p on sn.proizvod_id = p.proizvod_id
	    
	    where date(n.datum_vrijeme_narudzbe) between od_datuma and do_datuma
	    
	    group by sn.proizvod_id, p.naziv_proizvoda;
	
	end //
	
	delimiter ;
	
	call ProdajaProizvodaZaPeriod('2023-11-05', '2023-11-06');

-- b) Prodaja po kupcima za period:

	delimiter //
	
	create procedure ProdajaPoKupcimaZaPeriod(in od_datuma date, in do_datuma date)
	
	begin
	
	    select n.kupac_id, k.ime_kupca, k.prezime_kupca, count(n.narudzba_id) as broj_narudzbi
	    
	    from narudzbe n
	    
	    join kupci k on n.kupac_id = k.kupac_id
	    
	    where date(n.datum_vrijeme_narudzbe) between od_datuma and do_datuma
	    
	    group by n.kupac_id, k.ime_kupca, k.prezime_kupca;
	
	end //
	
	delimiter ;
	
	call ProdajaPoKupcimaZaPeriod('2023-11-05', '2023-11-06');

-- c) Lista narudžbi koje nisu isporučene:

	delimiter //
	
	create procedure ListaNarudzbiKojeNisuIsporucene()
	
	begin
	
	    select n.narudzba_id, n.datum_vrijeme_narudzbe, k.ime_kupca, k.prezime_kupca
	    
	    from narudzbe n
	    
	    left join isporuke i on n.narudzba_id = i.narudzba_id
	    
	    left join kupci k on n.kupac_id = k.kupac_id
	    
	    where i.status_isporuke = false;
	
	end //
	
	delimiter ;
	
	call ListaNarudzbiKojeNisuIsporucene;

-- d) Lista narudžbi koje su isporučene sa vremenom većim od n minuta:

	delimiter //
	
	create procedure ListaIsporucenihNarudzbiSaVremenom(in n int, in od_datuma date, in do_datuma date)
	
	begin
	
	    select n.narudzba_id, n.datum_vrijeme_narudzbe, i.datum_vrijeme_zavrsetka
	    
	    from narudzbe n
	    
	    join isporuke i on n.narudzba_id = i.narudzba_id
	    
	    where i.status_isporuke = 1 and i.datum_vrijeme_zavrsetka is not null
	    
		  and timestampdiff(minute, i.datum_vrijeme_dodjele, i.datum_vrijeme_zavrsetka) > n
	          
		  and date(n.datum_vrijeme_narudzbe) between od_datuma and do_datuma;
	end //
	
	delimiter ;
	
	call ListaIsporucenihNarudzbiSaVremenom(120, '2023-11-05', '2023-11-10');

-- e) Prosječno vrijeme isporuke po dostavljačima, za period:

	delimiter //
	
	create procedure ProsjecnoVrijemeIsporukePoDostavljacima(in od_datuma date, in do_datuma date)
	
	begin
		
	    select d.dostavljac_id, d.ime_dostavljaca, d.prezime_dostavljaca,
	    
		   avg(timestampdiff(minute, i.datum_vrijeme_dodjele, i.datum_vrijeme_zavrsetka)) as prosjecno_vrijeme
	    
	    from dostavljaci d
	    
	    join isporuke i on d.dostavljac_id = i.dostavljac_id
	    
	    where i.status_isporuke = 1 and i.datum_vrijeme_zavrsetka is not null
	    
		  and date(i.datum_vrijeme_dodjele) between od_datuma and do_datuma
	    
	    group by d.dostavljac_id;
	
	end //
	
	delimiter ;
	
	call ProsjecnoVrijemeIsporukePoDostavljacima('2023-11-05', '2023-11-06');

-- f) Lista vozila sa ukupnim vremenom zaduženja, za neki period, složeno opadajući po ukupno zaduženom vremenu:

	delimiter //
	
	create procedure ListaVozilaSaUkupnimVremenomZaduzenja(in od_datuma date, in do_datuma date)
	
	begin
	
	    select zv.vozilo_id, v.naziv_vozila, v.tip_vozila,
	    
		   sum(timestampdiff(minute, zv.datum_vrijeme_zaduzenja, zv.datum_vrijeme_razduzenja)) as ukupno_vrijeme_zaduzenja
	    
	    from zaduzenja_vozila zv
	    
	    join vozila v on zv.vozilo_id = v.vozilo_id
	    
	    where date(zv.datum_vrijeme_zaduzenja) between od_datuma and do_datuma
	    
	    group by zv.vozilo_id, v.naziv_vozila, v.tip_vozila
	    
	    order by ukupno_vrijeme_zaduzenja desc;
	
	end //
	
	delimiter ;
	
	call ListaVozilaSaUkupnimVremenomZaduzenja('2023-11-05', '2023-11-06');

-- g) Lista vozila koju koriste više različitih dostavljača, složeno opadajući po broju dostavljača:

	delimiter //
	
	create procedure ListaVozilaKojaKoristeViseDostavljaca(in od_datuma date, in do_datuma date)
	
	begin
	
	    select zv.vozilo_id, v.naziv_vozila, v.tip_vozila,
	    
		   count(distinct zv.dostavljac_id) as broj_dostavljaca
	    
	    from zaduzenja_vozila zv
	    
	    join vozila v on zv.vozilo_id = v.vozilo_id
	    
	    where date(zv.datum_vrijeme_zaduzenja) between od_datuma and do_datuma
	    
	    group by zv.vozilo_id, v.naziv_vozila, v.tip_vozila
	    
	    order by broj_dostavljaca desc;
	
	end //
	
	delimiter ;
	
	call ListaVozilaKojaKoristeViseDostavljaca('2023-11-05', '2023-11-06');


	delimiter //
	
	create procedure UporednaProdajaPoProizvodima(in od_datuma1 date, in do_datuma1 date, in od_datuma2 date, in do_datuma2 date)
	
	begin
	
	    select
	    
		p.proizvod_id,
	        
		p.naziv_proizvoda,
	        
		coalesce(sum(case when date(n.datum_vrijeme_narudzbe) between od_datuma1 and do_datuma1 then sn.kolicina_proizvoda else 0 end), 0) as prodaja_period1,
	        
		coalesce(sum(case when date(n.datum_vrijeme_narudzbe) between od_datuma2 and do_datuma2 then sn.kolicina_proizvoda else 0 end), 0) as prodaja_period2
	    
	    from
	    
		proizvodi p
	    
	    left join
	    
		stavke_narudzbe sn on p.proizvod_id = sn.proizvod_id
	    
	    left join
	    
		narudzbe n on sn.narudzba_id = n.narudzba_id
	    
	    group by
	    
		p.proizvod_id, p.naziv_proizvoda;
	
	end //
	
	delimiter ;
	
	call UporednaProdajaPoProizvodima('2023-11-01', '2023-11-05', '2023-11-06', '2023-11-10');


-- i) Sve narudžbe koje sadrže određene proizvode:

	delimiter //
	
	create procedure NarudzbeSaProizvodima(in od_datuma date, in do_datuma date, in proizvodi_string VARCHAR(255))
	
	begin
	
	    -- Create a temporary table to store the individual product IDs
	    
	    create temporary table if not exists temp_proizvodi (proizvod_id int);
	
	    set @cur_position = 1;
	
	    -- Loop through the input string and extract product IDs
	    
	    while @cur_position <= length(proizvodi_string) do
	    
		-- Find the position of the next comma
	        
		set @token = substring(proizvodi_string, @cur_position, ifnull(nullif(locate(',', proizvodi_string, @cur_position), 0), length(proizvodi_string) + 1) - @cur_position);
	
		-- Insert the extracted product ID into the temporary table
	        
		insert into temp_proizvodi (proizvod_id) values (CAST(@token as signed));
	
	        set @cur_position = ifnull(nullif(locate(',', proizvodi_string, @cur_position), 0), length(proizvodi_string) + 1) + 1;
	    
	    end while;
	
	    select distinct
	    
		n.narudzba_id,
	        
		n.datum_vrijeme_narudzbe,
	        
		k.ime_kupca,
	        
		k.prezime_kupca
	    
	    from
	    
		narudzbe n
	    
	    join
	        
		stavke_narudzbe sn on n.narudzba_id = sn.narudzba_id
	    
	    join
	    
		kupci k on n.kupac_id = k.kupac_id
	    
	    where
	    
		date(n.datum_vrijeme_narudzbe) between od_datuma and do_datuma
	        
		and sn.proizvod_id in (select proizvod_id from temp_proizvodi);
	
	    drop temporary table if exists temp_proizvodi;
	
	end //
	
	delimiter ;
	
	select * from proizvodi;
	
	call NarudzbeSaProizvodima('2023-11-05', '2023-11-06', '15,18,23');


-- Stored procedura za zaduživanje vozila

	delimiter //
	
	create procedure ZaduziVozilo(in dostavljac_id int, in vozilo_id int)
	
	begin
	
	    declare vozilo_razduzeno int;
	
	    -- Provera da li je dostavljač razdužen na svim mestima
	    
	    select count(*)
	    
	    into vozilo_razduzeno
	    
	    from zaduzenja_vozila
	    
	    where zaduzenja_vozila.dostavljac_id = dostavljac_id and datum_vrijeme_razduzenja is null;
	
	    if vozilo_razduzeno > 0 then
	    
		signal sqlstate '45000'
	        
		set message_text = 'Dostavljač je već razdužen na svim mestima.';
	    
	    else
	        
		-- Provera da li je vozilo razduženo na svim mestima
	       
		select count(*)
	        
		into vozilo_razduzeno
	        
		from zaduzenja_vozila
	        
		where zaduzenja_vozila.vozilo_id = vozilo_id and datum_vrijeme_razduzenja is null;
	
	        if vozilo_razduzeno > 0 then
	        
		    signal sqlstate '45000'
	            
		    set message_text = 'Vozilo je već razduženo na svim mestima.';
	        
		else
	        
		    -- Zaduživanje vozila
	            
		    insert into zaduzenja_vozila (dostavljac_id, vozilo_id, datum_vrijeme_zaduzenja)
	            
		    values (dostavljac_id, vozilo_id, NOW());
	        
		end if;
	    
	    end if;
	
	end //
	
	delimiter ;
	
	alter table zaduzenja_vozila auto_increment = 8;
	
	call ZaduziVozilo(2, 2);


-- Trigger za automatsko dodjeljivanje rednog broja proizvoda

	delimiter //
	
	create trigger DodjelaRednogBrojaProizvoda
	before insert on stavke_narudzbe
	for each row
	begin
	    declare max_redni_broj int;
	
	    -- Pronalaženje maksimalnog rednog broja proizvoda za određenu narudžbu
	    select coalesce(max(redni_broj_proizvoda), 0)
	    into max_redni_broj
	    from stavke_narudzbe
	    where narudzba_id = new.narudzba_id;
	
	    -- Dodjeljivanje sledećeg rednog broja proizvoda
	    set new.redni_broj_proizvoda = max_redni_broj + 1;
	end //
	
	delimiter ;

-- 2.

	DELIMITER //
	
	CREATE PROCEDURE UporednaProdajaPoProizvodima(
	    IN od_datuma1 DATE,
	    IN do_datuma1 DATE,
	    IN od_datuma2 DATE,
	    IN do_datuma2 DATE
	)
	BEGIN
	    SELECT
	        p.proizvod_id,
	        p.naziv_proizvoda,
	        COALESCE(SUM(CASE WHEN DATE(n.datum_vrijeme_narudzbe) BETWEEN od_datuma1 AND do_datuma1 THEN sn.kolicina_proizvoda ELSE 0 END), 0) AS prodaja_period1,
	        COALESCE(SUM(CASE WHEN DATE(n.datum_vrijeme_narudzbe) BETWEEN od_datuma2 AND do_datuma2 THEN sn.kolicina_proizvoda ELSE 0 END), 0) AS prodaja_period2
	    FROM
	        proizvodi p
	    LEFT JOIN
	        stavke_narudzbe sn ON p.proizvod_id = sn.proizvod_id
	    LEFT JOIN
	        narudzbe n ON sn.narudzba_id = n.narudzba_id
	    WHERE
	        p.proizvod_id IN (
	            SELECT DISTINCT p.proizvod_id
	            FROM proizvodi p
	            LEFT JOIN stavke_narudzbe sn ON p.proizvod_id = sn.proizvod_id
	            LEFT JOIN narudzbe n ON sn.narudzba_id = n.narudzba_id
	            WHERE DATE(n.datum_vrijeme_narudzbe) BETWEEN od_datuma1 AND do_datuma1
	               OR DATE(n.datum_vrijeme_narudzbe) BETWEEN od_datuma2 AND do_datuma2
	        )
	    GROUP BY
	        p.proizvod_id, p.naziv_proizvoda;
	END //
	
	DELIMITER ;
	
	call UporednaProdajaPoProizvodima('2023-11-01', '2023-11-05', '2023-11-06', '2023-11-10');

-- 3.

	DELIMITER //
	
	CREATE PROCEDURE ProdajaProizvodaZaPeriod(
	    IN od_datuma DATE,
	    IN do_datuma DATE,
	    IN sort_order VARCHAR(50)
	)
	BEGIN
	    SET @sql = CONCAT('
	        SELECT
	            sn.proizvod_id,
	            p.naziv_proizvoda,
	            SUM(sn.kolicina_proizvoda) AS ukupna_kolicina
	        FROM
	            stavke_narudzbe sn
	        JOIN
	            narudzbe n ON sn.narudzba_id = n.narudzba_id
	        JOIN
	            proizvodi p ON sn.proizvod_id = p.proizvod_id
	        WHERE
	            DATE(n.datum_vrijeme_narudzbe) BETWEEN ? AND ?
	        GROUP BY
	            sn.proizvod_id, p.naziv_proizvoda
	        ORDER BY ');
	
	    IF sort_order = 'sifra' THEN
	        SET @sql = CONCAT(@sql, 'sn.proizvod_id ASC');
	    ELSEIF sort_order = 'naziv' THEN
	        SET @sql = CONCAT(@sql, 'p.naziv_proizvoda ASC');
	    ELSEIF sort_order = 'kolicina' THEN
	        SET @sql = CONCAT(@sql, 'ukupna_kolicina DESC');
	    ELSE
	        -- Default sortiranje po proizvod_id u silaznom redosledu
	        SET @sql = CONCAT(@sql, 'sn.proizvod_id DESC');
	    END IF;
	
	    PREPARE stmt FROM @sql;
	    SET @od_datuma_param = od_datuma;
	    SET @do_datuma_param = do_datuma;
	    EXECUTE stmt USING @od_datuma_param, @do_datuma_param;
	    DEALLOCATE PREPARE stmt;
	END //
	
	DELIMITER ;
	
	call ProdajaProizvodaZaPeriod('2023-11-05', '2023-11-06', 'kolicina');

-- 4.

	DELIMITER //
	
	CREATE PROCEDURE ListaNarudzbiKojeNisuIsporucene()
	BEGIN
	    SELECT n.narudzba_id, n.datum_vrijeme_narudzbe, k.ime_kupca, k.prezime_kupca
	    FROM narudzbe n
	    LEFT JOIN isporuke i ON n.narudzba_id = i.narudzba_id
	    LEFT JOIN kupci k ON n.kupac_id = k.kupac_id
	    WHERE i.narudzba_id IS NULL OR i.status_isporuke = false;
	END //
	
	DELIMITER ;
	
	call ListaNarudzbiKojeNisuIsporucene;
