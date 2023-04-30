import React from "react";
const Blog = () => {
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
                            <button>Zdrowie</button>
                            <button>Zabiegi</button>
                            <button>Æwiczenia</button>
                            <button>Lokalizacje</button>
                        </div>
                        <div className="blog_result"></div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default Blog;
