import React, { useState } from "react";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function UnlockModal(props) {
  const [msg, setMsg] = useState();
  const [purchase, setPurchase] = useState({
    cardName: "",
    cardNumber: "",
    credit_expires: "",
    cvc: "",
  });

  const [processing, setProcess] = useState(false);

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
    // "/character/purchase"
    setProcess(true);
    console.log("buy");

    setInterval(() => {
      axios({
        method: "POST",
        url: "/character/purchase",
        data: { ...purchase },
        // Check Contect-type
        contentType: { character: "Joshua", price: 599 },
      }).then(() => {
        props.setShowUnlock(false);
      });
    }, 2000);
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
          name="credit_expires"
          value={purchase["credit_expires"]}
          onChange={handleChange}
        />
        <input
          placeholder="CVC"
          type="tel"
          name="cvc"
          maxLength="4"
          value={purchase["cvc"]}
          inputMode="numeric"
          onChange={handleChange}
        />

        <button className="btn" type="submit" disabled={processing}>
          {processing ? "Processing ..." : "Purchase"}
        </button>
      </form>
    </div>
  );
}
