import React, { useEffect, useState } from "react";
import BreadCrums from "../../components/BreadCrums";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const DivisionEdit = () => {
  const [division, setDivision] = useState({
    name: "",
    name_bn: "",
  });
  const { id } = useParams();
  const BASE_URL = import.meta.env.VITE_API_PHP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchDivision = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/division/find?id=${id}`);
      const data = res.data;
      if (data.success) {
        setDivision({
          name: data.data.name ?? "",
          name_bn: data.data.name_bn ?? "",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Division not found",
      });
    }
  };

  useEffect(() => {
    fetchDivision();
  }, [id]);

  console.log(division);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDivision((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const divisonData = {
      name: division.name,
      name_bn: division.name_bn,
    };

    if (division.name.trim().length < 2) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Division name must be at least 2 characters.",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.patch(
        `${BASE_URL}/division/update?id=${id}`,
        divisonData,
      );
      const data = res.data;

      if (data.success) {
        await Swal.fire({
          title: "Success!",
          text: `${data.message}`,
          icon: "success",
        });
        navigate("/divisions", { replace: true });
      } else {
        await Swal.fire({
          title: "Failed!",
          text: `${data.message}`,
          icon: "error",
        });
        console.log(data);
      }
    } catch (error) {
      await Swal.fire({
        title: "Failed!",
        text:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong!",
        icon: "error",
      });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="container-fluid py-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="fw-bold text-white mb-1">Edit Division</h3>
            <small className="text-secondary">
              <BreadCrums />
            </small>
          </div>

          <Link to="/divisions" className="btn btn-dark">
            ← Back
          </Link>
        </div>

        <Row className="justify-content-center">
          <Col>
            <Card className="border-0 shadow-lg bg-black">
              <Card.Header className="border-bottom border-black py-3 bg-dark">
                <h5 className="mb-0 text-white fw-semibold">
                  Division Information
                </h5>
              </Card.Header>

              <Card.Body className="p-4 bg-dark">
                <Form onSubmit={handleSubmit}>
                  {/* English */}
                  <Form.Group className="mb-4">
                    <Form.Label className="text-light fw-semibold">
                      Division Name (English)
                    </Form.Label>

                    <Form.Control
                      type="text"
                      name="name"
                      value={division.name ?? ""}
                      onChange={handleChange}
                      placeholder="Enter division name"
                      size="lg"
                      className="shadow-none bg-black text-white border-0"
                    />
                  </Form.Group>

                  {/* Bangla */}
                  <Form.Group className="mb-4">
                    <Form.Label className="text-light fw-semibold">
                      Division Name (বাংলা)
                    </Form.Label>

                    <Form.Control
                      type="text"
                      name="name_bn"
                      value={division.name_bn ?? ""}
                      onChange={handleChange}
                      placeholder="বিভাগের নাম লিখুন"
                      size="lg"
                      className="shadow-none bg-black text-white border-0"
                    />
                  </Form.Group>

                  <hr className="border-secondary" />

                  <div className="d-flex justify-content-end gap-3">
                    <Link to="/divisions" className="btn btn-secondary">
                      Cancel
                    </Link>

                    <Button
                      type="submit"
                      variant="primary"
                      disabled={loading}
                      className="px-4 rounded-3 fw-semibold"
                    >
                      {loading ? "Saving..." : "Save Division"}
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DivisionEdit;
