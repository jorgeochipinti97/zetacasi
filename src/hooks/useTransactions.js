"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchTransactions = async () => {
    try {
      const response = await axios.get("/api/transaction");
      setTransactions(response.data.data);
      console.log(response);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return { transactions, loading, error };
};

export default useTransactions;
