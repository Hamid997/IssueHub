import { useState } from "react";

import Button from "../base/Button";
import Input from "../base/Input";
import Card from "../base/Card";

import useAuth from "../../hooks/useAuth";

export default function ChangePasswordCard() {

    const {
        changePassword,
    } = useAuth();

    const [form, setForm] = useState({

        current_password: "",

        new_password: "",

        confirm_password: "",

    });

    function handleChange(
        e: React.ChangeEvent<HTMLInputElement>,
    ) {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    }

    async function handleSubmit(
        e: React.FormEvent,
    ) {

        e.preventDefault();

        await changePassword(form);

        setForm({

            current_password: "",

            new_password: "",

            confirm_password: "",

        });

    }

    return (

        <div className="settings-card">

            <Card >

                <h2>
                    Change password
                </h2>

    <p>
        Update your password to keep your account secure.
    </p>

                <form 
                className="settings-form"
                    onSubmit={handleSubmit}
                >

                    <Input
                        type="password"
                        name="current_password"
                        placeholder="Current password"
                        value={form.current_password}
                        onChange={handleChange}
                    />

                    <Input
                        type="password"
                        name="new_password"
                        placeholder="New password"
                        value={form.new_password}
                        onChange={handleChange}
                    />

                    <Input
                        type="password"
                        name="confirm_password"
                        placeholder="Confirm password"
                        value={form.confirm_password}
                        onChange={handleChange}
                    />

                    <Button
                        type="submit"
                    >
                        Save changes
                    </Button>

                </form>

            </Card>
        </div>



    );

}