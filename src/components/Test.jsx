import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useGetTestsQuery } from "../redux/tests/testApi";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useUpdateUserMutation } from "../redux/auth/authApi";

export const Test = () => {
  const { category } = useParams();
  const [isPassed, setIsPassed] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const [shouldPass, setShouldPass] = useState(false);

  useEffect(() => {
    const foundStatistic = user.statistics?.find(
      (statistic) => statistic.category === category
    );

    setIsPassed(false);
    setShouldPass(foundStatistic);
  }, [category]);

  const { data, isLoading } = useGetTestsQuery(category);
  const [updateUser] = useUpdateUserMutation();
  const [answers, setAnswers] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const statisticData = {
      category: data[0].category,
      questions: data.map((quiz) => quiz.question),
      answers: data.map((quiz) => answers[quiz._id] || ""),
    };

    try {
      await updateUser({
        userId: user._id,
        statistic: statisticData,
      });

      setIsPassed(true);
    } catch (error) {
      console.log("error:", error);
    }
  };

  if (isLoading) return <CircularProgress />;

  if (shouldPass)
    return (
      <Typography
        variant="h3"
        sx={{
          display: "flex",
          justifyContent: "center",
          marginY: "200px",
        }}
      >
        Ви вже проходили це опитування
      </Typography>
    );

  return (
    <>
      {!isPassed ? (
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginTop: "50px",
          }}
        >
          {data &&
            data.map((quiz) => (
              <div key={quiz._id}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {quiz.question}
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup
                    name={quiz._id}
                    value={answers[quiz._id] || ""}
                    onChange={handleChange}
                  >
                    {quiz.answers.map((answer, index) => (
                      <FormControlLabel
                        key={index}
                        value={answer}
                        control={<Radio />}
                        label={answer}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </div>
            ))}

          <Button variant="contained" color="primary" type="submit">
            Надіслати
          </Button>
        </form>
      ) : (
        <Typography
          variant="h3"
          sx={{
            display: "flex",
            justifyContent: "center",
            marginY: "200px",
          }}
        >
          Дякуюємо за пройдене опитування!
        </Typography>
      )}
    </>
  );
};
