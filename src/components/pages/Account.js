import React from 'react';
const Account = () => {
    return ( 
      <section className="main_form">
      <div className="form-box">
          <div className="form-value">
              <form id="login-form">
                  <h2>Twoje Konto</h2>
                  <div className="inputbox_acc">
                      <label>Imię: </label>
                  </div>
                  <div className="inputbox_acc">
                      <label>Nazwisko: </label>
                  </div>
                  <div className="inputbox_acc">
                      <label>Email:</label>
                  </div>   
                  <div className="inputbox_acc">
                      <label>Hasło:</label>
                  </div>   
                  <div className="inputbox_acc">
                      <label>Zainteresowania:</label>
                  </div>
                  <div className="inputbox_acc">
                      <label>Typ konta:</label>
                  </div>   
                  <button type="button">Zmień</button>.
                  
              </form>
          </div>
      </div>
  </section>
    );
}
 
export default Account;