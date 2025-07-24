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
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Pokemon Type', path: '/pokemon-type' },
  ]

function ResponsiveAppBar() {
  const pathname = usePathname()
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
        <Box sx={{ backgroundColor:'#F7F8F8', height:{lg:'32px', sm:'30px' }}}>
            <Stack direction='row-reverse' sx={{height:'100%', mr:{xs:'15px', sm:'50px', md:"60px", lg:"100px"}, color:'#7B8082'}}>
            <FormControl sx={{ my: 'auto'}}>
                <NativeSelect
                    disableUnderline
                    defaultValue={1}
                    inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native',
                    }}
                    sx={{
                    color: '#7B8082',
                    fontSize: {xs:'9px',md:'10px',lg:'12px'},
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
                <LanguageIcon sx={{ my:'auto' ,mr:{xs:'6px', sm:'8px'}, width:{xs:'16px',sm:'18px'}}}/>
                
            </Stack>
            
        </Box>
        {/* NavBar */}
      <Container maxWidth="xl" sx={{ my: {xs:'10px', md:'12px', lg:'13px'}, paddingX:{md:"100px", lg:"141px"} }}>
        <Toolbar disableGutters>
        {/* Monitor width => 1024px */}
        <Box
            component="img"
            src='/pokemon-logo.webp'
            alt="Logo"
            sx={{
                
                width: {md:'150px', lg:'167px'},
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'center'
            }}
            />
        <Box 
        sx={{ ml:6, flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navItems.map((item, index) => (
              <Button
                href={item.path}
                key={item.path}
                value={index}
                onClick={handleCloseNavMenu}
                sx={(theme)=>({ textTransform: 'none', fontSize: {md:'0.9rem', lg:'1rem'}, mr: 6, color: pathname === item.path ? 'secondary.main' : 'primary.main', display: 'block', fontWeight: pathname === item.path ? 'bold' : 'normal', borderBottom: pathname === item.path ? 1 : 0, borderRadius:0, borderColor: 'secondary.light' })}
              >
                {item.label}
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
            <MenuIcon color='secondary'/>
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
              {navItems.map((item, index) => (
                <MenuItem 
                key={item.path}
                 onClick={handleCloseNavMenu}>
                  <Button 
                  href={item.path}
                  value={index}
                  
                  sx={(theme)=>({ textTransform: 'none',  color: pathname === item.path ? 'secondary.main' : 'primary.main', display: 'block', fontWeight: pathname === item.path ? 'bold' : 'normal', borderBottom: pathname === item.path ? 1 : 0, borderRadius:0, borderColor: 'secondary.light' })}>{item.label}</Button>
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
                width: {xs:'130px', sm:'150px'},
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
