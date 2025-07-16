import React from 'react';

// components

import CardStats from 'components/Cards/CardStats.js';

export default function HeaderStats() {
  return (
    <>
      {/* Header */}
      <div className="relative bg-blueGray-800 md:pt-32 pb-32 pt-12">
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="ALERTS"
                  statTitle="3000"
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescription="Since last month"
                  statIconName="fas fa-exclamation-triangle"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="TICKETS"
                  statTitle="30"
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescription="Since last week"
                  statIconName="fas fa-ticket-alt"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="OPEN TICKETS"
                  statTitle="15"
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-emerald-500"
                  statDescription="Since yesterday"
                  statIconName="fas fa-folder-open"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="CLOSED TICKETS"
                  statTitle="15"
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescription="Since last month"
                  statIconName="fas fa-check-circle"
                  statIconColor="bg-emerald-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
