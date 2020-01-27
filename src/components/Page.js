import React from 'react';
import Background from './Background';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import '../styles/index.css';

const Page = (props) => (
    <>
        <main id="page-wrapper">
            <div id="page-container" className="box">
                <div className="page">
                    <SiteHeader />
                    {props.children}
                    <SiteFooter />
                </div>
            </div>
        </main>
    </>
);

export default Page;