import LandingPage from "./components/landingpage";
import { ThemeProvider } from "next-themes";

export default function Home() {
  return (
    <ThemeProvider>
      <LandingPage/>
      </ThemeProvider>
  );
}
