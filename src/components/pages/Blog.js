import React from "react";
import Header from './Header';
const Blog = () => {
    return (
    <div>
        <Header />
        <section
          id="hero"
          className="d-flex.align-items-center justify-content-center"
        >
          <div className="container text-center">
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-8 mb-3">
                <h1 className="nagl1"> Blog</h1>
              </div>
            </div>

            <div className="row mt-5 justify-content-center"></div>
          </div>
            </section>
    </div>
            );
};

export default Blog;
