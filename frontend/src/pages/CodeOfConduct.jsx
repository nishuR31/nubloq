import React from "react";
import {Link} from "react-router-dom"
import {Button} from "../components/ui/button"
const CodeOfConduct = () => {
  return (
    <div className="animate-slideInLeft py-[70px] px-5 text-justify transition-all delay-3000 ease-in-out bg-cover bg-no-repeat dark:bg-right bg-fixed dark:bg-cover h-fit  bg-contact-light dark:bg-contact-dark">
      <h1 className="text-3xl text-center font-bold mb-4">Code of Conduct</h1>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Our Pledge</h2>
      <p className="mb-4">
        As contributors and maintainers of <strong>BlogPaglu</strong>, we pledge to make participation in our project a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, gender identity and expression, experience level, nationality, race, religion, or sexual identity.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Our Standards</h2>
      <p className="mb-2">Examples of behavior that contributes to a positive environment:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Using welcoming and inclusive language</li>
        <li>Being respectful of differing viewpoints</li>
        <li>Gracefully accepting constructive criticism</li>
        <li>Showing empathy toward others</li>
      </ul>

      <p className="mb-2">Examples of unacceptable behavior:</p>
      <ul className="list-disc list-inside mb-4">
        <li>Harassment, bullying, or discrimination</li>
        <li>Trolling or insulting comments</li>
        <li>Publishing others’ private information without consent</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-2">Enforcement</h2>
      <p className="mb-4">
        This project is personally maintained. If you encounter any issues or violations of this Code of Conduct, please email the maintainer privately.
      </p>

      <p className="mb-2">
        Instances of abusive behavior may result in temporary or permanent bans from future usage or updates.
      </p>

      <hr className="my-6 border-gray-400 dark:border-gray-600" />

      <div className="flex flex-row flex-wrap justify-between text-sm text-gray-600 dark:text-gray-400">
        <p>Currently Maintained by : <strong><a href="https://github.com/nishuR31" target="_blank">Nishu</a></strong></p>
        <p>Email : <a href="mailto:bloggernishu31@example.com" className="underline hover:text-blue-500">bloggernishu31@example.com</a></p>
      </div>
      <br />
        <div className=""><Link to="/" className=""><Button variant="outline" className="w-full">Home</Button></Link></div>
    </div>
  );
};

export default CodeOfConduct;
