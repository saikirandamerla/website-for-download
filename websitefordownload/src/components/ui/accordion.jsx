import React, { useState, createContext, useContext } from "react";

const AccordionContext = createContext();

export const Accordion = ({ children, collapsible = true }) => {
  const [openValue, setOpenValue] = useState(null);

  const toggleItem = (value) => {
    if (openValue === value && collapsible) {
      setOpenValue(null);
    } else {
      setOpenValue(value);
    }
  };

  return (
    <AccordionContext.Provider value={{ openValue, toggleItem }}>
      <div>{children}</div>
    </AccordionContext.Provider>
  );
};

export const AccordionItem = ({ value, children }) => <div data-value={value}>{children}</div>;

export const AccordionTrigger = ({ children, value }) => {
  const { openValue, toggleItem } = useContext(AccordionContext);
  return (
    <button
      onClick={() => toggleItem(value)}
      className="font-bold w-full text-left py-2"
    >
      {children} {openValue === value ? "▲" : "▼"}
    </button>
  );
};

export const AccordionContent = ({ children, value }) => {
  const { openValue } = useContext(AccordionContext);
  return openValue === value ? <div className="pl-4 py-2">{children}</div> : null;
};
