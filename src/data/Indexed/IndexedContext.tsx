import { createContext, useEffect, useContext, useState, useMemo } from "react"
import { openDB } from "idb"

const IndexDbContext = createContext<any | null>(null)
function IndexDbProvider({ children }: any) {
  const [kctekDB, setKctekDB] = useState(null)
  const [isLoadingDBContext, setIsLodingDBContext] = useState(true)
  const [user, setUser] = useState(undefined)
  useEffect(() => {
    // eslint-disable-next-line prettier/prettier
    (async () => {
      const db = await openDB(`kctek`, 1, {
        upgrade(dbase) {
          dbase.createObjectStore(`users`)
        },
      })

      if (!(await db.getAllKeys(`users`)).length) {
        db.add(
          `users`,
          JSON.stringify({
            pass: `123123123`,
            auth: `admin`,
            nick: `admin`,
            id: Math.floor(Math.random() * 200000),
          }),
          `admin`
        )

        const userlist = [
          `ali`,
          `veli`,
          `ayse`,
          `fatma`,
          `sefa`,
          `ahmet`,
          `julia`,
          `peter`,
          `mahmud`,
          `kyle`,
          `jeniffer`,
          `carly`,
          `aybike`,
        ]

        for (let index = 0; index < userlist.length; index += 1) {
          const math = Math.ceil(Math.random() * 100)
          const traffic = Math.ceil(Math.random() * 100)
          const geography = Math.ceil(Math.random() * 100)
          const succesRate = Math.ceil(math + traffic + geography) / 3

          // eslint-disable-next-line no-await-in-loop
          await db.add(
            `users`,
            JSON.stringify({
              pass: `123123123`,
              auth: `user`,
              id: Math.floor(Math.random() * 200000),
              nick: `${userlist[index]}`,
              successRate: succesRate > 50 ? `Success` : `Failed`,
              lessons: {
                math: math,
                traffic: traffic,
                geography: geography,
              },
            }),
            `${userlist[index]}`
          )
        }
      }

      await setKctekDB(db)
      await setIsLodingDBContext(false)
      try {
        setUser(JSON.parse(localStorage.getItem(`user`)))
      } catch {
        localStorage.setItem(`user`, `null`)
      }
    })()
  }, [])

  const getAuth = async (id: string, pass: string) => {
    let auth
    let result
    if (!isLoadingDBContext) {
      auth = await kctekDB.get(`users`, `${id}`)

      if (auth !== undefined) auth = JSON.parse(auth)
      else return false
    } else {
      console.log(`tryAgain`)
    }

    if (auth !== undefined) result = auth.pass === pass

    if (result) {
      await setUser(auth)
      await localStorage.setItem(`user`, JSON.stringify(auth))
    }

    return result
  }
  const setUserOnDb = async (userObjectData: any) => {
    kctekDB.put(`users`, JSON.stringify(userObjectData), userObjectData.nick)
  }

  const logout = async () => {
    await localStorage.setItem(`user`, `null`)
    window.location = `/` as any
  }
  const getDataArray = async () => {
    const array: any = []
    await kctekDB.getAll(`users`).then((res: any) =>
      res.forEach((item: any) => {
        array.push(JSON.parse(item))
      })
    )
    return array
  }
  const addNewUserDb = (object: any) => {
    console.log(object)
    kctekDB.add(
      `users`,
      JSON.stringify({
        pass: `${object.pass}`,
        auth: `user`,
        id: Math.floor(Math.random() * 200000),
        nick: `${object.nick}`,
        successRate:
          (object.lessons.math +
            object.lessons.traffic +
            object.lessons.geography) /
            3 >
          50
            ? `Success`
            : `Failed`,
        lessons: {
          math: object.lessons.math,
          traffic: object.lessons.traffic,
          geography: object.lessons.geography,
        },
      }),
      `${object.nick}`
    )
  }
  const values = useMemo(
    () => ({
      addNewUserDb,
      getAuth,
      isLoadingDBContext,
      user,
      setUser,
      getDataArray,
      logout,
      setUserOnDb,
    }),
    [kctekDB, user]
  )

  return (
    <IndexDbContext.Provider value={values}>{children}</IndexDbContext.Provider>
  )
}

const useIndexDb = () => useContext(IndexDbContext)

export { IndexDbContext, IndexDbProvider, useIndexDb }
