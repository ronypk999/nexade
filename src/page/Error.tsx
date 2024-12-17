import React from "react"
import { useNavigate } from "react-router-dom";

const styles = {
    container: {
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f9f9f9",
      fontFamily: "Arial, sans-serif",
      textAlign: "center" as const,
      padding: "20px",
    },
    title: {
      fontSize: "2rem",
      color: "#333",
      marginBottom: "20px",
    },
    message: {
      fontSize: "1rem",
      color: "#666",
      marginBottom: "30px",
      maxWidth: "600px",
    },
    actions: {
      display: "flex",
      gap: "10px",
    },
    button: {
      padding: "10px 20px",
      fontSize: "1rem",
      color: "#fff",
      backgroundColor: "#007bff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
  };
  


export const Error:React.FC = () => {
    const nav = useNavigate();
    const handleClick = ()=>{
        nav("/project/nexade");
    };


  return (
    <div style={styles.container}>
      <h1 style={styles.title}>404 not found</h1>
      <p style={styles.message}>
       The page you are looking for does not exist
      </p>

      <div style={styles.actions}>
        <button style={styles.button} onClick={handleClick}>
          Back to home
        </button>

       
      </div>
    </div>
  )
}