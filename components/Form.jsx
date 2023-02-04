import styles from "./Form.module.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import React, { useState } from "react";
import Axios from "axios";

export default function Form() {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [mobile, setmobile] = useState("");
  const [address, setaddress] = useState("");
  const [ifstud, setifstud] = useState("");
  const [message, setmessage] = useState("");  

  const userschema = yup.object().shape({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().email().required(),
    mobile: yup.string().length(11),
    address: yup.string().required("Address is Required!"),
    ifstud: yup.string().required(),
    message: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userschema),
  });

  const submitForm = (data) => {
    console.log(data);
    Axios.post("http://localhost:3001/register", {
      firstname: firstname,
      lastName: lastname,
      email: email,
      mobile: mobile,
      address: address,
      ifstud: ifstud  ,
      message: message,
    }).then(() => {
      alert("a user has been registered");
    });
  };
  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(submitForm)} >
        <h1>Registration Form</h1>
        <div className={styles.flexBox}>
          <div className={styles.flexBox1}>
            <div className={styles.inputBox}>
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                {...register("firstname")}
                onChange={(e) => {
                  setfirstname(e.target.value);
                }}
              />
              <p>{errors.firstname?.message}</p>
            </div>
            <div className={styles.inputBox}>
              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                {...register("lastname")}
                onChange={(e) => {
                  setlastname(e.target.value);
                }}
              />
              <p>{errors.lastname?.message}</p>
            </div>
          </div>
          <div className={styles.flexBox2}>
            <div className={styles.inputBox}>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                {...register("email")}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />
              <p>{errors.email?.message}</p>
            </div>
            <div className={styles.inputBox}>
              <input
                type="tel"
                name="number"
                pattern="[0-9]{11}"
                placeholder="Mobile Number"   {...register("mobile")} 
                onChange={(e) => {setmobile(e.target.value)}}
                />
                <p>{errors.mobile?.message}</p>


            </div>
          </div>
          <div className={styles.flexBox3}>
            <div className={styles.inputBox1}>
              <input type="text" name="address" placeholder="Address"   {...register("address")} 
                                    onChange={(e) => {setaddress(e.target.value)}}
                                    />
                                    <p>{errors.address?.message}</p>

            </div>
          </div>
          <div className={styles.flexBox4}>
            <div className={styles.inputBox}>
              <textarea
                type="text"
                rows={8}
                cols={8}
                name="message"
                placeholder="Why do you want to study here?"   {...register("message")} 
                onChange={(e) => {setmessage(e.target.value)}}

              ></textarea> <p>{errors.message?.message}</p>
            </div>
            <div className={styles.inputBox}>
            <input type="text" name="ifstud" placeholder="are you an old student?"   {...register("ifstud")} 
                                    onChange={(e) => {setifstud(e.target.value)}}
                                    />
                                    <p>{errors.ifstud?.message}</p>

               
            </div>
          </div>
        </div>
        <div className={styles.flexBox5}>
          <div className={styles.inputBox}>
            <input type="submit" name="submit" values="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
}
