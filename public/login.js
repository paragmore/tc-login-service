console.log("hello from server");
function countdownTimer(sendButton, seconds, callback) {
  let remainingTime = seconds;

  const intervalId = setInterval(() => {
    remainingTime--;
    if (remainingTime < 0) {
      clearInterval(intervalId);
      callback();
    } else {
      sendButton.textContent = `Resend OTP (${remainingTime}s)`;
    }
  }, 1000);
}
const form = document.getElementById("phone-form");
form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const phone = formData.get("phone");
  try {
    const response = await fetch("http://0.0.0.0:8000/auth/generateOtp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phoneNumber: phone,
        userType: "{{userType}}",
        storeId: "{{storeId}}",
      }),
    });
    const data = await response.json();
    if (data.message === "Success") {
      const otpContainer = document.getElementById("otp-container");
      const phoneNumberInput = document.getElementById("phone");
      const sendButton = form.querySelector('button[type="submit"]');
      const resendButton = document.createElement("button");
      resendButton.className = "submit-button";
      resendButton.type = "button";
      resendButton.innerText = "Resend OTP";
      resendButton.disabled = true;
      const verifyOtpForm = document.createElement("form");
      verifyOtpForm.id = "otp-form";
      const verifyOtpLabel = document.createElement("label");
      verifyOtpLabel.for = "code";
      verifyOtpLabel.innerText = "OTP Code:";
      const verifyOtpInput = document.createElement("input");
      verifyOtpInput.type = "text";
      verifyOtpInput.id = "otp-input";
      verifyOtpInput.name = "otp-input";
      verifyOtpInput.required = true;
      const verifyOtpButton = document.createElement("button");
      verifyOtpButton.type = "submit";
      verifyOtpButton.innerText = "Verify OTP";
      verifyOtpButton.className = "submit-button";

      verifyOtpForm.appendChild(verifyOtpLabel);
      verifyOtpForm.appendChild(verifyOtpInput);
      verifyOtpForm.appendChild(document.createElement("br"));
      verifyOtpForm.appendChild(verifyOtpButton);
      otpContainer.appendChild(verifyOtpForm);

      phoneNumberInput.disabled = true;
      otpContainer.style.display = "block";
      sendButton.disabled = true;
      sendButton.innerText = "Resend OTP (60)";
      // Start countdown timer
      countdownTimer(sendButton, 60000 / 1000);
      setTimeout(() => {
        sendButton.disabled = false;
      }, 60000);

      verifyOtpForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(verifyOtpForm);
        const code = formData.get("otp-input");
        const phone = document.getElementById("phone").value;
        try {
          const response = await fetch("http://0.0.0.0:8000/auth/verifyOtp", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              otp: code,
              phoneNumber: phone,
              userType: "{{userType}}",
              storeId: "{{storeId}}",
            }),
          });
          const data = await response.json();
          if (data.message === "Success") {
            alert("Success");
          } else {
            alert("Invalid OTP code");
          }
        } catch (error) {
          console.error(error);
          alert("Failed to verify OTP code");
        }
      });
    } else {
      alert("Failed to send OTP code");
    }
  } catch (error) {
    console.error(error);
    alert("Failed to send OTP code");
  }
});
