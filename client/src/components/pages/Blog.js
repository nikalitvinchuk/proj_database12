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
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const [postsResponse, commentsResponse] = await axios.all([
          axios.get('/blog'),
          expandedPost && axios.get('/blog/comments', { params: { postId: expandedPost.id } })
        ]);
        setPosts(postsResponse.data);
        setComments(commentsResponse?.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogData();
  }, [expandedPost]);

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

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    axios.post(`/blog/comments`, { postId: expandedPost.id, comment: newComment })
      .then(response => {
        console.log(response.data);
        setComments([...comments, response.data]);
        setNewComment("");
      })
      .catch(error => console.log(error));
  };

  const handleAddBlog = (event) => {
    event.preventDefault();
    const blogData = {
      subject: subject,
      title: title,
      content: content,
    };

    axios.post("/blog/add_blog", blogData)
      .then(response => {
        setSubject("");
        setTitle("");
        setContent("");
        setPosts([...posts, response.data]);
        alert("Blog został dodany!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filteredPosts = posts.filter(post => post.temat === category);

  useEffect(() => {
    axios.get('/blog')
      .then(response => setPosts(response.data))
      .catch(error => console.log(error));

    if (expandedPost) {
      axios.get('/blog/comments', { params: { postId: expandedPost.id } })
        .then(response => setComments(response.data))
        .catch(error => console.log(error));
    }
  }, []);

  return (
    <div className="element">
      {expandedPost ? (
        <div>
          <Header />
          <section id="hero" className="d-flex align-items-center justify-content-center">
            <div className="post element">
              <h4 className="post_title">{expandedPost.tytul}</h4>
              <p className="post_content">{expandedPost.tresc}</p>
              <b className="post_author">Autor: {expandedPost.autor}</b>
              <br /> <br />
              <h3 className="post_title">Komentarze:</h3>
              {comments.map(comment => (
                <div key={`${comment.id_blog}_${comment.id}`} className="post post_content">
                  <p>{comment.tresc}</p>
                  <b>{comment.autor}</b>
                  <br /><br />
                </div>
              ))}
              <form onSubmit={handleCommentSubmit}>
                <textarea
                  rows={5}
                  placeholder="Dodaj komentarz"
                  value={newComment}
                  onChange={event => setNewComment(event.target.value)}
                />
                <button type="submit">Dodaj</button>
              </form>
              <br />
              <button
                type="button"
                onClick={() => setExpandedPost(null)}
              >
                Wróć do listy
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
                    {['Zdrowie', 'Zabiegi', 'Ćwiczenia', 'Lokalizacje'].map((topic, index) => (
                      <button key={index} onClick={() => handleClickAndHidePost(topic)}>
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
                        Dodaj własny post
                      </button>
                    )}

                    {formPost && (
                      <form>
                        <br />
                        <select
                          value={subject}
                          onChange={(event) => setSubject(event.target.value)}
                        >
                          <option value="Zdrowie">Zdrowie</option>
                          <option value="Zabiegi">Zabiegi</option>
                          <option value="Ćwiczenia">Ćwiczenia</option>
                          <option value="Lokalizacje">Lokalizacje</option>
                        </select>
                        <br />
                        <input
                          type="text"
                          placeholder="Tytuł"
                          className="post_input"
                          value={title}
                          onChange={(event) => setTitle(event.target.value)}
                        ></input>
                        <br />
                        <textarea
                          rows={5}
                          placeholder="Treść"
                          className="post_textarea"
                          value={content}
                          onChange={(event) => setContent(event.target.value)}
                        ></textarea>{" "}
                        <br />
                        <button type="button" className="post_buttn" onClick={handleAddBlog}>
                          Zatwierdź
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
