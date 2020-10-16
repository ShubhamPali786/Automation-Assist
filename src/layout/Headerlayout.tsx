import React from 'react';
import HeaderStyles from './Headerlayout.module.css'
const HeaderLayout:React.FC<{}>=(props)=>{
    return (
        <header>
            <div className={HeaderStyles.header_container}>
                <img src="/kpmg-logo.jpg" />
                <h2>AUTOMATION ASSIST</h2>
            </div>
        </header>
    )
}

export default HeaderLayout;