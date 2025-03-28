import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useOutsideClick } from "../hooks/useOutsideClick";

const ClickMenuContext = createContext();

function ClickMenu({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);
  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <ClickMenuContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </ClickMenuContext.Provider>
  );
}

function Menu({ children }) {
  return <div className="flex">{children}</div>;
}

function Toggle({ id, hoverColor }) {
  const { openId, close, open, setPosition } = useContext(ClickMenuContext);

  function handleClick(e) {
    e.stopPropagation();
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    openId === "" || openId !== id ? open(id) : close();
  }
  //console.log(id);
  return (
    <button
      onClick={handleClick}
      className={`${hoverColor ? hoverColor : ""} cursor-pointer rounded-md px-1 py-2`}
    >
      <HiOutlineDotsVertical />
    </button>
  );
}

function List({ children, id }) {
  const { position, openId, close } = useContext(ClickMenuContext);
  const ref = useOutsideClick(close, false);

  if (openId !== id) return null;

  return createPortal(
    <div
      style={{ top: `${position.y}px`, right: `${position.x}px` }}
      className="absolute flex flex-col bg-zinc-50"
      ref={ref}
    >
      {children}
    </div>,
    document.body,
  );
}

function Button({ children, onClick, icon }) {
  function handleClick() {
    onClick?.();
    // close();
  }
  return (
    <button
      onClick={handleClick}
      className="flex cursor-pointer items-center gap-4 px-3 py-2 hover:bg-zinc-300"
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}

ClickMenu.Menu = Menu;
ClickMenu.Toggle = Toggle;
ClickMenu.List = List;
ClickMenu.Button = Button;

export default ClickMenu;
