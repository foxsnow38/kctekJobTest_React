import { useEffect, useState } from "react"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"

import Modal from "@mui/material/Modal"

import { TextField } from "@mui/material"
import * as yup from "yup"
import { useFormik } from "formik"
import { Navigate } from "react-router-dom"
import { useIndexDb } from "../data/Indexed/IndexedContext"

const validationSchema = yup.object({
  nickname: yup.string().required("nickname is required"),
  math: yup.string().required("math is required").max(3),
  geography: yup.string().required("geo is required").max(3),
  traffic: yup.string().required("traffic is required").max(3),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
})

function Navbar() {
  const { user, setUser, logout, addNewUserDb } = useIndexDb()
  const [handleAddOpen, setHandleAddOpen] = useState(false)
  const [userObject, setUserObject] = useState(null)
  const handleToggle = () => setHandleAddOpen(!handleAddOpen)

  const formik = useFormik({
    initialValues: {
      nickname: "",
      password: "",
      math: "",
      traffic: "",
      geography: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      addNewUserDb({
        nick: values.nickname,
        pass: values.password,
        lessons: {
          math: values.math,
          geography: values.geography,
          traffic: values.traffic,
        },
      })
      window.location = `/main` as any
    },
  })

  useEffect(() => {
    try {
      setUser(JSON.parse(localStorage.getItem(`user`)))
    } catch {
      localStorage.setItem(`user`, `null`)
    }
  }, [])
  const goNav = (navigate: any) => {
    window.location = `${navigate}` as any
  }

  return (
    <div>
      <div
        style={{
          width: `100%`,
          height: `${user ? `110px` : `50px`}`,
          background: `#E9E9E9`,
          marginBottom: `10px`,
          display: "flex",
          alignContent: "space-around",
          justifyContent: "space-evenly",
          alignItems: `${user ? `flex-start` : `center`}`,
        }}
      >
        <div>
          {user?.auth === `admin` && (
            <Button
              style={{ marginTop: `20px` }}
              variant="contained"
              onClick={handleToggle}
            >
              ADD NEW USER
            </Button>
          )}
        </div>
        <div className="leftArea">
          <Stack spacing={0.1} direction="column">
            <Button
              onClick={() => {
                window.location = `/` as any
              }}
              variant="text"
            >
              {user ? user.nick : `Quest`}
            </Button>
            {user && (
              <Button onClick={logout} variant="outlined">
                Logout
              </Button>
            )}
          </Stack>
        </div>
        <div className="rightAre" style={{ width: `40%` }}>
          {user?.auth !== `admin` && (
            <Stack spacing={2} direction="row">
              <Stack spacing={0.3} direction="column">
                <Button variant="text">{`Coğrafya:${
                  user !== null ? user?.lessons?.geography : `0`
                }`}</Button>

                {user && (
                  <Button
                    onClick={() => goNav(`/quiz/geo`)}
                    variant="contained"
                  >
                    Coğrafya Testi
                  </Button>
                )}
              </Stack>

              <Stack spacing={0.3} direction="column">
                <Button variant="text">{`Matematik:${
                  user !== null ? user?.lessons?.math : `0`
                }`}</Button>

                {user && (
                  <Button
                    onClick={() => goNav(`/quiz/math`)}
                    variant="contained"
                  >
                    Matematik Testi
                  </Button>
                )}
              </Stack>
              <Stack spacing={0.3} direction="column">
                <Button variant="text">{`Trafik:${
                  user !== null ? user?.lessons?.traffic : `0`
                }`}</Button>

                {user && (
                  <Button
                    onClick={() => goNav(`/quiz/traffic`)}
                    variant="contained"
                  >
                    Trafik Testi
                  </Button>
                )}
              </Stack>
            </Stack>
          )}
        </div>
      </div>

      <div>
        <Modal
          open={handleAddOpen}
          onClose={handleToggle}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute" as const,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
            }}
          >
            <form onSubmit={formik.handleSubmit} style={{ width: "90%" }}>
              <Stack direction="column" spacing={1}>
                <TextField
                  fullWidth
                  id="nickname"
                  name="nickname"
                  label="NickName"
                  value={formik.values.nickname}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.nickname && Boolean(formik.errors.nickname)
                  }
                  helperText={formik.touched.nickname && formik.errors.nickname}
                  variant="standard"
                />
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  variant="standard"
                />
                <TextField
                  fullWidth
                  id="math"
                  name="math"
                  label="Math"
                  value={formik.values.math}
                  onChange={formik.handleChange}
                  error={formik.touched.math && Boolean(formik.errors.math)}
                  helperText={formik.touched.math && formik.errors.math}
                  variant="standard"
                />
                <TextField
                  fullWidth
                  id="traffic"
                  name="traffic"
                  label="Taffic"
                  value={formik.values.traffic}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.traffic && Boolean(formik.errors.traffic)
                  }
                  helperText={formik.touched.traffic && formik.errors.traffic}
                  variant="standard"
                />
                <TextField
                  fullWidth
                  id="geography"
                  name="geography"
                  label="GEO"
                  value={formik.values.geography}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.geography && Boolean(formik.errors.geography)
                  }
                  helperText={
                    formik.touched.geography && formik.errors.geography
                  }
                  variant="standard"
                />
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                  style={{ marginTop: 10 }}
                >
                  Submit New User
                </Button>
              </Stack>
            </form>
          </Box>
        </Modal>
      </div>
    </div>
  )
}

export default Navbar
