// window.onload = () => {
//             const words = ["Clarity", "Quality", "Reliability", "Presence"];
//             let index = 0;
//             const wordElement = document.getElementById("dynamic-word");

//             setInterval(() => {
//                 index = (index + 1) % words.length;
//                 wordElement.textContent = words[index];
//             }, 2000);
//         };

// window.onload = () => {
//         const words = ["Clarity", "Quality", "Reliability", "Presence"];
//         let index = 0;
//         let charIndex = 0;
//         let isDeleting = false;
//         const speed = 100;
//         const delayBetweenWords = 1000;
//         const wordElement = document.getElementById("dynamic-word");

//         function type() {
//             const currentWord = words[index];

//             if (isDeleting) {
//                 wordElement.textContent = currentWord.substring(0, charIndex--);
//                 if (charIndex < 0) {
//                     isDeleting = false;
//                     index = (index + 1) % words.length;
//                     setTimeout(type, 200);
//                     return;
//                 }
//             } else {
//                 wordElement.textContent = currentWord.substring(0, charIndex++);
//                 if (charIndex > currentWord.length) {
//                     isDeleting = true;
//                     setTimeout(type, delayBetweenWords);
//                     return;
//                 }
//             }

//             setTimeout(type, speed);
//         }

//         type();
//     };


    // window.onload = () => {
    //     const words = ["Clarity", "Quality", "Reliability", "Presence"];
    //     const colors = ["#ff6b6b", "#00d1b2", "#ffdd57", "#a29bfe"];

    //     let index = 0;
    //     let charIndex = 0;
    //     let isDeleting = false;
    //     const speed = 100;
    //     const delayBetweenWords = 1000;
    //     const wordElement = document.getElementById("dynamic-word");

    //     function type() {
    //         const currentWord = words[index];
    //         const currentColor = colors[index];

    //         if (!isDeleting && charIndex === 0) {
    //             // Set color when typing starts for a new word
    //             wordElement.style.color = currentColor;
    //         }

    //         if (isDeleting) {
    //             wordElement.textContent = currentWord.substring(0, charIndex--);
    //             if (charIndex < 0) {
    //                 isDeleting = false;
    //                 index = (index + 1) % words.length;
    //                 setTimeout(type, 200);
    //                 return;
    //             }
    //         } else {
    //             wordElement.textContent = currentWord.substring(0, charIndex++);
    //             if (charIndex > currentWord.length) {
    //                 isDeleting = true;
    //                 setTimeout(type, delayBetweenWords);
    //                 return;
    //             }
    //         }

    //         setTimeout(type, speed);
    //     }

    //     type();
    // };


    window.onload = () => {
        const words = ["Clarity", "Quality", "Reliability", "Presence"];
        const colors = ["#ff6b6b", "#00d1b2", "#ffdd57", "#a29bfe"];

        let index = 0;
        let charIndex = 0;
        let isDeleting = false;
        const speed = 100;
        const delayBetweenWords = 1000;
        const wordElement = document.getElementById("dynamic-word");

        function type() {
            const currentWord = words[index];
            const currentColor = colors[index];

            if (!isDeleting && charIndex === 0) {
                wordElement.style.color = currentColor;
            }

            if (isDeleting) {
                wordElement.textContent = currentWord.substring(0, charIndex--);
                if (charIndex < 0) {
                    isDeleting = false;
                    index = (index + 1) % words.length;
                    setTimeout(type, 200);
                    return;
                }
            } else {
                wordElement.textContent = currentWord.substring(0, charIndex++);
                if (charIndex > currentWord.length) {
                    isDeleting = true;
                    setTimeout(type, delayBetweenWords);
                    return;
                }
            }

            setTimeout(type, speed);
        }

        type();
        document.getElementById("know-more-button").addEventListener("click", () => {
            document.getElementById("about-section").scrollIntoView({ behavior: "smooth" });
        });
    };




