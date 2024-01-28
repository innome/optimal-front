import React from 'react';
import Profile from './content/Profile';
import Settings from './content/Settings';
import Dashboard from './content/Dashboard';
// import Default from './content/Default';
import AddHoma from './content/AddHoma';
import AddUser from './content/AddUser';
import SeeHoma from './content/SeeHoma';
import SeeLogs from './content/SeeLogs';
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
    case 'AddHoma':
      content = <AddHoma />;
      break;
    case 'AddUser':
      content = <AddUser />;
      break;
    case 'seeHoma':
      content = <SeeHoma />;
      break;
    case 'seeLogs':
        content = <SeeLogs />;
        break;
    default:
      content = <Dashboard />;
  }

  return (
    <div className="content-area">
      {content}
    </div>
  );
};

export default ContentArea;