import React from "react";
import Image from "next/image";

const WebsiteInterface = () => {
  return (
    <section>
      <div className="container">
        <div className="relative">
            <h1 className="my-4 text-center">CRM Overview</h1>
          {/* image */}
          <div className="pt-20">
            <Image
              src={"/images/banner/HeroDashboardU.png"}
              alt="banner-image"
              width={1200}
              height={598}
              className="w-full"
            />
          </div>
          <div>
            <h1 className="my-4 text-center">Report Overview</h1>
            <Image
              src={"/images/banner/ReportsU.png"}
              alt="banner-image"
              width={1200}
              height={598}
              className="w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WebsiteInterface;
