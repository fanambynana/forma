import {useForm, SubmitHandler} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import { ContactSchema, contactSchema } from "../api/contactType";
import "./style.css";

const Contact = () => {
    const {reset, register, handleSubmit, formState: { errors }} = useForm({
        defaultValues: {
        name: "",
        email: "",
        telNumber: "",
        message: ""
        },
        resolver: zodResolver(contactSchema),
    });

    const onSubmit: SubmitHandler<ContactSchema> = async (data) => {
        try {
            const response = await fetch("/api/save-contact", {
                method: "POST",
                headers: { "content": "application/json" },
                body: JSON.stringify(data)
            });
            const message = response.json;
            console.log(message);
            reset();
        } catch (error) {
            throw error;
        }
    }

    return (
        <form id="contact-form" onSubmit={handleSubmit(onSubmit)}>
            <h1>Add contact :</h1>
            <div>
                <label htmlFor="name">Name :</label>
                <input {...register("name")} />
                <div>{errors.name?.message}</div>
            </div>

            <div>
                <label htmlFor="email">Email :</label>
                <input {...register("email")} />
                <div>{errors.email?.message}</div>
            </div>

            <div>
                <label htmlFor="telNumber">Tel number :</label>
                <input {...register("telNumber")} />
                <div>{errors.telNumber?.message}</div>
            </div>

            <div>
                <label htmlFor="message">Message :</label>
                <input {...register("message")} />
                <div>{errors.message?.message}</div>
            </div>

            <button type="submit">submit</button>
        </form>
    );
}

export default Contact;