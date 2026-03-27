"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Header from "../../components/Header";
import setting from "../../../setting.json";
import Footer from "@/app/components/Footer";

export default function BlogDetails() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    fetch(`${setting.api}/api/blogs/${slug}`)
      .then((res) => res.json())
      .then((res) => {
        setBlog(res.data);

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (!blog) return <p className="text-center mt-5">Blog not found</p>;

  return (
    <>
      <Header />

      <div className="container">
        <div className="pages_heder">
          <h2>{blog.title}</h2>
        </div>
      </div>

      <section className="post_section news_post">
        <div className="container">
          <div className="row post_section_inner">
            <div className="col-lg-8">
              <h6>{new Date(blog.createdAt).toDateString()} | Admin</h6>

              {blog.thumbnail && (
                <img
                  src={`${setting.api}/uploads/images/${blog.thumbnail}`}
                  alt={blog.title}
                />
              )}

              {blog.content?.blocks?.map((block, i) =>
                block.type === "paragraph" ? (
                  <p
                    key={i}
                    dangerouslySetInnerHTML={{ __html: block.data.text }}
                  />
                ) : null,
              )}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
