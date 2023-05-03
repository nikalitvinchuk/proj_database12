import React, { useState } from "react";
const Blog = () => {

    const [category, setCategory] = useState("Zdrowie");
    const posts = [
        {
            title: "Post 1",
            category: "Zdrowie",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            title: "Post 2",
            category: "Zabiegi",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            title: "Post 3",
            category: "Æwiczenia",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            title: "Post 4",
            category: "Lokalizacje",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            title: "Post 5",
            category: "Zdrowie",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
        {
            title: "Post 6",
            category: "Æwiczenia",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            title: "Post 7",
            category: "Zdrowie",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        },
    ];

    const handleClick = (cat) => {
        setCategory(cat);
    };

    const filteredPosts = posts.filter((post) => post.category === category);


    return (
        <section
            id="hero"
            className="d-flex.align-items-center justify-content-center"
        >
            <div className="container text-center">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-8 mb-3">
                        <h1 className="nagl1"> Blog - wybierz temat </h1> <br />
                        <div className="topic_blog">
                            <button onClick={() => handleClick("Zdrowie")}>Zdrowie</button>
                            <button onClick={() => handleClick("Zabiegi")}>Zabiegi</button>
                            <button onClick={() => handleClick("Æwiczenia")}>Æwiczenia</button>
                            <button onClick={() => handleClick("Lokalizacje")}>Lokalizacje</button>
                            <br /><br />
                        </div>
                        <div className="blog_result">
                            {filteredPosts.map((post, index) => (
                                <div key={index} className="post">
                                    <h4 className="post_title">{post.title}</h4>
                                    <p className="post_content">{post.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Blog;
