document.addEventListener("DOMContentLoaded", () => {
    const pageName = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".link-nav").forEach((link) => {
        if (link.getAttribute("href") === pageName) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });

    const setStatus = (statusEl, message, isError = false) => {
        statusEl.textContent = message;
        statusEl.classList.remove("success", "error");

        if (message) {
            statusEl.classList.add(isError ? "error" : "success");
        }
    };

    document.querySelectorAll("form").forEach((form) => {
        const submitButton = form.querySelector("button[type='submit']");
        let statusEl = form.querySelector(".form-status");

        if (!statusEl) {
            statusEl = document.createElement("p");
            statusEl.className = "form-status";
            statusEl.setAttribute("aria-live", "polite");
            form.appendChild(statusEl);
        }

        const messageField = form.querySelector("#message");
        if (messageField) {
            let counterEl = form.querySelector(".char-counter");
            if (!counterEl) {
                counterEl = document.createElement("p");
                counterEl.className = "char-counter";
                form.appendChild(counterEl);
            }

            const updateCounter = () => {
                const currentLength = messageField.value.length;
                const remaining = 250 - currentLength;
                counterEl.textContent = `${currentLength}/250 characters`;
                counterEl.classList.toggle("warning", remaining <= 25);
            };

            messageField.addEventListener("input", updateCounter);
            updateCounter();
        }

        form.addEventListener("submit", (event) => {
            event.preventDefault();

            const contactName = form.querySelector("#name");
            const contactMessage = form.querySelector("#message");
            if (contactName && contactMessage) {
                const name = contactName.value.trim();
                const message = contactMessage.value.trim();

                if (name.length < 2) {
                    setStatus(statusEl, "Please enter a valid name with at least 2 characters.", true);
                    contactName.focus();
                    return;
                }

                if (message.length < 10) {
                    setStatus(statusEl, "Your message should be at least 10 characters long.", true);
                    contactMessage.focus();
                    return;
                }

                setStatus(statusEl, `Thanks, ${name}! Your message has been sent successfully.`, false);
                form.reset();

                if (submitButton) {
                    submitButton.disabled = true;
                    setTimeout(() => {
                        submitButton.disabled = false;
                        setStatus(statusEl, "");
                    }, 2800);
                }

                if (messageField) {
                    messageField.dispatchEvent(new Event("input"));
                }
                return;
            }

            const fullName = form.querySelector("#full-name");
            const studentId = form.querySelector("#student-id");
            const email = form.querySelector("#email");
            const program = form.querySelector("#program");
            const password = form.querySelector("#password");
            const confirmPassword = form.querySelector("#confirm-password");

            if (fullName || studentId || email || program || password || confirmPassword) {
                const fullNameValue = fullName ? fullName.value.trim() : "";
                const studentIdValue = studentId ? studentId.value.trim() : "";
                const emailValue = email ? email.value.trim() : "";
                const passwordValue = password ? password.value.trim() : "";
                const confirmPasswordValue = confirmPassword ? confirmPassword.value.trim() : "";

                if (!fullNameValue || fullNameValue.length < 2) {
                    setStatus(statusEl, "Please enter your full name.", true);
                    if (fullName) fullName.focus();
                    return;
                }

                if (!studentIdValue) {
                    setStatus(statusEl, "Please enter your student ID.", true);
                    if (studentId) studentId.focus();
                    return;
                }

                if (!/^\d{1,16}$/.test(studentIdValue)) {
                    setStatus(statusEl, "Student ID must contain only numbers and cannot exceed 16 digits.", true);
                    if (studentId) studentId.focus();
                    return;
                }

                if (!emailValue || !emailValue.includes("@")) {
                    setStatus(statusEl, "Please enter a valid email address.", true);
                    if (email) email.focus();
                    return;
                }

                if (!program || !program.value || program.value === "Select program") {
                    setStatus(statusEl, "Please select your program.", true);
                    if (program) program.focus();
                    return;
                }

                if (passwordValue.length < 6) {
                    setStatus(statusEl, "Password must be at least 6 characters long.", true);
                    if (password) password.focus();
                    return;
                }

                if (passwordValue !== confirmPasswordValue) {
                    setStatus(statusEl, "Passwords do not match.", true);
                    if (confirmPassword) confirmPassword.focus();
                    return;
                }

                setStatus(statusEl, `Welcome, ${fullNameValue}! Your account has been created successfully.`, false);
                form.reset();

                if (submitButton) {
                    submitButton.disabled = true;
                    setTimeout(() => {
                        submitButton.disabled = false;
                        setStatus(statusEl, "");
                    }, 2800);
                }
                return;
            }

            const emailLogin = form.querySelector("#email-login");
            const passwordLogin = form.querySelector("#password-login");
            if (emailLogin || passwordLogin) {
                const emailLoginValue = emailLogin ? emailLogin.value.trim() : "";
                const passwordLoginValue = passwordLogin ? passwordLogin.value.trim() : "";

                if (!emailLoginValue || !/^[a-z0-9._%+-]+@gmail\.com$/i.test(emailLoginValue)) {
                    setStatus(statusEl, "Email must contain '@gmail.com' and only lowercase letters, numbers, and allowed punctuation. It cannot start with a capital letter.", true);
                    if (emailLogin) emailLogin.focus();
                    return;
                }

                if (!passwordLoginValue || passwordLoginValue.length < 6) {
                    setStatus(statusEl, "Password must be at least 6 characters long.", true);
                    if (passwordLogin) passwordLogin.focus();
                    return;
                }

                setStatus(statusEl, "Login successful. Welcome back!", false);
                form.reset();

                if (submitButton) {
                    submitButton.disabled = true;
                    setTimeout(() => {
                        submitButton.disabled = false;
                        setStatus(statusEl, "");
                    }, 2800);
                }
                return;
            }

            setStatus(statusEl, "Form submitted successfully.", false);
            form.reset();
            if (submitButton) {
                submitButton.disabled = true;
                setTimeout(() => {
                    submitButton.disabled = false;
                    setStatus(statusEl, "");
                }, 2800);
            }
        });
    });
});
