"use client"

import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";

const ModalContext = createContext();

function Modal({ children }) {
  const [openName, setOpenName] = useState("");
  const open = (id) => setOpenName(id);
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, id }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(id) });
}

function Window({ children, id }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (id !== openName) return null;

  return createPortal(
    <div className="fixed left-0 top-0 z-10 h-screen w-full bg-zinc-700 bg-opacity-60">
      <div
        className="w-fit container fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
        ref={ref}
      >
        <button
          onClick={close}
          className="absolute right-2 top-2 duration-200 hover:-translate-y-0.5"
        >
          <HiXMark size={24} />
        </button>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </div>
    </div>,
    document.body,
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;


import { useEffect, useRef } from "react";

function useOutsideClick(handler, listenCapturing = true) {
  const ref = useRef();

  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing],
  );

  return ref;
}