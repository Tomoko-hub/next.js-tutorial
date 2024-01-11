import Head from "next/head"
import Link from "next/link"

export default function firstPost (){
    return (
        <div>
            <Head>
                <title>First post</title>
            </Head>
            <h1>First post</h1>
            <Link href="/">Home</Link>
        </div>
    )
};