function calculateSalary() {
    const salary = parseFloat(document.getElementById('salary').value);
    const normHours = parseFloat(document.getElementById('normHours').value);
    const unscheduledHours = parseFloat(document.getElementById('unscheduledHours').value);
    const nightHours = parseFloat(document.getElementById('nightHours').value) / 2;
    const interCalculation = parseFloat(document.getElementById('interCalculation').value);
    const overtimeHours = parseFloat(document.getElementById('overtimeHours').value);
    const overPayment = parseFloat(document.getElementById('overPayment').value);

    let overtimeBonus = Math.round((salary / normHours * unscheduledHours) * 100) / 100;
    let qualificationBonus = Math.round((salary / normHours * (normHours + unscheduledHours)) * 0.2 * 100) / 100;
    let hazardBonus = Math.round((salary / normHours * (normHours + unscheduledHours)) * 0.04 * 100) / 100;
    let basePayment = salary;
    let nightBonus = Math.round((salary / normHours * nightHours) * 100) / 100;
    const qualityCoefficient = 3500;
    let totalPayment = Math.round(
        (parseFloat(basePayment)
            + parseFloat(qualificationBonus)
            + parseFloat(hazardBonus)
            + parseFloat(nightBonus)
            + parseFloat(overtimeBonus)
            + qualityCoefficient)
        * 100) / 100;
    let regionalCoefficient = Math.round((totalPayment * 0.2) * 100) / 100;
    let northernAllowance = Math.round((totalPayment * 0.3) * 100) / 100;

    const mainResultsList = document.getElementById('mainResultsList');
    mainResultsList.innerHTML = `
        <li>Коэфф. квалификации 20%: ${qualificationBonus}</li>
        <li>Доплата за вредность 4%: ${hazardBonus}</li>
        <li>Оплата по окладу: ${basePayment}</li>
        <li>Доплата за ночные часы: ${nightBonus}</li>
        <li>Районный коэффициент: ${regionalCoefficient}</li>
        <li>Северная надбавка: ${northernAllowance}</li>
        <li>Межрасчёт: ${interCalculation}</li>
        <li>Доплата за часы вне графика: ${overtimeBonus}</li>
        <li>Коэфф. качества (Субсидия): ${qualityCoefficient}</li>
        <li>Доп. выплаты: ${overPayment}</li>
    `;

    let sum = qualificationBonus + hazardBonus + basePayment
        + nightBonus + regionalCoefficient + northernAllowance
        + interCalculation + overtimeBonus + qualityCoefficient + overPayment

    const nightOverHours = parseFloat(document.getElementById('nightOverHours').value) / 2;

    qualificationBonus = Math.round((salary / normHours * overtimeHours) * 0.2 * 100) / 100;
    hazardBonus = Math.round((salary / normHours * overtimeHours) * 0.04 * 100) / 100;
    basePayment = Math.round((salary / normHours * overtimeHours) * 100) / 100;
    nightBonus = Math.round((salary / normHours * nightOverHours) * 100) / 100;
    totalPayment = Math.round(
        (parseFloat(basePayment)
            + parseFloat(qualificationBonus)
            + parseFloat(hazardBonus)
            + parseFloat(nightBonus)
        ) * 100) / 100;
    regionalCoefficient = Math.round((totalPayment * 0.2) * 100) / 100;
    northernAllowance = Math.round((totalPayment * 0.3) * 100) / 100;

    const overResultsList = document.getElementById('overResultsList');
    overResultsList.innerHTML = `
        <li>Коэфф. квалификации 20%: ${qualificationBonus}</li>
        <li>Доплата за вредность 4%: ${hazardBonus}</li>
        <li>Оплата по окладу: ${basePayment}</li>
        <li>Доплата за ночные часы: ${nightBonus}</li>
        <li>Районный коэффициент: ${regionalCoefficient}</li>
        <li>Северная надбавка: ${northernAllowance}</li>
    `;

    sum += qualificationBonus + hazardBonus + basePayment + nightBonus + regionalCoefficient + northernAllowance;
    sum = Math.round(sum * 100) / 100;
    const taxes = Math.round(sum * 0.13);
    const payment = Math.round((sum - taxes) * 100) / 100;

    const paymentList = document.getElementById('paymentList');
    paymentList.innerHTML = `
        <li>Начислено: ${sum}</li>
        <li>Удержано: ${taxes}</li>
        <li>Выплачено: ${payment}</li>
    `;
}