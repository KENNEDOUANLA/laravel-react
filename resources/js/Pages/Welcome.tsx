import { TraductionComponent } from "@/Components/Completion";
import { Link, Head } from "@inertiajs/inertia-react";
import React, { useEffect } from "react";
import { Traduction } from "../Api";
export default function Welcome(props) {
    useEffect(() => {
        Traduction()
            .then((res) => console.log("res=>", res))
            .catch((err) => console.log("err", err));
    }, []);
    return (
        <>
            <TraductionComponent />
        </>
    );
}
