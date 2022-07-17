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
        {props.showCloseBtn && (
          <FontAwesomeIcon
            className="close"
            icon={faXmark}
            onClick={() => {}}
          ></FontAwesomeIcon>
        )}
        {msg && <h3 className="error">{msg}</h3>}
        <h2>Unlock Character</h2>

        <input
          placeholder="Cardholder name"
          type="text"
          name="CardName"
          value={purchase["CardName"]}
          onChange={handleChange}
        />

        <input
          placeholder="CardNumber"
          type="number"
          name="CardNumber"
          value={purchase["CardNumber"]}
          onChange={handleChange}
        />

        <input
          placeholder="cvv"
          type="number"
          name="cvv"
          value={purchase["cvv"]}
          onChange={handleChange}
          minLength={3}
        />

        <button className="btn" type="submit">
          Purchase
        </button>
      </form>
    </div>
  );
}
