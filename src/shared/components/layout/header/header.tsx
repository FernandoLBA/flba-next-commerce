import { MenuDrawer } from "./components/menu-drawer/menu-drawer";
import { NavBar } from "./components/nav-bar";

export const Header = () => {
  return (
    <header>
      <NavBar />

      <MenuDrawer />
    </header>
  );
};
