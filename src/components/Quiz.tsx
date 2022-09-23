import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Radio from "@mui/material/Radio"
import RadioGroup from "@mui/material/RadioGroup"
import FormControlLabel from "@mui/material/FormControlLabel"
import FormControl from "@mui/material/FormControl"
import FormLabel from "@mui/material/FormLabel"
import { useEffect } from "react"

export default function Quiz({ quizQuestion, index, topic, setAnwers }: any) {
  useEffect(() => {
    setAnwers((prev: any) => ({
      ...prev,
      [`q${index}`]: false,
    }))
  }, [])

  const setAnswerCorrection = (value: any) =>
    setAnwers((prev: any) => ({
      ...prev,
      [`q${index}`]: `${value}` === `${quizQuestion.correction}`,
    }))
  return (
    <Card sx={{ minWidth: 275, background: `#e9e9e9` }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {`${topic} ${index + 1}  Question `}
        </Typography>
        <Typography variant="h5" component="div">
          {quizQuestion.q}
        </Typography>
      </CardContent>
      <CardActions>
        <FormControl
          onChange={(e) =>
            setAnswerCorrection((e.target as HTMLButtonElement).value)
          }
        >
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="a1"
              control={<Radio />}
              label={`${quizQuestion.a1}`}
            />
            <FormControlLabel
              value="a2"
              control={<Radio />}
              label={`${quizQuestion.a2}`}
            />
            <FormControlLabel
              value="a3"
              control={<Radio />}
              label={`${quizQuestion.a3}`}
            />
            <FormControlLabel
              value="a4"
              control={<Radio />}
              label={`${quizQuestion.a4}`}
            />
          </RadioGroup>
        </FormControl>
      </CardActions>
    </Card>
  )
}

// Taking idea from there
// https://stackoverflow.com/questions/70846759/how-to-get-data-from-multiple-child-component-in-reactjs
//
