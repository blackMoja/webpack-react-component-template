import type { FC } from 'react';

export interface HeaderProps {
  title?: string;
}

const Header: FC<HeaderProps> = (props) => {
  const { title } = props;

  return <header>{title ?? '타이틀 입니다만.'}</header>;
};

export default Header;
