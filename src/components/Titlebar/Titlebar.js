import React from 'react';

// bootstrap
import { Nav, Navbar } from '../../styles';

// styling
import './Titlebar.css';

// models
import Image from '../../models/image';

export class Titlebar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navigation: 0
    };
  }

  configUpload = () => {
    const inputUpload = document.createElement('input');
    inputUpload.style.display = 'none';
    // const blob = new Blob([JSON.stringify(this.props.carouselConfig)]);
    inputUpload.type = 'file';
    document.body.appendChild(inputUpload);
    inputUpload.addEventListener('change', async (ev) => {
      this.props.setMessage('info', `Uploading and processing configuration ...`);
      const configFile = ev.target.files[0];
      try {
        const carouselConfig = JSON.parse(await configFile.text());
        if (carouselConfig) this.props.setCarouselConfig(carouselConfig, true);
        else throw new Error();
      } catch (err) {
        console.log('Error in parsing config file during upload: ', err);
        this.props.setMessage('error', `Couldn't process config file upload!`);
      }
    });
    inputUpload.click();
    // setTimeout(() => {
    //   URL.revokeObjectURL(aDownload.href);
    //   aDownload.parentNode.removeChild(aDownload);
    // }, 0);
  }

  throwConfigDownload = () => {
    const aDownload = document.createElement('a');
    aDownload.style.display = 'none';
    const blob = new Blob([JSON.stringify(this.props.carouselConfig)]);
    aDownload.href = URL.createObjectURL(blob);
    aDownload.download = 'Carousel Config.json';
    document.body.appendChild(aDownload);
    aDownload.click();
    setTimeout(() => {
      URL.revokeObjectURL(aDownload.href);
      aDownload.parentNode.removeChild(aDownload);
    }, 0);
  }

  render() {
    const { navigation } = this.state;
    return (
      <div className="titlebar-component">
        <Navbar expand="lg" bg="dark" variant="dark" className="navbar">
          <Navbar.Brand className="title">Image Carousel Customizer</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link onClick={this.configUpload}>Import</Nav.Link>
              <Nav.Link onClick={this.throwConfigDownload}>Export</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    )
  }
}

export default Titlebar;