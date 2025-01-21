import Head from "next/head";
import Link from "next/link";
import Button from '@springboard-components/button';
import Input from "@springboard-components/input";

const MainLayout = (props) => {
  return <>
    <Head>
      <title>Jumpstart Shop</title>
    </Head>

    <div className="mt-4 p-2 bg-blau text-white">
      <Link href="/">
        Nav
      </Link>
    </div>

    <Button onClick={() => alert("Primary CTA clicked")}>
      Learn More
    </Button>
    <Input placeholder="enter..."/>
    <main>
      <div className="h-screenx py-20 px-60"> {props.children}</div>
    </main>
    <div className="mt-4 p-2 bg-blau text-white">
      <a
        href="https://training.contentful.com"
        target="_blank"
        rel="noreferrer"
      >
        Contentful Learning Services
      </a>
    </div>
  </>;
};

export default MainLayout;
