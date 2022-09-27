export default function postMessageToParent(message = {}) {
  return (
    typeof window !== "undefined" &&
    window.parent.postMessage(
      message,
      new URLSearchParams(location.search).get("origin")
    )
  );
}
