"use client";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';


const pages = ['Home', 'Pokemon Type'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor:'white' , boxShadow:'none'}}>
        {/* TopBar */}
        <Box sx={{ backgroundColor:'#F7F8F8', height:{lg:'40px', sm:'35px' }}}>
            <Stack direction='row-reverse' sx={{height:'100%', mr:{md:10, sm:'4px'}, color:'#7B8082'}}>
            <FormControl sx={{ my: 'auto', mr: { sm: '0px', md: '5px' } }}>
                <NativeSelect
                    disableUnderline
                    defaultValue={1}
                    inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native',
                    }}
                    sx={{
                    color: '#7B8082',
                    fontSize: {xs:'9px',md:'10px',lg:'14px'},
                    '& select': {
                        padding: 0,         
                        margin: 0,
                        lineHeight: 'normal', 
                    },
                    }}
                >
                    <option value={1}>English</option>
                    <option value={2}>Bahasa</option>
                </NativeSelect>
            </FormControl>
                <LanguageIcon sx={{ my:{sm:'5px', lg:'8px'} ,mr:{xs:'6px', sm:'10px'}, width:{xs:'16px',sm:'18px'}}}/>
                
            </Stack>
            
        </Box>
        {/* NavBar */}
      <Container maxWidth="xl" sx={{ my: {lg:'20px'} }}>
        <Toolbar disableGutters>
        {/* Monitor width => 1024px */}
        <Box
            component="img"
            src='/pokemon-logo.webp'
            alt="Logo"
            sx={{
                ml:"50px",
                
                width: {lg:'220px', xs:'100px'},
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center'
            }}
            />
        <Box sx={{ ml:4, flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ mr: 3, color: 'black', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {/* Mobile Width <= 768px */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color:'#E6AB09'}}/>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' }}}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center', color:'black' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            component="img"
            src='/pokemon-logo.webp'
            alt="Logo"
            sx={{
                mx: 'auto',
                width: '100px',
                display: { xs: 'flex', md: 'none' },
                
            }}
            />
            
          <Box>
            <Typography sx={{ visibility:'hidden' ,display:{xs: 'flex', md:'none'}}}>spacer</Typography>
          </Box>
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
