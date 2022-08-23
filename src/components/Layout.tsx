import { Footer } from "./Footer";
import { Header } from "./Header";

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
      <Footer />
    </>
  );
};
