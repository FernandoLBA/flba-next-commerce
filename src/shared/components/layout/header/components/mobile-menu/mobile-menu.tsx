import { AppButton } from "@/shared/components/ui";
import { appMessages } from "@/shared/constants/app.messages";
import { useDisclosure } from "@/shared/hooks/use-disclosure";
import { EllipsisVertical } from "lucide-react";
import { MenuDrawer } from "../menu-drawer/menu-drawer";

export const MobileMenu = () => {
  const { isOpen, open, close } = useDisclosure();

  return (
    <div className="md:hidden">
      <AppButton
        variant="ghost"
        aria-label={appMessages.MENU.OPEN}
        aria-expanded={isOpen}
        onClick={open}
      >
        <EllipsisVertical />
      </AppButton>

      <MenuDrawer open={isOpen} onClose={close} />
    </div>
  );
};
