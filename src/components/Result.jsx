import { useParams } from "react-router-dom";
import { useGetStatisticQuery } from "../redux/auth/authApi";
import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export const Result = () => {
  const { category } = useParams();
  const { data, isLoading } = useGetStatisticQuery(category);

  const questions = data?.[0]?.questions;

  if (isLoading) return <CircularProgress />;

  return (
    <>
      {data && (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Email</TableCell>
                {questions?.map((question, index) => (
                  <TableCell key={index}>{question}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.email}</TableCell>
                  {item.answers.map((answer, answerIndex) => (
                    <TableCell key={answerIndex}>{answer}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
