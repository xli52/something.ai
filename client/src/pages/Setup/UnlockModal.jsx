import React, { useState, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function UnlockModal({ setShowUnlock, setUnlocked, setLayer }) {
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

  const getUnlockArray = function (characters) {
    let result = [];
    for (let character of characters) {
      result.push(character.name.toLowerCase());
    }
    console.log(result);
    setUnlocked(result);
  };

  function submitBuy(e) {
    e.preventDefault();
    setProcess(true);
    console.log("buy");

    setTimeout(() => {
      axios({
        method: "POST",
        url: "/character/purchase",
        data: { character: "Joshua", price: 599 },
        contentType: { "Content-Type": "application/json" },
      }).then((res) => {
        getUnlockArray(res.data);
        console.log(res.data);
        setShowUnlock(false);
        setLayer(false);
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
            setShowUnlock(false);
          }}
        ></FontAwesomeIcon>

        {msg && <h3 className="error">{msg}</h3>}
        <h2>Unlock Character</h2>

        <input
          placeholder="Cardholder name"
          type="text"
          name="CardName"
          value="Amy Donut"
          onChange={handleChange}
        />

        <input
          placeholder="CardNumber"
          type="tel"
          autoComplete="cc-number"
          maxLength="19"
          name="CardNumber"
          value="**** **** **** ****"
          onChange={handleChange}
        />

        <input
          placeholder="MM / YY"
          type="tel"
          autoComplete="cc-expires"
          maxLength="4"
          name="credit_expires"
          value="12 / 26"
          onChange={handleChange}
        />
        <input
          placeholder="CVC"
          type="tel"
          name="cvc"
          maxLength="4"
          value="123"
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
