import React from 'react';
import Navbar from '@theme-original/Navbar';
import type { WrapperProps } from '@docusaurus/types';
import type NavbarType from '@theme/Navbar';

type Props = WrapperProps<typeof NavbarType>;

export default function NavbarWrapper(props: Props) {
  return <Navbar {...props} />;
}
