import Image from "next/image";

const Review = () => {
  return (
    <section>
      <div className="container">
        <div className="relative">
          <div>
            <h2 className="text-navyblue text-center max-w-2xl mx-auto">
              What Our Clients Say About Weeam
            </h2>
            <p className="text-lg font-normal text-darkgray text-center mt-4">
              Trusted by real estate professionals and developers, Weeam
              simplifies operations — from lead tracking to HR and invoicing —
              all in one CRM.
            </p>
          </div>
          <div>
            <Image
              src={"/images/clientsay/avatars.png"}
              alt="avatar-image"
              width={1061}
              height={733}
              className="hidden lg:block mx-20"
            />
            <Image
              src={"/images/clientsay/bgimage.svg"}
              alt="avatar-image"
              width={1061}
              height={733}
              className="hidden lg:block z-10 absolute top-56 xl:left-20 -left-10"
            />
          </div>
          <div className="lg:absolute lg:top-[45%] xl:left-[32%] lg:left-[29%]">
            <Image
              src={"/images/clientsay/user.png"}
              alt="user-image"
              width={168}
              height={168}
              className="mx-auto pt-10 lg:pb-10"
            />
            <div className="lg:inline-block bg-white rounded-2xl p-5 shadow-md">
              <p className="text-base font-normal text-center text-darkgray">
                Weeam has transformed how we manage our property <br />{" "}
                listings. client communications, share people from <br />{" "}
                interviews to invoicing, is now centralized.
              </p>
              <p className="text-2xl font-medium text-center py-2">
                Ameer Khan
              </p>
              <p className="text-sm font-normal text-center">
                {" "}
                Director, Silverline Real Estat
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;
