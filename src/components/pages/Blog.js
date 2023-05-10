import Header from './Header';
import React, { useState } from "react";
import withAuth from '../../withAuth';

const Blog = props => {
  const [category, setCategory] = useState("Zdrowie");
  const posts = [
    {
      title: "Post 1",
      category: "Zdrowie",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: "Jacek Kowalski"
    },
    {
      title: "Post 2",
      category: "Zabiegi",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: "Ola Kowalska"
    },
    {
      title: "Post 3",
      category: "Æwiczenia",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: "Jacek Kowalski"
    },
    {
      title: "Post 4",
      category: "Lokalizacje",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: "Aneta O"
    },
    {
      title: "Post 5",
      category: "Zdrowie",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: "Natalia Nowak"
    },
    {
      title: "Post 6",
      category: "Æwiczenia",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: "Jacek Kowalski"
    },
    {
      title: "Post 7",
      category: "Zdrowie",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: "Olek Kowalski"
    }
  ];

  //obs³uga przycisku dodaj post
  const [formPost, setFormPost] = useState(props.formPost);

  const showForm = () => {
    setFormPost(true);
    setIsButtonClicked(true);
  };

  const hidePostButton = () => {
    setFormPost(false);
    setIsButtonClicked(false);
  };
  //obs³uga 2 x onClick
  const handleClickAndHidePost = cat => {
    setCategory(cat);
    hidePostButton();
  };

  //obs³uga przycisku po klikniêciu "Dodaj post"
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const filteredPosts = posts.filter(post => post.category === category);

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
                <h1 className="nagl1"> Blog - wybierz temat </h1> <br />
                <div className="topic_blog">
                  <button onClick={() => handleClickAndHidePost("Zdrowie")}>
                    Zdrowie
                  </button>
                  <button onClick={() => handleClickAndHidePost("Zabiegi")}>
                    Zabiegi
                  </button>
                  <button onClick={() => handleClickAndHidePost("Æwiczenia")}>
                    Æwiczenia
                  </button>
                  <button onClick={() => handleClickAndHidePost("Lokalizacje")}>
                    Lokalizacje
                  </button>
                  <br />
                  <br />
                </div>
                <div className="blog_result">
                  {filteredPosts.map((post, index) => (
                    <div key={index} className="post">
                      <h4 className="post_title">{post.title}</h4>
                      <p className="post_content">{post.content}</p>
                      <b className="post_author">Autor: {post.author}</b>
                      <br /> <br />
                      <button type="button">Usuñ post</button>
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
  );
};

export default withAuth(Blog);
