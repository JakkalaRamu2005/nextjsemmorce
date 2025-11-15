import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" /> */}
      <body

      >
        <AuthProvider>
          {children}

        </AuthProvider>

      </body>
    </html>
  );
}
