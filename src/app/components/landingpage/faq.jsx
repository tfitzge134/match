import AccordionItem from "../common/accordion";
import { accordionsData } from "./constant";

const Faq = () => {
  return (
    <div id="faq" className="px-4 w-full max-w-[1280px] flex flex-col gap-20">
      <div className="flex flex-col items-center gap-3">
        <h3 className="text-primary text-base">FAQ</h3>
        <h1 className="text-3xl">Have Questions? We{'&apos'}ve Got Answers!</h1>
      </div>

      <div className="w-full ">
        {accordionsData.map((item, index) => (
          <AccordionItem key={index} id={item.id} title={item.title}>
            <p>{item.section}</p>
          </AccordionItem>
        ))}
      </div>
    </div>
  );
};

export default Faq;
