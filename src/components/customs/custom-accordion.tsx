import * as React from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface AccordionData {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface CustomAccordionProps {
  data: AccordionData[];
  defaultOpenItems?: string[];
  allowMultiple?: boolean;
  className?: string;
  itemClassName?: string;
  triggerClassName?: string;
  contentClassName?: string;
}

function CustomAccordion({
  data,
  defaultOpenItems = [],
  allowMultiple = false,
  className,
  itemClassName,
  triggerClassName,
  contentClassName,
}: CustomAccordionProps) {
  const [openItems, setOpenItems] = React.useState<string[]>(defaultOpenItems);

  function handleToggle(itemId: string) {
    setOpenItems((prevOpenItems) => {
      if (allowMultiple) {
        return prevOpenItems.includes(itemId)
          ? prevOpenItems.filter((id) => id !== itemId)
          : [...prevOpenItems, itemId];
      }
      return prevOpenItems.includes(itemId) ? [] : [itemId];
    });
  }

  return allowMultiple ? (
    <Accordion
      type="multiple"
      value={openItems}
      onValueChange={setOpenItems}
      className={cn("w-full", className)}
    >
      {data.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className={cn("border-b", itemClassName)}
        >
          <AccordionTrigger
            onClick={() => handleToggle(item.id)}
            className={cn(
              "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
              triggerClassName
            )}
          >
            {item.title}
            <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
          </AccordionTrigger>
          <AccordionContent
            className={cn(
              "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
              contentClassName
            )}
          >
            <div className="pb-4 pt-0">{item.content}</div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ) : (
    <Accordion
      type="single"
      value={openItems[0]}
      onValueChange={(value) => setOpenItems(value ? [value] : [])}
      className={cn("w-full", className)}
    >
      {data.map((item) => (
        <AccordionItem
          key={item.id}
          value={item.id}
          className={cn("border-b", itemClassName)}
        >
          <AccordionTrigger
            onClick={() => handleToggle(item.id)}
            className={cn(
              "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
              triggerClassName
            )}
          >
            {item.title}
            <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
          </AccordionTrigger>
          <AccordionContent
            className={cn(
              "overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
              contentClassName
            )}
          >
            <div className="pb-4 pt-0">{item.content}</div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default CustomAccordion;
