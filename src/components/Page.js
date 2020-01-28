import React from 'react';
import Background from './Background';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import Navigation from './Navigation';
import '../styles/index.css';

const Page = (props) => (
    <>
        <main id="page-wrapper">
            <div id="page-container" className="box">
                <div className="page">
                    <SiteHeader />
                    <Navigation setPageToGlobe={props.setPageToGlobe} setPageToTravelList={props.setPageToTravelList} />
                    {props.children}
                    < SiteFooter setPageToLogin={props.setPageToLogin} />
                </div>
            </div>
        </main>
    </>
);

export default Page;