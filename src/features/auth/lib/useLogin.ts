import { useAppDispatch } from "common/hooks/UseAppDispatch"
import { FormikHelpers, useFormik } from "formik"
import { loginThunks } from "../model/loginSlice"
import { BaseResponseType } from "common/types/types"

export const useLogin = () => {
    const dispatch = useAppDispatch()

    type FormValues = {
        email: string
        password: string
        rememberMe: boolean
    }
    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
          rememberMe: false,
        },
        validate: (values) => {
          // const errors: FormikErrorType = {}
          //
          // if (!values.email) {
          //   errors.email = 'Required'
          // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
          //   errors.email = 'Invalid email address'
          // }
          // if (!values.password) {
          //   errors.password = 'Required'
          // } else if (values.password.length < 4) {
          //   errors.password = 'Must be more 3 symbols'
          // }
          // return errors
        },
        onSubmit: (values, formikHelpers: FormikHelpers<FormValues>) => {
          dispatch(loginThunks.login(values))
            .unwrap()
            .catch((error: BaseResponseType) => {
              error.fieldsErrors?.forEach((fieldError) => {
                formikHelpers.setFieldError(fieldError.field, fieldError.error)
              })
            })
          // formik.resetForm()
        },
    })

    return formik
}