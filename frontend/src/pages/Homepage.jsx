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
      <div className="flex h-full w-full p-24 justify-around shadow-xl">
        <div className="w-1/2 flex flex-col justify-center gap-4">
          <p className="text-7xl font-bold">
            Ace Your Interviews with Confidence
          </p>
          <p className="text-3xl font-semibold my-4">
            Practice with real-time feedback and collaboration tools
          </p>
          {user ? (
            <div className="flex gap-8">
              <PopupModal />
              <InputModal />
            </div>
          ) : (
            <div className="flex gap-8">
              <button
                className="bg-blue-400 font-semibold text-lg text-white px-4 py-1 rounded-md shadow-md"
                onClick={() => navigate("/login")}
              >
                Login
              </button>
              <button
                className="font-semibold text-lg px-4 py-1 rounded-md border border-gray-300 shadow-md"
                onClick={() => navigate("/signup")}
              >
                Signup
              </button>
            </div>
          )}
        </div>
        <div className="w-2/12">
          <img src={heroGif} alt="Interview GIF" />
        </div>
      </div>

      {/* Features */}
      <div className="p-24 flex flex-col items-center" id="features">
        <div className="w-fit mx-auto border-b-4 border-blue-400 p-2 text-5xl font-semibold">
          Our Features
        </div>
        <div className="flex flex-row-reverse items-center justify-between p-12">
          <p className="text-3xl w-1/2">
            <strong>Audio and Video Calls: </strong>Communicate seamlessly with
            crystal-clear audio and video.
          </p>
          <img
            src="https://miro.medium.com/v2/resize:fit:828/format:webp/1*NLSe2SyjfxdbEqFsOWHhlg.png"
            className="w-4/12 rounded-md shadow-xl"
            alt="Audio/Video Calls"
          />
        </div>

        <div className="flex items-center justify-between p-12">
          <p className="text-3xl w-1/2">
            <strong>Collaborative Code Editor: </strong>Code together in
            real-time with syntax highlighting and autocompletion.
          </p>
          <img
            src={codeEditorImg}
            className="w-4/12 rounded-md shadow-xl"
            alt="Code Editor"
          />
        </div>

        <div className="flex flex-row-reverse items-center justify-between p-12">
          <p className="text-3xl w-1/2 text-end">
            <strong>Text Editor: </strong>Take notes and plan your solutions
            with our integrated text editor.
          </p>
          <img
            src={textEditorImg}
            className="w-4/12 rounded-md shadow-xl"
            alt="Text Editor"
          />
        </div>
      </div>

      {/* How it works */}
      <div className="p-24 flex flex-col items-center">
        <div className="w-fit mx-auto border-b-4 border-blue-400 p-2 text-5xl font-semibold">
          How it works?
        </div>
        <div className="flex flex-col items-center justify-center p-12 gap-12">
          <p className="text-3xl">
            <strong>Sign Up:</strong> Create an account to get started.
          </p>
          <p className="text-3xl">
            <strong>Create or Join an Interview:</strong> Choose to start or
            join an interview session.
          </p>
          <p className="text-3xl">
            <strong>Collaborate and Practice:</strong> Use our tools to practice
            and improve your interview skills.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-blue-900 text-gray-200 p-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            {/* Quick Links */}
            <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
              <h3 className="text-3xl font-bold mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#privacy" className="hover:underline hover:text-orange-400">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#terms" className="hover:underline hover:text-orange-400">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:underline hover:text-orange-400">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
              <h3 className="text-3xl font-bold mb-4 text-white">Follow Us</h3>
              <div className="flex space-x-6">
                <a
                  href="https://www.linkedin.com/in/manthan-khawse-74a898245/"
                  className="text-3xl hover:scale-125 transition-all ease-in-out hover:text-orange-400"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://x.com/khawse_man69128"
                  className="text-3xl hover:scale-125 transition-all ease-in-out hover:text-orange-400"
                >
                  <FaSquareXTwitter />
                </a>
                <a
                  href="https://github.com/manthankhawse"
                  className="text-3xl hover:scale-125 transition-all ease-in-out hover:text-orange-400"
                >
                  <FaSquareGithub />
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="w-full sm:w-1/3">
              <h3 className="text-3xl font-bold mb-4 text-white">Contact Us</h3>
              <p>Email: prepedge@gmail.com</p>
              <p>Phone: +91 809345667xx</p>
              
            </div>
          </div>

          {/* Bottom */}
          <div className="text-center mt-8 text-gray-400">
            <p>&copy; 2025 ProScout. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
