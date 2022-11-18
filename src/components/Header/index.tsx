import type { FC } from 'react';

export interface HeaderProps {
  title: string;
}

const Header: FC<HeaderProps> = (props) => {
  const { title } = props;
  return <header>{title ?? '헤더랄까요'}</header>;
};

export default Header;
