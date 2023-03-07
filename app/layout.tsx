import './globals.scss';
import Header from './Header';

export const metadata = {
  title: 'Windschatten',
  description: 'You will never ride alone',
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout(props: Props) {
  return (
    <html lang="en">
      <head />
      <body>
        <Header />
        {props.children}
      </body>
    </html>
  );
}
