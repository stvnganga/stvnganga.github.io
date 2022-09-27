import React, { useEffect, useRef, useState } from "react";
import postMessageToParent from "./postMessageToParent";
import {
  GET_PAYMENT_DATA,
  SEND_PAYMENT_DATA,
  START_PAYMENT,
} from "./paymentActions";
import "./styles.css";

let channel =
  typeof window !== "undefined" ? new BroadcastChannel("payment") : null;

export default function Card() {
  const [value, setValue] = useState("");
  const [paymentData, setPaymentData] = useState({ card: value });
  const [parentData, setParentData] = useState(null);

  const updatePaymentData = (name, value) =>
    setPaymentData((data) => Object.assign({}, data, { [name]: value }));

  const handleChange = (change) => {
    const { value } = change.target;

    if (/^[0-9]{0,19}$/.test(value)) {
      setValue(value);
      updatePaymentData("card", value);
      postMessageToParent({
        from: "card",
        messageType: "validation",
        data: {
          valid: /^[0-9]{13,19}$/.test(value),
        },
      });
    }
  };

  const handleFocus = () => {
    postMessageToParent({
      from: "card",
      messageType: "event",
      data: {
        eventName: "onfocus",
        value: true,
      },
    });
  };

  const handleBlur = () => {
    postMessageToParent({
      from: "card",
      messageType: "event",
      data: {
        eventName: "onblur",
        value: true,
      },
    });
  };

  useEffect(() => {
    if (window) {
      window.onmessage = (event) => {
        if (event.data.messageType === START_PAYMENT) {
          setParentData(event.data.data);
          channel.postMessage({
            messageType: GET_PAYMENT_DATA,
          });
        }
      };

      channel.onmessage = (event) => {
        if (event.data.messageType === SEND_PAYMENT_DATA) {
          updatePaymentData(event.data.name, event.data.value);
        }
      };
    }
  }, []);

  useEffect(() => {
    if (paymentData.cvv && paymentData.expiry && paymentData.card) {
      console.log("Iframe => Making charge request", {
        ...paymentData,
        ...parentData,
      });
      setTimeout(() => {
        if (paymentData.cvv === "1111") {
          postMessageToParent({
            from: "hosted-frames",
            messageType: "payment-status",
            data: {
              message: "Payment failed",
              statusCode: 400,
            },
          });
        } else {
          postMessageToParent({
            from: "hosted-frames",
            messageType: "payment-status",
            data: {
              message: "Payment done",
              statusCode: 200,
            },
          });

          channel.postMessage({
            messageType: "RESET",
          });

          setValue("");
        }

        setPaymentData({});
      }, 2000);
    }
  }, [paymentData]);

  return (
    <input
      type="text"
      name="card"
      placeholder="13 to 19 digits"
      value={value}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
}
