// src/components/SecondPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";
import DepartmentList from "./DepartmentList";

interface Post {
  id: number;
  title: string;
  body: string;
}

const SecondPage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (!userDetails) {
      navigate("/", {
        state: {
          message: "Please enter your details before accessing this page.",
        },
      });
    } else {
      axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((response) => {
          setPosts(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [navigate]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "title", headerName: "Title", width: 150 },
    { field: "body", headerName: "Body", width: 300 },
  ];

  const rows: GridRowsProp = posts.map((post) => ({
    id: post.id,
    title: post.title,
    body: post.body,
  }));

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } },
        }}
      />
      <DepartmentList />
    </div>
  );
};

export default SecondPage;
