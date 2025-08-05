import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import "../index.css";

const CodeOfConduct = () => {
  return (
    <div className="flex flex-col animate-slideInLeft py-[70px] px-5 text-justify  transition-all delay-[1s] ease-in bg-cover  bg-no-repeat -cover min-h-content  w-full mx-auto p-6 text-app bg-app">
      <h1 className=" mb-4 text-3xl font-bold text-center text-app">
        Code of Conduct
      </h1>

      <h2 className="mt-6 mb-2 text-2xl font-semibold ">Our Pledge</h2>
      <p className="mb-4 text-muted-fg">
        As contributors and maintainers of{" "}
        <strong className="text-muted">Nubloq</strong>, we pledge to make
        participation in our project a harassment-free experience for everyone,
        regardless of age, body size, disability, ethnicity, gender identity and
        expression, experience level, nationality, race, religion, or sexual
        identity.
      </p>

      <h2 className="mt-6 mb-2 text-2xl font-semibold">Our Standards</h2>
      <p className="mb-2 text-muted-fg">
        Examples of behavior that contributes to a positive environment:
      </p>
      <ul className="mb-4 text-muted-fg list-disc list-inside">
        <li>Using welcoming and inclusive language</li>
        <li>Being respectful of differing viewpoints</li>
        <li>Gracefully accepting constructive criticism</li>
        <li>Showing empathy toward others</li>
        <li>Posting Graceful and Helpful bogs</li>
      </ul>

      <p className="mb-2">Examples of unacceptable behavior:</p>
      <ul className="mb-4 text-muted-fg list-disc list-inside">
        <li>Harassment, bullying, or discrimination</li>
        <li>Trolling or insulting comments</li>
        <li>Publishing others’ private information without consent</li>
        <li>Using slangs and misconduct</li>
      </ul>

      <h2 className="mt-6 mb-2 text-2xl font-semibold">Enforcement</h2>
      <p className="mb-4 text-muted-fg">
        This project is personally maintained. If you encounter any issues or
        violations of this Code of Conduct, please email the maintainer
        privately.{" "}
        <a
          href="mailto:bloggernishu31@example.com"
          className="underline hover:text-blue-500"
        >
          bloggernishu31@example.com
        </a>
      </p>

      <p className="mb-2 text-muted-fg">
        Instances of abusive behavior may result in temporary or permanent bans
        from future usage or updates.
      </p>

      <hr className="my-6 border-gray-400 dark:border-gray-600" />

      <div className="flex flex-row flex-wrap justify-between text-sm text-gray-600 dark:text-gray-400">
        <p>
          Currently Maintained by :{" "}
          <strong className="text-primary">
            <a href="https://github.com/nishuR31" target="_blank">
              Nishu
            </a>
          </strong>
        </p>
        <p>
          Email :{" "}
          <a
            href="mailto:bloggernishu31@example.com"
            className="hover:underline hover:text-primary"
          >
            bloggernishu31@example.com
          </a>
        </p>
      </div>
      <br />
      <div className="">
        <Link to="/" className="">
          <Button variant="ghost" className="w-full  bg-muted ">
            Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default CodeOfConduct;
