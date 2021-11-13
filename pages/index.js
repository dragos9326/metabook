import { collection, getDocs, orderBy, query } from "@firebase/firestore";
import { getSession } from "next-auth/client";
import Head from "next/head";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import Widgets from "../components/Widgets";
import { db } from "../firebase";

export default function Home({ session, posts }) {
  if (!session) return <Login />;

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      <Head>
        <title>Metabook</title>
      </Head>

      <Header />

      <main className="flex">
        {/* Sidebar */}
        <Sidebar />
        {/* Feed */}
        <Feed posts={posts} />

        {/* Widgets */}
        <Widgets />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  //Get the user
  const session = await getSession(context);

  const postsQuery = query(
    collection(db, "posts"),
    orderBy("timestamp", "desc")
  );

  const postsSnapshot = await getDocs(postsQuery);
  console.log(postsSnapshot.docs);

  const posts = postsSnapshot.docs.map((post) => ({
    id: post.id,
    ...post.data(),
    timestamp: null,
  }));

  return {
    props: {
      session,
      posts: posts ? posts : null,
    },
  };
}
