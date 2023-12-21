import React from 'react';
import Profile from './content/Profile';
import Settings from './content/Settings';
import Dashboard from './content/Dashboard';
import Default from './content/Default';
import '../css/ContentArea.css';


const ContentArea = ({ activeContent }) => {
    let content;

    switch (activeContent) {
      case 'profile':
        content = <Profile />;
        break;
      case 'settings':
        content = <Settings />;
        break;
      case 'dashboard':
            content = <Dashboard />;
            break;
      default:
        content = <Default />;
    }
  
    return (
      <div className="content-area">
        {content}
      </div>
    );
  };
  
  export default ContentArea;