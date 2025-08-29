import React, { useContext } from "react";
import { DataContext } from "../context/DataProvider";
import heroGif from "../assets/job-interview.gif";
import textEditorImg from "../assets/Text Editor.png";
import codeEditorImg from "../assets/code editor.png";
import { useNavigate } from "react-router-dom";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaSquareGithub } from "react-icons/fa6";
import InputModal from "../components/InputModal";
import PopupModal from "../components/PopupModal";
import Navbar from "../components/Navbar"; 

function Homepage() {
  const { user } = useContext(DataContext);
  const navigate = useNavigate();

  return (
    <>
      
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col lg:flex-row min-h-screen w-full px-4 sm:px-8 lg:px-24 py-12 lg:py-24 justify-center lg:justify-around items-center shadow-xl">
        <div className="w-full lg:w-1/2 flex flex-col justify-center gap-4 text-center lg:text-left order-2 lg:order-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
            Ace Your Interviews with Confidence
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold my-4">
            Practice with real-time feedback and collaboration tools
          </p>
          {user ? (
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-8 justify-center lg:justify-start">
              <PopupModal />
              <InputModal />
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-8 justify-center lg:justify-start">
              <button
                className="bg-blue-400 font-semibold text-lg text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-500 transition"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="font-semibold text-lg px-6 py-3 rounded-md border border-gray-300 shadow-md hover:bg-gray-50 transition"
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
            </div>
          )}
        </div>
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-2/12 xl:w-3/12 mb-8 lg:mb-0 order-1 lg:order-2">
          <img src={heroGif} alt="Interview GIF" className="w-full h-auto" />
        </div>
      </div>

      {/* Features */}
      <div className="px-4 sm:px-8 lg:px-24 py-12 lg:py-24 flex flex-col items-center" id="features">
        <div className="w-fit mx-auto border-b-4 border-blue-400 p-2 text-3xl sm:text-4xl lg:text-5xl font-semibold text-center">
          Our Features
        </div>
        
        {/* Feature 1 */}
        <div className="flex flex-col lg:flex-row-reverse items-center justify-between py-8 lg:py-12 gap-8">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <p className="text-xl sm:text-2xl lg:text-3xl">
              <strong>Audio and Video Calls: </strong>Communicate seamlessly with
              crystal-clear audio and video.
            </p>
          </div>
          <div className="w-full sm:w-2/3 lg:w-4/12">
            <img
              src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*NLSe2SyjfxdbEqFsOWHhlg.png"
              className="w-full h-auto rounded-md shadow-xl"
              alt="Audio/Video Calls"
            />
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col lg:flex-row items-center justify-between py-8 lg:py-12 gap-8">
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <p className="text-xl sm:text-2xl lg:text-3xl">
              <strong>Collaborative Code Editor: </strong>Code together in
              real-time with syntax highlighting and autocompletion.
            </p>
          </div>
          <div className="w-full sm:w-2/3 lg:w-4/12">
            <img
              src={codeEditorImg}
              className="w-full h-auto rounded-md shadow-xl"
              alt="Code Editor"
            />
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col lg:flex-row-reverse items-center justify-between py-8 lg:py-12 gap-8">
          <div className="w-full lg:w-1/2 text-center lg:text-right">
            <p className="text-xl sm:text-2xl lg:text-3xl">
              <strong>Text Editor: </strong>Take notes and plan your solutions
              with our integrated text editor.
            </p>
          </div>
          <div className="w-full sm:w-2/3 lg:w-4/12">
            <img
              src={textEditorImg}
              className="w-full h-auto rounded-md shadow-xl"
              alt="Text Editor"
            />
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="px-4 sm:px-8 lg:px-24 py-12 lg:py-24 flex flex-col items-center">
        <div className="w-fit mx-auto border-b-4 border-blue-400 p-2 text-3xl sm:text-4xl lg:text-5xl font-semibold text-center">
          How it works?
        </div>
        <div className="flex flex-col items-center justify-center py-8 lg:py-12 gap-8 lg:gap-12 max-w-4xl">
          <div className="text-center">
            <p className="text-xl sm:text-2xl lg:text-3xl">
              <strong>Sign Up:</strong> Create an account to get started.
            </p>
          </div>
          <div className="text-center">
            <p className="text-xl sm:text-2xl lg:text-3xl">
              <strong>Create or Join an Interview:</strong> Choose to start or
              join an interview session.
            </p>
          </div>
          <div className="text-center">
            <p className="text-xl sm:text-2xl lg:text-3xl">
              <strong>Collaborate and Practice:</strong> Use our tools to practice
              and improve your interview skills.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900 text-gray-200 px-4 sm:px-8 lg:px-24 py-12 lg:py-24">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#privacy" className="text-base lg:text-lg hover:underline hover:text-orange-400 transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="text-base lg:text-lg hover:underline hover:text-orange-400 transition">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-base lg:text-lg hover:underline hover:text-orange-400 transition">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="text-center">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-white">Follow Us</h3>
              <div className="flex justify-center space-x-6">
                <a
                  href="https://www.linkedin.com/in/manthan-khawse-74a898245/"
                  className="text-2xl lg:text-3xl hover:scale-125 transition-all ease-in-out hover:text-orange-400"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://x.com/khawse_man69128"
                  className="text-2xl lg:text-3xl hover:scale-125 transition-all ease-in-out hover:text-orange-400"
                  aria-label="Twitter"
                >
                  <FaSquareXTwitter />
                </a>
                <a
                  href="https://github.com/manthankhawse"
                  className="text-2xl lg:text-3xl hover:scale-125 transition-all ease-in-out hover:text-orange-400"
                  aria-label="GitHub"
                >
                  <FaSquareGithub />
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-white">Contact Us</h3>
              <div className="space-y-2">
                <p className="text-base lg:text-lg">Email: prepedge@gmail.com</p>
                <p className="text-base lg:text-lg">Phone: +91 809345667xx</p>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="text-center mt-8 pt-8 border-t border-indigo-700 text-gray-400">
            <p className="text-sm lg:text-base">&copy; 2025 ProScout. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Homepage;
