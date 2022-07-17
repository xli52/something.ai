import React, { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function UnlockModal(props) {
  const [msg, setMsg] = useState();
  const [purchase, setPurchase] = useState({});

  let modalClass = `unlockpopModal  `;

  // Use handleChange Function to onChange the setLogin
  const handleChange = function (e) {
    const { name, value } = e.target;
    if (msg) {
      setMsg();
    }
    console.log(e.target.value);
    setPurchase({ ...purchase, [name]: value });
  };

  function submitBuy() {
    console.log("buy");
    props.setShowUnlock(false);
  }

  return (
    <div className={modalClass}>
      <form
        className="formGroup"
        onSubmit={(e) => {
          submitBuy(e);
        }}
      >
        <FontAwesomeIcon
          className="close"
          icon={faXmark}
          onClick={() => {
            props.setShowUnlock(false);
          }}
        ></FontAwesomeIcon>

        {msg && <h3 className="error">{msg}</h3>}
        <h2>Unlock Character</h2>

        <input
          placeholder="Cardholder name"
          type="text"
          name="CardName"
          value={purchase["cardName"]}
          onChange={handleChange}
        />

        <input
          placeholder="CardNumber"
          type="tel"
          autoComplete="cc-number"
          maxLength="19"
          name="CardNumber"
          value={purchase["cardNumber"]}
          onChange={handleChange}
        />

        <input
          placeholder="MM / YY"
          type="tel"
          autoComplete="cc-expires"
          maxLength="4"
          name="credit-expires"
          value={purchase["credit-expires"]}
          onChange={handleChange}
        />
        <input
          placeholder="CVC"
          type="tel"
          name="cvc"
          maxLength="4"
          value={purchase["cvv"]}
          inputMode="numeric"
          onChange={handleChange}
        />

        <button className="btn" type="submit">
          Purchase
        </button>
      </form>
    </div>
  );
}
