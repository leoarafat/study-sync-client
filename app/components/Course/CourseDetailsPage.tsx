import { useGetCourseDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { FC, useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import CourseDetails from "./Coursedetails";
import { loadStripe } from "@stripe/stripe-js";
import {
  useCreatePaymentMutation,
  useGetStripePublishableKeyQuery,
} from "@/redux/features/orders/ordersApi";
type Props = {
  id: string;
};

const CourseDetailsPage: FC<Props> = ({ id }) => {
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  //ts-ignore;
  const { data, isLoading } = useGetCourseDetailsQuery(id);

  const { data: config } = useGetStripePublishableKeyQuery({});

  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentMutation();
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (config) {
      const publishableKey = config?.publishableKey;
      setStripePromise(loadStripe(publishableKey));
    }

    if (data) {
      const amount = Math.round(data?.data?.price * 100);
      createPaymentIntent(amount);
    }
  }, [config, data, createPaymentIntent]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data?.data?.name + " - StudySync"}
            description="StudySync is a platform for students to learn and get help from teachers"
            keywords={data?.data?.tags}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          {stripePromise && (
            <CourseDetails
              data={data?.data}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
              setRoute={setRoute}
              setOpen={setOpen}
            />
          )}
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
