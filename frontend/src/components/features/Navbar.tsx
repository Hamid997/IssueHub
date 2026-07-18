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

import Avatar from "../base/Avatar";

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

          {currentUser && (
            <Avatar
              user={currentUser}
              size="small"
            />
          )}

          <ChevronDown size={18} />

        </button>

        {open && (

          <div className="dropdown">

            <div className="dropdown-header">

              {currentUser && (
                <Avatar
                  user={currentUser}
                  size="large"
                />
              )}

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

            <button
              className="dropdown-item"
              onClick={() => {

                setOpen(false);

                navigate("/profile");

              }}
            >
              <User size={18} />
              My Profile
            </button>

            <button
              className="dropdown-item"
              onClick={() => {

                navigate("/settings");

                setOpen(false);

              }}
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