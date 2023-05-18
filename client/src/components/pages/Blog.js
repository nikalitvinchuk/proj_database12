import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from './Header';
import withAuth from '../../withAuth';

const Blog = (props) => {
    const [category, setCategory] = useState("Zdrowie");
    const [posts, setPosts] = useState([]);
    const [formPost, setFormPost] = useState(props.formPost);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [expandedPost, setExpandedPost] = useState(null);

    useEffect(() => {
        axios.get('/blog')
            .then(response => setPosts(response.data))
            .catch(error => console.log(error));
    }, []);

    const showForm = () => {
        setFormPost(true);
        setIsButtonClicked(true);
    };

    const hidePostButton = () => {
        setFormPost(false);
        setIsButtonClicked(false);
    };

    const handleClickAndHidePost = (cat) => {
        setCategory(cat);
        hidePostButton();
    };

    const handlePostClick = (post) => setExpandedPost(post);

    const filteredPosts = posts.filter(post => post.temat === category);

    return (
        <div>
            {expandedPost ? (
                <div>
                    <Header />
                    <section id="hero" className="d-flex align-items-center justify-content-center">
                    <div className="post">
                        <h4 className="post_title">{expandedPost.tytul}</h4>
                        <p className="post_content">{expandedPost.tresc}</p>
                        <b className="post_author">Autor: {expandedPost.autor}</b>
                        <br /> <br />
                        <button
                            type="button"
                            onClick={() => setExpandedPost(null)}
                        >
                            Wróæ do listy
                        </button>
                        </div>
                    </section>
                </div>
            ) : (
                <div>
                    <Header />
                <section id="hero" className="d-flex align-items-center justify-content-center">
                    <div className="container text-center">
                        <div className="row justify-content-center">
                            <div className="col-md-6 col-lg-8 mb-3">
                                <h1 className="nagl1">Blog - wybierz temat</h1> <br />
                                <div className="topic_blog">
                                    {['Zdrowie', 'Zabiegi', 'Æwiczenia', 'Lokalizacje'].map((topic, index) => (
                                        <button key={index} onClick={() => setCategory(topic)}>
                                            {topic}
                                        </button>
                                    ))}
                                    <br /><br />
                                </div>
                                <div className="blog_result">
                                    {filteredPosts.map((post, index) => (
                                        <div key={index} className="post" onClick={() => handlePostClick(post)}>
                                            <h4 className="post_title">{post.tytul}</h4>
                                            <p className="post_content">
                                                {post.tresc.slice(0, 150)}{post.tresc.length > 150 ? "..." : ""}
                                            </p>
                                            <b className="post_author">Autor: {post.autor}</b>
                                            <br /> <br />
                                        </div>
                                    ))}

                                    {!isButtonClicked && (
                                        <button
                                            type="button"
                                            onClick={showForm}
                                            style={{
                                                backgroundColor: "rgba(49, 88, 65, 0.534)",
                                                color: "white"
                                            }}
                                        >
                                            Dodaj w³asny post
                                        </button>
                                    )}

                                    {formPost && (
                                        <form>
                                            <br />
                                            <input
                                                type="text"
                                                placeholder="Tytu³"
                                                className="post_input"
                                            ></input>
                                            <br />
                                            <textarea
                                                type="text"
                                                placeholder="Treœæ"
                                                className="post_textarea"
                                            ></textarea>{" "}
                                            <br />
                                            <button type="button" className="post_buttn">
                                                ZatwierdŸ
                                            </button>{" "}
                                            <br />
                                            <button
                                                type="button"
                                                className="post_buttn"
                                                onClick={hidePostButton}
                                            >
                                                Anuluj
                                            </button>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    </section>
                </div>
            )}
        </div>

  );
};

export default withAuth(Blog);
