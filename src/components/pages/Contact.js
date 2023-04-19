import React from "react";
const Contact = () => {
  return (
    <section className="main_form">
        <div className="form-box">
            <div className="form-value">
                <form id="login-form">
                    <h2>Wypełnij formularz</h2>
                    <div className="inputbox">
                        <input type="text" id="title_input" required/>
                        <label>Tytuł</label>
                    </div>
                    <div className="inputbox">
                        <input type="text" id="password-input" required/>
                        <label>Email</label>
                    </div>
                    <div className="inputbox">
                      <textarea placeholder="Treść zgłoszenia"></textarea>
                    </div>
                   
                    <button type="button">Wyślij</button>.
                    
                </form>
            </div>
        </div>
    </section>
  );
};

export default Contact;
