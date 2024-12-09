import Year from "../year/year";

const Footer = () => {
  return (
    <section className=" py-7">
      <div className="flex items-center justify-center p-5">
        <h1 className="text-black">
          &copy; Blog Management
          <Year />
        </h1>
      </div>
    </section>
  );
};

export default Footer;
