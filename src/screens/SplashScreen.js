import '../styles/SplashScreen.css';
import decia from '../assets/DECIA.webp';
import React, { Component } from 'react';

class SplashScreen extends Component {

    componentDidMount() {
        setTimeout(() => {
            this.props.onFinish();
        }, 2000);
    }

    render() {
        return (
            <div className="splash-screen">
                <img
                    src={decia}
                    alt="DECIA"
                    className="splash-logo"
                />
            </div>
        );
    }
}

export default SplashScreen;