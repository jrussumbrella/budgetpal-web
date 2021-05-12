import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Sidebar from '../sidebar';
import Header from '../header';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
    toolbar: theme.mixins.toolbar,
  })
);

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  function handleToggleMobileSidebar() {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  }

  return (
    <div className={classes.root}>
      <Header toggleMobileSidebar={handleToggleMobileSidebar} />
      <Sidebar
        isMobileSidebarOpen={isMobileSidebarOpen}
        toggleMobileSidebar={handleToggleMobileSidebar}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
      </main>
    </div>
  );
};

export default Layout;