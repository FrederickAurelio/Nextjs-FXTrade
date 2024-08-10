import "./globals.css";
import { ScreenSize } from "./_components/ScreenContext";
import { Toaster } from "react-hot-toast";
import Animation from "./_components/Animation";
import ReactQueryProvider from "./_lib/ReactQueryProvider";


export const metadata = {
  title: "FXTrade",
  description: "Forex Trade Demo App, where users can learn to trade foreign exchange currency in real-time. This web application allows users to sign up, log in, and receive ¥100,000 fake money to practice trading. Also works on mobile and desktop or any devices. Build using Nextjs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <Animation>
            <ScreenSize>
              {children}
            </ScreenSize>
          </Animation>
        </ReactQueryProvider>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 2000,
            },
            error: {
              duration: 3000,
            },
            style: {
              fontSize: "16px",
              maxWidth: "500px",
              padding: "12px 20px",
              backgroundColor: "white",
              color: "var(--color-grey-700)",
            },
          }}
        />
      </body>
    </html>
  );
}
