import { useState, useRef, useEffect } from "react";

import {
  ClipboardCheck,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import useAuthContext from "../../hooks/useAuthContext";

export default function Navbar() {

  const {
    logout,
    currentUser,
  } = useAuthContext();

  const navigate = useNavigate();

  const [open, setOpen] =
    useState(false);

  const menuRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {

    function handleClick(
      e: MouseEvent,
    ) {

      if (
        menuRef.current &&
        !menuRef.current.contains(
          e.target as Node
        )
      ) {
        setOpen(false);
      }

    }

    window.addEventListener(
      "click",
      handleClick,
    );

    return () =>
      window.removeEventListener(
        "click",
        handleClick,
      );

  }, []);


  const initials =
    currentUser?.username
      ?.substring(0, 2)
      .toUpperCase() || "U";

  function handleLogout() {

    logout();

    navigate("/login");

  }

  return (

    <header className="navbar">

      <Link
        to="/"
        className="navbar-logo"
      >

        <ClipboardCheck />

        <strong>IssueHub</strong>

      </Link>

      <div
        className="user-menu"
        ref={menuRef}
      >

        <button
          className="user-trigger"
          onClick={() =>
            setOpen(!open)
          }
        >

          <div className="avatar">
            {initials}
          </div>

          {/* <div className="user-info">

            <strong>
              {currentUser?.username}
            </strong>

            <small>
              {currentUser?.email}
            </small>

          </div> */}

          <ChevronDown size={18} />

        </button>

        {open && (

          <div className="dropdown">

            <div className="dropdown-header">

              <div className="avatar large">
                {initials}
              </div>

              <div>

                <strong>
                  {currentUser?.username}
                </strong>

                <small>
                  {currentUser?.email}
                </small>

              </div>

            </div>

            <hr />

            <button className="dropdown-item">

              <User size={18} />

              My profile

            </button>

            <button
              className="dropdown-item disabled"
              disabled
            >

              <Settings size={18} />

              Settings

            </button>

            <hr />

            <button
              className="dropdown-item logout"
              onClick={handleLogout}
            >

              <LogOut size={18} />

              Logout

            </button>

          </div>

        )}

      </div>

    </header>
  );
}