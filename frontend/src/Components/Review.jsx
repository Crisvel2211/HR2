import React, { PureComponent } from "react";

function Review () {
  return (
    <div className="bg-gray-200 text-black h-auto p-5">
      {/* 4 cards */}
        <p className="font-semibold mb-5">Overview</p>
  <div className="stats lg:stats-horizontal shadow flex flex-row ">
  <div className="stat ">
    <div className="stat-title">Downloads</div>
    <div className="stat-value">31K</div>
    <div className="stat-desc">Jan 1st - Feb 1st</div>
  </div>

  <div className="stat">
    <div className="stat-title">Applicant</div>
    <div className="stat-value">4,200</div>
    <div className="stat-desc">↗︎ 400 (22%)</div>
  </div>

  <div className="stat">
    <div className="stat-title">New Registers</div>
    <div className="stat-value">1,200</div>
    <div className="stat-desc">↘︎ 90 (14%)</div>
  </div>
</div>
      </div>
  );
};

export default Review;
