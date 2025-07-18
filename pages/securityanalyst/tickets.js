import React from "react";

// components
import CardSettings from "components/Cards/CardSettings.js";

//import CardProfile from "components/Cards/CardProfile.js";

// layout for page

import Admin from "layouts/Admin.js";

// will change 'CardSettings' to 'TicketSettings' when the component is ready
export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8 px-4">
          <CardSettings />
        </div>
      </div>
    </>
  );
}

Settings.layout = Admin;