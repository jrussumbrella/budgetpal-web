import { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useHistory } from 'react-router';
import { removeCurrentUser } from '../../features/auth/auth-slice';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  hide: {
    display: 'none',
  },
  spacer: {
    flex: 1,
  },
  avatarLetter: {
    backgroundColor: theme.palette.primary.main,
  },
}));

interface Props {
  toggleMobileSidebar(): void;
}

const Header: React.FC<Props> = ({ toggleMobileSidebar }) => {
  const classes = useStyles();

  const { user } = useAppSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const dispatch = useAppDispatch();

  const history = useHistory();

  const handleOpenMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickMenu = (val: string) => {
    switch (val) {
      case 'my_account':
        history.push('/account');
        break;
      case 'logout':
        dispatch(removeCurrentUser());
        break;
      default:
        handleClose();
    }
  };

  return (
    <AppBar position='fixed' className={classes.appBar} color='transparent'>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          onClick={toggleMobileSidebar}
          edge='start'
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant='h6' noWrap>
          Dashboard
        </Typography>
        <div className={classes.spacer} />
        <IconButton
          color='inherit'
          aria-label='account'
          edge='start'
          onClick={handleOpenMenu}
        >
          <Avatar className={classes.avatarLetter}>
            {user?.name.charAt(0)}
          </Avatar>
        </IconButton>
        <Menu
          id='account-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => handleClickMenu('my_account')}>
            My account
          </MenuItem>
          <MenuItem onClick={() => handleClickMenu('logout')}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;