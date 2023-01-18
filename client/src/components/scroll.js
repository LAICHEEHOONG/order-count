import React from 'react';

const Scroll = () => {
    window.addEventListener("scroll", myFunction);

    function myFunction() {
        let scrollpercent = (document.body.scrollTop + document.documentElement.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
        let scrollpercentages = (scrollpercent * 100).toFixed(2);
        let setMarginTop = (document.documentElement.clientHeight * 80) / 100;

        if (scrollpercentages > 20) {
            document.querySelector('.filter').style.marginTop = `${setMarginTop}px`;
        } else {
            document.querySelector('.filter').style.marginTop = `-18px`;
        }

    }
    return (
        <></>
    )
}

export default Scroll;
