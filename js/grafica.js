const bgColor = [
    "#3FBEAF",
    "#50C0FF",
    "#C196E4",
    "#A0EC71",
];

const data = {
    datasets: [
        {
            label: 'Ganancias por tipo de inversion',
            backgroundColor: bgColor
        }
    ]
}

export const grafica = new Chart(
    "grafica",
    {
        type: "bar",
        data: data,
        plugins: [ChartDataLabels],
        options:{
            responsive:true,
            maintainAspectRatio: false,
            layout: {
                padding: 20
            },
            scales:{
                y:{
                    type: "linear",
                    beginAtZero: false,
                    min: () => {
                        return calcularMinimo();
                    }
                }
            },
            plugins:{
                title:{
                    display: false,
                    text: "Ganancias",
                },
                legend:{
                    display: false,
                },
                datalabels:{
                    anchor: "end",
                    clamp: true,
                    align: "top",
                    offset: 0,
                    formatter: function (value, context){
                        return "$" + new Intl.NumberFormat("es-MX").format(context.dataset.data[context.dataIndex]);
                    }
                }
            }
        }
    }
);

function calcularMinimo(){
    return Number(document.getElementById("monto").value / 2);
}