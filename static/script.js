function checkLoan() {

    // Get values from the webpage

    let name = document.getElementById("name").value;
    let income = document.getElementById("income").value;
    let loanAmount = document.getElementById("loan_amount").value;
    let creditScore = document.getElementById("credit_score").value;
    let interestRate = document.getElementById("interest_rate").value;
    let tenureYears = document.getElementById("tenure_years").value;


    // Check empty fields

    if (
        name === "" ||
        income === "" ||
        loanAmount === "" ||
        creditScore === "" ||
        interestRate === "" ||
        tenureYears === ""
    ) {

        alert("Please enter all details.");

        return;
    }


    // Send information to Python Flask

    fetch("/check", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            name: name,
            income: income,
            loan_amount: loanAmount,
            credit_score: creditScore,
            interest_rate: interestRate,
            tenure_years: tenureYears

        })

    })


    .then(response => {

        if (!response.ok) {
            throw new Error("Server error");
        }

        return response.json();

    })


    .then(data => {

        // Show name

        document.getElementById("nameResult").innerText =
            data.name;


        // Show EMI

        document.getElementById("emi").innerText =
            "₹ " + data.emi;


        // Show eligibility

        document.getElementById("eligibility").innerText =
            data.eligibility;


        // Show risk

        document.getElementById("risk").innerText =
            data.risk;

    })


    .catch(error => {

        console.error(error);

        alert("Something went wrong. Please check the Flask terminal.");

    });

}