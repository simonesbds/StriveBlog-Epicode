import React, { useEffect, useState } from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

const BlogList = (props) => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const fetchPosts = async (page = 1, title = "") => {
    try {
      const response = await fetch(
        `http://localhost:3001/blogPosts?page=${page}&limit=6&title=${title}`
      );
      const data = await response.json();
      setPosts(data.posts);
      setTotalPages(data.totalPages);
      setPage(data.currentPage);
    } catch (error) {
      console.error("Errore durante il recupero dei post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPosts(1, search);
  };

  return (
    <div>
      <Form onSubmit={handleSearch} className="mb-4 d-flex">
        <Form.Control
          type="text"
          placeholder="Cerca per titolo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button type="submit" variant="dark" className="ms-2">
          Cerca
        </Button>
      </Form>

      <Row>
        {posts.map((post, i) => (
          <Col
            key={`item-${i}`}
            md={4}
            style={{
              marginBottom: 50,
            }}
          >
            <BlogItem key={post._id} {...post} />
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-between mt-4">
        <Button
          variant="outline-dark"
          disabled={page <= 1}
          onClick={() => fetchPosts(page - 1, search)}
        >
          Pagina precedente
        </Button>
        <span>
          Pagina {page} di {totalPages}
        </span>
        <Button
          variant="outline-dark"
          disabled={page >= totalPages}
          onClick={() => fetchPosts(page + 1, search)}
        >
          Pagina successiva
        </Button>
      </div>
    </div>
  );
};

export default BlogList;