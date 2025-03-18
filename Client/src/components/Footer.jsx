import React from 'react';
import { Stack, IconButton, Divider } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className='bg-[#212121] text-white p-4 font-serif tracking-wide'>
      <div className='flex flex-col items-center gap-3 flex-wrap'>
        <div className='text-center flex flex-col gap-2 flex-wrap'>
          <h1 className='font-bold tracking-wider xs:text-2xl md:text-3xl'>Movie Website</h1>
          <h2 className='xs:text-sm md:text-xl'>Email: Jolites@gmail.com</h2>
          <h2 className='xs:text-sm md:text-xl'>Address: Jalpaiguri, West Bengal</h2>
        </div>
        <div className='p-2'>
          <Stack spacing={2} direction="row" flexWrap='wrap'>
            <IconButton color='inherit'>
              <Link to='/'>
                <InstagramIcon
                  sx={{ color: 'white', bgcolor: '#E4405F', borderRadius: '50%' }}
                  className='p-1 text-4xl hover:scale-110 hover:shadow-lg transition-transform duration-250'
                />
              </Link>
            </IconButton>
            <IconButton color='inherit'>
              <Link to='/'>
                <FacebookIcon
                  sx={{ color: 'white', bgcolor: '#1877F2', borderRadius: '50%' }}
                  className='p-1 text-4xl hover:scale-110 hover:shadow-lg transition-transform duration-250'
                />
              </Link>
            </IconButton>
            <IconButton color='inherit'>
              <Link to='/'>
                <LinkedInIcon
                  sx={{ color: 'white', bgcolor: '#0A66C2', borderRadius: '50%' }}
                  className='p-1 text-4xl hover:scale-110 hover:shadow-lg transition-transform duration-250'
                />
              </Link>
            </IconButton>
          </Stack>
        </div>
      </div>
      <Divider sx={{ bgcolor: 'white', mx: 2 }} />
      <div className='p-2 text-center'>
        <h1 className='font-bold tracking-wider xs:text-sm md:text-xl'>@Jolu Boys | {new Date().getFullYear()}</h1>
      </div>
    </div>
  );
}
