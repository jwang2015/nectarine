import React from 'react';

export default class Body extends React.Component {

  isCurrentPage (uri) {
    return window.location.pathname == uri;
  }

  getTopNavbarButton (href, name) {
    let selected = this.isCurrentPage (href);
    return (
      <a href={ href } className={ "btn btn-default app-font" + (selected ? " myfiles-top-navbar-btn-selected" : "") }>
        <span className="glyphicon glyphicon-info-sign glyphicon-lg"></span>
        { name }
      </a>
    );
  }

  getLeftNavbarButton (href, name, icon) {
    let selected = this.isCurrentPage (href);
    return (
      <li>
        <a href={ href } className={ selected ? "myfiles-left-sidebar-selected" : "" }>
          <span className={ icon }></span>
          { name }
          { selected ? <span className="glyphicon glyphicon-chevron-right pull-right"></span> : null }
        </a>
      </li>
    );
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top myfiles-top-sidebar">
          <div className="navbar-right" role="toolbar">
            { this.getTopNavbarButton ("/about.html", "About Us") }
            { this.getTopNavbarButton ("/contact.html", "Contact") }
            { this.getTopNavbarButton ("/help.html", "How To") }
          </div>
        </nav>

        <div className="navbar-fixed-left">

          <div className="myfiles-title-logo">
            <a className="navbar-brand">
              <span className="glyphicon glyphicon-qrcode"></span>
            </a>
            <p className="myfiles-title">myfiles.io</p>
          </div>

          <div className="myfiles-left-sidebar app-font">
            <div className="row">
              <ul className="nav nav-pills nav-stacked">
                { this.getLeftNavbarButton ("/home.html", "Home", "glyphicon glyphicon-home glyphicon-lg") }
                { this.getLeftNavbarButton ("/user_profile.html", "Profile", "glyphicon glyphicon-user glyphicon-lg") }
                { this.getLeftNavbarButton ("/user_cloud_services.html", "Cloud Services", "glyphicon glyphicon-hdd glyphicon-lg") }
              </ul>
            </div>
          </div>

        </div>

        <div className="container myfiles-body">
          {this.props.children}
        </div>
      </div>
    )
  }
}