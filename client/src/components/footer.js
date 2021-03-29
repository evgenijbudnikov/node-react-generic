import React from "react";

export const Footer = () => {
    return (

        <footer className="page-footer footer-fixed">
            <div className="container">
                <div className="row">
                    <div className="col l6 s12">
                        <h5 className="grey-text text-lighten-1">Generic Website</h5>

                        <p className="grey-text text-lighten-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        <br/>
                        <span className="grey-text text-lighten-6" style={{fontSize:13+'px'}}>© 2021 Copyright Text</span>
                    </div>
                    <div className="col l4 offset-l2 s12">
                        <h5 className="grey-text text-lighten-1">Links</h5>
                        <ul>
                            <li><a className="grey-text text-lighten-6" href="#!">Link 1</a></li>
                            <li><a className="grey-text text-lighten-6" href="#!">Link 2</a></li>
                            <li><a className="grey-text text-lighten-6" href="#!">Link 3</a></li>
                            <li><a className="grey-text text-lighten-6" href="#!">Link 4</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
