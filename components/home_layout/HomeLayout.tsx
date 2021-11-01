import React from 'react';

interface HomeLayoutProps {
  Menu: () => JSX.Element;
  Timer: () => JSX.Element;
};

export class HomeLayout extends React.Component<HomeLayoutProps> {

  render() {
  const { Menu, Timer } = this.props;
    return (
      <div>
        <Menu />
        <Timer />
      </div>
    )
  }
}
