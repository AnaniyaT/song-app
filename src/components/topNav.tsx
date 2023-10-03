import { useTheme } from "@emotion/react";
import { Theme } from "../types";
import { LuMusic2 } from "react-icons/lu";
import DarkModeToogle from "./darkModeToogle";
import { maxWidth, transition } from "../styles/styles";

function TopNav() {
  const theme = useTheme() as Theme;

  return (
    <nav
        css={[{
            fontSize: '2rem',
            padding: '1rem',
            background: theme.colors.navBackground,
            color: theme.colors.text,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(20px)',
            position: "sticky",
            borderBottom: `1px solid ${theme.colors.grayLight}`,
            top: 0,
            zIndex: 100,
        }, 
        transition
    ]}
    >
    <div
        css={[
            {
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            },
            maxWidth,
        ]}
    >
        <LuMusic2/>
      <DarkModeToogle/>
    </div>
      
    </nav>
  );
}

export default TopNav;