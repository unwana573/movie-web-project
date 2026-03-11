import React from 'react'
import { MdHomeFilled } from 'react-icons/md'
import { FaTv } from "react-icons/fa6";
import { MdMovieCreation } from "react-icons/md";
import { IoSearchOutline } from 'react-icons/io5';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export const navigation: NavItem[] = [
  {
    label: 'TV shows',
    href: 'tv',
    icon: <FaTv />
  },
  {
    label: 'Movies',
    href: 'movie',
    icon: <MdMovieCreation />
  }
]

export const mobileNavigation: NavItem[] = [
  {
    label: "Home",
    href: "/",
    icon: <MdHomeFilled />
  },
  ...navigation,
  {
    label: "search",
    href: "/search",
    icon: <IoSearchOutline />
  }
]