import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const AccordionItem = ({ id, title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isOpen]);

  return (
    <div className="border-t-2 border-borderColor w-full py-10">
      <div
        className="flex cursor-pointer justify-between w-full gap-4 lg:gap-8 text-left focus:outline-none"
        onClick={toggleAccordion}
      >
        <div className="flex gap-4 lg:gap-16">
          <span className="text-lg font-medium text-primary">{id}</span>
          <div>
            <span className="text-2xl font-medium">{title}</span>
            <div
              ref={contentRef}
              className="pointer-events-none cursor-text overflow-hidden transition-all duration-300"
            >
              <div className="pointer-events-auto" onClick={(e) => e.stopPropagation()}>
                {children}
              </div>
            </div>
          </div>
        </div>
        <span className="min-w-12">
          <Image width={48} height={48} src={isOpen ? "minus.svg" : "plus.svg"} alt="" />
        </span>
      </div>
    </div>
  );
};

export default AccordionItem;
