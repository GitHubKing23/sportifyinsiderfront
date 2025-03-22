// useEffect(() => {
//   const fetchCities = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await axios.get("http://localhost:5002/api/cities");

//       if (Array.isArray(response.data.cities)) {
//         setCities(response.data.cities);
//       } else {
//         throw new Error("Unexpected response format");
//       }
//     } catch (err) {
//       console.error("❌ Error fetching cities:", err);
//       setError("Failed to load cities.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchCities();
// }, []);
