import {
  Button,
  Drawer,
  Menu,
  rem,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconTrash } from "@tabler/icons-react";
import clsx from "clsx";
import React from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { BiMenu } from "react-icons/bi";
import {
  FaFacebook,
  FaInstagram,
  FaTwitterSquare,
  FaUser,
  FaYoutube,
} from "react-icons/fa";
import { MdArrowForward } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import useStore from "../store";
import Logo from "./Logo";
import Sidebar from "./Sidebar";

const MobileDrawer = ({ theme }) => {
  const { user } = useStore();
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
      >
        <Sidebar close={close} />

        <div className='w-full mt-10'>
          <UserMenu user={user?.user} theme={theme} />
        </div>

        <Button
          onClick={open}
          className={theme ? "text-white" : "text-slate-800"}
        >
          <BiMenu className='text-xl' />
        </Button>
      </Drawer>

      <Button
        className={theme ? "text-white" : "text-slate-800"}
        onClick={open}
      >
        <BiMenu className='text-xl' />
      </Button>
    </>
  );
};

function UserMenu({ user, theme }) {
  const { signOut } = useStore();

  const handleSignOut = () => {
    localStorage.removeItem("user");
    signOut();
  };

  return (
    <Menu shadow='md' width={200}>
      <Menu.Target>
        <Button
          className={`${
            theme ? "text-gray-400" : "text-black"
          } flex items-center`}
        >
          <img
            src={user?.image}
            alt='Profile'
            className='w-8 h-8 rounded-full'
          />
          <div className='flex flex-col items-start ml-1'>
            <p className='font-medium'>{user?.name}</p>
            <span className='text-sm font-normal'>{user?.accountType}</span>
          </div>
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Application</Menu.Label>
        <Menu.Item
          leftSection={<FaUser style={{ width: rem(14), height: rem(14) }} />}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          leftSection={
            <AiOutlineLogout style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={() => handleSignOut()}
        >
          Logout
        </Menu.Item>

        <Menu.Divider />

        <Menu.Label>Danger Zone</Menu.Label>
        <Menu.Item
          color='red'
          leftSection={
            <IconTrash style={{ width: rem(14), height: rem(14) }} />
          }
          onClick={() => {}}
        >
          Delete account
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

const Navbar = () => {
  const { colorScheme } = useMantineColorScheme();

  const { user, signInModal, setSignInModal } = useStore();
  const location = useLocation();
  const theme = colorScheme === "dark";

  const handleLogin = () => {
    location.pathname === "/auth" && setSignInModal(!signInModal);
  };

  return (
    <div className='w-full fixed top-0 z-50 bg-transparent flex flex-row px-4 md:px-6 py-4 md:py-5 items-center justify-between gap-4 shadow'>
      {user && (
        <div className='block lg:hidden'>
          <MobileDrawer theme={theme} />
        </div>
      )}

      <div className='hidden lg:flex gap-2 text-[20px]'>
        <Link to='/' className='text-red-600'>
          <FaYoutube />
        </Link>
        <Link to='/' className='text-blue-600'>
          <FaFacebook />
        </Link>
        <Link to='/' className='text-rose-600'>
          <FaInstagram />
        </Link>
        <Link to='/' className='text-blue-6 00'>
          <FaTwitterSquare />
        </Link>
      </div>

      <Logo />

      <div className='flex gap-14 items-center'>
        <div className='flex gap-2 items-center'>
          {user?.token ? (
            <UserMenu user={user?.user} theme={theme} />
          ) : (
            <Link
              to='/auth'
              onClick={handleLogin}
              className={clsx(
                "flex items-center gap-2 rounded-full 2XL:MR-10 text-base",
                theme ? "text-white" : "text-black"
              )}
            >
              <span>Login</span>
              <MdArrowForward />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
