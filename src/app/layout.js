import "./globals.css";


export const metadata = {
  title: "UseIDE",
  description: "An online ide and compiler",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`dark-mode`}>
        {children}
      </body>
    </html>
  );
}
