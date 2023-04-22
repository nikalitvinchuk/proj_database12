import React from "react";
const About = () => {
  return (
    <section
      id="hero"
      className="d-flex.align-items-center justify-content-center"
    >
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-8 mb-3">
          <p className="about_h"> Nasza historia</p>
            <p className="about_class">Strona jest stworzona w oparciu o projekt zlecony w lytym 2023. <br/> <br/>
            Celem projektu było stworzenie użytecznej strony internetowej, która pomoże użytkownikom w dbaniu o swoje zdrowie w łatwy 
            i przyjemny sposób. W dzisiejszych czasach wiele czynników może negatywnie wpłynąć na nasze zdrowie, a coraz mniej czasu 
            pozostaje na troszczenie się o siebie. Nasza strona ma za zadanie ułatwić to zadanie poprzez dostarczenie łatwo dostępnych i 
            przystępnych informacji dotyczących zdrowego stylu życia, aby każdy mógł łatwo wprowadzać pozytywne zmiany w swoim codziennym życiu.</p>
            <p className="about_author">Autorzy:  Nika Lytvynchuk, Michał Mordarski</p>
            <p className="Rodo"> Administratorem Twoich danych osobowych jest SImpleZTZ z siedzibą przy ul. Ludwika Zamenhofa 1a, 33-300 Nowy Sącz z którą można skontaktować się pisząc na adres e-mail: simplezts@gmail.com </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
