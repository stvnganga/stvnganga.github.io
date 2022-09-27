import React, { useState, useEffect } from "react";
import postMessageToParent from "./postMessageToParent";
import { GET_PAYMENT_DATA, SEND_PAYMENT_DATA } from "./paymentActions";
import "./styles.css";

let channel =
  typeof window !== "undefined" ? new BroadcastChannel("payment") : null;

export default function CVV() {
  const [value, setValue] = useState("");

  const handleChange = (change) => {
    const { value } = change.target;

    if (/^[0-9]{0,4}$/.test(value)) {
      setValue(value);
      postMessageToParent({
        from: "cvv",
        messageType: "validation",
        data: {
          valid: /^[0-9]{4}$/.test(value),
        },
      });
    }
  };

  const handleFocus = () => {
    postMessageToParent({
      from: "cvv",
      messageType: "event",
      data: {
        eventName: "onfocus",
        value: true,
      },
    });
  };

  const handleBlur = () => {
    postMessageToParent({
      from: "cvv",
      messageType: "event",
      data: {
        eventName: "onblur",
        value: true,
      },
    });
  };

  useEffect(() => {
    if (window) {
      channel.onmessage = (event) => {
        if (event.data && event.data.messageType === GET_PAYMENT_DATA) {
          channel.postMessage({
            messageType: SEND_PAYMENT_DATA,
            name: "cvv",
            value,
          });
        } else if (event.data && event.data.messageType === "RESET") {
          setValue("");
        }
      };
    }
  }, [value]);

  return (
    <input
      type="text"
      placeholder="CVV"
      name="cvv"
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}
