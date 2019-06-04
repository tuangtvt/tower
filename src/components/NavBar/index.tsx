import {
    AppBar,
    Button,
    createStyles,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Theme,
    Toolbar,
    Typography,
    WithStyles,
    withStyles,
} from '@material-ui/core';
import {
    AccessTime,
    ChevronLeft,
    ChevronRight,
    Dashboard,
    Menu,
    People,
    TrendingUp,
} from '@material-ui/icons';
import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { icons } from './icons';

const drawerWidth = 256;

const styles = (theme: Theme) => createStyles({
    root: {
        display: 'flex',
    },
    appBar: {
        backgroundColor: '#3598D5',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 20,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        padding: '0 8px',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing.unit * 3,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    grow: {
        flexGrow: 1,
        cursor: 'pointer',
    },
    listItem: {
        borderRadius: '4px',
        paddingLeft: '8px',
        paddingRight: '8px',
        letterSpacing: '0.1px',
        '&:hover': {
            backgroundColor: 'rgba(48,156,234,0.1)',
        },
        '&:focus': {
            backgroundColor: 'rgba(48, 156, 234, 0.1)',
        },
    },
    selected: {
        backgroundColor: 'rgba(48, 156, 234, 0.1) !important',
    },
    link: {
        textDecoration: 'none',
    },
    navbarHidden: {
        display: 'none',
    },
});

interface Props extends WithStyles<typeof styles> {
    theme: Theme;
    logout: () => void;
    open: boolean;
    handleDrawerOpen: () => void;
    handleDrawerClose: () => void;
    loggedIn: boolean;
}

interface NavBarState {
    key: string;
}

class NavBar extends React.Component<Props, NavBarState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            key: '',
        };
    }

    public componentDidMount() {
        this.setState({
            key: 'dashboard',
        });
    }

    public render() {
        const { classes, loggedIn } = this.props;
        const { key } = this.state;

        return (
            <div>
                <AppBar
                  position="fixed"
                  className={classNames(classes.appBar, {[classes.navbarHidden]: !loggedIn})}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerOpen}
                            className={classNames(classes.menuButton, this.props.open && classes.hide)}
                        >
                            <Menu />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow} />
                        <Button color="inherit" onClick={this.handleLogout}>
                            Logout
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={this.props.open}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <IconButton onClick={this.handleDrawerClose}>
                            {this.props.open ? <ChevronLeft /> : <ChevronRight />}
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <Link to="/tower" className={classes.link}>
                            <ListItem
                                className={classes.listItem}
                                classes={{ selected: classes.selected }}
                                button={true}
                                key="dashboard"
                                onClick={this.handleClick('dashboard')}
                                selected={key === 'dashboard'}
                            >
                                <ListItemIcon>
                                    <Dashboard />
                                </ListItemIcon>
                                <ListItemText
                                    disableTypography={true}
                                    primary={<Typography variant="body2">Dashboard</Typography>}
                                />
                            </ListItem>
                        </Link>
                    </List>
                    <Divider />
                    <List>
                        <Link to="/tower/users" className={classes.link}>
                            <ListItem
                                className={classes.listItem}
                                classes={{ selected: classes.selected }}
                                button={true}
                                key="users"
                                onClick={this.handleClick('users')}
                                selected={key === 'users'}

                            >
                                <ListItemIcon>
                                    <People />
                                </ListItemIcon>
                                <ListItemText
                                    disableTypography={true}
                                    primary={<Typography variant="body2">User directory</Typography>}
                                />
                            </ListItem>
                        </Link>
                        <Link to="/tower/pending" className={classes.link}>
                            <ListItem
                                className={classes.listItem}
                                classes={{ selected: classes.selected }}
                                button={true}
                                key="pending"
                                onClick={this.handleClick('pending')}
                                selected={key === 'pending'}

                            >
                                <ListItemIcon><AccessTime /></ListItemIcon>
                                <ListItemText
                                    disableTypography={true}
                                    primary={<Typography variant="body2">Pending documents</Typography>}
                                />
                            </ListItem>
                        </Link>
                        <Link to="/tower/activities" className={classes.link}>
                            <ListItem
                                className={classes.listItem}
                                classes={{ selected: classes.selected }}
                                button={true}
                                key="activities"
                                onClick={this.handleClick('activities')}
                                selected={key === 'activities'}

                            >
                                <ListItemIcon><TrendingUp /></ListItemIcon>
                                <ListItemText
                                    disableTypography={true}
                                    primary={<Typography variant="body2">User activities</Typography>}
                                />
                            </ListItem>
                        </Link>
                        <Link to="/tower" className={classes.link}>
                            <ListItem
                                className={classes.listItem}
                                classes={{ selected: classes.selected }}
                                button={true}
                                key="admin"
                                onClick={this.handleClick('admin')}
                                selected={key === 'admin'}
                            >
                                <ListItemIcon>
                                    {icons('admin')}
                                </ListItemIcon>
                                <ListItemText
                                    disableTypography={true}
                                    primary={<Typography variant="body2">Admin activities</Typography>}
                                />
                            </ListItem>
                        </Link>
                    </List>
                    <Divider />
                    <List>
                        <Link to="/tower" className={classes.link}>
                            <ListItem
                                className={classes.listItem}
                                classes={{ selected: classes.selected }}
                                button={true}
                                key="orders"
                                onClick={this.handleClick('orders')}
                                selected={key === 'orders'}
                            >
                                <ListItemIcon>
                                    {icons('orders')}
                                </ListItemIcon>
                                <ListItemText
                                    disableTypography={true}
                                    primary={<Typography variant="body2">Orders</Typography>}
                                />
                            </ListItem>
                        </Link>
                        <Link to="/tower" className={classes.link}>
                            <ListItem
                                className={classes.listItem}
                                classes={{ selected: classes.selected }}
                                button={true}
                                key="orderbooks"
                                onClick={this.handleClick('orderbooks')}
                                selected={key === 'orderbooks'}
                            >
                                <ListItemIcon>
                                    {icons('orderbooks')}
                                </ListItemIcon>
                                <ListItemText
                                    disableTypography={true}
                                    primary={<Typography variant="body2">Orderbooks</Typography>}
                                />
                            </ListItem>
                        </Link>
                        <Link to="/tower/withdraws" className={classes.link}>
                            <ListItem
                                className={classes.listItem}
                                classes={{ selected: classes.selected }}
                                button={true}
                                key="withdraws"
                                onClick={this.handleClick('withdraws')}
                                selected={key === 'withdraws'}
                            >
                                <ListItemIcon>
                                    {icons('withdrawal')}
                                </ListItemIcon>
                                <ListItemText
                                    disableTypography={true}
                                    primary={<Typography variant="body2">Withdraw requests</Typography>}
                                />
                            </ListItem>
                        </Link>
                    </List>
                </Drawer>
            </div>
        );
    }

    private handleDrawerOpen = () => {
        this.props.handleDrawerOpen();
    };

    private handleDrawerClose = () => {
        this.props.handleDrawerClose();
    };

    private handleLogout = () => {
        this.props.logout();
        this.handleDrawerClose();
        this.setState({ key: '' });
    };

    private handleClick = (key: string) => () => {
        this.setState({ key });
    }

}

export const Navbar = withStyles(styles, { withTheme: true })(NavBar);
