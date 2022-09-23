import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useFormik } from "formik"
import * as yup from "yup"
import { TextField, Button, Typography } from "@mui/material"
import { Navigate } from "react-router-dom"

import { useIndexDb } from "../data/Indexed/IndexedContext"

const validationSchema = yup.object({
  nickname: yup.string().required("nickname is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
})

function SignUp() {
  const [auth, setAuth] = useState(false)
  const { getAuth, getDataArray, user } = useIndexDb()

  const formik = useFormik({
    initialValues: {
      nickname: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const result = await getAuth(values.nickname, values.password)
      if (result) {
        setAuth(true)

        for (let index = 0; index < 8; index += 1) {
          toast("WELCOME", {
            position: "top-left",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
      } else {
        toast("YOUR PASS OR NICKNAME IS WRONG", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        setAuth(false)
      }
    },
  })
  getDataArray()
  return (
    <>
      <div>{user && <Navigate to="/main" />}</div>
      {auth && <Navigate to="/main" replace />}

      <div
        style={{
          width: `500px`,
          height: `500px`,
          margin: `auto`,
          marginTop: `20vh`,
          backgroundColor: `#E6E6E6`,
          display: `flex`,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: `30px`,
        }}
      >
        <img
          src="https://kc.com.tr/wp-content/uploads/2022/06/kctek-white-logo.png"
          alt="kctek"
          style={{
            width: `90%`,
            marginTop: 10,
            marginRight: `5%`,
            marginLeft: `5%`,
          }}
        />
        <div>
          <Typography sx={{ color: `#8e8e8e` }}>
            prettier hatasi verirse yarn lint
          </Typography>
          <Typography sx={{ color: `#8e8e8e` }}>
            Ogrenci eklemek icin admin 123123123
          </Typography>

          <Typography sx={{ color: `#8e8e8e` }}>
            Sinava girmek icin ayse 123123123
          </Typography>
        </div>
        <form onSubmit={formik.handleSubmit} style={{ width: "90%" }}>
          <TextField
            fullWidth
            id="nickname"
            name="nickname"
            label="NickName"
            value={formik.values.nickname}
            onChange={formik.handleChange}
            error={formik.touched.nickname && Boolean(formik.errors.nickname)}
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
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            variant="standard"
          />
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
            style={{ marginTop: 10 }}
          >
            Giriş
          </Button>
        </form>
      </div>
    </>
  )
}

export default SignUp
