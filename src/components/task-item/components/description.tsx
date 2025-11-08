import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type DescriptionTaskProps = {
  description: string;
};

export function DescriptionTask({ description }: DescriptionTaskProps) {
  return (
    <div>
      <div className="hidden md:block">
        <Tooltip>
          <TooltipTrigger asChild>
            <p className="text-sm text-slate-600 mt-1 truncate">
              {description}
            </p>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs wrap-break-words">
            {description}
          </TooltipContent>
        </Tooltip>
      </div>
      <div className="sm:block md:hidden border-top">
        <Accordion
          type="single"
          collapsible
          className="w-full"
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>Description</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              {description}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
