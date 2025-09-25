import "./globals.css";


export const metadata = {
  title: "useIDE",
  description: "A modern cloud IDE for the web",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
