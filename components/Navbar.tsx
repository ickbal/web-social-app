import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { getSiteDomain, getSiteName } from "../lib/env";
import Button from "./action/Button";
import IconShare from "./icon/IconShare";
import React, { useState } from "react";
import Modal from "./modal/Modal";
import InputClipboardCopy from "./input/InputClipboardCopy";
import { Tooltip } from "react-tooltip";

const Navbar = ({ roomId }: { roomId?: string }) => {
  const [showShare, setShowShare] = useState(false);
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  return (
    <div className={"py-1 px-2 flex flex-row gap-1 items-stretch bg-dark-900"}>
      <Link
        href={"/"}
        className={
          "flex p-1 shrink-0 flex-row gap-1 items-center rounded action"
        }
      >
        <Image
          src={"/logo_white.png"}
          alt={"Ickbal Watch Party logo"}
          width={36}
          height={36}
        />
        <span className={"hide-below-sm"}>{getSiteName()}</span>
      </Link>
      
      <div className="ml-auto flex items-center gap-2">
        {roomId && (
          <>
            <Modal
              title={"Invite your friends"}
              show={showShare}
              close={() => setShowShare(false)}
            >
              <div>Share this link to let more people join in on the fun</div>
              <InputClipboardCopy
                className={"bg-dark-1000"}
                value={getSiteDomain() + "/room/" + roomId}
              />
            </Modal>
            <Button
              tooltip={"Share the room link"}
              id={"navbar-share"}
              actionClasses={"hover:bg-primary-800 active:bg-primary-700"}
              className={"p-2 bg-primary-900"}
              onClick={() => setShowShare(true)}
            >
              <div className={"flex items-center mx-1"}>
                <IconShare className={"mr-1"} />
                Share
              </div>
            </Button>
          </>
        )}

        {/* Authentication UI */}
        {isLoading ? (
          <div className="text-gray-400 px-2">Loading...</div>
        ) : session ? (
          <div className="flex items-center gap-2">
            <Link href="/profile" className="flex items-center gap-2 hover:bg-dark-800 p-2 rounded">
              {session.user?.image ? (
                <Image 
                  src={session.user.image} 
                  alt={session.user.name || "User"} 
                  width={32} 
                  height={32} 
                  className="rounded-full"
                />
              ) : (
                <div className="w-8 h-8 bg-primary-700 rounded-full flex items-center justify-center">
                  {session.user?.name?.charAt(0) || "U"}
                </div>
              )}
              <span className="hide-below-md">{session.user.name}</span>
            </Link>
            <Button
              tooltip={"Sign out"}
              id={"navbar-signout"}
              actionClasses={"hover:bg-dark-700 active:bg-dark-600"}
              className={"p-2 bg-dark-800"}
              onClick={() => signOut()}
            >
              <div className={"flex items-center mx-1"}>
                Sign out
              </div>
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              tooltip={"Sign in"}
              id={"navbar-signin"}
              actionClasses={"hover:bg-dark-700 active:bg-dark-600"}
              className={"p-2 bg-dark-800"}
              onClick={() => signIn()}
            >
              <div className={"flex items-center mx-1"}>
                Sign in
              </div>
            </Button>
            <Link href="/auth/register">
              <Button
                tooltip={"Register"}
                id={"navbar-register"}
                actionClasses={"hover:bg-primary-800 active:bg-primary-700"}
                className={"p-2 bg-primary-900"}
              >
                <div className={"flex items-center mx-1"}>
                  Register
                </div>
              </Button>
            </Link>
          </div>
        )}
      </div>
      
      <Tooltip
        anchorId={"navbar-share"}
        place={"bottom"}
        style={{
          backgroundColor: "var(--dark-700)",
        }}
      />
      <Tooltip
        anchorId={"navbar-signin"}
        place={"bottom"}
        style={{
          backgroundColor: "var(--dark-700)",
        }}
      />
      <Tooltip
        anchorId={"navbar-register"}
        place={"bottom"}
        style={{
          backgroundColor: "var(--dark-700)",
        }}
      />
      <Tooltip
        anchorId={"navbar-signout"}
        place={"bottom"}
        style={{
          backgroundColor: "var(--dark-700)",
        }}
      />
    </div>
  );
};

export default Navbar;
