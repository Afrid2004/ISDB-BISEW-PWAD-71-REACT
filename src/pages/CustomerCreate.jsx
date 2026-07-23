import axios from "axios";
import React, { useState } from "react";
import { Card, Row, Col, Form, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const CustomerCreate = () => {
  const [preview, setPreview] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_PHP_BASE_URL;
  const IMGBB_KEY = import.meta.env.VITE_IMAGE_BB_API_KEY;
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    photo: null,
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setCustomer((prev) => ({
      ...prev,
      photo: file,
    }));
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Upload image
    const imageData = new FormData();
    imageData.append("image", customer.photo);

    const imgRes = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_BB_API_KEY}`,
      imageData
    );

    const imageUrl = imgRes.data.data.url;

    // Customer data
    const customerData = {
      name: customer.name,
      email: customer.email,
      mobile: customer.mobile,
      address: customer.address,
      photo: imageUrl,
    };

    const res = await axios.post(
      `${BASE_URL}/customer/create`,
      customerData
    );

    if (res.data.success) {
      alert(res.data.message);
    } else {
      alert(res.data.message);
    }
  } catch (err) {
    console.log(err);
    alert("Something went wrong!");
  }
};

  return (
    <div className="container-fluid py-4">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Create Customer</h3>
          <small className="text-gray">Home / Customers / Create</small>
        </div>

        <Link to="/customers" className="btn btn-dark">
          ← Back
        </Link>
      </div>

      <Card className="shadow-sm border-0 rounded-4">
        <Card.Header className="bg-dark py-3">
          <h5 className="mb-0 fw-semibold text-white">Customer Information</h5>
        </Card.Header>

        <Card.Body className="p-4 bg-dark text-white">
          <Form onSubmit={handleSubmit}>
            <Row>
              {/* Left Side */}
              <Col lg={8}>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      onChange={handelChange}
                      value={customer.name ?? ""}
                      type="text"
                      className="bg-dark text-white border-black"
                      placeholder="Enter customer name"
                      name="name"
                    />
                  </Col>

                  <Col md={6} className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      onChange={handelChange}
                      value={customer.email ?? ""}
                      type="email"
                      className="bg-dark text-white border-black"
                      placeholder="Enter email address"
                      name="email"
                    />
                  </Col>

                  <Col md={12} className="mb-3">
                    <Form.Label>Mobile</Form.Label>
                    <Form.Control
                      onChange={handelChange}
                      value={customer.mobile ?? ""}
                      type="text"
                      className="bg-dark text-white border-black"
                      placeholder="01XXXXXXXXX"
                      name="mobile"
                    />
                  </Col>

                  <Col md={12} className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      onChange={handelChange}
                      value={customer.address ?? ""}
                      as="textarea"
                      rows={4}
                      className="bg-dark text-white border-black"
                      placeholder="Customer address..."
                      name="address"
                    />
                  </Col>
                </Row>
              </Col>

              {/* Right Side */}
              <Col lg={4}>
                <Card className="border border-black bg-dark">
                  <Card.Body className="text-center">
                    <Image
                      src={preview || "https://placehold.co/180x180?text=Photo"}
                      roundedCircle
                      width={170}
                      height={170}
                      className="border object-fit-cover mb-3"
                    />

                    <Form.Group>
                      <Form.Label className="btn btn-primary w-100">
                        Upload Photo
                        <Form.Control
                          hidden
                          type="file"
                          accept="image/*"
                          onChange={handleImage}
                        />
                      </Form.Label>
                    </Form.Group>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <hr className="my-4" />

            <div className="d-flex justify-content-end gap-2">
              <Link to="/customers" className="btn btn-secondary">
                Cancel
              </Link>

              <Button type="submit" variant="primary">
                Save Customer
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default CustomerCreate;
