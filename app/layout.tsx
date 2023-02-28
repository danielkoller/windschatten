import './globals.scss';

export const metadata = {
  title: 'Windschatten',
  description: 'You will never ride alone',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
