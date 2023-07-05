import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Link } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import store from '../../store/store';

export default class Header extends React.Component {
    constructor() {
        super();
        const userData = localStorage.getItem('upgrad_eshop_user');
        this.state = {
            loggedIn: userData,
            isAdmin: false
        };
    }
    render() {
        const LinkStyles = { color: '#FFF', textDecorationColor: '#FFF', cursor: 'pointer' };
        const handleRouting = (route) => {
            if (route === 'login') localStorage.removeItem('upgrad_eshop_user');
        }
        return (
            <>
                <Box sx={{ flexGrow: 1 }}>
                    <AppBar position="static" sx={{ backgroundColor: '#3f51b5' }}>
                        <Toolbar>
                            <IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                            >
                                <ShoppingCartIcon />
                            </IconButton>
                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Upgrad E-Shop
                            </Typography>
                            {this.state.loggedIn ? <>
                                <SearchBar></SearchBar>
                                <Box sx={{ flexGrow: 1 }} />
                            </> : ''}
                            {this.state.loggedIn ? <>
                                <Link href='/products' sx={{ mr: 2, ...LinkStyles }} onClick={() => handleRouting('products')}>Home</Link>
                                {this.state.isAdmin ? <Link sx={{ mr: 2, ...LinkStyles }}>Add Product</Link> : ''}
                                <Button href='/' variant='contained' sx={{ backgroundColor: '#f50157' }} onClick={() => handleRouting('login')}>Logout</Button>
                            </> : < >
                                <Link href='/login' sx={{ mr: 2, ...LinkStyles }} onClick={() => handleRouting('login')}>Login</Link>
                                <Link href='/signup' sx={LinkStyles} onClick={() => handleRouting('signup')}>Signup</Link>
                            </>}
                        </Toolbar>
                    </AppBar>
                </Box>
            </>
        );
    }
}


function SearchBar() {

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '30ch'
            },
        },
    }));

    const handleSearch = (value) => {
        store.dispatch({ type: 'searchString', value: value })
    }

    return (
        <Search>
            <SearchIconWrapper>
                <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
                value={store.searchString}
                onChange={(e) => handleSearch(e.target.value)}
            />
        </Search>
    )
}