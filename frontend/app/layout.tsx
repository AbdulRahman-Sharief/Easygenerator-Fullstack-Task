import "./globals.css";
import AuthProviderClient from "../components/AuthProviderClient";

export const metadata = {
  title: "Next.js Auth Starter",
  description: "Signup / Signin sample",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProviderClient>
          <div className="min-h-screen bg-gray-50 p-6">{children}</div>
        </AuthProviderClient>
      </body>
    </html>
  );
}
