import { makeStyles, Theme, ThemeProvider } from "@material-ui/core";
import React from "react";
import { useEffect, useCallback } from "react";
import { useIsShowMenu, useIsShowUseOption, useMenuPosition, useSetShowMenu } from "../../state/contextMenu.state";

const useStyles = makeStyles( (theme:Theme) => ({
  contextMenu: {
    position: 'fixed',
    zIndex: 1000,
    width: '100px',
    borderRadius: '5px',
    background: theme.inventory.secondaryBackgroundColor,
    textAlign: 'center',
    overflow: 'hidden',
  },
  listItem: {
    listStyle: 'none',
    padding: '8px 10px',
    fontSize: '0.9rem',
    color: theme.inventory.textColor,
    cursor: 'pointer',
    "&:hover": {
      background: theme.inventory.hoverColor
    }
  }
}));


const ContextMenu: React.FC = () => {

  const classes = useStyles();
  const showMenu = useIsShowMenu();
  const showUse = useIsShowUseOption();
  const menuPosition = useMenuPosition();
  const setShowMenu = useSetShowMenu();

  const handleClick = useCallback(() => {
    showMenu && setShowMenu(false);
  }, [showMenu]);

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", (e) => e.preventDefault());
    return () => {
      document.addEventListener("click", handleClick);
      document.removeEventListener("contextmenu", (e) => e.preventDefault());
    };
  });

  const handleOnUse = () => {
    console.log("USE");
  }

  const handleOnGive = () => {
    console.log("GIVE");
  }

  const handleOnDrop = () => {
    console.log("DROP");
  }


  return (
    <div>
      {showMenu ? (
            <div
              className={classes.contextMenu}
              style={{
                position: 'absolute',
                top: menuPosition.y + 'px',
                left: menuPosition.x + 'px',
              }}
            >
              <ul >
                { showUse ? <li onClick={handleOnUse} className={classes.listItem}>Use</li> : undefined }
                <li onClick={handleOnGive} className={classes.listItem}>Give</li>
                <li onClick={handleOnDrop} className={classes.listItem}>Drop</li>
              </ul>
            </div>
          ) : (
            <></>
          )}
    </div>
  );
}

export default ContextMenu;
