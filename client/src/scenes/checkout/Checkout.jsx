import { useState } from "react";
import { useSelector } from "react-redux";
import { Formik } from "formik";
import { shades } from "../../theme";
import { loadStripe } from "@stripe/stripe-js";
import { makePayment } from "../../api/payment";
import { Box, Button, Stepper, Step, StepLabel } from "@mui/material";
import * as yup from "yup";
import Shipping from "./Shipping";
import Payment from "./Payment";

const stripePromise = loadStripe(
  "pk_test_51PgmZuEwvdDXLPKC3MUhXApCWDZFDjIhZtc8vwmBxnFDZMch5T8USJ23bYune9db72LoAs117HbYO0VSr3p5XmsH009sAhG6HE"
);

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const cart = useSelector((state) => state.cart.cart);
  const isFirstStep = activeStep === 0;
  const isSecondStep = activeStep === 1;

  const processPayment = async (values) => {
    const stripe = await stripePromise;
    const requestBody = {
      userName: [values.firstName, values.lastName].join(" "),
      email: values.email,
      products: cart.map(({ id, count }) => ({ id, count })),
    };

    try {
      const session = await makePayment(requestBody);
      await stripe.redirectToCheckout({
        sessionId: session.id,
      });
    } catch (error) {
      console.error("Error making payment:", error);
    }
  };

  const handleFormSubmit = async (values, actions) => {
    setActiveStep(activeStep + 1);

    //Copies the billing address onto shipping address
    if (isFirstStep && values.shippingAddress.isSameAddress) {
      actions.setFieldValue("shippingAddress", {
        ...values.billingAddress,
        isSameAddress: true,
      });
    }

    if (isSecondStep) {
      processPayment(values);
    }

    actions.setTouched({});
  };

  return (
    <Box width="80%" m="100px auto">
      <Stepper activeStep={activeStep} sx={{ m: "20px 0" }}>
        <Step>
          <StepLabel>Billing</StepLabel>
        </Step>
        <Step>
          <StepLabel>Payment</StepLabel>
        </Step>
      </Stepper>
      <Box>
        <Formik
          onSubmit={handleFormSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema[activeStep]}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              {isFirstStep && (
                <Shipping
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              {isSecondStep && (
                <Payment
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}
              <Box
                display="flex"
                justifyContent="space-between"
                gap={{ sm: "50px", xs: "10px" }}
              >
                {!isFirstStep && (
                  <Button
                    fullWidth
                    color="primary"
                    variant="contained"
                    sx={{
                      backgroundColor: shades.primary[200],
                      boxShadow: "none",
                      color: "white",
                      borderRadius: "3px",
                      p: { sm: "15px 40px", xs: "5px 20px" },
                    }}
                    onClick={() => setActiveStep(activeStep - 1)}
                  >
                    Back
                  </Button>
                )}
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  sx={{
                    backgroundColor: shades.primary[400],
                    boxShadow: "none",
                    color: "white",
                    borderRadius: "3px",
                    p: "15px 40px",
                  }}
                >
                  {!isSecondStep ? "Next" : "Place Order"}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </Box>
  );
};

const initialValues = {
  billingAddress: {
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  shippingAddress: {
    isSameAddress: true,
    firstName: "",
    lastName: "",
    country: "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    zipCode: "",
  },
  email: "",
  phoneNumber: "",
};

const phoneRegExp = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
const diacriticsCharsRegExp = /^[a-zA-Zá-žÁ-Ž\s]*$/;

const checkoutSchema = [
  yup.object().shape({
    billingAddress: yup.object().shape({
      firstName: yup
        .string()
        .required("First name is required")
        .matches(
          diacriticsCharsRegExp,
          "First name contains invalid characters"
        ),
      lastName: yup
        .string()
        .required("Last name is required")
        .matches(
          diacriticsCharsRegExp,
          "Last name contains invalid characters"
        ),
      country: yup
        .string()
        .required("Country is required")
        .matches(diacriticsCharsRegExp, "Country contains invalid characters"),
      street1: yup.string().required("Street address is required"),
      street2: yup.string(),
      city: yup
        .string()
        .required("City is required")
        .matches(diacriticsCharsRegExp, "City contains invalid characters"),
      state: yup
        .string()
        .required("State is required")
        .matches(diacriticsCharsRegExp, "State contains invalid characters"),
      zipCode: yup
        .string()
        .required("ZIP Code is required")
        .matches(/^[0-9]{4,10}$/, "ZIP Code must be between 4 and 10 digits"),
    }),
    shippingAddress: yup.object().shape({
      isSameAddress: yup.boolean(),
      firstName: yup.string().when("isSameAddress", {
        is: false,
        then: (schema) =>
          schema
            .required("First name is required")
            .matches(
              diacriticsCharsRegExp,
              "First name contains invalid characters"
            ),
        otherwise: (schema) => schema.optional(),
      }),
      lastName: yup.string().when("isSameAddress", {
        is: false,
        then: (schema) =>
          schema
            .required("Last name is required")
            .matches(
              diacriticsCharsRegExp,
              "Last name contains invalid characters"
            ),
        otherwise: (schema) => schema.optional(),
      }),
      country: yup.string().when("isSameAddress", {
        is: false,
        then: (schema) =>
          schema
            .required("Country is required")
            .matches(
              diacriticsCharsRegExp,
              "Country contains invalid characters"
            ),
        otherwise: (schema) => schema.optional(),
      }),
      street1: yup.string().when("isSameAddress", {
        is: false,
        then: (schema) => schema.required("Street address is required"),
        otherwise: (schema) => schema.optional(),
      }),
      street2: yup.string(),
      city: yup.string().when("isSameAddress", {
        is: false,
        then: (schema) =>
          schema
            .required("City is required")
            .matches(diacriticsCharsRegExp, "City contains invalid characters"),
        otherwise: (schema) => schema.optional(),
      }),
      state: yup.string().when("isSameAddress", {
        is: false,
        then: (schema) =>
          schema
            .required("State is required")
            .matches(
              diacriticsCharsRegExp,
              "State contains invalid characters"
            ),
        otherwise: (schema) => schema.optional(),
      }),
      zipCode: yup.string().when("isSameAddress", {
        is: false,
        then: (schema) =>
          schema
            .required("ZIP Code is required")
            .matches(
              /^[0-9]{4,10}$/,
              "ZIP Code must be between 4 and 10 digits"
            ),
        otherwise: (schema) => schema.optional(),
      }),
    }),
  }),
  yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .email("Invalid email format"),
    phoneNumber: yup
      .string()
      .required("Phone number is required")
      .matches(phoneRegExp, "Phone number is not valid")
      .min(4, "Phone number is too short")
      .max(15, "Phone number is too long"),
  }),
];

export default Checkout;
