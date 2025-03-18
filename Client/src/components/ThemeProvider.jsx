import React from 'react'
import { useSelector, useDispatch } from "react-redux"

export default function ThemeProvider({ children }) {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <div className={theme}>
      <div className='dark:text-white text-slate-700'>
        {children}
      </div>
    </div>
  )
}
