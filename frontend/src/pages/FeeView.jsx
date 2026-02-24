import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function FeeView() {
  const { id } = useParams(); // Mongo _id
  const navigate = useNavigate();

  const [fee, setFee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFee();
  }, []);

  const fetchFee = async () => {
    try {
      const res = await `https://core-dashboard.onrender.com/api/fees/${id}`;
      setFee(res.data);
    } catch (err) {
      console.error("Fetch fee error", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!fee) return <p>Fee not found</p>;

  return (
    <div style={{ padding: 32 }}>
      <button onClick={() => navigate(-1)}>⬅ Back</button>

      <h2>Fee Details</h2>

      <p>
        <strong>Ref ID:</strong> {fee.refId}
      </p>
      <p>
        <strong>Student:</strong> {fee.student?.fullName}
      </p>
      <p>
        <strong>Fee Type:</strong> {fee.feeType}
      </p>
      <p>
        <strong>Amount:</strong> ₹{fee.amount}
      </p>
      <p>
        <strong>Status:</strong> {fee.status}
      </p>
      <p>
        <strong>Payment Mode:</strong> {fee.paymentMode}
      </p>
      <p>
        <strong>Date:</strong> {new Date(fee.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
