import React from 'react';
import HeaderLayout from './Headerlayout';

const Layout:React.FC<{}>=(props)=>{
    return(
        <>
    <HeaderLayout/>
        <main>{props.children}</main>
        </>
    )
}

export default Layout;