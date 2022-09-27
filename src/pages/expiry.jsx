import React, { useState, useEffect } from "react";
import { GET_PAYMENT_DATA, SEND_PAYMENT_DATA } from "./paymentActions";
import postMessageToParent from "./postMessageToParent";
import "./styles.css";

let channel =
  typeof window !== "undefined" ? new BroadcastChannel("payment") : null;

export default function ExpiryDate() {
  const [value, setValue] = useState("");

  const handleChange = (change) => {
    const { value } = change.target;

    if (/^[0-2]{0,2}[-|\/]{0,1}[0-9]{0,2}$/.test(value)) {
      setValue(value);
      postMessageToParent({
        from: "expiry",
        messageType: "validation",
        data: {
          valid: /^\d{2}[-|\/]\d{2}$/.test(value),
        },
      });
    }
  };

  const handleFocus = () => {
    postMessageToParent({
      from: "expiry",
      messageType: "event",
      data: {
        eventName: "onfocus",
        value: true,
      },
    });
  };

  const handleBlur = () => {
    postMessageToParent({
      from: "expiry",
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
            name: "expiry",
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
      placeholder="Valid thru (mm/yy)"
      name="expiry"
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}
