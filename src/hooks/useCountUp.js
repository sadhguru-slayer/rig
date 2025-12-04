"use client";

import { useEffect, useState } from "react";

export default function useCountUp(end, start = false, duration = 1200) {
    const [value, setValue] = useState(0);

    useEffect(() => {
        if (!start) return; // 🔥 start only when GSAP triggers reveal

        let s = 0;
        const finalValue = parseInt(end.replace(/\D/g, ""));
        const increment = finalValue / (duration / 16);

        const timer = setInterval(() => {
            s += increment;
            if (s >= finalValue) {
                clearInterval(timer);
                setValue(finalValue);
            } else {
                setValue(Math.floor(s));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [start, end, duration]);

    return value;
}
