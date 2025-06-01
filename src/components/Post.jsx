import Image from "next/image";
import Link from "next/link";

import gridPost from "../assets/scss/gridpost.module.scss";

export default function ({ post }) {
    const categoryId = post.category?.id;
    const postUrl = `/${categoryId}/${post.id}`;
    return (
        <article className={gridPost.post}>
            <div className={gridPost["post__thumb"]}>
                <Link href={postUrl} title={post.title}>
                    <Image
                        src={post.eyecatch.url}
                        alt={post.title}
                        width={post.eyecatch.width}
                        height={post.eyecatch.height}
                    />
                </Link>
            </div>

            <h3 className={gridPost["post__title"]}>
                <Link href={postUrl} title={post.title} className={gridPost["post__link"]}>
                    {post.title}
                </Link>
            </h3>

            <div className={gridPost["post__excerpt"]} dangerouslySetInnerHTML={{ __html: post.short }} />
        </article>
    );
}
