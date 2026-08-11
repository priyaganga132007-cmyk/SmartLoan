from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/check", methods=["POST"])
def check_loan():

    data = request.json

    name = data["name"]
    income = float(data["income"])
    loan_amount = float(data["loan_amount"])
    credit_score = int(data["credit_score"])
    interest_rate = float(data["interest_rate"])
    tenure_years = int(data["tenure_years"])

    # EMI calculation
    monthly_rate = interest_rate / (12 * 100)
    months = tenure_years * 12

    if monthly_rate == 0:
        emi = loan_amount / months
    else:
        emi = (
            loan_amount
            * monthly_rate
            * (1 + monthly_rate) ** months
        ) / (
            (1 + monthly_rate) ** months - 1
        )

    # Eligibility and risk
    if credit_score >= 750 and emi <= income * 0.30:

        eligibility = "Eligible"
        risk = "LOW 🟢"

    elif credit_score >= 700 and emi <= income * 0.40:

        eligibility = "Eligible"
        risk = "MEDIUM 🟡"

    else:

        eligibility = "Not Eligible"
        risk = "HIGH 🔴"

    return jsonify({
        "name": name,
        "emi": round(emi, 2),
        "eligibility": eligibility,
        "risk": risk
    })


if __name__ == "__main__":
    app.run(debug=True)