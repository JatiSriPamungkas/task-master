import { Link } from "react-router";

const NotFoundPage = () => {
  return (
    <>
      <div className="box-border flex flex-col justify-center items-center min-h-screen gap-6 font-lexend bg-stone-100">
        <h1 className="text-[250px] font-extrabold text-image">Oops!</h1>
        <h2 className="text-3xl font-bold text-secondary">
          404 - Not Found Page
        </h2>
        <p>
          The Page you are looking for might have been removed{" "}
          <span className="whitespace-nowrap block text-center">
            had its name changed or is temporarily unavailable.
          </span>
        </p>
        <Link
          to="/"
          className="text-center border-2 w-1/5 py-3 rounded-lg bg-primary text-white hover:bg-slate-700"
        >
          Back to Home
        </Link>
      </div>
    </>
  );
};

export default NotFoundPage;
