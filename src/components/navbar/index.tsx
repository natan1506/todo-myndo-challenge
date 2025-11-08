import { useHotkeys } from "react-hotkeys-hook";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import { Kbd, KbdGroup } from "../ui/kbd";

type NavbarProps = {
  openedModal: () => void;
};

export function Navbar({ openedModal }: NavbarProps) {
  useHotkeys("meta+k", () => openedModal());

  return (
    <div className="flex sm:flex-col md:flex-row justify-between items-center top-0 py-3 px-2 w-full border-b">
      <div>
        <Button variant="outline" className="font-light" onClick={openedModal}>
          Press
          <KbdGroup>
            <Kbd>⌘</Kbd>
            <Kbd>k</Kbd>
          </KbdGroup>
          or click here to New task
        </Button>
      </div>
      <div className="flex gap-2">
        <ModeToggle />
      </div>
    </div>
  );
}
