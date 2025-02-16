import { View, Text } from "react-native";
import React from "react";

const useDepense = () => {
  const [data, setData] = useState([]);
  const [dataEl, setDataEl] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { db, isReady } = useDatabase();


  
  return {
    data,
    dataEl,
    loading,
    error,
    setError,
  };
};

export default useDepense;
