import { useEffect, useRef } from "react";

const useClick = (onClick) => {
  const element = useRef();
  useEffect(() => {
    if (typeof onClick !== "function") return
    element.current?.addEventListener("click", onClick);
    return () => element.current?.removeEventListener("click", onClick);
  }, []);
  return element;
};

const useConfirm = (message, onConfirm, onReject) => {
  if (typeof onConfirm !== "function") return;
  if (onReject && typeof onReject !== "function") return;
  return () => {
    if (window.confirm(message)) onConfirm();
    else {
      try {
        onReject();
      } catch (e) {
        return
      }
    }
  };
};

function App() {
  setTimeout(() => console.log("gi"), 1000);
  return <div>hi</div>;
}

export default App;